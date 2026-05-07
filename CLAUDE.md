@AGENTS.md

# AI Learning App

AI 개념을 단계별로 학습하는 Next.js 앱.

## 스택

- **Framework**: Next.js 15, App Router (`app/` 디렉토리)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Database**: Prisma + SQLite
- **AI**: Claude API — `@anthropic-ai/sdk`

## 아키텍처

- Server Components를 기본으로 사용
- `"use client"` 는 꼭 필요한 경우에만 (이벤트 핸들러, 브라우저 API, useState/useEffect)
- 콘텐츠는 `content/lessons/**/*.json` 에서 로드
- 타입 정의는 `lib/types/lesson.ts` 참조

## 컨벤션

- 파일명: `kebab-case`
- 컴포넌트명: `PascalCase`
- `any` 사용 금지
- 기능 완료 전 반드시 실행: `pnpm typecheck && pnpm lint`

## Claude가 자주 틀리는 것

(발견 시 추가)

## 개발 명령어

```bash
pnpm dev        # 개발 서버 (localhost:3000)
pnpm build      # 프로덕션 빌드
pnpm typecheck  # 타입 체크
pnpm lint       # 린트
```

> pnpm PATH: `export PNPM_HOME=/Users/suhyun/Library/pnpm && export PATH=$PNPM_HOME:$PATH`

## 세션 상태

`docs/session-state.json` — 새 세션 시작 시 먼저 확인
