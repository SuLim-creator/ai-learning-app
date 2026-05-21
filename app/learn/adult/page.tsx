import { CurriculumHub } from "@/app/components/curriculum-hub";
import { CURRICULUM } from "@/lib/curriculum";

export default function AdultHub() {
  return (
    <CurriculumHub
      ageGroup="adult"
      groupSubtitle="👨‍💼 성인용 · 5단계 AI/ML 커리큘럼"
      accent="indigo"
      curriculum={CURRICULUM}
      urlPrefix="/learn/adult"
      welcomeTags={[
        "수학 기초",
        "머신러닝",
        "딥러닝",
        "NLP",
        "AI 응용",
        "5단계",
      ]}
    />
  );
}
