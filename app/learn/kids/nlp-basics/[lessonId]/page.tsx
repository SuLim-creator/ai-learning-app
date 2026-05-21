import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("kids-nlp-basics").map((l) => ({ lessonId: l.id }));
}

export default async function KidsNlpLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("kids-nlp-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="kids/nlp-basics"
      stageTitle="🧒 초등학생용 · 자연어 첫걸음"
    />
  );
}
