"use client";

import Link from "next/link";

export function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
    >
      <span>⌂</span>
      <span>홈으로</span>
    </Link>
  );
}
