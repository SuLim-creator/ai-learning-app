import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/claude", () => ({
  claude: {
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [
          {
            type: "text",
            text: JSON.stringify([
              {
                id: "s1",
                type: "text",
                title: "제목",
                content: "내용",
                order: 1,
              },
            ]),
          },
        ],
      }),
    },
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: { findUnique: vi.fn().mockResolvedValue({ id: "lesson-1" }) },
    generatedContent: {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({}),
    },
  },
}));

vi.mock("@/lib/auth", () => ({
  getSessionUser: vi.fn(),
  SESSION_COOKIE: "session",
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockReturnValue({ allowed: true }),
}));

const body = {
  title: "선형 회귀",
  description: "회귀 입문",
  difficulty: "easy",
  tags: ["ml"],
};

describe("POST /api/lessons/[lessonId]/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("인증 없이도 200을 반환한다", async () => {
    const { POST } = await import("./route");
    const req = new NextRequest(
      "http://localhost/api/lessons/lesson-1/generate",
      { method: "POST", body: JSON.stringify(body) },
    );

    const res = await POST(req, {
      params: Promise.resolve({ lessonId: "lesson-1" }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.lessonId).toBe("lesson-1");
    expect(Array.isArray(json.sections)).toBe(true);
  });
});
