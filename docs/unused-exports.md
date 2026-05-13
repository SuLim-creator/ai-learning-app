# Unused Exports Report

Generated: 2026-05-14

Export되었지만 프로젝트 내 어디서도 import되지 않은 함수/컴포넌트/타입 목록입니다.

---

## `components/ui/button.tsx`

| 이름             | 종류        | 비고                       |
| ---------------- | ----------- | -------------------------- |
| `Button`         | component   | export되었으나 import 없음 |
| `buttonVariants` | const (CVA) | export되었으나 import 없음 |

---

## `components/ui/card.tsx`

| 이름         | 종류      | 비고                       |
| ------------ | --------- | -------------------------- |
| `CardAction` | component | export되었으나 import 없음 |
| `CardFooter` | component | export되었으나 import 없음 |

---

## `lib/quiz.ts`

| 이름         | 종류      | 비고                                                              |
| ------------ | --------- | ----------------------------------------------------------------- |
| `QuizOption` | interface | export되었으나 직접 import 없음 (`ParsedQuiz` 안에 포함되어 있음) |
| `ParsedQuiz` | interface | export되었으나 `import type` 없음 (parseQuiz 함수만 사용됨)       |

---

## `lib/progress.ts`

| 이름               | 종류     | 비고                                               |
| ------------------ | -------- | -------------------------------------------------- |
| `getWeakestLesson` | function | 테스트 파일에서만 사용됨, 프로덕션 코드에서 미사용 |

---

## `lib/types/lesson.ts`

| 이름          | 종류      | 비고                       |
| ------------- | --------- | -------------------------- |
| `CourseStage` | interface | export되었으나 import 없음 |

---

## 요약

| 분류      | 개수                                          |
| --------- | --------------------------------------------- |
| Component | 3 (`Button`, `CardAction`, `CardFooter`)      |
| Const     | 1 (`buttonVariants`)                          |
| Interface | 3 (`QuizOption`, `ParsedQuiz`, `CourseStage`) |
| Function  | 1 (`getWeakestLesson` — 테스트 전용)          |
| **합계**  | **8**                                         |

---

## 권장 조치

- **Button, buttonVariants, CardAction, CardFooter**: UI 라이브러리 방식으로 미래 사용을 위해 export된 것으로 보임. 실제 사용처가 없으면 제거 또는 `internal` 처리 고려.
- **QuizOption, ParsedQuiz**: 타입 안전성을 위해 사용처에서 명시적으로 `import type` 추가 고려.
- **CourseStage**: 미사용이면 삭제 검토.
- **getWeakestLesson**: 프로덕션에서 사용하지 않는다면 테스트와 함께 제거 또는 향후 기능으로 활용.
