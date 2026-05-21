import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("teens-ml-basics").map((l) => ({ lessonId: l.id }));
}

export default async function TeensMlLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("teens-ml-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="teens/ml-basics"
      stageTitle="🧑‍🎓 중고등학생용 · 머신러닝 기초"
    />
  );
}
