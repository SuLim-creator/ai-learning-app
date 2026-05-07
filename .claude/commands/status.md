---
description: 현재 프로젝트 상태 요약
allowed-tools: Read, Bash(git log*), Bash(git status), Glob
---

프로젝트 현재 상태를 아래 항목 순서대로 요약해서 한국어로 보고하세요.

## 1. Git 상태

- `git status`로 uncommitted 변경사항 확인
- `git log --oneline -5`로 최근 5개 커밋 나열

## 2. 파일 구조

`app/`, `lib/`, `content/`, `.claude/` 주요 파일 트리를 요약해서 보여주세요.

## 3. TODO 주석

코드 내 `TODO`, `FIXME`, `HACK` 주석을 파일:라인 형태로 나열하세요.

## 4. 빌드 가능 여부

`docs/session-state.json`의 최근 빌드 결과를 참고해 현재 빌드 가능 여부를 판단하세요.
(빌드를 직접 실행하지 않음)

## 출력 형식

```
## 프로젝트 상태 — YYYY-MM-DD

### Git
- 브랜치: ...
- 미커밋 변경: ...
- 최근 커밋: ...

### 주요 파일
...

### TODO/FIXME
...

### 빌드
...
```
