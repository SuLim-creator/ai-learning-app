import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import { TrackSelector, type TrackInfo } from "@/app/components/track-selector";

export default function Home() {
  const kidsLessons = getLessons("kids-math-basics");
  const teensLessons = getLessons("teens-math-basics");
  const adultLessons = getLessons("math-basics");

  const sum = (acc: number, l: { estimatedMinutes: number }) =>
    acc + l.estimatedMinutes;

  const tracks: TrackInfo[] = [
    {
      id: "kids",
      emoji: "🧒",
      shortLabel: "초등",
      badge: "초등학생용",
      title: "초등학생용 코스",
      subtitle:
        "보물지도와 자판기로 배우는 AI 첫걸음. 게임처럼 즐겁게 시작해요!",
      href: "/learn/kids",
      lessonCount: kidsLessons.length,
      totalMinutes: kidsLessons.reduce(sum, 0),
      accent: "amber",
    },
    {
      id: "teens",
      emoji: "🧑‍🎓",
      shortLabel: "중고등",
      badge: "중고등학생용",
      title: "중고등학생용 코스",
      subtitle:
        "게임 좌표, 이미지 픽셀, 프로그래밍 함수로 익히는 AI 수학 기초. 좌표·간단한 수식을 살짝 곁들여요.",
      href: "/learn/teens",
      lessonCount: teensLessons.length,
      totalMinutes: teensLessons.reduce(sum, 0),
      accent: "sky",
    },
    {
      id: "adult",
      emoji: "👨‍💼",
      shortLabel: "성인",
      badge: "성인용",
      title: "성인용 코스",
      subtitle:
        "AI/ML을 위한 수학 기초 — 벡터, 행렬, 미분, 확률을 정공법으로 학습합니다.",
      href: "/learn/adult",
      lessonCount: adultLessons.length,
      totalMinutes: adultLessons.reduce(sum, 0),
      accent: "indigo",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold">
            AI
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            AI 학습 앱
          </h1>
          <p className="text-base text-gray-400">
            어떤 코스로 시작할까요? 연령대를 선택하면 그에 맞춘 설명·시각화로
            진행돼요.
          </p>
        </div>

        <TrackSelector tracks={tracks} defaultId="adult" />

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
