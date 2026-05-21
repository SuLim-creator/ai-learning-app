import { CurriculumHub } from "@/app/components/curriculum-hub";
import { KIDS_CURRICULUM } from "@/lib/curriculum";

export default function KidsHubPage() {
  return (
    <CurriculumHub
      ageGroup="kids"
      groupSubtitle="🧒 초등학생용 · 5단계 AI 첫걸음"
      accent="amber"
      curriculum={KIDS_CURRICULUM}
      urlPrefix="/learn/kids"
      welcomeTags={[
        "수학 첫걸음",
        "머신러닝",
        "딥러닝",
        "자연어",
        "AI 활용",
        "5단계",
      ]}
    />
  );
}
