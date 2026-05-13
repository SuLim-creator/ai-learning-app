import type { LessonMeta } from "@/lib/types/lesson";

export function calculateProgress(
  totalCount: number,
  completedIds: string[],
): { percentage: number; completedCount: number; totalCount: number } {
  const completedCount = completedIds.length;
  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  return { percentage, completedCount, totalCount };
}

export function calculateStageProgress(
  lessons: LessonMeta[],
  completedIds: string[],
) {
  const completedSet = new Set(completedIds);
  return calculateProgress(
    lessons.length,
    lessons.map((l) => l.id).filter((id) => completedSet.has(id)),
  );
}

export function getNextLesson(
  lessons: LessonMeta[],
  completedIds: string[],
): LessonMeta | null {
  const completedSet = new Set(completedIds);
  return lessons.find((l) => !completedSet.has(l.id)) ?? null;
}

// localStorage 기반 완료 상태 관리 (DB 연동 전 클라이언트 임시 저장)
const STORAGE_KEY = (lessonId: string) => `lesson-complete-${lessonId}`;

export function markLessonComplete(lessonId: string): void {
  localStorage.setItem(STORAGE_KEY(lessonId), "true");
}

export function unmarkLessonComplete(lessonId: string): void {
  localStorage.removeItem(STORAGE_KEY(lessonId));
}

export function isLessonComplete(lessonId: string): boolean {
  return localStorage.getItem(STORAGE_KEY(lessonId)) === "true";
}

export function getCompletedLessonIds(lessonIds: string[]): string[] {
  return lessonIds.filter((id) => isLessonComplete(id));
}

export function getWeakestLesson(
  lessons: LessonMeta[],
  scores: Record<string, number>,
): LessonMeta | null {
  if (lessons.length === 0) return null;
  return lessons.reduce((weakest, lesson) => {
    const score = scores[lesson.id] ?? 0;
    const weakestScore = scores[weakest.id] ?? 0;
    return score < weakestScore ? lesson : weakest;
  });
}
