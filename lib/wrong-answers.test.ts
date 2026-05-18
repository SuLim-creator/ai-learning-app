// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getWrongAnswers,
  saveWrongAnswer,
  removeWrongAnswer,
  clearWrongAnswers,
  type WrongAnswer,
} from "./wrong-answers";

const MOCK_ANSWER: Omit<WrongAnswer, "id" | "savedAt"> = {
  lessonId: "math-basics-01",
  lessonTitle: "벡터란 무엇인가",
  question: "벡터란 무엇인가?",
  options: [
    { key: "A", text: "크기와 방향을 가진 양" },
    { key: "B", text: "크기만 있는 양" },
  ],
  selectedKey: "B",
  correctKey: "A",
  explanation: "벡터는 크기와 방향을 모두 가집니다.",
};

beforeEach(() => {
  localStorage.clear();
});

describe("getWrongAnswers", () => {
  it("저장된 오답이 없으면 빈 배열을 반환한다", () => {
    expect(getWrongAnswers()).toEqual([]);
  });

  it("저장된 오답 목록을 반환한다", () => {
    localStorage.setItem(
      "wrong-answers",
      JSON.stringify([{ ...MOCK_ANSWER, id: "1", savedAt: "2026-01-01" }]),
    );
    const result = getWrongAnswers();
    expect(result).toHaveLength(1);
    expect(result[0].lessonId).toBe("math-basics-01");
  });
});

describe("saveWrongAnswer", () => {
  it("오답을 저장하고 조회할 수 있다", () => {
    saveWrongAnswer(MOCK_ANSWER);
    const result = getWrongAnswers();
    expect(result).toHaveLength(1);
    expect(result[0].question).toBe(MOCK_ANSWER.question);
    expect(result[0].id).toBeTruthy();
    expect(result[0].savedAt).toBeTruthy();
  });

  it("같은 레슨+질문의 오답을 중복 저장하지 않는다", () => {
    saveWrongAnswer(MOCK_ANSWER);
    saveWrongAnswer(MOCK_ANSWER);
    expect(getWrongAnswers()).toHaveLength(1);
  });

  it("다른 레슨의 오답은 별도로 저장된다", () => {
    saveWrongAnswer(MOCK_ANSWER);
    saveWrongAnswer({ ...MOCK_ANSWER, lessonId: "math-basics-02" });
    expect(getWrongAnswers()).toHaveLength(2);
  });
});

describe("removeWrongAnswer", () => {
  it("특정 id의 오답을 삭제한다", () => {
    saveWrongAnswer(MOCK_ANSWER);
    const [saved] = getWrongAnswers();
    removeWrongAnswer(saved.id);
    expect(getWrongAnswers()).toHaveLength(0);
  });

  it("없는 id를 삭제해도 에러가 없다", () => {
    expect(() => removeWrongAnswer("nonexistent")).not.toThrow();
  });
});

describe("clearWrongAnswers", () => {
  it("모든 오답을 삭제한다", () => {
    saveWrongAnswer(MOCK_ANSWER);
    saveWrongAnswer({ ...MOCK_ANSWER, lessonId: "math-basics-02" });
    clearWrongAnswers();
    expect(getWrongAnswers()).toHaveLength(0);
  });
});
