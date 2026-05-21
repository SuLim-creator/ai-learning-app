"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StageCard } from "@/app/components/stage-card";
import { WrongAnswerNote } from "@/app/components/wrong-answer-note";
import { AgeGroupNav } from "@/app/components/age-group-nav";
import {
  CURRICULUM,
  type CurriculumLesson,
  type CurriculumStage,
} from "@/lib/curriculum";
import {
  getCompletedLessonIds,
  getNextLessonAcrossCurriculum,
} from "@/lib/progress";

type Lesson = CurriculumLesson;
type Stage = CurriculumStage;

const STAGE_SLUGS: Record<number, string> = Object.fromEntries(
  CURRICULUM.map((s) => [s.id, s.slug]),
);

export default function AdultHub() {
  const router = useRouter();
  const [expandedStages, setExpandedStages] = useState<Set<number>>(
    new Set([1]),
  );
  const [selectedLesson, setSelectedLesson] = useState<{
    stage: Stage;
    lesson: Lesson;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nextLesson, setNextLesson] = useState<{
    stage: Stage;
    lesson: Lesson;
  } | null>(null);

  useEffect(() => {
    const allIds = CURRICULUM.flatMap((s) => s.lessons.map((l) => l.id));
    const completed = getCompletedLessonIds(allIds);
    setNextLesson(getNextLessonAcrossCurriculum(CURRICULUM, completed));
  }, []);

  function toggleStage(stageId: number) {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      return next;
    });
  }

  function selectLesson(stage: Stage, lesson: Lesson) {
    setSelectedLesson({ stage, lesson });
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-72 bg-gray-900 border-r border-gray-800
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-gray-800">
          <Link href="/learn/adult" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <span className="font-semibold text-white">AI 학습 앱</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            👨‍💼 성인용 · 5단계 AI/ML 커리큘럼
          </p>
          <AgeGroupNav active="adult" />
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {CURRICULUM.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isExpanded={expandedStages.has(stage.id)}
              selectedLessonId={selectedLesson?.lesson.id}
              onToggle={() => toggleStage(stage.id)}
              onSelectLesson={selectLesson}
            />
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800 flex flex-col gap-2">
          {nextLesson && (
            <button
              onClick={() =>
                router.push(
                  `/learn/adult/${STAGE_SLUGS[nextLesson.stage.id]}/${nextLesson.lesson.id}`,
                )
              }
              className="w-full px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors text-left"
            >
              <div>▶ 이어서 학습하기</div>
              <div className="text-xs text-indigo-200 font-normal mt-0.5 truncate">
                {nextLesson.lesson.title}
              </div>
            </button>
          )}
          <WrongAnswerNote />
          <p className="text-xs text-gray-600 px-1">
            {CURRICULUM.reduce((acc, s) => acc + s.lessons.length, 0)}개 레슨 ·
            5단계
          </p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center gap-3 px-4 h-14 border-b border-gray-800 flex-shrink-0">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <div className="w-5 h-0.5 bg-gray-400 mb-1" />
            <div className="w-5 h-0.5 bg-gray-400 mb-1" />
            <div className="w-5 h-0.5 bg-gray-400" />
          </button>
          <span className="text-sm text-gray-500">
            {selectedLesson
              ? `${selectedLesson.stage.title} › ${selectedLesson.lesson.title}`
              : "레슨을 선택하세요"}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {selectedLesson ? (
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{selectedLesson.stage.title}</span>
                  <span>›</span>
                  <span
                    className={
                      {
                        easy: "text-emerald-400",
                        medium: "text-yellow-400",
                        hard: "text-red-400",
                      }[selectedLesson.lesson.difficulty]
                    }
                  >
                    {
                      { easy: "쉬움", medium: "보통", hard: "어려움" }[
                        selectedLesson.lesson.difficulty
                      ]
                    }
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {selectedLesson.lesson.title}
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                  이 레슨에서는 {selectedLesson.lesson.title}에 대해 배웁니다.
                  Claude AI가 여러분의 수준에 맞춰 콘텐츠를 실시간으로
                  생성합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    router.push(
                      `/learn/adult/${STAGE_SLUGS[selectedLesson.stage.id]}/${selectedLesson.lesson.id}`,
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                >
                  <span>▶</span>
                  학습 시작
                </button>
                <button
                  onClick={() =>
                    router.push(
                      `/learn/adult/${STAGE_SLUGS[selectedLesson.stage.id]}/${selectedLesson.lesson.id}?regenerate=1`,
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition-colors border border-gray-700"
                >
                  <span>✦</span>
                  새로 생성
                </button>
              </div>

              <div className="mt-10 rounded-xl border border-gray-800 bg-gray-900 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-sm text-gray-500">콘텐츠 미리보기</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-800 rounded w-5/6" />
                  <div className="h-4 bg-gray-800 rounded w-2/3" />
                </div>
                <p className="text-center text-gray-600 text-sm mt-6">
                  학습 시작 버튼을 누르면 Claude AI가 콘텐츠를 생성합니다
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-3xl mb-6">
                🤖
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                AI 학습을 시작하세요
              </h2>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                좌측 커리큘럼에서 레슨을 선택하면 Claude AI가 여러분 수준에 맞춘
                학습 콘텐츠를 실시간으로 생성합니다.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                {[
                  "수학 기초",
                  "머신러닝",
                  "딥러닝",
                  "NLP",
                  "AI 응용",
                  "5단계",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
