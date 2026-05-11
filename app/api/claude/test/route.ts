import { claude } from "@/lib/claude";
import { NextResponse } from "next/server";

export async function GET() {
  const message = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 64,
    messages: [
      { role: "user", content: "한국어로 '연결 성공'이라고만 답해줘." },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ ok: true, response: text });
}
