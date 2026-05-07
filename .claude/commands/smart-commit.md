---
description: 변경사항 확인 후 Conventional Commits 메시지로 커밋
allowed-tools: Bash(git add*), Bash(git status*), Bash(git diff*), Bash(git commit*)
---

아래 순서대로 실행하세요.

1. `git status`로 변경된 파일 목록 확인
2. `git diff`와 `git diff --staged`로 실제 변경 내용 파악
3. 변경 내용을 분석해 Conventional Commits 형식의 커밋 메시지 작성
4. 관련 파일을 스테이징하고 커밋

## Conventional Commits 규칙

- `feat:` 새 기능
- `fix:` 버그 수정
- `chore:` 빌드, 설정, 패키지 변경
- `refactor:` 기능 변경 없는 코드 개선
- `docs:` 문서 변경
- `style:` 포맷, 세미콜론 등 코드 의미 없는 변경
- `test:` 테스트 추가/수정

## 규칙

- 메시지는 영어로 작성
- 제목은 50자 이내, 마침표 없음
- 본문이 필요하면 빈 줄 후 한국어로 추가 설명 가능
- `git push`는 절대 하지 않음
- 커밋 후 커밋 해시와 메시지를 한국어로 보고
