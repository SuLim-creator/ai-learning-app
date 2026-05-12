#!/bin/bash
# Claude Code 세션 시작 전 컨텍스트 주입 스크립트
# 사용법: source .claude/session-start.sh 또는 alias로 등록
echo "=== Git 컨텍스트 ==="
echo "브랜치: $(git branch --show-current)"
echo "마지막 커밋: $(git log -1 --pretty='%h %s')"
echo "변경 파일: $(git status --short | wc -l | tr -d ' ')개"
echo "===================="
