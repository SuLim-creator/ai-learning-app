import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export function GET() {
  const clientId = process.env.NAVER_CLIENT_ID;
  if (!clientId) throw new Error("NAVER_CLIENT_ID is not set");

  const state = randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/naver/callback`,
    state,
  });

  return NextResponse.redirect(
    `https://nid.naver.com/oauth2.0/authorize?${params}`,
  );
}
