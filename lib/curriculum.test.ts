import { describe, it, expect } from "vitest";
import { CURRICULUM } from "./curriculum";
import { getLesson, getLessons } from "./lessons";

describe("CURRICULUM lesson IDs", () => {
  it("each lesson ID in CURRICULUM must exist in the content files", () => {
    for (const stage of CURRICULUM) {
      for (const lesson of stage.lessons) {
        const found = getLesson(stage.slug, lesson.id);
        expect(
          found,
          `Stage "${stage.slug}" lesson "${lesson.id}" not found in content files`,
        ).not.toBeNull();
      }
    }
  });

  it("every content lesson must be listed in CURRICULUM (bidirectional sync)", () => {
    for (const stage of CURRICULUM) {
      const contentLessons = getLessons(stage.slug);
      const curriculumIds = new Set(stage.lessons.map((l) => l.id));
      for (const contentLesson of contentLessons) {
        expect(
          curriculumIds.has(contentLesson.id),
          `Stage "${stage.slug}" has content file with id "${contentLesson.id}" ("${contentLesson.title}") but CURRICULUM does not list it`,
        ).toBe(true);
      }
    }
  });

  it("CURRICULUM title and difficulty must match the content JSON", () => {
    for (const stage of CURRICULUM) {
      for (const lesson of stage.lessons) {
        const content = getLesson(stage.slug, lesson.id);
        if (!content) continue;
        expect(
          lesson.title,
          `Stage "${stage.slug}" lesson "${lesson.id}": curriculum title "${lesson.title}" does not match content title "${content.title}"`,
        ).toBe(content.title);
        expect(
          lesson.difficulty,
          `Stage "${stage.slug}" lesson "${lesson.id}": curriculum difficulty "${lesson.difficulty}" does not match content difficulty "${content.difficulty}"`,
        ).toBe(content.difficulty);
      }
    }
  });

  it("no two content files in the same stage share an id", () => {
    for (const stage of CURRICULUM) {
      const contentLessons = getLessons(stage.slug);
      const seen = new Map<string, string>();
      for (const lesson of contentLessons) {
        const prev = seen.get(lesson.id);
        expect(
          prev,
          `Stage "${stage.slug}" has duplicate id "${lesson.id}" (already used by "${prev}", also used by "${lesson.title}")`,
        ).toBeUndefined();
        seen.set(lesson.id, lesson.title);
      }
    }
  });
});
