import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { buildNaverAuthUrl, getAppUrl } from "@/lib/oauth-url";

export function GET() {
  const clientId = process.env.NAVER_CLIENT_ID;
  if (!clientId)
    return NextResponse.redirect(new URL("/login?error=config", getAppUrl()));

  const state = randomBytes(16).toString("hex");
  const redirectUri = `${getAppUrl()}/api/auth/naver/callback`;
  return NextResponse.redirect(buildNaverAuthUrl(clientId, redirectUri, state));
}
