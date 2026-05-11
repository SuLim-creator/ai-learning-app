"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateProgress, getCompletedLessonIds } from "@/lib/progress";

interface Props {
  lessonIds: string[];
}

export function StageProgressBar({ lessonIds }: Props) {
  const [progress, setProgress] = useState({
    percentage: 0,
    completedCount: 0,
    totalCount: lessonIds.length,
  });

  // 배열 참조가 매 렌더마다 바뀌어도 내용이 같으면 effect가 재실행되지 않도록 안정화
  const lessonIdsKey = useMemo(() => lessonIds.join(","), [lessonIds]);

  useEffect(() => {
    const ids = lessonIdsKey.split(",").filter(Boolean);
    const completedIds = getCompletedLessonIds(ids);
    setProgress(calculateProgress(ids.length, completedIds));
  }, [lessonIdsKey]);

  return (
    <div className="mt-5">
      <div className="mb-1.5 flex items-center justify-between text-xs text-gray-500">
        <span>진행률</span>
        <span>
          {progress.completedCount} / {progress.totalCount} 완료
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
    </div>
  );
}
