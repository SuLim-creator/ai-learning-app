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
      {
        id: "math-basics-04",
        title: "행렬이란 무엇인가",
        difficulty: "easy",
      },
      { id: "math-basics-05", title: "행렬 곱셈", difficulty: "medium" },
      { id: "math-basics-06", title: "경사하강법", difficulty: "medium" },
      { id: "math-basics-07", title: "활성화 함수", difficulty: "medium" },
      {
        id: "math-basics-08",
        title: "손실 함수란 무엇인가",
        difficulty: "medium",
      },
      {
        id: "math-basics-09",
        title: "함수란 무엇인가",
        difficulty: "easy",
      },
      {
        id: "math-basics-10",
        title: "확률과 불확실성",
        difficulty: "easy",
      },
      {
        id: "math-basics-11",
        title: "분포: 데이터의 형태",
        difficulty: "medium",
      },
      {
        id: "math-basics-12",
        title: "조건부 확률과 베이즈",
        difficulty: "medium",
      },
      {
        id: "math-basics-13",
        title: "1단계 총정리: AI를 위한 수학 기초",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 2,
    title: "2단계: 머신러닝 기초",
    description: "핵심 ML 알고리즘 이해",
    slug: "ml-basics",
    lessons: [
      { id: "ml-basics-01", title: "행렬이란 무엇인가", difficulty: "easy" },
      {
        id: "ml-basics-02",
        title: "손실 함수: 모델이 얼마나 틀렸는가",
        difficulty: "medium",
      },
      {
        id: "ml-basics-03",
        title: "경사하강법: 손실을 줄이는 방법",
        difficulty: "medium",
      },
      {
        id: "ml-basics-04",
        title: "과적합: 암기와 이해의 차이",
        difficulty: "medium",
      },
      {
        id: "ml-basics-05",
        title: "지도학습이란 무엇인가",
        difficulty: "easy",
      },
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
