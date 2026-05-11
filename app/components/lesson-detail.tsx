"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Lesson, LessonSection } from "@/lib/types/lesson";
import { parseQuiz } from "@/lib/quiz";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";

const SECTION_TYPE_LABEL: Record<string, string> = {
  text: "개념",
  visual: "시각화",
  interactive: "실습",
  quiz: "퀴즈",
};

function QuizSection({ section }: { section: LessonSection }) {
  const [selected, setSelected] = useState<string | null>(null);
  const quiz = parseQuiz(section.content);

  if (!quiz) return <p className="text-gray-400">{section.content}</p>;

  const isCorrect = selected === quiz.answerKey;

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
            style = "border-emerald-500 bg-emerald-950/40 text-emerald-300";
          else if (showResult && isSelected && !isAnswer)
            style = "border-red-500 bg-red-950/40 text-red-300";

          return (
            <button
              key={opt.key}
              disabled={selected !== null}
              onClick={() => setSelected(opt.key)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all duration-150 disabled:cursor-default ${style}`}
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
          className={`mt-4 rounded-lg p-4 text-sm ${isCorrect ? "bg-emerald-950/40 text-emerald-300" : "bg-red-950/40 text-red-300"}`}
        >
          <p className="mb-1 font-medium">{isCorrect ? "정답!" : "오답"}</p>
          <p className="text-gray-300">{quiz.explanation}</p>
          {!isCorrect && (
            <button
              onClick={() => setSelected(null)}
              className="mt-2 text-xs text-gray-400 underline"
            >
              다시 풀기
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TextSection({ section }: { section: LessonSection }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-gray-300">
      <ReactMarkdown>{section.content}</ReactMarkdown>
    </div>
  );
}

export function LessonDetail({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const sorted = [...lesson.sections].sort((a, b) => a.order - b.order);
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    setCompleted(isLessonComplete(lesson.id));
  }, [lesson.id]);

  async function handleComplete() {
    setCompleting(true);
    markLessonComplete(lesson.id);
    setCompleted(true);
    setCompleting(false);
    router.push("/learn/math-basics");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <p className="mb-1 text-sm text-indigo-400">수학 기초</p>
          <h1 className="mb-2 text-2xl font-bold text-white">{lesson.title}</h1>
          <p className="text-sm leading-relaxed text-gray-400">
            {lesson.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span>예상 {lesson.estimatedMinutes}분</span>
            <span>·</span>
            <span>
              {{
                easy: "쉬움",
                medium: "보통",
                hard: "어려움",
              }[lesson.difficulty] ?? lesson.difficulty}
            </span>
            <span>·</span>
            <span>{sorted.length}개 섹션</span>
          </div>
        </div>

        {/* 섹션 목록 */}
        <div className="flex flex-col gap-6">
          {sorted.map((section) => (
            <div
              key={section.id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-indigo-900/50 px-2 py-0.5 text-xs text-indigo-300">
                  {SECTION_TYPE_LABEL[section.type] ?? section.type}
                </span>
                <h2 className="text-sm font-medium text-gray-200">
                  {section.title}
                </h2>
              </div>

              {section.type === "quiz" ? (
                <QuizSection section={section} />
              ) : (
                <TextSection section={section} />
              )}
            </div>
          ))}
        </div>

        {/* 학습 완료 버튼 */}
        <div className="mt-10 flex justify-center">
          {completed ? (
            <div className="flex items-center gap-2 rounded-full bg-emerald-900/40 px-6 py-3 text-sm text-emerald-400">
              <span>✓</span>
              <span>학습 완료</span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
            >
              {completing ? "저장 중..." : "학습 완료 표시"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
