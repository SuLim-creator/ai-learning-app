import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("teens-nlp-basics").map((l) => ({ lessonId: l.id }));
}

export default async function TeensNlpLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("teens-nlp-basics", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="teens/nlp-basics"
      stageTitle="🧑‍🎓 중고등학생용 · NLP / LLM 기초"
    />
  );
}
