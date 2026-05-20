import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/claude", () => ({
  claude: {
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ type: "text", text: "연결 성공" }],
      }),
    },
  },
}));

vi.mock("@/lib/auth", () => ({
  getSessionUser: vi.fn(),
  SESSION_COOKIE: "session",
}));

describe("GET /api/claude/test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("인증 없이도 200을 반환한다", async () => {
    const { GET } = await import("./route");
    const req = new NextRequest("http://localhost/api/claude/test");

    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});
