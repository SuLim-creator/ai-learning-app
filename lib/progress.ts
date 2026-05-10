export function calculateProgress(
  totalCount: number,
  completedIds: string[],
): { percentage: number; completedCount: number; totalCount: number } {
  const completedCount = completedIds.length;
  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  return { percentage, completedCount, totalCount };
}
