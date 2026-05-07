"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Lesson } from "@/lib/types/lesson";

const DIFFICULTY_LABEL = { easy: "쉬움", medium: "보통", hard: "어려움" };
const DIFFICULTY_COLOR = {
  easy: "text-emerald-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
};

interface LessonCardProps {
  lesson: Lesson;
  stage: string;
  index: number;
}

export function LessonCard({ lesson, stage, index }: LessonCardProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(
      localStorage.getItem(`lesson-complete-${lesson.id}`) === "true",
    );
  }, [lesson.id]);

  function toggleComplete(e: React.MouseEvent) {
    e.preventDefault();
    const next = !completed;
    setCompleted(next);
    localStorage.setItem(`lesson-complete-${lesson.id}`, String(next));
  }

  return (
    <Link href={`/learn/${stage}/${lesson.id}`}>
      <Card
        className={`
        group relative cursor-pointer border-gray-800 bg-gray-900 transition-all duration-200
        hover:border-indigo-700 hover:bg-gray-800 hover:shadow-lg hover:shadow-indigo-900/20
        ${completed ? "border-emerald-900/60 bg-emerald-950/20" : ""}
      `}
      >
        {/* 완료 체크 버튼 */}
        <button
          onClick={toggleComplete}
          aria-label={completed ? "완료 취소" : "완료 표시"}
          className={`
            absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-150
            ${
              completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-gray-600 bg-transparent text-transparent group-hover:border-gray-400"
            }
          `}
        >
          ✓
        </button>

        <CardHeader className="pb-2 pr-12">
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
            <span>{index + 1}번째 레슨</span>
            <span>·</span>
            <span className={DIFFICULTY_COLOR[lesson.difficulty]}>
              {DIFFICULTY_LABEL[lesson.difficulty]}
            </span>
            <span>·</span>
            <span>{lesson.estimatedMinutes}분</span>
          </div>
          <CardTitle
            className={`text-base ${completed ? "text-emerald-400" : "text-white"}`}
          >
            {completed && <span className="mr-1.5">✓</span>}
            {lesson.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-gray-400">
            {lesson.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400 group-hover:bg-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
