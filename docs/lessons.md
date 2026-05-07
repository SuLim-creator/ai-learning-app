# Claude가 자주 틀리는 것

(발견할 때마다 여기에 추가)

## 2026-05-08 — Slash Command 이름 충돌

`review`는 Claude Code 내장 커맨드와 충돌함.
커스텀 커맨드 이름을 `code-review.md`로 변경할 것.
→ `.claude/commands/review.md` → `.claude/commands/code-review.md`

## 2026-05-08 — typecheck-fix 커맨드 작동 안 한 이유

**원인**: `allowed-tools`에 존재하지 않는 툴 이름 `MultiEdit` 사용.
Claude Code의 실제 툴 이름은 `Edit` (`FileEditInput`)이며 `MultiEdit`는 없음.
잘못된 툴 이름이 `allowed-tools`에 있으면 커맨드가 해당 툴을 사용할 수 없어 동작 실패.

**해결**: `MultiEdit` → `Edit` 로 수정. pnpm 환경을 위해 `Bash(pnpm*)` 도 추가.

**교훈**: `allowed-tools`에 쓸 수 있는 툴 이름은 `Bash`, `Read`, `Edit`, `Write`, `Glob`, `Grep`, `WebFetch`, `WebSearch` 등 실제 존재하는 이름만 사용할 것.

## 2026-05-08 — 커스텀 커맨드 Unknown command 오류

**증상**: `/commit`, `/lesson-gen`, `/status` 입력 시 Unknown command 오류.

**원인 1 — 이름 변경 미인지**
`/commit`과 `/status`는 플러그인 충돌로 이미 rename됨.
올바른 이름: `/smart-commit`, `/project-status`.

**원인 2 — 세션 재시작 필요**
Claude Code는 세션 시작 시점에 `.claude/commands/` 디렉토리를 로드함.
해당 디렉토리가 세션 시작 후 새로 생성됐거나, 파일이 추가된 경우
**Claude Code를 재시작해야 새 커맨드가 인식됨**.

**해결**: Claude Code 재시작 후 새 이름으로 실행.

- `/cr` — 코드 리뷰
- `/smart-commit` — Conventional Commits 커밋
- `/project-status` — 프로젝트 상태 요약
- `/typecheck-fix` — 타입 에러 자동 수정
- `/lesson-gen [제목]` — 레슨 JSON 생성
