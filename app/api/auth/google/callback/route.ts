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
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) throw new Error("Token exchange failed");
    const { access_token } = (await tokenRes.json()) as {
      access_token: string;
    };

    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } },
    );
    if (!userRes.ok) throw new Error("Failed to fetch user info");
    const googleUser = (await userRes.json()) as {
      id: string;
      email: string;
      name: string;
    };

    const profile = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: googleUser.id,
      email: googleUser.email,
      displayName: googleUser.name,
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
