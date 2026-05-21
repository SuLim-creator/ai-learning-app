import { getLessons } from "@/lib/lessons";
import { LessonCard } from "@/app/components/lesson-card";
import { StageProgressBar } from "@/app/components/stage-progress-bar";
import { HomeButton } from "@/app/components/home-button";

export default function KidsMlBasicsPage() {
  const lessons = getLessons("kids-ml-basics");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <div className="mb-4">
            <HomeButton />
          </div>
          <p className="mb-1 text-sm text-amber-300">🧒 초등학생용</p>
          <h1 className="mb-2 text-2xl font-bold text-white">
            머신러닝 첫걸음 — '패턴 찾기 게임' 으로 배워요
          </h1>
          <p className="text-sm text-gray-400">
            AI는 어떻게 사과와 바나나를 구별할까요? 패턴 찾기 게임처럼 배우는
            머신러닝의 시작!
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>{lessons.length}개 레슨</span>
            <span>·</span>
            <span>
              총 {lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0)}분
            </span>
          </div>

          <StageProgressBar lessonIds={lessons.map((l) => l.id)} />
        </div>

        {lessons.length === 0 ? (
          <p className="text-center text-gray-600">레슨이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                stage="kids/ml-basics"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
