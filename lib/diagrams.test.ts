import { describe, it, expect } from "vitest";
import { DIAGRAM_COMPONENTS } from "../app/components/diagrams/index";
import { getLesson } from "./lessons";

const NEW_DIAGRAM_KEYS = [
  "word-vector-space",
  "llm-pipeline",
  "rag-pipeline",
  "matrix-multiply",
  "normal-distribution",
];

const ALL_EXPECTED_KEYS = [
  "matrix-grid",
  "supervised-flow",
  "loss-curve",
  "gradient-descent-ball",
  "overfitting-curves",
  "neural-network-layers",
  "forward-backward-pass",
  "cnn-filter",
  "attention-map",
  "activation-functions",
  ...NEW_DIAGRAM_KEYS,
];

describe("DIAGRAM_COMPONENTS registry", () => {
  it("contains all expected diagram keys", () => {
    for (const key of ALL_EXPECTED_KEYS) {
      expect(
        DIAGRAM_COMPONENTS[key],
        `DIAGRAM_COMPONENTS missing key: "${key}"`,
      ).toBeDefined();
    }
  });

  it("all values are functions (React components)", () => {
    for (const [key, Component] of Object.entries(DIAGRAM_COMPONENTS)) {
      expect(typeof Component, `"${key}" should be a function`).toBe(
        "function",
      );
    }
  });
});

const REQUIRED_DIAGRAMS: Array<{
  slug: string;
  lessonId: string;
  sectionId: string;
  diagram: string;
}> = [
  // 기존 컴포넌트 재사용
  {
    slug: "math-basics",
    lessonId: "math-basics-04",
    sectionId: "s1",
    diagram: "matrix-grid",
  },
  {
    slug: "math-basics",
    lessonId: "math-basics-06",
    sectionId: "s1",
    diagram: "gradient-descent-ball",
  },
  {
    slug: "math-basics",
    lessonId: "math-basics-08",
    sectionId: "s1",
    diagram: "loss-curve",
  },
  // 신규 다이어그램
  {
    slug: "math-basics",
    lessonId: "math-basics-05",
    sectionId: "s1",
    diagram: "matrix-multiply",
  },
  {
    slug: "math-basics",
    lessonId: "math-basics-11",
    sectionId: "s1",
    diagram: "normal-distribution",
  },
  {
    slug: "nlp-basics",
    lessonId: "nlp-01",
    sectionId: "s1",
    diagram: "word-vector-space",
  },
  {
    slug: "nlp-basics",
    lessonId: "nlp-03",
    sectionId: "s1",
    diagram: "llm-pipeline",
  },
  {
    slug: "ai-apps",
    lessonId: "app-02",
    sectionId: "s1",
    diagram: "rag-pipeline",
  },
];

describe("lesson diagram assignments", () => {
  for (const { slug, lessonId, sectionId, diagram } of REQUIRED_DIAGRAMS) {
    it(`${lessonId}/${sectionId} has diagram "${diagram}"`, () => {
      const lesson = getLesson(slug, lessonId);
      expect(lesson, `lesson "${lessonId}" not found`).not.toBeNull();

      const section = lesson!.sections.find((s) => s.id === sectionId);
      expect(
        section,
        `section "${sectionId}" not found in "${lessonId}"`,
      ).toBeDefined();
      expect(section!.diagram).toBe(diagram);
    });
  }

  it("every diagram value in lessons maps to a known DIAGRAM_COMPONENTS key", () => {
    const allLessonRefs = [
      ...[
        "math-basics-04",
        "math-basics-05",
        "math-basics-06",
        "math-basics-07",
        "math-basics-08",
        "math-basics-11",
      ].map((id) => ({ slug: "math-basics", id })),
      ...["ml-basics-01", "ml-basics-02", "ml-basics-03", "ml-basics-04"].map(
        (id) => ({ slug: "ml-basics", id }),
      ),
      ...["dl-01", "dl-02", "dl-03"].map((id) => ({
        slug: "dl-basics",
        id,
      })),
      ...["nlp-01", "nlp-02", "nlp-03"].map((id) => ({
        slug: "nlp-basics",
        id,
      })),
      ...["app-01", "app-02", "app-03"].map((id) => ({
        slug: "ai-apps",
        id,
      })),
    ];

    for (const { slug, id } of allLessonRefs) {
      const lesson = getLesson(slug, id);
      if (!lesson) continue;
      for (const section of lesson.sections) {
        if (section.diagram) {
          expect(
            DIAGRAM_COMPONENTS[section.diagram],
            `"${id}" section "${section.id}": diagram key "${section.diagram}" not in registry`,
          ).toBeDefined();
        }
      }
    }
  });
});
