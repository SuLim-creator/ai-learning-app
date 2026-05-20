import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildGoogleAuthUrl, buildNaverAuthUrl, getAppUrl } from "./oauth-url";

describe("buildGoogleAuthUrl", () => {
  it("올바른 Google OAuth URL을 반환한다", () => {
    const url = buildGoogleAuthUrl("client123", "https://example.com/callback");
    expect(url).toContain("https://accounts.google.com/o/oauth2/v2/auth");
    expect(url).toContain("client_id=client123");
    expect(url).toContain(encodeURIComponent("https://example.com/callback"));
  });

  it("scope, response_type, access_type, prompt을 포함한다", () => {
    const url = buildGoogleAuthUrl("cid", "https://example.com/cb");
    expect(url).toContain("scope=");
    expect(url).toContain("openid");
    expect(url).toContain("response_type=code");
    expect(url).toContain("access_type=offline");
    expect(url).toContain("prompt=select_account");
  });
});

describe("buildNaverAuthUrl", () => {
  it("올바른 Naver OAuth URL을 반환한다", () => {
    const url = buildNaverAuthUrl(
      "nid123",
      "https://example.com/callback",
      "state_abc",
    );
    expect(url).toContain("https://nid.naver.com/oauth2.0/authorize");
    expect(url).toContain("client_id=nid123");
    expect(url).toContain(encodeURIComponent("https://example.com/callback"));
    expect(url).toContain("state=state_abc");
  });

  it("response_type=code를 포함한다", () => {
    const url = buildNaverAuthUrl("nid", "https://example.com/cb", "st");
    expect(url).toContain("response_type=code");
  });
});

describe("getAppUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("NEXT_PUBLIC_APP_URL이 있으면 그것을 반환한다", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://myapp.com";
    delete process.env.VERCEL_URL;
    expect(getAppUrl()).toBe("https://myapp.com");
  });

  it("NEXT_PUBLIC_APP_URL이 없고 VERCEL_URL이 있으면 https를 붙여 반환한다", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    process.env.VERCEL_URL = "my-app.vercel.app";
    expect(getAppUrl()).toBe("https://my-app.vercel.app");
  });

  it("둘 다 없으면 http://localhost:3000을 반환한다", () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    delete process.env.VERCEL_URL;
    expect(getAppUrl()).toBe("http://localhost:3000");
  });
});
