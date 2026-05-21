import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import { AgeGroupNav } from "@/app/components/age-group-nav";

interface KidsTrack {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  contentDir: string;
}

const TRACKS: KidsTrack[] = [
  {
    slug: "math-basics",
    emoji: "🧮",
    title: "수학 첫걸음",
    subtitle: "보물찾기와 자판기로 벡터·행렬·함수를 만나봐요.",
    contentDir: "kids-math-basics",
  },
  {
    slug: "ml-basics",
    emoji: "🎯",
    title: "머신러닝 첫걸음",
    subtitle: "패턴 찾기 게임처럼 배우는 AI의 학습 원리.",
    contentDir: "kids-ml-basics",
  },
  {
    slug: "dl-basics",
    emoji: "🧠",
    title: "딥러닝 첫걸음",
    subtitle: "풍선 그물로 그리는 AI의 두뇌와 사진 인식.",
    contentDir: "kids-dl-basics",
  },
  {
    slug: "nlp-basics",
    emoji: "💬",
    title: "자연어 첫걸음",
    subtitle: "단어를 숫자로! 챗봇이 답을 만드는 비밀.",
    contentDir: "kids-nlp-basics",
  },
  {
    slug: "ai-apps",
    emoji: "🤖",
    title: "AI 활용 첫걸음",
    subtitle: "잘 부탁하기와 나만의 AI 도우미 만들기.",
    contentDir: "kids-ai-apps",
  },
];

export default function KidsHubPage() {
  const tracks = TRACKS.map((t) => {
    const lessons = getLessons(t.contentDir);
    return {
      ...t,
      lessonCount: lessons.length,
      totalMinutes: lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0),
    };
  });

  const totalLessons = tracks.reduce((acc, t) => acc + t.lessonCount, 0);
  const totalMinutes = tracks.reduce((acc, t) => acc + t.totalMinutes, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <div className="mb-6">
            <AgeGroupNav active="kids" />
          </div>
          <p className="mb-1 text-sm text-amber-300">🧒 초등학생용</p>
          <h1 className="mb-2 text-2xl font-bold text-white">
            AI 첫걸음 — 게임처럼 즐겁게 만나는 5개의 길
          </h1>
          <p className="text-sm text-gray-400">
            수학, 머신러닝, 딥러닝, 자연어, AI 활용까지. 좋아하는 트랙부터
            골라서 시작해 봐요!
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>{tracks.length}개 트랙</span>
            <span>·</span>
            <span>{totalLessons}개 레슨</span>
            <span>·</span>
            <span>총 {totalMinutes}분</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {tracks.map((track) => (
            <Link
              key={track.slug}
              href={`/learn/kids/${track.slug}`}
              className="group rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all duration-200 hover:border-amber-700/60 hover:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-amber-950/40 text-2xl">
                  {track.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="mb-1 text-base font-semibold text-white group-hover:text-amber-200">
                    {track.title}
                  </h2>
                  <p className="mb-2 text-sm leading-relaxed text-gray-400">
                    {track.subtitle}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {track.lessonCount > 0 ? (
                      <>
                        <span>{track.lessonCount}개 레슨</span>
                        <span>·</span>
                        <span>{track.totalMinutes}분</span>
                      </>
                    ) : (
                      <span className="text-gray-600">준비 중</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
