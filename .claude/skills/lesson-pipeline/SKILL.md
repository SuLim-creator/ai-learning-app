---
name: lesson-pipeline
description: 새 레슨 콘텐츠 생성부터 검수까지 자동 파이프라인.
  '레슨 만들어', '새 레슨', 'lesson' 등에 트리거.
allowed-tools: Read, Write, Bash(npm run test:*), Bash(pnpm *)
argument-hint: [레슨 제목]
---

주어진 제목의 레슨을 생성하고, 검수하고, 저장하는 전체 파이프라인을 실행한다.

## 파이프라인 순서

### 1단계: 기존 구조 파악

- `lib/types/lesson.ts` 읽기 — 타입 정의 확인
- `content/lessons/math-basics/01-what-is-vector.json` 읽기 — 구조 참고

### 2단계: 레슨 JSON 생성

다음 규칙을 따라 생성:

- 대상: 성인 비전공자 (쉬운 비유 사용)
- 섹션 구성: text → visual → interactive → quiz
- 퀴즈: 3개 이상, 오답 보기는 실제 학습자 실수 패턴 반영
- 파일명: `content/lessons/math-basics/0N-<kebab-title>.json`
- id: `math-basics-0N` (기존 파일 수 + 1)

### 3단계: content-reviewer subagent로 자동 검수

생성된 파일을 content-reviewer에게 전달해 검수 요청:

- 사실 오류 확인
- 비유 적절성 확인
- 난이도 확인
- 퀴즈 오답 보기 확인

### 4단계: 검수 결과에 따라 수정

- APPROVED → 그대로 저장
- CONDITIONAL APPROVAL → 지적된 항목 수정 후 저장

### 5단계: 타입체크

`pnpm tsc --noEmit` 실행 — 통과 확인

### 6단계: 결과 보고

- 생성된 파일 경로
- 검수 결과 요약
- 타입체크 결과
