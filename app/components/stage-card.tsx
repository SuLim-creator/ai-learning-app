"use client";

interface Lesson {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
}

interface Stage {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

const DIFFICULTY_COLORS = {
  easy: "text-emerald-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
};

const DIFFICULTY_LABELS = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

interface StageCardProps {
  stage: Stage;
  isExpanded: boolean;
  selectedLessonId?: string;
  onToggle: () => void;
  onSelectLesson: (stage: Stage, lesson: Lesson) => void;
}

export function StageCard({
  stage,
  isExpanded,
  selectedLessonId,
  onToggle,
  onSelectLesson,
}: StageCardProps) {
  return (
    <div className="mb-2 rounded-xl border border-gray-800 bg-transparent transition-all duration-150 hover:border-gray-700 hover:bg-gray-800/40">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-300 transition-all duration-150 hover:text-white"
      >
        <span
          className={`text-xs transition-transform duration-150 ${isExpanded ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        <span className="flex-1 text-sm font-medium">{stage.title}</span>
        <span className="text-xs text-gray-600">{stage.lessons.length}</span>
      </button>

      {isExpanded && (
        <div className="pb-2 pt-0 px-1">
          <div className="space-y-0.5">
            {stage.lessons.map((lesson) => {
              const isSelected = selectedLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(stage, lesson)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left
                    transition-all duration-150
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                        : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 hover:pl-4"
                    }
                  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                  <span className="flex-1 leading-snug">{lesson.title}</span>
                  <span
                    className={`text-xs flex-shrink-0 ${isSelected ? "text-indigo-200" : DIFFICULTY_COLORS[lesson.difficulty]}`}
                  >
                    {DIFFICULTY_LABELS[lesson.difficulty]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
