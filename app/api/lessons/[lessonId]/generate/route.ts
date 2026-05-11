import { claude } from "@/lib/claude";
import { prisma } from "@/lib/prisma";
import type { LessonSection } from "@/lib/types/lesson";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ lessonId: string }>;
}

interface GenerateRequestBody {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  forceNew?: boolean;
}

function isValidBody(body: unknown): body is GenerateRequestBody {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.title === "string" &&
    typeof b.description === "string" &&
    typeof b.difficulty === "string" &&
    Array.isArray(b.tags) &&
    b.tags.every((t) => typeof t === "string")
  );
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { lessonId } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "요청 바디가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { error: "필수 필드가 누락되었습니다." },
      { status: 400 },
    );
  }

  const { title, description, difficulty, tags, forceNew = false } = body;

  // 프롬프트 인젝션 방지: 각 필드 길이 제한
  if (title.length > 200 || description.length > 500) {
    return NextResponse.json(
      { error: "입력값이 너무 깁니다." },
      { status: 400 },
    );
  }

  if (!forceNew) {
    const cached = await prisma.generatedContent.findFirst({
      where: { lessonId },
      orderBy: { version: "desc" },
    });

    if (cached) {
      return NextResponse.json({
        lessonId,
        version: cached.version,
        sections: JSON.parse(cached.content) as LessonSection[],
        cached: true,
      });
    }
  }

  // 최대 버전을 조회해 다음 버전 결정 — count 대신 max version으로 @@unique 충돌 방지
  const lastVersion = await prisma.generatedContent.findFirst({
    where: { lessonId },
    orderBy: { version: "desc" },
    select: { version: true },
  });
  const nextVersion = (lastVersion?.version ?? 0) + 1;

  const prompt = `당신은 AI/ML 입문자를 위한 교육 콘텐츠 작성자입니다.
아래 레슨 정보를 바탕으로 학습 섹션을 JSON 배열로 생성하세요.

레슨 정보:
- 제목: ${title}
- 설명: ${description}
- 난이도: ${difficulty}
- 태그: ${tags.slice(0, 10).join(", ")}

요구사항:
- text 섹션 2개: 일상 비유로 핵심 개념 설명 (마크다운 **굵게** 활용)
- visual 섹션 1개: 구체적 숫자 예시나 도식
- quiz 섹션 3개: 아래 형식 준수

퀴즈 형식:
Q: 질문

A) 선택지1
B) 선택지2
C) 선택지3
D) 선택지4

정답: X) 정답 텍스트
해설: 한 문장 설명

반드시 아래 JSON 배열만 출력하세요. 다른 텍스트 없이:
[
  { "id": "s1", "type": "text", "title": "...", "content": "...", "order": 1 },
  ...
]`;

  const message = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const raw =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  const jsonStr = raw
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  let sections: LessonSection[];
  try {
    sections = JSON.parse(jsonStr) as LessonSection[];
  } catch {
    return NextResponse.json(
      { error: "AI 응답 파싱 실패", raw: jsonStr },
      { status: 502 },
    );
  }

  await prisma.generatedContent.create({
    data: {
      lessonId,
      version: nextVersion,
      content: JSON.stringify(sections),
    },
  });

  return NextResponse.json({
    lessonId,
    version: nextVersion,
    sections,
    cached: false,
  });
}
