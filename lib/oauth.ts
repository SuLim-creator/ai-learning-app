import { prisma } from "./prisma";
import type { Profile } from "./generated/prisma/client";

export type OAuthProvider = "google" | "naver";

interface FindOrCreateOAuthUserParams {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  displayName: string;
}

export async function findOrCreateOAuthUser({
  provider,
  providerAccountId,
  email,
  displayName,
}: FindOrCreateOAuthUserParams): Promise<Profile> {
  const existing = await prisma.oAuthAccount.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    include: { user: true },
  });

  if (existing) return existing.user;

  const existingProfile = await prisma.profile.findUnique({
    where: { email },
  });

  if (existingProfile) {
    await prisma.oAuthAccount.create({
      data: { userId: existingProfile.id, provider, providerAccountId },
    });
    return existingProfile;
  }

  const profile = await prisma.profile.create({
    data: { email, displayName },
  });
  await prisma.oAuthAccount.create({
    data: { userId: profile.id, provider, providerAccountId },
  });
  return profile;
}
