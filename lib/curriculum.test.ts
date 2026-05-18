import { describe, it, expect } from "vitest";
import { CURRICULUM } from "./curriculum";
import { getLesson } from "./lessons";

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
});
