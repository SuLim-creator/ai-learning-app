# AI 학습 앱

Claude AI가 생성하는 맞춤형 AI/ML 커리큘럼 학습 앱.

## 스택

- **Framework**: Next.js 16, App Router
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Database**: Prisma 7 + SQLite (libsql)
- **AI**: Claude API (`@anthropic-ai/sdk`)
- **PWA**: @ducanh2912/next-pwa

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local에 ANTHROPIC_API_KEY, DATABASE_URL 입력

# DB 마이그레이션 + 시드
pnpm prisma migrate dev
pnpm prisma db seed

# 개발 서버
pnpm dev
```

## 환경변수

Vercel 대시보드 또는 `.env.local`에 아래 변수를 설정합니다.

| 변수명              | 설명             | 예시            |
| ------------------- | ---------------- | --------------- |
| `ANTHROPIC_API_KEY` | Claude API 키    | `sk-ant-...`    |
| `DATABASE_URL`      | SQLite 파일 경로 | `file:./dev.db` |

> **주의**: `NEXT_PUBLIC_` 접두사 변수에 시크릿을 넣지 마세요. 클라이언트 번들에 포함됩니다.

## Vercel 배포

1. GitHub 저장소에 push
2. [vercel.com/new](https://vercel.com/new) 에서 저장소 연결
3. **Environment Variables** 탭에서 위 변수 입력
4. **Deploy** 클릭

> SQLite는 Vercel 서버리스 환경에서 파일 시스템이 읽기 전용이므로, 프로덕션에서는 [Turso](https://turso.tech) (libsql 호환) 또는 PostgreSQL로 전환을 권장합니다.

## 빌드 / 타입체크

```bash
pnpm build        # 프로덕션 빌드
npx tsc --noEmit  # 타입 체크
pnpm test         # 단위 테스트 (Vitest)
```

## 프로젝트 구조

```
app/          # Next.js App Router 페이지 및 API
  api/        # 인증, Claude API, 레슨 생성 엔드포인트
  components/ # 공유 UI 컴포넌트
  offline/    # PWA 오프라인 페이지
content/      # 레슨 JSON 파일
lib/          # 비즈니스 로직 (auth, prisma, progress 등)
public/       # 정적 파일 (manifest.json, 아이콘)
```
