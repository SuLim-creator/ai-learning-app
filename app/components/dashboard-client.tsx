"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { HomeButton } from "@/app/components/home-button";
import { Lesson } from "@/lib/types/lesson";
import {
  getCompletedLessonIds,
  calculateStageProgress,
  getNextLesson,
} from "@/lib/progress";

interface Stage {
  id: string;
  title: string;
  stepLabel: string;
  lessons: Lesson[];
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
      <div
        className="h-full rounded-full bg-indigo-500 transition-all duration-700"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function StageCard({
  stage,
  completedIds,
}: {
  stage: Stage;
  completedIds: string[];
}) {
  const { percentage, completedCount, totalCount } = calculateStageProgress(
    stage.lessons,
    completedIds,
  );
  const next = getNextLesson(stage.lessons, completedIds);
  const done = completedCount === totalCount;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs text-indigo-400">{stage.stepLabel}</span>
          <h3 className="text-sm font-semibold text-white">{stage.title}</h3>
        </div>
        <span
          className={`text-xs font-bold ${done ? "text-emerald-400" : "text-gray-400"}`}
        >
          {completedCount} / {totalCount}
        </span>
      </div>
      <ProgressBar percentage={percentage} />
      {next && (
        <Link
          href={`/learn/${stage.id}/${next.id}`}
          className="mt-3 inline-block text-xs text-indigo-400 hover:underline"
        >
          다음: {next.title} →
        </Link>
      )}
      {done && <p className="mt-3 text-xs text-emerald-400">✓ 전체 완료</p>}
    </div>
  );
}

export function DashboardClient({ stages }: { stages: Stage[] }) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // stages prop이 바뀔 때만 재계산 — flatMap 중복 제거
  const allLessonsWithStage = useMemo(
    () =>
      stages.flatMap((s) =>
        s.lessons.map((l) => ({ ...l, stageId: s.id, stageTitle: s.title })),
      ),
    [stages],
  );

  const allLessonIds = useMemo(
    () => allLessonsWithStage.map((l) => l.id),
    [allLessonsWithStage],
  );

  useEffect(() => {
    setCompletedIds(getCompletedLessonIds(allLessonIds));
  }, [allLessonIds]);

  const totalLessons = allLessonIds.length;
  const totalCompleted = completedIds.length;
  const overallPct =
    totalLessons === 0 ? 0 : Math.round((totalCompleted / totalLessons) * 100);

  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);

  const recentLessons = useMemo(
    () =>
      allLessonsWithStage
        .filter((l) => completedSet.has(l.id))
        .slice(-3)
        .reverse(),
    [allLessonsWithStage, completedSet],
  );

  const nextRecommended = useMemo(
    () => allLessonsWithStage.find((l) => !completedSet.has(l.id)),
    [allLessonsWithStage, completedSet],
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="mb-4">
            <HomeButton />
          </div>
          <h1 className="mb-1 text-2xl font-bold text-white">학습 대시보드</h1>
          <p className="text-sm text-gray-400">나의 AI 학습 현황</p>
        </div>

        {/* 전체 진행률 */}
        <div className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-3 flex items-end justify-between">
            <span className="text-sm font-medium text-gray-300">
              전체 진행률
            </span>
            <span className="text-2xl font-bold text-indigo-400">
              {overallPct}%
            </span>
          </div>
          <ProgressBar percentage={overallPct} />
          <p className="mt-2 text-xs text-gray-500">
            {totalCompleted} / {totalLessons}개 레슨 완료
          </p>
        </div>

        {/* 추천 다음 레슨 */}
        {nextRecommended && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-300">
              다음 추천 레슨
            </h2>
            <Link
              href={`/learn/${nextRecommended.stageId}/${nextRecommended.id}`}
              className="block rounded-xl border border-indigo-800 bg-indigo-950/30 p-4 transition-colors hover:bg-indigo-950/50"
            >
              <p className="text-xs text-indigo-400">
                {nextRecommended.stageTitle}
              </p>
              <p className="mt-1 font-medium text-white">
                {nextRecommended.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                예상 {nextRecommended.estimatedMinutes}분 ·{" "}
                {
                  { easy: "쉬움", medium: "보통", hard: "어려움" }[
                    nextRecommended.difficulty
                  ]
                }
              </p>
            </Link>
          </div>
        )}

        {/* 최근 학습한 레슨 */}
        {recentLessons.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-300">
              최근 학습
            </h2>
            <div className="flex flex-col gap-2">
              {recentLessons.map((l) => (
                <Link
                  key={l.id}
                  href={`/learn/${l.stageId}/${l.id}`}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm hover:border-gray-700"
                >
                  <span className="text-gray-200">{l.title}</span>
                  <span className="text-xs text-emerald-500">완료 ✓</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 단계별 진행 현황 */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-300">
            단계별 현황
          </h2>
          <div className="flex flex-col gap-3">
            {stages.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                completedIds={completedIds}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
