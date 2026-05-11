---
name: commit
description: 변경사항을 확인하고 Conventional Commits 메시지로 커밋.
  'commit', '커밋', '변경사항 저장' 등의 표현에 자동 트리거.
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*)
---

변경사항 확인 → Conventional Commits 형식 메시지 생성 → 커밋.
push는 하지 않음.

## 순서

1. `git status`로 변경 파일 목록 확인
2. `git diff` 로 실제 변경 내용 파악
3. 변경 내용을 분석해 Conventional Commits 메시지 작성
   - feat: 새 기능
   - fix: 버그 수정
   - chore: 설정/문서/빌드
   - refactor: 리팩토링
   - test: 테스트
4. `git add` 관련 파일 스테이징
5. `git commit` 실행

## 규칙

- 커밋 메시지는 영어
- push는 절대 하지 않음
- 파괴적 변경(rm, reset --hard 등) 금지
- Co-Authored-By 라인 포함:
  `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
