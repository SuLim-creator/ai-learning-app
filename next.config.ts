import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // worktree 디렉토리가 Next.js 빌드에 포함되지 않도록 제외
  outputFileTracingExcludes: {
    "*": [".claude/worktrees/**"],
  },
};

export default nextConfig;
