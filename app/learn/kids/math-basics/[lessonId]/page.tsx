import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("kids-math-basics").map((l) => ({ lessonId: l.id }));
}

export default async function KidsLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("kids-math-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="kids/math-basics"
      stageTitle="🧒 초등학생용 · 수학 첫걸음"
    />
  );
}
