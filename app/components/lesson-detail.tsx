"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Lesson, LessonSection } from "@/lib/types/lesson";
import { QuizSection } from "@/app/components/quiz-section";
import {
  VectorPlayground,
  MatrixTransform,
} from "@/app/components/visualizations";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";

const SECTION_TYPE_LABEL: Record<string, string> = {
  text: "개념",
  visual: "시각화",
  interactive: "실습",
  quiz: "퀴즈",
};

const VISUAL_COMPONENTS: Record<string, React.ComponentType> = {
  "vector-playground": VectorPlayground,
  "matrix-transform": MatrixTransform,
};

function VisualSection({ section }: { section: LessonSection }) {
  const Component = VISUAL_COMPONENTS[section.content];
  if (Component) return <Component />;
  return (
    <div className="prose prose-invert prose-sm max-w-none text-gray-300">
      <ReactMarkdown>{section.content}</ReactMarkdown>
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

function QuizScore({ correct, total }: { correct: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const color =
    pct === 100
      ? "text-emerald-400"
      : pct >= 60
        ? "text-yellow-400"
        : "text-red-400";
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3 text-sm">
      <span className="text-gray-400">퀴즈 점수</span>
      <span className={`font-bold ${color}`}>
        {correct} / {total}
      </span>
      <span className={`text-xs ${color}`}>({pct}%)</span>
    </div>
  );
}

interface LessonDetailProps {
  lesson: Lesson;
  stageSlug: string;
  stageTitle: string;
}

export function LessonDetail({
  lesson,
  stageSlug,
  stageTitle,
}: LessonDetailProps) {
  const router = useRouter();
  const sorted = [...lesson.sections].sort((a, b) => a.order - b.order);
  const quizSections = sorted.filter((s) => s.type === "quiz");

  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCompleted(isLessonComplete(lesson.id));
  }, [lesson.id]);

  function handleAnswer(sectionId: string, correct: boolean) {
    setQuizResults((prev) => ({ ...prev, [sectionId]: correct }));
  }

  const answeredCount = Object.keys(quizResults).length;
  const correctCount = Object.values(quizResults).filter(Boolean).length;

  async function handleComplete() {
    setCompleting(true);
    markLessonComplete(lesson.id);
    setCompleted(true);
    setCompleting(false);
    router.push(`/learn/${stageSlug}`);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <button
            onClick={() => router.push(`/learn/${stageSlug}`)}
            className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <span>←</span>
            <span>{stageTitle}</span>
          </button>
          <h1 className="mb-2 text-2xl font-bold text-white">{lesson.title}</h1>
          <p className="text-sm leading-relaxed text-gray-400">
            {lesson.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span>예상 {lesson.estimatedMinutes}분</span>
            <span>·</span>
            <span>
              {
                { easy: "쉬움", medium: "보통", hard: "어려움" }[
                  lesson.difficulty
                ]
              }
            </span>
            <span>·</span>
            <span>{sorted.length}개 섹션</span>
          </div>
        </div>

        {quizSections.length > 0 && answeredCount > 0 && (
          <QuizScore correct={correctCount} total={answeredCount} />
        )}

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
                <QuizSection
                  section={section}
                  lessonId={lesson.id}
                  lessonTitle={lesson.title}
                  onAnswer={(correct) => handleAnswer(section.id, correct)}
                />
              ) : section.type === "visual" ? (
                <VisualSection section={section} />
              ) : (
                <TextSection section={section} />
              )}
            </div>
          ))}
        </div>

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
