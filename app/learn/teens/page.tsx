import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import { AgeGroupNav } from "@/app/components/age-group-nav";

interface TeensTrack {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  contentDir: string;
}

const TRACKS: TeensTrack[] = [
  {
    slug: "math-basics",
    emoji: "🧮",
    title: "수학 기초",
    subtitle: "게임 좌표·픽셀·코드로 익히는 벡터·행렬·함수.",
    contentDir: "teens-math-basics",
  },
  {
    slug: "ml-basics",
    emoji: "🎯",
    title: "머신러닝 기초",
    subtitle: "지도학습 · 손실 함수 · 경사하강법의 직관을 잡아요.",
    contentDir: "teens-ml-basics",
  },
  {
    slug: "dl-basics",
    emoji: "🧠",
    title: "딥러닝 기초",
    subtitle: "퍼셉트론에서 CNN까지, 신경망이 깊어지는 이유.",
    contentDir: "teens-dl-basics",
  },
  {
    slug: "nlp-basics",
    emoji: "💬",
    title: "NLP / LLM 기초",
    subtitle: "임베딩과 트랜스포머, ChatGPT의 작동 원리.",
    contentDir: "teens-nlp-basics",
  },
  {
    slug: "ai-apps",
    emoji: "🤖",
    title: "AI 앱 만들기",
    subtitle: "프롬프트 엔지니어링과 RAG로 시작하는 AI 앱.",
    contentDir: "teens-ai-apps",
  },
];

export default function TeensHubPage() {
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
            <AgeGroupNav active="teens" />
          </div>
          <p className="mb-1 text-sm text-sky-300">🧑‍🎓 중고등학생용</p>
          <h1 className="mb-2 text-2xl font-bold text-white">
            AI/ML 기초 — 5개 트랙으로 잡는 큰 그림
          </h1>
          <p className="text-sm text-gray-400">
            수학·머신러닝·딥러닝·자연어·AI 앱까지. 게임/코드/이미지 예시로
            중고등 수준 수식을 살짝 곁들여 익혀요.
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
              href={`/learn/teens/${track.slug}`}
              className="group rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all duration-200 hover:border-sky-700/60 hover:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-sky-950/40 text-2xl">
                  {track.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="mb-1 text-base font-semibold text-white group-hover:text-sky-200">
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
