import { getLessons } from "@/lib/lessons";
import { LessonCard } from "@/app/components/lesson-card";
import { StageProgressBar } from "@/app/components/stage-progress-bar";

export default function MlBasicsPage() {
  const lessons = getLessons("ml-basics");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <p className="mb-1 text-sm text-indigo-400">2단계</p>
          <h1 className="mb-2 text-2xl font-bold text-white">머신러닝 기초</h1>
          <p className="text-sm text-gray-400">
            핵심 ML 알고리즘을 직관적으로 이해합니다.
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
                stage="ml-basics"
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
