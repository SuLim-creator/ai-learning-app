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

## TDD 규칙

- `lib/` 의 비즈니스 로직은 반드시 실패하는 테스트를 먼저 작성
- 테스트 실행 → 실패 확인 → 최소 구현 → 통과 확인
- 한 번에 테스트 1개씩. 10개를 한꺼번에 쓰지 않음
- 테스트가 실패하면: 구현을 고침. 테스트를 약하게 만들지 않음
- 테스트 파일: 같은 폴더에 `<name>.test.ts`

## 모델 선택 전략

| 상황                                | 모델       | 이유                                          |
| ----------------------------------- | ---------- | --------------------------------------------- |
| 일상 작업 (기능 구현, 버그 수정)    | `sonnet`   | 속도·품질 균형, 대부분의 작업에 충분          |
| 아키텍처 결정, 복잡한 디버깅        | `opus`     | 최고 추론 품질 필요 시                        |
| 계획 후 자동 구현                   | `opusplan` | Opus로 계획 → Sonnet으로 구현 자동 전환       |
| 단순 분류/검색 (subagent 경량 작업) | `haiku`    | 가장 빠르고 저렴                              |
| 비용 최적화                         | `sonnet`   | Opus 대비 ~80% 저렴, 품질 차이 미미한 경우 多 |

**Subagent 모델 배정**

- `code-reviewer` → sonnet (속도 중요, 품질 충분)
- `content-reviewer` → opus (사실 정확성 최우선)
- `test-writer` → sonnet (패턴 반복, haiku도 가능)

## 세션 상태

`docs/session-state.json` — 새 세션 시작 시 먼저 확인

## V2 계획

- 2단계 ML 기초 레슨 완성 (10개)
- 3-5단계 커리큘럼 추가
- 소셜 로그인 (Google)
- 학습 스트릭 시스템
- 다크/라이트 테마 토글
