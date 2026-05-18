export interface CurriculumLesson {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface CurriculumStage {
  id: number;
  title: string;
  description: string;
  slug: string;
  lessons: CurriculumLesson[];
}

export const CURRICULUM: CurriculumStage[] = [
  {
    id: 1,
    title: "1단계: 수학 기초",
    description: "AI/ML에 필요한 수학 개념",
    slug: "math-basics",
    lessons: [
      { id: "math-basics-01", title: "벡터란 무엇인가?", difficulty: "easy" },
      { id: "math-basics-02", title: "행렬과 행렬 연산", difficulty: "easy" },
      {
        id: "math-basics-03",
        title: "미분과 경사하강법",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 2,
    title: "2단계: 머신러닝 기초",
    description: "핵심 ML 알고리즘 이해",
    slug: "ml-basics",
    lessons: [
      { id: "ml-basics-01", title: "선형 회귀", difficulty: "easy" },
      { id: "ml-basics-02", title: "분류 알고리즘", difficulty: "medium" },
      { id: "ml-basics-03", title: "의사결정 트리", difficulty: "medium" },
    ],
  },
  {
    id: 3,
    title: "3단계: 딥러닝 입문",
    description: "신경망의 작동 원리",
    slug: "dl-basics",
    lessons: [
      { id: "dl-01", title: "신경망 구조", difficulty: "medium" },
      { id: "dl-02", title: "역전파 알고리즘", difficulty: "hard" },
      { id: "dl-03", title: "CNN 이해하기", difficulty: "hard" },
    ],
  },
  {
    id: 4,
    title: "4단계: 자연어 처리",
    description: "NLP와 언어 모델 기초",
    slug: "nlp-basics",
    lessons: [
      { id: "nlp-01", title: "텍스트 임베딩", difficulty: "medium" },
      { id: "nlp-02", title: "Transformer 구조", difficulty: "hard" },
      { id: "nlp-03", title: "LLM의 작동 원리", difficulty: "hard" },
    ],
  },
  {
    id: 5,
    title: "5단계: AI 실전 응용",
    description: "실제 AI 서비스 구축",
    slug: "ai-apps",
    lessons: [
      { id: "app-01", title: "Claude API 활용", difficulty: "medium" },
      { id: "app-02", title: "RAG 시스템 구축", difficulty: "hard" },
      { id: "app-03", title: "AI 앱 배포하기", difficulty: "medium" },
    ],
  },
];
