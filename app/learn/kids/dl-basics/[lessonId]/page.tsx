import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("kids-dl-basics").map((l) => ({ lessonId: l.id }));
}

export default async function KidsDlLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("kids-dl-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="kids/dl-basics"
      stageTitle="🧒 초등학생용 · 딥러닝 첫걸음"
    />
  );
}
