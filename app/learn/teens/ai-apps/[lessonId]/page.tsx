import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { LessonDetail } from "@/app/components/lesson-detail";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return getLessons("teens-ai-apps").map((l) => ({ lessonId: l.id }));
}

export default async function TeensAiAppsLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const lesson = getLesson("teens-ai-apps", lessonId);

  if (!lesson) notFound();

  return (
    <LessonDetail
      lesson={lesson}
      stageSlug="teens/ai-apps"
      stageTitle="🧑‍🎓 중고등학생용 · AI 앱 만들기"
    />
  );
}
