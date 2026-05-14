# Claude Chat ↔ Claude Code 의사결정 매트릭스

| 작업                 | 도구                                 |
| -------------------- | ------------------------------------ |
| PRD, 스펙 작성       | Claude Chat (Project)                |
| 라이브러리 비교 조사 | Claude Chat (Research)               |
| UI 프로토타입        | Claude Chat (Artifacts)              |
| 코드 구현            | Claude Code (Plan → 구현)            |
| 디버깅               | Claude Code (에러 붙여넣기)          |
| 10파일 이상 리팩토링 | Claude Code (Subagent + Worktree)    |
| 커밋/배포            | Claude Code (Skills)                 |
| 아키텍처 결정 기록   | 둘 다: Chat에서 초안 → Code에서 커밋 |

## 판단 기준

- **결과물이 로컬 파일/터미널에 저장·실행되어야 하는가** → Claude Code
- **탐색·비교·초안처럼 일회성 사고가 필요한가** → Claude Chat
- **아키텍처·스펙처럼 결정 과정도 중요한가** → Chat 초안 → Code 커밋
