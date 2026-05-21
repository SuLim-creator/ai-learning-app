import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("kids-ai-apps").map((l) => ({ lessonId: l.id }));
}

export default async function KidsAiAppsLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("kids-ai-apps", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="kids/ai-apps"
      stageTitle="🧒 초등학생용 · AI 활용 첫걸음"
    />
  );
}
