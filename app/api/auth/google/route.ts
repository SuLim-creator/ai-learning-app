import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, getAppUrl } from "@/lib/oauth-url";

export function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId)
    return NextResponse.redirect(new URL("/login?error=config", getAppUrl()));

  const redirectUri = `${getAppUrl()}/api/auth/google/callback`;
  return NextResponse.redirect(buildGoogleAuthUrl(clientId, redirectUri));
}
