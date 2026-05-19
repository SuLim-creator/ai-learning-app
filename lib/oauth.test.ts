import { describe, it, expect, beforeEach, vi } from "vitest";
import { findOrCreateOAuthUser } from "./oauth";

vi.mock("./prisma", () => ({
  prisma: {
    oAuthAccount: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    profile: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

import { prisma } from "./prisma";

const mockOAuthAccount = prisma.oAuthAccount as unknown as {
  findUnique: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
};
const mockProfile = prisma.profile as unknown as {
  findUnique: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
};

const fakeProfile = {
  id: "user-1",
  email: "test@example.com",
  displayName: "테스트",
  passwordHash: null,
  createdAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("findOrCreateOAuthUser", () => {
  it("기존 OAuth 계정이 있으면 해당 프로필을 반환한다", async () => {
    mockOAuthAccount.findUnique.mockResolvedValue({
      id: "oa-1",
      userId: "user-1",
      provider: "google",
      providerAccountId: "google-123",
      user: fakeProfile,
    });

    const result = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: "google-123",
      email: "test@example.com",
      displayName: "테스트",
    });

    expect(result).toEqual(fakeProfile);
    expect(mockProfile.create).not.toHaveBeenCalled();
  });

  it("OAuth 계정이 없고 이메일도 없으면 신규 프로필과 OAuth 계정을 생성한다", async () => {
    mockOAuthAccount.findUnique.mockResolvedValue(null);
    mockProfile.findUnique.mockResolvedValue(null);
    mockProfile.create.mockResolvedValue(fakeProfile);
    mockOAuthAccount.create.mockResolvedValue({});

    const result = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: "google-456",
      email: "new@example.com",
      displayName: "신규",
    });

    expect(mockProfile.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: "new@example.com" }),
      }),
    );
    expect(mockOAuthAccount.create).toHaveBeenCalled();
    expect(result).toEqual(fakeProfile);
  });

  it("이메일이 이미 존재하면 기존 프로필에 OAuth 계정을 연결한다", async () => {
    mockOAuthAccount.findUnique.mockResolvedValue(null);
    mockProfile.findUnique.mockResolvedValue(fakeProfile);
    mockOAuthAccount.create.mockResolvedValue({});

    const result = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: "google-789",
      email: "test@example.com",
      displayName: "테스트",
    });

    expect(mockProfile.create).not.toHaveBeenCalled();
    expect(mockOAuthAccount.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: "user-1", provider: "google" }),
      }),
    );
    expect(result).toEqual(fakeProfile);
  });
});
