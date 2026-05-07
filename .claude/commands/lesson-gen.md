---
description: 새 레슨 JSON 콘텐츠 생성
allowed-tools: Read, Write
argument-hint: [레슨제목]
---

`$ARGUMENTS`를 레슨 제목으로 사용해 새 레슨 JSON을 생성하세요.

## 준비

1. `lib/types/lesson.ts` 읽어서 타입 구조 확인
2. `content/lessons/` 기존 JSON 파일 1개 읽어서 구조 참고
3. 저장할 적절한 경로와 파일명 결정 (예: `content/lessons/math-basics/04-xxx.json`)

## 콘텐츠 기준

- **대상**: 성인 학습자, AI/ML 입문자
- **분량**: 예상 5분 (estimatedMinutes: 5)
- **설명 방식**: 일상 비유 중심으로 직관적 설명
- **난이도**: 제목에 맞게 easy / medium / hard 판단
- **섹션 구성**:
  - `text` 섹션 2개 이상: 개념 설명 (마크다운 굵게/기울임 적극 활용)
  - `visual` 섹션 1개: 구체적 숫자 예시나 도식 설명
  - `quiz` 섹션 3개: 아래 형식 준수

## 퀴즈 형식 (content 필드)

```
Q: 질문 내용

A) 선택지1
B) 선택지2
C) 선택지3
D) 선택지4

정답: X) 정답 텍스트
해설: 왜 이 답이 맞는지 한 문장으로
```

## 출력

`lib/types/lesson.ts`의 `Lesson` 타입에 맞는 JSON을 생성해 파일로 저장하세요.
저장 후 파일 경로와 생성된 섹션 목록을 한국어로 보고하세요.
