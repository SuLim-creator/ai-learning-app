import { claude } from "@/lib/claude";
import { prisma } from "@/lib/prisma";
import { getSessionUser, SESSION_COOKIE } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import type { LessonSection } from "@/lib/types/lesson";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface RouteParams {
  params: Promise<{ lessonId: string }>;
}

const generateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string().max(50)).max(10),
  forceNew: z.boolean().optional(),
});

export async function POST(req: NextRequest, { params }: RouteParams) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value ?? "";
  const user = await getSessionUser(token);
  if (!user) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { lessonId } = await params;

  const lessonExists = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true },
  });
  if (!lessonExists) {
    return NextResponse.json(
      { error: "레슨을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { error: "요청 바디가 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const parsed = generateSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const {
    title,
    description,
    difficulty,
    tags,
    forceNew = false,
  } = parsed.data;

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

  let message;
  try {
    message = await claude.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
  } catch {
    return NextResponse.json(
      { error: "AI 서비스 오류가 발생했습니다." },
      { status: 502 },
    );
  }

  const aiText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  const jsonStr = aiText
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  let sections: LessonSection[];
  try {
    sections = JSON.parse(jsonStr) as LessonSection[];
  } catch {
    // M2: raw 응답은 서버 로그에만 기록, 클라이언트에 노출 금지
    console.error("[generate] AI 응답 파싱 실패:", jsonStr);
    return NextResponse.json(
      { error: "AI 응답 처리 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }

  try {
    await prisma.generatedContent.create({
      data: {
        lessonId,
        version: nextVersion,
        content: JSON.stringify(sections),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "콘텐츠 저장 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    lessonId,
    version: nextVersion,
    sections,
    cached: false,
  });
}
