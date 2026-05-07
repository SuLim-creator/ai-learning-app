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
