import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("math-basics").map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("math-basics", lessonId);

  if (!lesson) notFound();

  return <LessonDetail lesson={lesson} />;
}
