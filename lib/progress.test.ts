import { describe, it, expect } from "vitest";
import { calculateProgress } from "./progress";

describe("calculateProgress", () => {
  it("일부 레슨이 완료된 경우 올바른 진행률을 반환한다", () => {
    const result = calculateProgress(5, ["lesson-1", "lesson-2"]);
    expect(result).toEqual({
      percentage: 40,
      completedCount: 2,
      totalCount: 5,
    });
  });

  it("완료된 레슨이 없으면 percentage 0을 반환한다", () => {
    const result = calculateProgress(5, []);
    expect(result).toEqual({
      percentage: 0,
      completedCount: 0,
      totalCount: 5,
    });
  });

  it("모든 레슨이 완료되면 percentage 100을 반환한다", () => {
    const result = calculateProgress(3, ["lesson-1", "lesson-2", "lesson-3"]);
    expect(result).toEqual({
      percentage: 100,
      completedCount: 3,
      totalCount: 3,
    });
  });

  it("총 레슨 수가 0이면 percentage 0을 반환한다", () => {
    const result = calculateProgress(0, []);
    expect(result).toEqual({
      percentage: 0,
      completedCount: 0,
      totalCount: 0,
    });
  });
});
