import { describe, it, expect } from "vitest";
import {
  calculateProgress,
  getWeakestLesson,
  getNextLessonAcrossCurriculum,
} from "./progress";
import type { LessonMeta } from "@/lib/types/lesson";
import type { CurriculumStage } from "./curriculum";

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

const makeMeta = (id: string): LessonMeta => ({
  id,
  title: id,
  difficulty: "easy",
  estimatedMinutes: 10,
  tags: [],
});

describe("getWeakestLesson", () => {
  it("퀴즈 점수가 가장 낮은 레슨을 반환한다", () => {
    const lessons = [makeMeta("l1"), makeMeta("l2"), makeMeta("l3")];
    const scores = { l1: 100, l2: 40, l3: 70 };
    expect(getWeakestLesson(lessons, scores)?.id).toBe("l2");
  });

  it("점수가 없는 레슨은 0점으로 간주한다", () => {
    const lessons = [makeMeta("l1"), makeMeta("l2")];
    const scores = { l1: 80 };
    expect(getWeakestLesson(lessons, scores)?.id).toBe("l2");
  });

  it("레슨이 없으면 null을 반환한다", () => {
    expect(getWeakestLesson([], {})).toBeNull();
  });

  it("동점이면 먼저 나오는 레슨을 반환한다", () => {
    const lessons = [makeMeta("l1"), makeMeta("l2")];
    const scores = { l1: 50, l2: 50 };
    expect(getWeakestLesson(lessons, scores)?.id).toBe("l1");
  });
});

const makeStage = (id: number, lessonIds: string[]): CurriculumStage => ({
  id,
  title: `Stage ${id}`,
  description: "",
  slug: `stage-${id}`,
  lessons: lessonIds.map((lid) => ({
    id: lid,
    title: lid,
    difficulty: "easy" as const,
  })),
});

describe("getNextLessonAcrossCurriculum", () => {
  const curriculum = [
    makeStage(1, ["l1-a", "l1-b"]),
    makeStage(2, ["l2-a", "l2-b"]),
  ];

  it("완료된 레슨이 없으면 1단계 첫 번째 레슨을 반환한다", () => {
    const result = getNextLessonAcrossCurriculum(curriculum, []);
    expect(result?.lesson.id).toBe("l1-a");
    expect(result?.stage.id).toBe(1);
  });

  it("1단계 전체 완료 시 2단계 첫 번째 레슨을 반환한다", () => {
    const result = getNextLessonAcrossCurriculum(curriculum, ["l1-a", "l1-b"]);
    expect(result?.lesson.id).toBe("l2-a");
    expect(result?.stage.id).toBe(2);
  });

  it("전체 완료 시 null을 반환한다", () => {
    const result = getNextLessonAcrossCurriculum(curriculum, [
      "l1-a",
      "l1-b",
      "l2-a",
      "l2-b",
    ]);
    expect(result).toBeNull();
  });
});
