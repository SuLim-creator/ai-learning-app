import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  // worktree 디렉토리가 Next.js 빌드에 포함되지 않도록 제외
  outputFileTracingExcludes: {
    "*": [".claude/worktrees/**"],
  },
  // Next.js 16 Turbopack 기본값 명시 — next-pwa webpack config 충돌 방지
  turbopack: {},
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
})(nextConfig);
