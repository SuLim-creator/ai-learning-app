export type Difficulty = "easy" | "medium" | "hard";
export type SectionType =
  | "text"
  | "visual"
  | "interactive"
  | "quiz"
  | "application";

export interface LessonSection {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  order: number;
  diagram?: string;
  component?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  sections: LessonSection[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LessonMeta {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
}

export interface CourseStage {
  id: number;
  title: string;
  description: string;
  lessons: LessonMeta[];
}
