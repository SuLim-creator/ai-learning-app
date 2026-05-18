"use client";

import { useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { LessonSection } from "@/lib/types/lesson";
import { parseQuiz } from "@/lib/quiz";
import { saveWrongAnswer } from "@/lib/wrong-answers";

interface QuizState {
  selected: string | null;
  shake: boolean;
}

function useQuiz(answerKey: string) {
  const [state, setState] = useState<QuizState>({
    selected: null,
    shake: false,
  });

  const select = useCallback(
    (key: string) => {
      if (state.selected !== null) return;
      if (key === answerKey) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#10b981", "#f59e0b"],
        });
      }
      setState({ selected: key, shake: key !== answerKey });
      if (key !== answerKey) {
        setTimeout(() => setState((s) => ({ ...s, shake: false })), 500);
      }
    },
    [state.selected, answerKey],
  );

  const reset = useCallback(
    () => setState({ selected: null, shake: false }),
    [],
  );

  return { ...state, select, reset };
}

interface QuizSectionProps {
  section: LessonSection;
  lessonId: string;
  lessonTitle: string;
  onAnswer?: (correct: boolean) => void;
}

export function QuizSection({
  section,
  lessonId,
  lessonTitle,
  onAnswer,
}: QuizSectionProps) {
  const answeredRef = useRef(false);
  const quiz = parseQuiz(section.content);

  const { selected, shake, select, reset } = useQuiz(quiz?.answerKey ?? "");

  if (!quiz) return <p className="text-gray-400">{section.content}</p>;

  const isCorrect = selected === quiz.answerKey;

  function handleSelect(key: string) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    const correct = key === quiz!.answerKey;
    select(key);
    onAnswer?.(correct);
    if (!correct) {
      saveWrongAnswer({
        lessonId,
        lessonTitle,
        question: quiz!.question,
        options: quiz!.options,
        selectedKey: key,
        correctKey: quiz!.answerKey,
        explanation: quiz!.explanation,
      });
    }
  }

  function handleReset() {
    answeredRef.current = false;
    reset();
  }

  return (
    <div>
      <p className="mb-4 text-base text-gray-200">{quiz.question}</p>
      <div className="flex flex-col gap-2">
        {quiz.options.map((opt) => {
          const isSelected = selected === opt.key;
          const showResult = selected !== null;
          const isAnswer = opt.key === quiz.answerKey;

          let style =
            "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700";
          if (showResult && isAnswer)
            style =
              "border-emerald-500 bg-emerald-950/40 text-emerald-300 scale-[1.01]";
          else if (showResult && isSelected && !isAnswer)
            style = "border-red-500 bg-red-950/40 text-red-300";

          return (
            <button
              key={opt.key}
              disabled={selected !== null}
              onClick={() => handleSelect(opt.key)}
              className={[
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all duration-200 disabled:cursor-default",
                style,
                showResult && isSelected && !isAnswer && shake
                  ? "animate-shake"
                  : "",
              ].join(" ")}
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-current text-xs font-medium">
                {opt.key}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className={`mt-4 rounded-lg p-4 text-sm transition-all duration-300 ${
            isCorrect
              ? "bg-emerald-950/40 text-emerald-300"
              : "bg-red-950/40 text-red-300"
          }`}
        >
          <p className="mb-1 font-medium">{isCorrect ? "🎉 정답!" : "오답"}</p>
          <p className="text-gray-300">{quiz.explanation}</p>
          <button
            onClick={handleReset}
            className="mt-2 text-xs text-gray-400 underline hover:text-gray-200 transition-colors"
          >
            다시 풀기
          </button>
        </div>
      )}
    </div>
  );
}
