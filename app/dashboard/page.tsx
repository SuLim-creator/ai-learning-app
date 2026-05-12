import { getLessons } from "@/lib/lessons";
import { DashboardClient } from "@/app/components/dashboard-client";

export default function DashboardPage() {
  const mathLessons = getLessons("math-basics");

  const stages = [
    {
      id: "math-basics",
      title: "수학 기초",
      stepLabel: "1단계",
      lessons: mathLessons,
    },
  ];

  return <DashboardClient stages={stages} />;
}
