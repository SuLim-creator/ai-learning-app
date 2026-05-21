import { CurriculumHub } from "@/app/components/curriculum-hub";
import { TEENS_CURRICULUM } from "@/lib/curriculum";

export default function TeensHubPage() {
  return (
    <CurriculumHub
      ageGroup="teens"
      groupSubtitle="🧑‍🎓 중고등학생용 · 5단계 AI/ML 기초"
      accent="sky"
      curriculum={TEENS_CURRICULUM}
      urlPrefix="/learn/teens"
      welcomeTags={[
        "수학 기초",
        "머신러닝",
        "딥러닝",
        "NLP/LLM",
        "AI 앱",
        "5단계",
      ]}
    />
  );
}
