import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";
import { CURRICULUM } from "@/lib/curriculum";

interface Props {
  params: Promise<{ lessonId: string }>;
}

const stage = CURRICULUM.find((s) => s.slug === "ml-basics")!;

export async function generateStaticParams() {
  return getLessons("ml-basics").map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("ml-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="adult/ml-basics"
      stageTitle={stage.title}
    />
  );
}
