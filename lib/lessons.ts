import fs from "fs";
import path from "path";
import { Lesson } from "@/lib/types/lesson";

const CONTENT_DIR = path.join(process.cwd(), "content/lessons");

export function getLessons(stage: string): Lesson[] {
  const stageDir = path.join(CONTENT_DIR, stage);

  if (!fs.existsSync(stageDir)) return [];

  return fs
    .readdirSync(stageDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(stageDir, file), "utf-8");
      return JSON.parse(raw) as Lesson;
    });
}

export function getLesson(stage: string, lessonId: string): Lesson | null {
  const lessons = getLessons(stage);
  return lessons.find((l) => l.id === lessonId) ?? null;
}
