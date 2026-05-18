# CHANGELOG

AI 학습 앱 개발 일지. 각 Day별 주요 작업 기록.

---

## Week 1 — 프로젝트 기반 구축

### Day 1

- `init` — Create Next App으로 프로젝트 초기화

### Day 5

- `feat` — CLAUDE.md 3단계 체계 세팅 (글로벌 / 프로젝트 / 로컬)
- `feat` — Permission 설정, Hook 세팅, shadcn/ui 추가
- `feat` — 레슨 목록 + 상세 페이지 구현

### Day 8

- `feat` — 커스텀 슬래시 커맨드 추가 (typecheck-fix, review 등)
- `fix` — 커스텀 커맨드 충돌 해결 및 allowed-tools 수정
- `feat` — 레슨 04 콘텐츠 추가

### Day 9

- `feat` — 커스텀 서브에이전트 추가 (code-reviewer, test-writer, content-reviewer)
- `fix` — 벡터 레슨 퀴즈 개선 및 픽셀 카운트 설명 수정
- `feat` — TDD로 `calculateProgress` 함수 구현

---

## Week 2 — 데이터베이스 & 인증

### Day 10

- `feat` — TDD로 `calculateProgress` 함수 구현 완료

### Day 11

- `feat` — Prisma + SQLite 연동 및 학습 데이터 모델 설계

### Day 12

- `feat` — 이메일+비밀번호 Auth 구현
- `fix` — Edge Runtime import 오류 해결 (SESSION_COOKIE 상수 분리)
- `feat` — 커스텀 스킬 추가 (commit, pre-deploy, lesson-pipeline)

### Day 13

- `feat` — math-basics 레슨 3편 추가 (행렬 곱셈, 경사 하강법, 활성화 함수)
- `feat` — 레슨 08 (손실 함수) 추가
- `fix` — `useSearchParams` Suspense 래핑으로 정적 빌드 호환성 확보

### Day 14

- `feat` — Claude API 연동 및 레슨 진도 시스템 구현

---

## Week 3 — UI 고도화 & 인프라

### Day 15

- `feat` — settings.json에 프로덕션 훅 5개 추가
- `chore` — MCP 서버 설정 추가 (Context7, Playwright)

### Day 16

- `feat` — 퀴즈 UI 업그레이드 (confetti 효과, shake 애니메이션, 점수 표시)
- `feat` — `/dashboard` 페이지 추가 (학습 진도 개요)

### Day 17

- `fix` — next.config 워크트리 호환성 수정 및 canvas-confetti 설치

### Day 18

- `feat` — 벡터·행렬 레슨에 인터랙티브 수학 시각화 추가
- `chore` — Playwright 출력 디렉토리 gitignore 추가

### Day 19

- `docs` — 모델 선택 전략 문서화 및 서브에이전트 모델 최적화

### Day 20

- `refactor` — 에러 핸들링, 인증 가드, 성능 개선

### Day 21

- `feat` — math-basics 레슨 5편 추가 (함수, 확률, 분포, 베이즈, 요약)
- Week 3 완료 및 세션 상태 최종 업데이트

---

## Week 4 — 배포 & 품질 완성

### Day 22

- `docs` — Headless 모드(claude -p) 자동화: CHANGELOG, unused-exports 보고서, 레슨 품질 보고서 생성

### Day 23

- `docs` — Claude Chat ↔ Claude Code 의사결정 매트릭스 작성
- `feat` — ml-basics/02-supervised-learning.json 추가 (lesson-pipeline + content-reviewer)

### Day 24

- `feat` — PWA 설정 (manifest, 아이콘, 오프라인 페이지)
- `chore` — @ducanh2912/next-pwa 도입, Turbopack 충돌 해소

### Day 25

- `feat` — security-reviewer subagent 전체 감사 (CRITICAL 1, HIGH 3 발견 및 수정)
- `docs` — README.md 전면 재작성 (환경변수, 배포 가이드, 프로젝트 구조)

### Day 26

- `feat` — SQLite → Turso 마이그레이션
- `chore` — GitHub 저장소 생성 및 Vercel 배포 완료
- 라이브 URL: https://ai-learning-app-guqe.vercel.app

### Day 27

- `feat` — Zod 입력 검증 추가 (login, register, generate 라우트)
- `feat` — IP 기반 rate limiter 추가 (1분/10회, 429 응답)
- `feat` — ml-basics 레슨 3편 추가 (손실 함수, 경사하강법, 과적합)
- `feat` — 한국어 커스텀 404 페이지 (app/not-found.tsx)
- `chore` — package.json에 lint 스크립트 추가

### Day 28

- `chore` — CHANGELOG 최종 업데이트, CLAUDE.md V2 계획 섹션 추가
- `release` — v1.0.0 MVP 첫 번째 릴리스 🎉
