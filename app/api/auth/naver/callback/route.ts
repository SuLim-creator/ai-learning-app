import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findOrCreateOAuthUser } from "@/lib/oauth";
import { createSession } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/auth-constants";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_cancelled", req.nextUrl.origin),
    );
  }

  try {
    const tokenRes = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        code,
        state: req.nextUrl.searchParams.get("state") ?? "",
      }),
    });

    if (!tokenRes.ok) throw new Error("Token exchange failed");
    const { access_token } = (await tokenRes.json()) as {
      access_token: string;
    };

    const userRes = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!userRes.ok) throw new Error("Failed to fetch user info");
    const { response: naverUser } = (await userRes.json()) as {
      response: { id: string; email: string; name: string };
    };

    const profile = await findOrCreateOAuthUser({
      provider: "naver",
      providerAccountId: naverUser.id,
      email: naverUser.email,
      displayName: naverUser.name,
    });

    const token = await createSession(profile.id);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.redirect(
      new URL("/learn/math-basics", req.nextUrl.origin),
    );
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", req.nextUrl.origin),
    );
  }
}
