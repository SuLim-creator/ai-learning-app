import Link from "next/link";
import { getLessons } from "@/lib/lessons";

interface TrackCardProps {
  href: string;
  emoji: string;
  badge: string;
  title: string;
  subtitle: string;
  lessonCount: number;
  totalMinutes: number;
  accent: "indigo" | "amber";
}

function TrackCard({
  href,
  emoji,
  badge,
  title,
  subtitle,
  lessonCount,
  totalMinutes,
  accent,
}: TrackCardProps) {
  const accentClasses =
    accent === "indigo"
      ? {
          border: "border-indigo-700/40",
          hover:
            "hover:border-indigo-500 hover:bg-indigo-900/20 hover:shadow-indigo-900/30",
          badge: "bg-indigo-900/40 text-indigo-300",
          cta: "text-indigo-300 group-hover:text-indigo-200",
        }
      : {
          border: "border-amber-600/40",
          hover:
            "hover:border-amber-500 hover:bg-amber-900/20 hover:shadow-amber-900/30",
          badge: "bg-amber-900/40 text-amber-200",
          cta: "text-amber-200 group-hover:text-amber-100",
        };

  return (
    <Link
      href={href}
      className={`
        group flex flex-1 flex-col gap-5 rounded-2xl border bg-gray-900 p-8
        transition-all duration-200 hover:shadow-xl
        ${accentClasses.border} ${accentClasses.hover}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {emoji}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${accentClasses.badge}`}
        >
          {badge}
        </span>
      </div>

      <div>
        <h2 className="mb-2 text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm leading-relaxed text-gray-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>{lessonCount}개 레슨</span>
        <span>·</span>
        <span>약 {totalMinutes}분</span>
      </div>

      <div className={`mt-auto text-sm font-medium ${accentClasses.cta}`}>
        시작하기 →
      </div>
    </Link>
  );
}

export default function Home() {
  const adultLessons = getLessons("math-basics");
  const kidsLessons = getLessons("kids-math-basics");

  const adultCount = adultLessons.length;
  const adultMinutes = adultLessons.reduce(
    (acc, l) => acc + l.estimatedMinutes,
    0,
  );
  const kidsCount = kidsLessons.length;
  const kidsMinutes = kidsLessons.reduce(
    (acc, l) => acc + l.estimatedMinutes,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
            AI
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            AI 학습 앱
          </h1>
          <p className="text-base text-gray-400">
            어떤 코스로 시작할까요? 연령대에 맞는 코스를 골라보세요.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <TrackCard
            href="/learn/adult/math-basics"
            emoji="👨‍💼"
            badge="성인용"
            title="성인용 코스"
            subtitle="AI/ML을 위한 수학 기초 — 벡터, 행렬, 미분, 확률을 정공법으로 학습합니다."
            lessonCount={adultCount}
            totalMinutes={adultMinutes}
            accent="indigo"
          />
          <TrackCard
            href="/learn/kids/math-basics"
            emoji="🧒"
            badge="초등학생용"
            title="초등학생용 코스"
            subtitle="보물지도와 자판기로 배우는 AI 첫걸음. 게임처럼 즐겁게 시작해요!"
            lessonCount={kidsCount}
            totalMinutes={kidsMinutes}
            accent="amber"
          />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/learn/adult"
            className="text-sm text-gray-500 transition-colors hover:text-gray-300"
          >
            전체 커리큘럼 보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
