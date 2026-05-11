---
name: pre-deploy
description: 배포 전 전체 품질 체크. '배포', 'deploy', '릴리스'에 트리거.
allowed-tools: Read, Grep, Glob, Bash(npm run *), Bash(pnpm *)
---

배포 전 품질 게이트를 순서대로 실행하고 한국어 보고서로 결과를 정리한다.

## 체크 순서

1. **빌드**: `pnpm build` — 빌드 에러 확인
2. **타입**: `pnpm tsc --noEmit` — 타입 에러 확인
3. **린트**: `pnpm lint` — 린트 에러 확인
4. **console.log 잔재**: `grep -r "console.log" app/ lib/` 검색
5. **.env 보안**: `.env`가 `.gitignore`에 포함되어 있는지 확인
6. **TODO 목록**: `grep -r "TODO\|FIXME\|HACK" app/ lib/` 검색

## 보고서 형식

```
## 배포 전 체크 결과

| 항목 | 상태 | 내용 |
|------|------|------|
| 빌드 | ✅/❌ | ... |
| 타입 | ✅/❌ | ... |
| 린트 | ✅/❌ | ... |
| console.log | ✅/⚠️ | N개 발견 |
| .env 보안 | ✅/❌ | ... |
| TODO | ✅/⚠️ | N개 발견 |

### 결론
배포 가능 / 배포 불가 (이유)
```

모든 항목 통과 시에만 "배포 가능" 판정.
