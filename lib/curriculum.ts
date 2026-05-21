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

export const KIDS_CURRICULUM: CurriculumStage[] = [
  {
    id: 1,
    title: "1단계: 수학 첫걸음",
    description: "보물찾기·자판기 비유로 만나는 AI 수학",
    slug: "math-basics",
    lessons: [
      {
        id: "kids-math-01",
        title: "벡터: 보물지도의 화살표",
        difficulty: "easy",
      },
      {
        id: "kids-math-02",
        title: "행렬: 자리 잡힌 친구들",
        difficulty: "easy",
      },
      { id: "kids-math-03", title: "함수: 자판기 비유", difficulty: "easy" },
      {
        id: "kids-math-04",
        title: "행렬 곱셈: 여러 줄 한꺼번에",
        difficulty: "easy",
      },
      {
        id: "kids-math-05",
        title: "미분: 얼마나 변했나?",
        difficulty: "medium",
      },
      {
        id: "kids-math-06",
        title: "경사하강법: 산 내려가기 게임",
        difficulty: "medium",
      },
      {
        id: "kids-math-07",
        title: "활성화 함수: 켜고 끄는 스위치",
        difficulty: "medium",
      },
      {
        id: "kids-math-08",
        title: "손실 함수: AI의 점수표",
        difficulty: "medium",
      },
      { id: "kids-math-09", title: "확률: 동전과 가능성", difficulty: "easy" },
      {
        id: "kids-math-10",
        title: "분포: 키 그래프의 모양",
        difficulty: "medium",
      },
      { id: "kids-math-11", title: "1단계 총정리", difficulty: "easy" },
    ],
  },
  {
    id: 2,
    title: "2단계: 머신러닝 첫걸음",
    description: "AI는 어떻게 '배우는' 걸까",
    slug: "ml-basics",
    lessons: [
      { id: "kids-ml-01", title: "패턴 찾기 게임", difficulty: "easy" },
      {
        id: "kids-ml-02",
        title: "틀린 만큼 배워요 — 손실",
        difficulty: "easy",
      },
      {
        id: "kids-ml-03",
        title: "새 사진도 맞히기 — 일반화",
        difficulty: "easy",
      },
      {
        id: "kids-ml-04",
        title: "외우면 안 돼요 — 과적합",
        difficulty: "medium",
      },
      {
        id: "kids-ml-05",
        title: "정답 알려주기 — 지도학습",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "3단계: 딥러닝 첫걸음",
    description: "AI의 두뇌, 그물처럼 이어진 친구들",
    slug: "dl-basics",
    lessons: [
      { id: "kids-dl-01", title: "풍선 그물 — 신경망", difficulty: "easy" },
      {
        id: "kids-dl-02",
        title: "사진 속 고양이 찾기 — CNN",
        difficulty: "easy",
      },
      {
        id: "kids-dl-03",
        title: "역전파 — 어디서 틀렸나 거꾸로 따라가기",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 4,
    title: "4단계: 자연어 첫걸음",
    description: "글자를 알아듣는 AI",
    slug: "nlp-basics",
    lessons: [
      {
        id: "kids-nlp-01",
        title: "단어를 숫자로 — 임베딩",
        difficulty: "easy",
      },
      {
        id: "kids-nlp-02",
        title: "챗봇의 비밀 — 다음 단어 맞히기",
        difficulty: "easy",
      },
      {
        id: "kids-nlp-03",
        title: "번역기는 어떻게 일할까",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 5,
    title: "5단계: AI 활용 첫걸음",
    description: "AI 친구와 잘 지내는 법",
    slug: "ai-apps",
    lessons: [
      {
        id: "kids-app-01",
        title: "잘 부탁하기 — 프롬프트",
        difficulty: "easy",
      },
      {
        id: "kids-app-02",
        title: "나만의 AI 도우미 — 역할 정하기",
        difficulty: "easy",
      },
      {
        id: "kids-app-03",
        title: "똑똑하게 쓰는 법 — AI와 함께 공부",
        difficulty: "easy",
      },
    ],
  },
];

export const TEENS_CURRICULUM: CurriculumStage[] = [
  {
    id: 1,
    title: "1단계: 수학 기초",
    description: "좌표·코드·이미지로 익히는 AI 수학",
    slug: "math-basics",
    lessons: [
      { id: "teens-math-01", title: "벡터와 좌표", difficulty: "easy" },
      { id: "teens-math-02", title: "행렬: 픽셀로 본 표", difficulty: "easy" },
      { id: "teens-math-03", title: "함수: 매핑과 그래프", difficulty: "easy" },
      { id: "teens-math-04", title: "행렬 곱셈과 의미", difficulty: "medium" },
      {
        id: "teens-math-05",
        title: "미분: 변화율과 기울기",
        difficulty: "medium",
      },
      {
        id: "teens-math-06",
        title: "경사하강법: 손실을 줄이는 방향",
        difficulty: "medium",
      },
      {
        id: "teens-math-07",
        title: "활성화 함수: ReLU·시그모이드",
        difficulty: "medium",
      },
      {
        id: "teens-math-08",
        title: "손실 함수: MSE와 교차엔트로피",
        difficulty: "medium",
      },
      { id: "teens-math-09", title: "확률과 불확실성", difficulty: "easy" },
      {
        id: "teens-math-10",
        title: "분포: 데이터의 형태",
        difficulty: "medium",
      },
      { id: "teens-math-11", title: "1단계 총정리", difficulty: "easy" },
    ],
  },
  {
    id: 2,
    title: "2단계: 머신러닝 기초",
    description: "지도학습의 큰 그림",
    slug: "ml-basics",
    lessons: [
      {
        id: "teens-ml-01",
        title: "지도학습: 데이터로 함수 찾기",
        difficulty: "easy",
      },
      { id: "teens-ml-02", title: "손실과 경사하강법", difficulty: "medium" },
      {
        id: "teens-ml-03",
        title: "일반화: 새 데이터에 통하는 모델",
        difficulty: "medium",
      },
      { id: "teens-ml-04", title: "과적합과 정규화", difficulty: "medium" },
      {
        id: "teens-ml-05",
        title: "분류 vs 회귀 깊이 보기",
        difficulty: "easy",
      },
    ],
  },
  {
    id: 3,
    title: "3단계: 딥러닝 기초",
    description: "신경망과 학습 알고리즘",
    slug: "dl-basics",
    lessons: [
      { id: "teens-dl-01", title: "퍼셉트론과 신경망", difficulty: "medium" },
      {
        id: "teens-dl-02",
        title: "CNN: 이미지를 보는 신경망",
        difficulty: "medium",
      },
      { id: "teens-dl-03", title: "역전파와 자동 미분", difficulty: "hard" },
    ],
  },
  {
    id: 4,
    title: "4단계: 자연어/LLM 기초",
    description: "단어 임베딩에서 LLM까지",
    slug: "nlp-basics",
    lessons: [
      {
        id: "teens-nlp-01",
        title: "단어 임베딩과 의미 벡터",
        difficulty: "medium",
      },
      {
        id: "teens-nlp-02",
        title: "트랜스포머와 어텐션, LLM",
        difficulty: "medium",
      },
      {
        id: "teens-nlp-03",
        title: "프롬프트·환각·컨텍스트 한계",
        difficulty: "medium",
      },
    ],
  },
  {
    id: 5,
    title: "5단계: AI 앱 만들기",
    description: "프롬프트 엔지니어링부터 RAG까지",
    slug: "ai-apps",
    lessons: [
      {
        id: "teens-app-01",
        title: "프롬프트 엔지니어링",
        difficulty: "medium",
      },
      {
        id: "teens-app-02",
        title: "RAG: 내 자료로 답하게 만들기",
        difficulty: "medium",
      },
      {
        id: "teens-app-03",
        title: "도구 사용과 에이전트 입문",
        difficulty: "medium",
      },
    ],
  },
];

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
