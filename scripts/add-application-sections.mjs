#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const APPLICATIONS = {
  // ===== math-basics (adult) =====
  "math-basics/01-what-is-vector": {
    title: "실제 AI에서 벡터는 어디에 쓰일까?",
    content:
      "벡터는 데이터를 컴퓨터가 다룰 수 있는 숫자로 바꾸는 **모든 AI 시스템의 첫 단계**입니다.\n\n- **ChatGPT, Claude의 텍스트 임베딩**: 단어·문장을 1,536차원 같은 고차원 벡터로 변환해 의미를 비교합니다. (OpenAI `text-embedding-3`, Cohere Embed)\n- **YouTube·Netflix 추천**: 사용자와 콘텐츠를 같은 공간의 벡터로 표현해 코사인 유사도로 매칭합니다.\n- **얼굴 인식 (FaceNet, ArcFace)**: 얼굴 사진을 512차원 벡터로 압축, 두 벡터의 거리로 같은 사람인지 판단합니다.\n- **벡터 데이터베이스 (Pinecone, Weaviate, Qdrant)**: RAG 시스템의 핵심 저장소. 문서를 벡터로 저장하고 유사한 것을 빠르게 찾습니다.\n- **자율주행 LiDAR**: 주변 사물의 위치·속도를 3D 벡터로 표현해 충돌을 예측합니다.",
  },
  "math-basics/02-matrix": {
    title: "행렬은 AI 어디서 작동할까?",
    content:
      "행렬은 신경망의 **연산 단위**이자 데이터의 **저장 단위**입니다.\n\n- **이미지 처리**: 사진 한 장 = 높이×너비×3 (RGB) 행렬. CNN은 이 행렬에 필터를 곱해 특징을 뽑습니다.\n- **Transformer의 Attention**: Query·Key·Value 행렬 곱이 GPT, Claude, Gemini의 핵심 연산입니다.\n- **추천 시스템 (Matrix Factorization)**: 사용자×아이템 평점 행렬을 두 작은 행렬로 분해해 빈칸을 예측합니다. (Netflix Prize)\n- **PageRank (Google 검색)**: 웹페이지 링크 관계를 거대한 행렬로 표현해 중요도를 계산합니다.\n- **GPU/TPU**: 행렬 곱 전용 회로(Tensor Core)를 가져, AI 학습 속도의 80% 이상이 행렬 곱셈에 좌우됩니다.",
  },
  "math-basics/03-derivatives": {
    title: "미분이 없으면 AI 학습도 없다",
    content:
      "거의 모든 AI 모델은 **미분(기울기)** 을 따라 조금씩 좋아집니다.\n\n- **PyTorch·TensorFlow의 autograd**: 모델의 모든 연산에 대해 자동으로 미분을 계산해줍니다.\n- **ChatGPT, Claude의 사전훈련**: 수조 개 단어 데이터로 매 스텝 미분을 계산해 가중치를 업데이트합니다.\n- **Stable Diffusion**: 노이즈 → 이미지 변환을 score function의 미분으로 학습합니다.\n- **AlphaGo, AlphaZero**: 정책 경사(policy gradient)로 더 좋은 수를 선택하는 방향을 학습합니다.\n- **추천·랭킹 시스템**: 클릭률을 높이는 방향으로 모델을 미분으로 미세조정합니다.",
  },
  "math-basics/04-what-is-matrix": {
    title: "AI 어디서 행렬이 보일까?",
    content:
      '행렬은 AI 시스템의 **데이터를 담는 그릇**입니다.\n\n- **pandas DataFrame**: 데이터 분석가가 가장 많이 쓰는 도구. 내부적으로 행렬로 저장됩니다.\n- **이미지 = 픽셀 행렬**: 흑백 사진은 2D 행렬, 컬러는 RGB 3장의 행렬 묶음입니다.\n- **추천 시스템의 평점표**: 사용자(행) × 영화(열) 행렬에서 빈칸을 예측합니다.\n- **신경망 한 층 = 행렬 한 개**: 입력에 가중치 행렬을 곱하는 것이 "한 층의 계산"입니다.\n- **배치 학습**: 64개 데이터를 한 번에 행렬로 묶어 GPU에서 병렬 처리합니다.',
  },
  "math-basics/05-matrix-multiplication": {
    title: "행렬 곱셈이 만드는 AI 세계",
    content:
      '현대 AI의 **연산 대부분이 행렬 곱셈**입니다.\n\n- **Transformer Attention**: Query × Keyᵀ 곱셈으로 "어떤 단어가 어떤 단어에 주목할지" 계산합니다. ChatGPT 한 토큰당 수십억 번 일어납니다.\n- **CNN 합성곱**: 이미지 패치와 필터의 행렬 곱이 핵심. ResNet, EfficientNet 모두 동일한 원리.\n- **임베딩 → 출력 변환**: 벡터에 가중치 행렬을 곱해 다음 단어 확률을 만듭니다.\n- **PCA·차원 축소**: 고차원 데이터를 작은 차원으로 압축할 때 행렬 곱을 사용합니다.\n- **NVIDIA H100, Google TPU**: 행렬 곱만을 위해 설계된 칩. AI 성능은 곧 행렬 곱 처리량(TFLOPS)입니다.',
  },
  "math-basics/06-gradient-descent": {
    title: "경사하강법이 학습시킨 AI들",
    content:
      '오늘날 유명한 AI는 **거의 모두 경사하강법으로 학습**되었습니다.\n\n- **ChatGPT, Claude, Gemini**: 수십억 파라미터를 AdamW(경사하강법 변형)로 수개월간 학습합니다.\n- **Stable Diffusion·DALL-E**: 노이즈→이미지 변환을 경사하강법으로 익힙니다.\n- **AlphaGo·AlphaFold**: 바둑 수와 단백질 구조도 경사하강법으로 학습합니다.\n- **광고·추천 시스템**: 매일 새 데이터로 모델을 경사하강법으로 미세조정합니다.\n- **RLHF (인간 피드백 강화학습)**: ChatGPT가 "사람이 좋아하는 답변"을 만들도록 정렬할 때도 경사하강법을 씁니다.',
  },
  "math-basics/07-activation-functions": {
    title: "활성화 함수, 모델마다 다른 선택",
    content:
      "활성화 함수 하나가 모델의 성격을 바꿉니다.\n\n- **ReLU**: AlexNet, ResNet 같은 거의 모든 이미지 CNN의 표준. 빠르고 단순합니다.\n- **Sigmoid**: 이진 분류 (스팸 vs 정상, 암 vs 정상)의 출력층.\n- **Softmax**: ImageNet의 1,000개 클래스 같은 다중 분류 출력층. ChatGPT의 다음 단어 확률도 Softmax.\n- **GELU·SwiGLU**: GPT-4, Claude, LLaMA 같은 최신 LLM이 채택. ReLU보다 부드러워 학습이 안정적.\n- **Tanh**: LSTM·GRU 같은 옛 RNN의 게이트에서 여전히 사용됩니다.",
  },
  "math-basics/08-loss-function": {
    title: "AI는 어떤 손실 함수로 배울까?",
    content:
      '손실 함수는 "AI에게 무엇이 정답인지" 알려주는 **유일한 통로**입니다.\n\n- **Cross-Entropy**: ChatGPT, Claude의 다음 단어 예측 학습. ImageNet 분류도 동일.\n- **MSE (Mean Squared Error)**: 집값 예측, 주가 예측, 회귀 문제 전반.\n- **Triplet Loss**: 얼굴 인식 (FaceNet). "같은 사람은 가깝게, 다른 사람은 멀게."\n- **Contrastive Loss (InfoNCE)**: OpenAI CLIP. 이미지와 텍스트를 같은 공간에 정렬해 "이 사진은 강아지"를 알게 합니다.\n- **Reward Model Loss**: RLHF에서 "사람이 더 좋아할 답변"을 학습하는 ChatGPT 정렬의 핵심.',
  },
  "math-basics/09-what-is-function": {
    title: "AI 모델 = 거대한 함수",
    content:
      "AI 모델 자체가 **하나의 거대한 함수**입니다.\n\n- **ChatGPT (GPT-4)**: 텍스트 → 다음 텍스트 함수. 약 1.8조 파라미터로 정의됩니다.\n- **자율주행 (Tesla FSD)**: 8개 카메라 영상 → 조향각·가속도 함수.\n- **AlphaFold**: 아미노산 서열 → 3D 단백질 구조 함수. 노벨상을 받은 함수.\n- **Stable Diffusion**: 텍스트 프롬프트 + 노이즈 → 이미지 함수.\n- **Whisper (음성 인식)**: 오디오 파형 → 글자 함수. 99개 언어 처리.\n\n신경망은 작은 함수(층)를 **합성**해 거대한 함수를 만듭니다.",
  },
  "math-basics/10-probability": {
    title: "확률 없이 작동하는 AI는 없다",
    content:
      'AI는 "확실히 X다"가 아니라 "X일 확률 87%"로 말합니다.\n\n- **LLM의 토큰 샘플링**: ChatGPT는 다음 단어 확률 분포에서 top-k·top-p로 단어를 뽑습니다. `temperature`도 확률 조절기.\n- **의료 AI (피부암 진단)**: "악성 흑색종일 확률 92%"로 진단을 보조합니다.\n- **자율주행 객체 검출 (YOLO)**: "이 박스 안에 보행자가 있을 확률 0.89"로 판단합니다.\n- **광고 클릭률 예측 (CTR)**: 각 사용자에게 "이 광고를 클릭할 확률"을 추정해 가장 높은 것을 보여줍니다.\n- **베이지안 최적화**: 하이퍼파라미터 튜닝에서 "다음에 어떤 값을 시도해야 좋을 확률"을 계산합니다.',
  },
  "math-basics/11-distributions": {
    title: "분포가 만드는 AI 기술들",
    content:
      '확률분포는 AI에서 **데이터 생성**과 **불확실성 표현**의 도구입니다.\n\n- **Stable Diffusion·DALL-E**: 정규분포 노이즈에서 시작해 이미지를 "역으로 만들어" 갑니다.\n- **GAN (생성적 적대 신경망)**: 실제 데이터 분포를 학습해 가짜 얼굴·풍경을 생성합니다.\n- **이상치 탐지**: 신용카드 사기, 공장 불량품 검출. 정상 데이터 분포에서 벗어난 것을 잡습니다.\n- **Batch Normalization**: 신경망 각 층의 출력을 정규분포처럼 정규화해 학습을 안정시킵니다.\n- **A/B 테스트**: Netflix, Meta의 신기능 결정. 두 집단 결과의 분포 차이가 통계적으로 의미있는지 판단합니다.',
  },
  "math-basics/12-conditional-probability": {
    title: "베이즈로 작동하는 AI 시스템",
    content:
      '조건부 확률과 베이즈 정리는 "증거를 보고 믿음을 갱신"하는 AI의 사고 방식입니다.\n\n- **스팸 필터 (Naive Bayes)**: "비아그라"라는 단어가 있을 때 스팸일 확률 = 베이즈 정리.\n- **의료 진단**: 양성 결과가 나왔을 때 실제로 병일 확률. (희귀병 검사에서 양성이라도 실제 확률은 낮을 수 있음)\n- **자율주행**: 옆 차가 깜빡이를 켰을 때 차선 변경 의도일 확률을 추론합니다.\n- **Bayesian Neural Network**: 모델 자체가 가중치 분포를 가져 "이 예측이 얼마나 확신스러운지"까지 말합니다.\n- **RAG 시스템**: "이 질문이 주어졌을 때 어떤 문서가 답을 가질 확률"을 계산해 검색합니다.',
  },
  "math-basics/13-math-stage-summary": {
    title: "이 모든 수학이 모이는 곳",
    content:
      'ChatGPT가 "안녕" 한 마디를 만드는 그 순간에도, 1단계에서 배운 **모든 수학이 동시에** 작동합니다.\n\n- **입력 처리 (벡터·행렬)**: 사용자 문장을 토큰 → 임베딩 벡터 → 행렬로 묶기.\n- **Transformer 계산 (행렬 곱)**: Attention의 Q·Kᵀ, 출력 사영, 모든 층에서 행렬 곱 수천 번.\n- **활성화 함수**: GELU가 비선형성을 추가해 "의미"를 만듭니다.\n- **확률분포 (Softmax)**: 약 5만 개 단어 후보에 대한 확률을 만들고 그중 하나를 샘플링.\n- **학습 시점 (미분·경사하강법·손실 함수)**: 사전훈련·미세조정·RLHF가 모두 이 도구로 진행됩니다.\n\n수학 1단계 = ChatGPT 한 마디의 분해도입니다.',
  },

  // ===== kids-math-basics =====
  "kids-math-basics/01-what-is-vector": {
    title: "💡 AI도 화살표로 생각해요!",
    content:
      '벡터(화살표)는 우리 주변 AI들이 **매일매일 쓰는 도구**예요.\n\n- 📺 **YouTube가 다음 영상 추천하는 비밀**: 영상마다 "재밌음" 화살표를 그려두고, 내가 좋아한 영상과 비슷한 방향의 화살표를 찾아요!\n- 🤖 **ChatGPT가 단어 뜻을 아는 법**: "강아지"와 "고양이"를 비슷한 방향의 화살표로 만들어요. 그래서 둘이 비슷한 동물인 줄 알죠.\n- 🚗 **자율주행 자동차**: "앞에 사람이 어느 쪽으로 얼마나 멀리 있나"를 화살표로 그려서 안전하게 운전해요.',
  },
  "kids-math-basics/02-what-is-matrix": {
    title: "💡 AI 친구들도 표를 좋아해요!",
    content:
      '행렬(숫자 표)은 AI가 **사진과 게임 화면을 보는 방법**이에요.\n\n- 📸 **휴대폰 사진**: 사진 한 장이 사실은 **엄청 큰 숫자표** 예요! 각 칸이 점(픽셀) 하나의 색을 알려주죠.\n- 🎮 **게임 캐릭터 위치**: 게임판이 격자(=행렬)로 되어 있어서, AI가 "몬스터는 3번 칸, 보물은 7번 칸"이라고 알 수 있어요.\n- 💬 **AI 챗봇이 여러 명과 대화**: 100명과 동시에 이야기할 때도 표(행렬)로 정리해서 한 번에 답해요!',
  },
  "kids-math-basics/03-what-is-function": {
    title: "💡 AI는 모두 '입력→출력' 기계!",
    content:
      "함수(입력 넣으면 출력 나오는 기계)는 **모든 AI가 작동하는 방식**이에요.\n\n- 🤖 **ChatGPT**: 질문을 넣으면 → 답이 나오는 함수예요!\n- 🐱 **카메라 필터 앱**: 내 사진을 넣으면 → 고양이 얼굴이 합성된 사진이 나와요.\n- 🎤 **음성 인식 (Siri, 빅스비)**: 내 목소리를 넣으면 → 글자가 나오는 함수예요.\n- 🌐 **번역기 (파파고)**: 한국어를 넣으면 → 영어가 나오는 함수죠!",
  },
  "kids-math-basics/04-matrix-multiplication": {
    title: "💡 표 곱하기로 무엇을 할까?",
    content:
      '행렬 곱하기는 AI가 **사진을 바꾸거나 회전시키는 마법**의 비밀이에요.\n\n- 🎨 **사진 필터 (인스타, 스냅챗)**: 사진(표)에 "필터 표"를 곱하면 → 색깔이 예쁘게 바뀌어요!\n- 🔄 **사진 회전·뒤집기**: 표를 곱하면 사진이 옆으로 누워요. 사진 편집 앱들이 다 이렇게 해요.\n- 🤖 **AI가 그림 보기**: AI는 사진을 보면서 "표 곱하기"를 수천 번 해서 "아! 이건 강아지구나!"를 알아내요.',
  },
  "kids-math-basics/05-derivative": {
    title: "💡 '조금 더 잘하려면?'을 묻는 AI",
    content:
      '미분(기울기)은 AI가 **"어떻게 더 잘할 수 있을까?"를 알아내는 방법**이에요.\n\n- 🎯 **알파고가 바둑 배운 비결**: 매 수 둘 때마다 "이번엔 어디로 가야 더 잘 둘까?" 기울기를 따라 한 발씩 좋아져요.\n- 🎮 **게임 AI가 실력 늘리기**: "이 행동이 좋았나, 나빴나?" 기울기를 보고 다음엔 더 잘하려고 노력해요.\n- 🤖 **ChatGPT가 사람처럼 말하기**: 처음엔 엉터리였지만, 매번 "어디를 고쳐야 더 사람 같을까?" 기울기를 따라 똑똑해졌어요.',
  },
  "kids-math-basics/06-gradient-descent": {
    title: "💡 AI는 모두 이렇게 똑똑해졌어요!",
    content:
      '경사하강법은 **세상 모든 똑똑한 AI가 공부한 방법**이에요!\n\n- 🤖 **ChatGPT**: 인터넷의 글을 보면서 "틀린 부분을 조금씩 고치기"를 수억 번 반복해서 똑똑해졌어요.\n- 🚗 **자율주행 자동차**: 비디오를 보면서 "여기선 어떻게 핸들을 돌려야 했지?"를 조금씩 배워요.\n- 🎨 **AI 그림 그리기 (미드저니, 달리)**: "내가 그린 그림이 진짜와 얼마나 다르지?" 보면서 점점 진짜처럼 그리게 되었어요.\n- 🎮 **알파고**: 바둑을 수천만 판 두면서 "한 점 더 잘 두기"를 반복해 세계 챔피언을 이겼답니다!',
  },
  "kids-math-basics/07-activation": {
    title: "💡 AI가 '결정'하는 순간!",
    content:
      '활성화 함수는 AI가 **"이건 켠다! 저건 끈다!"를 결정**하는 스위치예요.\n\n- 🐱 **"이건 고양이일까?" 판단하는 AI**: 사진을 보고 "고양이 귀가 있어! 켜!", "수염도 있어! 켜!"를 모아 결정해요.\n- 🎮 **게임 AI가 적을 발견**: "적이 보였나? 안 보였나?" 스위치로 행동을 결정해요.\n- 🤖 **ChatGPT의 단어 선택**: 다음 단어로 "안녕?", "hi?", "뭐해?" 중 어떤 걸 켤지 활성화 함수로 결정해요!',
  },
  "kids-math-basics/08-loss-function": {
    title: "💡 AI 채점 선생님이 있어요!",
    content:
      '손실 함수는 AI에게 **"지금 얼마나 틀렸어!"를 알려주는 채점 선생님**이에요.\n\n- 📝 **ChatGPT 학습**: "정답은 \'안녕\'인데 너는 \'안녀\'이라 했네! 1점 감점!"이라고 알려줘요.\n- 🐶 **강아지/고양이 구별 AI**: "강아지인데 고양이라 했네! 틀렸어!" 점수를 매겨요.\n- 🎨 **그림 그리는 AI**: "진짜 강아지 사진과 네 그림이 많이 달라!" 점수를 줘서 점점 진짜처럼 그리게 해요.\n- 🎯 **이 점수를 줄이는 게 학습의 목표**예요!',
  },
  "kids-math-basics/09-probability": {
    title: '💡 "이럴 가능성!" 알려주는 AI',
    content:
      '확률은 AI가 **"이럴 것 같아요"를 숫자로 알려주는 방법**이에요.\n\n- 🌧️ **일기예보 AI**: "내일 비 올 확률 70%!" 이렇게 알려줘요.\n- 🤒 **병원 진단 AI**: 사진을 보고 "이건 감기일 확률 90%, 독감일 확률 5%" 알려줘요.\n- 🎮 **게임 AI**: "이 적이 공격할 확률 30%"라고 보고 우리 캐릭터를 보호해요.\n- 🤖 **ChatGPT 단어 고르기**: 다음 단어가 "안녕"일 확률 50%, "hi"일 확률 20%... 이렇게 계산해서 하나를 골라요!',
  },
  "kids-math-basics/10-distribution": {
    title: "💡 분포로 '이상한 것' 찾아내요!",
    content:
      '분포는 AI가 **"보통은 이런데, 너는 좀 이상한데?"를 알아내는 비결**이에요.\n\n- 💳 **카드 사기 잡기 AI**: 보통 "점심값 1만원" 같은 게 많은데, 갑자기 "새벽 3시에 100만원" 결제가 보이면 "수상해!" 멈춰요.\n- 🏭 **공장 불량품 찾기 AI**: 정상 제품 모양 분포에서 벗어난 걸 보면 "이거 불량이야!" 골라내요.\n- 🎨 **AI 그림 (스테이블 디퓨전)**: 흐릿한 점들(노이즈 분포)에서 시작해서 진짜 같은 그림으로 만들어요!\n- 📊 **시험 점수 분석**: 우리 반 점수 분포를 보고 "몇 점이 보통인지" 알 수 있어요.',
  },
  "kids-math-basics/11-stage-summary": {
    title: "💡 우리가 배운 게 모두 합쳐지면?",
    content:
      '1단계에서 배운 모든 것들이 합쳐져서 **ChatGPT 한 마디가 만들어져요**!\n\n- 📝 **벡터·행렬**: "안녕?" 같은 단어가 화살표·표로 바뀌어요.\n- 🔄 **함수·곱하기**: 표를 수천 번 곱하면서 의미를 만들어요.\n- ⚡ **활성화 함수**: "이 단어 켜!", "저 단어 꺼!" 결정해요.\n- 🎲 **확률·분포**: "다음 단어는 어떤 게 좋을까?" 확률로 골라요.\n- 📉 **미분·경사하강법·손실**: AI가 똑똑해지기 위해 매일 공부한 방법!\n\n수학이 이렇게 멋진 일을 한답니다! 🎉',
  },

  // ===== teens-math-basics =====
  "teens-math-basics/01-what-is-vector": {
    title: "💡 벡터로 작동하는 AI 서비스",
    content:
      '벡터는 우리가 매일 쓰는 앱의 **추천·검색·이해 기능**의 핵심이에요.\n\n- **인스타그램·틱톡 추천**: 나의 "좋아요" 기록을 벡터로 만들어, 비슷한 방향의 콘텐츠를 찾아 피드에 올려요.\n- **Spotify·유튜브 뮤직**: 노래마다 "장르·템포·분위기" 벡터가 있어요. 내 취향 벡터와 가까운 노래로 플레이리스트 생성!\n- **얼굴 인식 (아이폰 Face ID)**: 얼굴을 512차원 벡터로 압축. 등록된 벡터와 거리가 가까우면 잠금 해제.\n- **ChatGPT, Claude**: "강아지"와 "개"를 비슷한 벡터로 학습해, 둘이 같은 의미인 줄 알아요.\n- **벡터 DB (Pinecone)**: 거대한 문서를 벡터로 저장. AI가 "비슷한 정보"를 찾을 때 사용해요.',
  },
  "teens-math-basics/02-what-is-matrix": {
    title: "💡 행렬로 작동하는 AI",
    content:
      '행렬은 AI의 **데이터 저장**과 **계산** 모두를 담당해요.\n\n- **이미지 = 행렬**: 1080×1080 사진은 행렬 3장(RGB)이에요. 인스타 필터는 이 행렬을 변환하는 거예요.\n- **신경망 한 층 = 행렬 하나**: 입력 벡터에 가중치 행렬을 곱하면 "한 층의 계산". 100층이면 행렬 100개.\n- **배치 학습**: AI가 한 번에 64장씩 사진을 처리할 때, 64장을 행렬로 묶어 GPU에 한 번에 보내요.\n- **GPU(RTX 4090)**: 행렬 곱셈만을 위해 설계된 칩. 게임 그래픽도 AI 학습도 모두 행렬 곱셈이에요.\n- **추천 시스템**: 넷플릭스 영화 평점표를 "사용자×영화" 행렬로 만들고, 빈칸을 예측해 추천해요.',
  },
  "teens-math-basics/03-what-is-function": {
    title: "💡 모든 AI는 거대한 함수",
    content:
      "AI 모델 = **입력을 출력으로 바꾸는 거대한 수학 함수**예요.\n\n- **ChatGPT (GPT-4)**: 텍스트 → 다음 텍스트 함수. 약 1.8조 개의 숫자(파라미터)로 정의돼요.\n- **테슬라 오토파일럿**: 8개 카메라 영상 → 핸들 각도·가속 함수. 매 0.05초마다 호출.\n- **AI 음악 (Suno, Udio)**: 가사 텍스트 → 멜로디·보컬 음원 함수.\n- **AlphaFold**: 단백질 아미노산 서열 → 3D 구조 함수. 의약품 개발에 혁신을 일으켰어요.\n- **Whisper (OpenAI)**: 오디오 → 글자 함수. 99개 언어를 동시에 인식해요.\n\n신경망은 작은 함수(층)들을 **합성**해서 거대한 함수를 만들어요.",
  },
  "teens-math-basics/04-matrix-multiplication": {
    title: "💡 행렬 곱셈이 만드는 AI 마법",
    content:
      'AI의 **모든 계산은 결국 행렬 곱셈**이에요.\n\n- **Transformer Attention**: ChatGPT가 "이 단어가 어떤 단어에 주목할지" 결정할 때 Q × Kᵀ 행렬 곱을 써요. 한 단어 생성에 수천 번 일어나요.\n- **이미지 변환**: 회전·확대·필터 모두 행렬 곱. 인스타·스냅챗 필터의 수학 비밀!\n- **CNN**: 사진의 작은 부분과 필터의 행렬 곱으로 "여기 눈이 있나? 코가 있나?" 검출해요.\n- **GPU 성능**: NVIDIA H100, RTX 4090의 성능 = 초당 행렬 곱 처리량 (TFLOPS). AI 회사들이 GPU에 수천억을 쓰는 이유예요.',
  },
  "teens-math-basics/05-derivative": {
    title: "💡 미분으로 학습하는 AI",
    content:
      '미분(기울기)은 AI가 **"어느 방향으로 변해야 더 잘 맞출까?"** 알아내는 도구예요.\n\n- **PyTorch의 `.backward()`**: 딥러닝 입문하면 가장 먼저 만나는 함수. 자동으로 모든 파라미터에 대한 미분을 계산해줘요.\n- **ChatGPT 사전훈련**: 수조 개 단어를 보면서, 매 스텝 "어디를 바꿔야 정답에 가까워질까?" 미분으로 알아내요.\n- **Stable Diffusion**: 노이즈를 이미지로 바꾸는 과정의 score 함수를 미분으로 학습해요.\n- **알파고**: 정책 경사(policy gradient)로 "어떤 수를 더 자주 둬야 이길까?" 미분으로 배워요.\n- **자율주행 학습**: 시뮬레이션에서 "어디서 핸들을 더 돌렸어야 했지?" 미분으로 알아내 개선해요.',
  },
  "teens-math-basics/06-gradient-descent": {
    title: "💡 세상 모든 AI의 학습 방법",
    content:
      '유명한 AI는 **거의 다 경사하강법**으로 학습됐어요.\n\n- **ChatGPT, Claude, Gemini**: AdamW 옵티마이저(경사하강법 변형)로 수개월간 학습. 비용은 1번 학습에 수천억 원.\n- **Stable Diffusion·DALL-E 3**: 이미지 생성 능력을 경사하강법으로 익혔어요.\n- **알파고·알파제로**: 바둑·체스 실력을 경사하강법으로 학습. 인간 챔피언을 이긴 이유!\n- **틱톡·인스타 추천**: 매일 새 데이터로 모델을 경사하강법으로 미세조정해 추천 정확도를 올려요.\n- **RLHF**: ChatGPT가 "사람이 좋아하는 답변"을 만들도록 정렬할 때도 경사하강법.',
  },
  "teens-math-basics/07-activation": {
    title: "💡 활성화 함수, AI 모델마다 다르게",
    content:
      '활성화 함수 하나의 선택이 모델 성능을 크게 바꿔요.\n\n- **ReLU**: AlexNet (2012) 이후 거의 모든 이미지 AI의 표준. ResNet, EfficientNet, YOLO 모두 ReLU.\n- **Sigmoid**: "스팸인가 정상인가?" 같은 이진 분류 출력층.\n- **Softmax**: ChatGPT의 다음 단어 확률! "안녕" 35%, "hi" 12%, ... 이런 분포를 만들어요.\n- **GELU·SwiGLU**: GPT-4, Claude, LLaMA 같은 최신 LLM이 채택. ReLU보다 부드러워 학습이 안정적.\n- **Tanh**: 옛 RNN(LSTM)에서 사용. 지금은 거의 안 쓰이지만 음성·시계열에 흔적이 남아있어요.',
  },
  "teens-math-basics/08-loss-function": {
    title: "💡 AI에게 정답을 알려주는 손실 함수",
    content:
      '손실 함수는 AI에게 **"무엇이 정답인지"** 알려주는 유일한 채널이에요.\n\n- **Cross-Entropy**: ChatGPT가 "다음 단어는 \'안녕\'"이라고 학습할 때 쓰는 손실. 이미지 분류에도.\n- **MSE (평균제곱오차)**: 집값 예측, 주가 예측 같은 회귀 문제의 표준.\n- **Triplet Loss**: 얼굴 인식(FaceNet). "같은 사람 사진은 벡터를 가깝게, 다른 사람은 멀게" 만들어요.\n- **Contrastive Loss**: OpenAI CLIP. 이미지와 텍스트를 같은 공간에 정렬해 "이 사진은 강아지" 알게 해요.\n- **Reward Model Loss**: ChatGPT를 "사람이 좋아하는 답변" 쪽으로 미세조정하는 RLHF의 핵심!',
  },
  "teens-math-basics/09-probability": {
    title: "💡 확률로 답하는 AI들",
    content:
      'AI는 "확실히 X"가 아니라 "X일 확률 87%"로 답해요.\n\n- **ChatGPT 단어 고르기**: 매 단어마다 약 5만 개 후보의 확률을 만들고, top-k·top-p로 샘플링. `temperature`도 이 확률을 조절해요.\n- **의료 AI (피부암 진단)**: "악성 종양일 확률 92%"로 의사 진단을 보조.\n- **자율주행 (YOLO 객체 검출)**: 카메라에서 "이 박스 안에 보행자가 있을 확률 0.89".\n- **광고 클릭률 예측**: 인스타·구글이 "이 광고를 너가 클릭할 확률"을 추정해 가장 높은 광고를 보여줘요.\n- **AI 그림 점수**: 미드저니가 "이 그림이 좋을 확률" 4가지 후보를 보여줘요.',
  },
  "teens-math-basics/10-distribution": {
    title: "💡 분포가 만드는 최신 AI",
    content:
      '분포는 AI의 **데이터 생성**과 **이상 탐지**의 핵심이에요.\n\n- **Stable Diffusion·미드저니**: 정규분포 노이즈에서 시작해 "점점 노이즈를 빼면서" 이미지를 만들어요. 분포 변환의 마법!\n- **GAN (얼굴 생성, This Person Does Not Exist)**: 진짜 얼굴 분포를 학습해 가짜 얼굴을 만들어요.\n- **카드 사기 탐지**: 정상 거래 분포에서 벗어난 패턴을 잡아내요.\n- **Batch Normalization**: 신경망 각 층의 출력을 정규분포처럼 정규화해 학습 안정성을 크게 올렸어요.\n- **A/B 테스트**: 틱톡·인스타가 신기능 A안 vs B안 결과 분포를 비교해 의사결정해요.',
  },
  "teens-math-basics/11-stage-summary": {
    title: "💡 이 모든 게 ChatGPT 한 마디에 모여요",
    content:
      'ChatGPT가 "안녕" 한 마디를 만드는 순간, **1단계의 모든 수학이 동시에** 작동해요.\n\n- **벡터·행렬**: 사용자 문장 → 토큰 → 임베딩 벡터 → 배치 행렬.\n- **행렬 곱셈**: Transformer 한 층마다 Q·Kᵀ 계산. 96층 × 수천 번 = 수십억 번의 곱셈.\n- **활성화 함수 (GELU)**: 각 층의 비선형 변환.\n- **확률·분포 (Softmax)**: 약 5만 단어 후보의 확률 분포 → 샘플링.\n- **미분·경사하강법·손실 함수**: 사전훈련 + 미세조정 + RLHF가 모두 이 도구로 진행됨.\n\n수학 1단계가 곧 **ChatGPT 한 마디의 분해도**예요! 🚀',
  },

  // ===== ml-basics (adult) =====
  "ml-basics/01-linear-regression": {
    title: "실제 AI에서 행렬은 어디서 작동할까?",
    content:
      'ML 모델은 **데이터를 행렬로 받아 행렬을 곱하며** 동작합니다.\n\n- **사이킷런·pandas**: 데이터 분석가의 표준 도구. 모든 데이터를 `(n_samples, n_features)` 행렬로 다룹니다.\n- **Kaggle 경진대회**: 입력 행렬 X와 타깃 벡터 y로 모델을 학습. 의료·금융·물류 문제 모두 동일한 형식.\n- **추천 시스템 (Netflix, 왓챠)**: 사용자×아이템 행렬 분해(Matrix Factorization)로 빈 평점을 예측합니다.\n- **신경망 한 층 = 가중치 행렬 W**: 입력 x에 W를 곱하는 것이 "한 층의 계산". GPU/TPU는 이 곱셈을 위해 설계되었어요.\n- **GPT의 임베딩 테이블**: 5만 단어 × 12,288차원의 거대 행렬. 단어 ID로 행을 꺼내 쓰는 lookup.',
  },
  "ml-basics/02-loss-function": {
    title: "AI는 어떤 손실 함수로 학습할까?",
    content:
      '손실 함수는 모델이 "무엇을 배워야 하는지"를 정의하는 **유일한 신호**입니다.\n\n- **Cross-Entropy**: ChatGPT, Claude의 다음 단어 예측. ImageNet 1,000-클래스 분류도 동일.\n- **MSE (평균제곱오차)**: 집값·주가·기온 같은 회귀 문제의 표준.\n- **Huber Loss**: 이상치(outlier)가 많은 데이터에 강건. 자율주행 위치 추정에 자주 사용.\n- **Focal Loss**: 클래스 불균형(예: 사기 거래 검출, 의료 영상의 희귀 병변)에 강한 손실.\n- **Reward Model Loss**: RLHF에서 "사람이 더 좋아할 답변"을 학습하는 ChatGPT 정렬의 핵심.\n- **Triplet Loss**: 얼굴 인식(FaceNet)에서 같은 사람은 가깝게, 다른 사람은 멀게.',
  },
  "ml-basics/02-supervised-learning": {
    title: "지도학습으로 만들어진 AI 서비스들",
    content:
      "우리가 매일 쓰는 AI의 대부분은 **지도학습** 으로 만들어졌어요.\n\n- **스팸 메일 분류 (Gmail)**: (이메일, 스팸/정상) 라벨 데이터를 수억 건 학습. 분류 문제.\n- **신용카드 사기 탐지**: (거래내역, 사기/정상) 데이터로 학습한 이진 분류기.\n- **집값 예측 (Zillow, 다방)**: (집의 특성, 실거래가) 데이터로 학습한 회귀 모델.\n- **이미지 분류 (Google Lens)**: (사진, 라벨) 수천만 장으로 학습한 CNN.\n- **음성 인식 (Siri, Whisper)**: (오디오, 텍스트) 쌍 수만 시간을 학습.\n- **의료 진단 보조**: (X-ray, 진단명) 데이터로 폐렴·결절을 검출하는 모델.",
  },
  "ml-basics/03-gradient-descent": {
    title: "경사하강법이 학습시킨 AI들",
    content:
      "유명한 AI는 거의 **모두 경사하강법으로 학습**되었습니다.\n\n- **ChatGPT, Claude, Gemini**: AdamW 옵티마이저로 수개월간 학습. 1회 학습에 수백억 원.\n- **Stable Diffusion·DALL-E**: 노이즈→이미지 변환의 score를 경사하강법으로 학습.\n- **AlphaGo·AlphaFold**: 바둑·단백질 구조도 경사하강법.\n- **광고·추천 시스템**: 매일 새 데이터로 미세조정. CTR(클릭률)을 높이는 방향으로.\n- **자율주행 (Tesla, Waymo)**: 시뮬레이션과 실주행 데이터로 모델을 경사하강법으로 학습.\n- **PyTorch `.backward() + optimizer.step()`**: 모든 딥러닝 코드의 한 줄.",
  },
  "ml-basics/04-overfitting": {
    title: "과적합과의 싸움, AI 회사의 일상",
    content:
      '과적합 방지는 ML 엔지니어의 **매일의 숙제**입니다.\n\n- **Kaggle 리더보드**: 1등이 public 리더보드는 잘 맞히지만 private에선 폭망하는 경우 = 과적합.\n- **Dropout**: ResNet, BERT 등 거의 모든 신경망이 학습 중 뉴런을 무작위로 꺼서 과적합 방지.\n- **데이터 증강 (Data Augmentation)**: 이미지 회전·크롭, 텍스트 동의어 치환. 자율주행은 다양한 날씨를 합성으로 만들어 일반화.\n- **L1/L2 정규화 (Weight Decay)**: AdamW의 "W"가 weight decay. 거의 모든 LLM이 사용.\n- **Early Stopping**: validation 손실이 오르기 시작하면 학습을 멈춤. PyTorch Lightning, Keras에 기본 탑재.\n- **Train/Validation/Test 분리**: 8:1:1, 7:2:1 같은 비율로 데이터를 나눠 일반화 성능을 측정.',
  },

  // ===== kids-ml-basics =====
  "kids-ml-basics/01-pattern-game": {
    title: "💡 패턴 찾기로 작동하는 AI 친구들",
    content:
      'AI는 모두 **"숨은 패턴 찾기 선수"** 예요!\n\n- 📺 **YouTube 추천**: 내가 본 영상의 패턴을 찾아 "이런 영상도 좋아하겠다!" 추천해요.\n- 🐶 **사진 속 강아지 찾기**: 강아지 사진 수만 장을 보고 "귀가 이렇고, 코가 이렇고..." 패턴을 학습해요.\n- 📧 **스팸 메일 자동 분류**: "광고", "무료" 같은 단어 패턴을 찾아내 자동으로 휴지통으로 옮겨요.\n- 🎵 **Spotify 노래 추천**: 내가 자주 듣는 노래의 박자·분위기 패턴을 찾아 비슷한 노래를 모아줘요.\n- 🌡️ **일기예보**: 과거 날씨 데이터의 패턴을 찾아 "내일은 비가 올 거예요" 예측해요.',
  },
  "kids-ml-basics/02-right-or-wrong": {
    title: "💡 틀리며 배우는 AI들",
    content:
      '세상 모든 AI는 **"틀린 만큼 점수를 매겨서"** 점점 똑똑해져요!\n\n- 🤖 **ChatGPT**: 처음엔 엉터리였지만, "정답과 얼마나 다른지" 점수를 매기며 수억 번 고쳐서 똑똑해졌어요.\n- 🎮 **알파고**: 바둑을 두면서 "이 수가 얼마나 나빴는지" 계산하고, 그만큼 다음번엔 안 두려고 노력했어요.\n- 📸 **카메라 사진 인식**: 처음엔 강아지를 고양이라고 했지만, "틀린 정도"를 기억하고 점점 잘 맞히게 되었어요.\n- 🚗 **자율주행차**: "여기서 핸들을 더 돌렸어야 했는데!" 점수를 매기며 운전을 배워요.\n- 💡 "틀린 점수(손실)"를 줄이는 게 AI 학습의 전부예요!',
  },
  "kids-ml-basics/03-generalization": {
    title: "💡 처음 보는 것도 맞히는 AI 마법",
    content:
      'AI가 똑똑한 이유는 **"외운 게 아니라 패턴을 배워서"** 예요!\n\n- 📸 **Google Photos**: 우리 강아지 사진을 몇 장만 봐도, 처음 보는 각도의 사진도 "우리 강아지!" 알아봐요.\n- 🐱 **고양이 인식**: 검은 고양이만 봤던 AI도 흰 고양이를 보고 "이것도 고양이!" 맞혀요.\n- 🗣️ **번역기 (파파고)**: 처음 보는 문장도 번역할 수 있어요. "문장 만드는 패턴"을 배웠거든요.\n- 🎨 **AI 그림**: 본 적 없는 새로운 그림도 그릴 수 있어요. "그림 그리는 패턴"을 배웠으니까요!\n- 🏆 이걸 **"일반화"** 라고 부르고, AI의 진짜 실력이에요.',
  },
  "kids-ml-basics/04-overfitting": {
    title: '💡 AI도 "공부의 함정"에 빠져요',
    content:
      'AI도 우리처럼 **"문제를 통째로 외우는 함정"** 에 빠질 수 있어요.\n\n- 📚 **학교 시험과 똑같아요**: 문제집을 통째로 외우면 그 문제는 100점, 새 문제는 0점!\n- 🐶 **강아지 인식 AI 실수**: "강아지 = 풀밭 위 사진"이라고 외워버리면, 거실 안 강아지를 못 알아봐요.\n- 🎯 **AI 회사들이 매일 싸우는 적**: 페이스북·구글의 엔지니어가 매일 "우리 AI가 외우기만 한 건 아닌가?" 검사해요.\n- 🛡️ **외움 방지법**: 일부 데이터로만 공부시키고, 나머지로 시험 봐서 진짜 실력을 확인해요!',
  },
  "kids-ml-basics/05-supervised-learning": {
    title: '💡 "문제와 정답"으로 가르치는 AI',
    content:
      '선생님이 정답을 알려주듯, AI에게 "문제 + 정답"을 보여주며 가르치는 게 **지도학습** 이에요.\n\n- 📧 **스팸 메일 분류**: "이 메일 = 스팸", "저 메일 = 정상" 정답을 알려주며 가르쳐요.\n- 🐶 **강아지/고양이 사진 구별**: "이건 강아지 사진!", "이건 고양이 사진!" 정답으로 알려줘요.\n- 🗣️ **음성 인식 (Siri)**: "이 목소리 = \'안녕하세요\'라는 글자" 짝지어 가르쳐요.\n- 🌡️ **일기예보**: "이런 날씨 데이터 = 내일 비가 옴" 과거 정답으로 가르쳐요.\n- 💡 우리가 쓰는 거의 모든 AI가 이런 방식으로 만들어졌어요!',
  },

  // ===== teens-ml-basics =====
  "teens-ml-basics/01-supervised-learning": {
    title: "💡 지도학습으로 작동하는 서비스들",
    content:
      '우리가 매일 쓰는 거의 모든 AI는 **지도학습** 으로 만들어졌어요.\n\n- **Gmail 스팸 필터**: (이메일, 스팸/정상) 라벨 수억 건으로 학습. 이진 분류.\n- **이미지 분류 (Google Lens, Apple Vision)**: (사진, 라벨) 수천만 장으로 학습한 CNN.\n- **음성 인식 (Siri, Whisper)**: (오디오, 텍스트) 쌍 수만 시간을 학습.\n- **신용카드 사기 탐지**: 거래 패턴에 "사기/정상" 라벨을 붙여 학습한 분류기.\n- **집값 예측 (Zillow, 호갱노노)**: (집 특성, 실거래가) 데이터로 학습한 회귀 모델.\n- **자율주행 차선 검출**: (이미지, 차선 위치 좌표) 라벨로 학습한 segmentation 모델.',
  },
  "teens-ml-basics/02-loss-and-gradient": {
    title: "💡 손실과 경사하강법으로 학습된 AI들",
    content:
      '유명한 AI는 **모두 손실 함수 + 경사하강법** 으로 만들어졌어요.\n\n- **ChatGPT, Claude, Gemini**: Cross-Entropy 손실 + AdamW 옵티마이저로 수개월간 학습.\n- **Stable Diffusion**: "노이즈 → 이미지" 변환의 score를 손실로 정의하고 경사하강법으로 학습.\n- **얼굴 인식 (FaceNet)**: Triplet Loss로 "같은 사람은 가깝게, 다른 사람은 멀게" 학습.\n- **알파고**: 정책 경사(policy gradient)로 "이길 확률을 높이는 수"를 학습.\n- **PyTorch의 한 줄**: `loss.backward(); optimizer.step()` — 이 두 줄이 모든 딥러닝의 핵심.\n- **GPU 비용**: NVIDIA H100 한 대당 4만 달러. 경사하강법을 빠르게 하기 위한 투자.',
  },
  "teens-ml-basics/03-generalization": {
    title: "💡 일반화: AI의 진짜 실력",
    content:
      'AI 회사의 진짜 경쟁력은 "외운 게 아니라 **처음 보는 데이터에서 잘하는가**" 예요.\n\n- **Kaggle 경진대회**: public 리더보드 vs private 리더보드. 일반화 못 한 모델은 등수가 폭락해요.\n- **자율주행 시뮬레이션 vs 실주행**: 시뮬레이션에서만 잘하면 실패. 다양한 도시·날씨에 일반화해야 진짜.\n- **의료 AI 승인 (FDA)**: 학습 병원이 아닌 "다른 병원 데이터"에서 성능을 확인해야 허가됨.\n- **GPT의 zero-shot**: 처음 보는 문제도 풀 수 있는 것 = 일반화의 극치.\n- **A/B 테스트**: 회사가 신규 모델을 배포 전에 "새로운 사용자"에 대해 성능을 검증.\n- **train/val/test 분리**: 모든 ML 코드의 기본 패턴.',
  },
  "teens-ml-basics/04-overfitting": {
    title: "💡 과적합과 정규화, 실전 AI의 일상",
    content:
      'ML 엔지니어가 매일 싸우는 **첫 번째 적이 과적합**이에요.\n\n- **Dropout**: BERT, ResNet 등 거의 모든 신경망이 학습 중 뉴런을 무작위로 꺼서 과적합 방지.\n- **Weight Decay (L2)**: AdamW의 "W"가 weight decay. GPT-4, Claude 학습에도 필수.\n- **데이터 증강**: 이미지 회전·크롭, 텍스트 동의어 치환. 자율주행은 가상 날씨를 합성해 일반화.\n- **Early Stopping**: validation 손실이 오르면 학습 중단. PyTorch Lightning, Keras 기본 기능.\n- **Mixup, CutMix**: 이미지 두 장을 섞어 새 데이터를 만드는 증강. ImageNet SOTA 기법.\n- **Validation Set**: 학습에 안 쓴 데이터로 모델 선택 → 진짜 성능 측정.',
  },
  "teens-ml-basics/05-classification-regression": {
    title: "💡 분류 vs 회귀, AI 어디서 쓰일까?",
    content:
      '**분류** 와 **회귀** 는 AI 문제의 두 큰 갈래예요.\n\n**분류 (Classification)**\n- ChatGPT 다음 토큰 예측 (5만 클래스 중 하나)\n- 의료 진단: "양성/음성" 또는 "감기/독감/폐렴/..."\n- 스팸 필터, 사기 거래 탐지 (이진)\n- ImageNet 1,000 클래스, COCO 80 클래스\n- 평가: Accuracy, F1, AUC. "정확도 99%"가 의미 없는 경우(불균형) 주의!\n\n**회귀 (Regression)**\n- 집값·주가·매출 예측\n- 자율주행 핸들 각도, 가속도\n- 광고 클릭률(CTR)\n- 평가: MSE, MAE, R². 예측값과 실제값 사이 거리.',
  },

  // ===== nlp-basics (adult) =====
  "nlp-basics/01-text-embedding": {
    title: "텍스트 임베딩이 작동하는 곳",
    content:
      '텍스트 임베딩은 **RAG·검색·추천의 토대**입니다.\n\n- **OpenAI Embeddings (`text-embedding-3-large`)**: 8,192 토큰까지 한 번에 3,072차원 벡터로 변환. RAG 시스템의 표준.\n- **벡터 데이터베이스 (Pinecone, Weaviate, Qdrant, pgvector)**: 임베딩을 저장하고 유사도 검색. ChatGPT 플러그인, 사내 지식 검색의 핵심.\n- **Cohere, Voyage, Jina Embeddings**: 다국어·도메인 특화 임베딩 제공.\n- **의미 기반 검색 (Semantic Search)**: 구글이 키워드 매칭 → 의미 검색으로 전환한 BERT(2019) 사건.\n- **추천 시스템**: 상품 설명·리뷰를 임베딩해 "비슷한 상품"을 찾는 데 사용 (쿠팡, 아마존).\n- **클러스터링·분류**: 고객 문의를 임베딩한 뒤 자동 분류·라우팅.',
  },
  "nlp-basics/02-transformer": {
    title: "Transformer가 만든 AI 혁명",
    content:
      "Transformer는 **현대 AI의 거의 모든 분야의 표준 아키텍처**가 되었습니다.\n\n- **언어 모델**: GPT-4, Claude, Gemini, LLaMA — 모두 디코더 Transformer.\n- **이미지 인식 (ViT, Vision Transformer)**: CNN을 제치고 SOTA. Google Gemini Vision의 토대.\n- **이미지 생성 (DALL-E 3, Stable Diffusion 3, Sora)**: Diffusion Transformer 채택.\n- **음성 (Whisper)**: 99개 언어 음성 인식. OpenAI Whisper는 Transformer 기반.\n- **단백질 구조 (AlphaFold 2)**: 노벨상의 핵심. 어텐션으로 잔기 간 관계 모델링.\n- **NVIDIA GPU 매출 폭증**: H100, B200 같은 칩이 Transformer 행렬 곱에 최적화된 결과.",
  },
  "nlp-basics/03-llm": {
    title: "LLM이 바꾼 세상",
    content:
      'LLM은 **"다음 토큰 예측"** 하나의 원리로 광범위한 응용을 만들고 있습니다.\n\n- **챗봇**: ChatGPT, Claude, Gemini, Perplexity — 일상의 검색을 대체.\n- **코딩 도우미**: GitHub Copilot, Cursor, Claude Code. 개발자 생산성 2배 이상 향상.\n- **콘텐츠 생성**: 기사·마케팅 카피·이메일 초안 자동 생성.\n- **AI 에이전트**: Claude의 컴퓨터 사용, OpenAI Operator. "행동"하는 AI.\n- **기업 자동화**: 고객 상담 챗봇, 문서 요약, 회의록 자동화 (Notion AI, Glean).\n- **RAG**: 사내 문서·웹·DB와 결합해 사실 기반 답변 (Perplexity, NotebookLM).\n- **번역·요약·교정**: DeepL, Grammarly 같은 도구가 LLM 기반으로 재편.',
  },

  // ===== kids-nlp-basics =====
  "kids-nlp-basics/01-words-as-numbers": {
    title: "💡 단어 숫자가 만드는 마법",
    content:
      '단어를 숫자(임베딩)로 바꾸면 AI가 **"비슷한 단어"를 알아챌 수 있어요**!\n\n- 🤖 **ChatGPT가 단어 뜻을 아는 비결**: "강아지"와 "개"를 비슷한 숫자로 만들어서 같은 뜻인 줄 알아요.\n- 🔎 **구글 검색**: "맛있는 빵집"을 검색하면 "좋은 베이커리"도 같이 찾아줘요. 비슷한 단어니까요!\n- 🛍️ **쇼핑몰 추천**: 내가 "운동화" 검색하면 "스니커즈"도 보여줘요. 단어 숫자가 가깝거든요.\n- 🌐 **번역기 (파파고)**: "사과"를 "apple"로 바꿀 수 있는 이유는, 두 단어의 숫자 좌표가 같은 "과일 동네"에 살아서예요!',
  },
  "kids-nlp-basics/02-chatbot-magic": {
    title: '💡 챗봇은 모두 "다음 단어 맞히기" 챔피언!',
    content:
      'ChatGPT 같은 챗봇은 정답을 외운 게 아니라, **"다음 단어가 뭘까?"** 게임을 잘하는 거예요!\n\n- 🤖 **ChatGPT, Claude, Gemini**: "안녕하세요. 오늘은..." 다음에 어떤 단어가 올지 확률로 맞혀요.\n- 💬 **카카오톡 자동 추천 답장**: 친구가 "밥 먹었어?" 물으면 "네", "아니요" 추천하는 것도 같은 원리!\n- ✏️ **휴대폰 자동완성**: 키보드 위에 "좋은", "안녕" 같은 추천 단어가 뜨는 것도 다음 단어 예측이에요.\n- 🎵 **AI 작곡**: 다음에 어떤 음이 올지 맞히는 것도 똑같은 게임이에요!',
  },
  "kids-nlp-basics/03-translator": {
    title: "💡 번역기·통역기는 어떻게 만들어졌을까?",
    content:
      '번역 AI는 단어를 하나씩 바꾸는 게 아니라 **"문장의 의미"를 먼저 이해**해요.\n\n- 🌐 **파파고, Google 번역**: "비가 와요" → 의미 이해 → "It\'s raining" 다시 표현.\n- 🎧 **실시간 통역 이어폰 (Galaxy Buds, Pixel Buds)**: 내 한국말을 듣고 의미를 이해해서 영어로 바로 말해줘요.\n- 📱 **AR 번역 (구글 렌즈)**: 외국 간판을 카메라로 비추면 의미를 이해하고 한국어로 보여줘요.\n- 🎬 **유튜브 자동 자막**: 음성을 글자로 바꾸고, 한국어로 번역해서 자막을 만들어줘요.\n- 💡 모두 "의미를 다리 놓는" 같은 원리예요!',
  },

  // ===== teens-nlp-basics =====
  "teens-nlp-basics/01-embedding": {
    title: "💡 임베딩이 만드는 진짜 AI 서비스",
    content:
      '단어 임베딩은 "의미를 좌표로" 옮기는 기술로, **거의 모든 텍스트 AI의 출발점**이에요.\n\n- **OpenAI Embeddings API**: 한 줄 코드로 텍스트 → 3,072차원 벡터. 월 수억 건 호출.\n- **벡터 DB (Pinecone, Weaviate)**: 임베딩을 저장해 "비슷한 문서 찾기" 검색. 사내 챗봇, RAG의 핵심.\n- **구글 검색 (BERT)**: 2019년부터 의미 기반 검색으로 전환. "파스타 만들기" → "스파게티 조리법"도 찾음.\n- **쿠팡·아마존 상품 추천**: 상품 설명을 임베딩해 "내가 본 것과 비슷한" 상품 추천.\n- **Spotify 노래 매칭**: 노래·재생목록을 임베딩해 비슷한 음악을 추천.\n- **king - man + woman ≈ queen**: 의미 연산이 가능한 임베딩 공간의 놀라움.',
  },
  "teens-nlp-basics/02-llm-transformer": {
    title: "💡 트랜스포머가 만든 AI 시대",
    content:
      '트랜스포머와 "다음 토큰 예측"이 **현대 AI를 만들었어요**.\n\n- **ChatGPT, Claude, Gemini, LLaMA**: 모두 디코더 트랜스포머. "다음 토큰 예측"만으로 추론·코딩·번역까지!\n- **GitHub Copilot, Cursor, Claude Code**: 코드 자동완성도 같은 원리. "다음에 올 코드" 예측.\n- **Vision Transformer (ViT)**: 이미지에도 트랜스포머. Gemini Vision, GPT-4o의 시각 능력.\n- **DALL-E 3, Stable Diffusion 3, Sora**: 이미지·동영상 생성도 Diffusion Transformer.\n- **Whisper (OpenAI)**: 99개 언어 음성 인식. 트랜스포머 기반.\n- **AlphaFold 2 (노벨상)**: 단백질 구조 예측. 어텐션으로 잔기 간 관계 학습.',
  },
  "teens-nlp-basics/03-prompt-hallucination": {
    title: "💡 LLM을 잘 다루는 게 능력이에요",
    content:
      '프롬프트·환각·컨텍스트는 **"AI 시대 진짜 실력"** 의 핵심 개념이에요.\n\n- **프롬프트 엔지니어링**: "단계별로 생각해줘 (Chain of Thought)" 같은 기법이 성능을 30% 이상 올려요.\n- **RAG (Retrieval-Augmented Generation)**: 환각 방지의 표준 해결책. Perplexity, NotebookLM이 이렇게 사실 기반 답변.\n- **컨텍스트 윈도우 경쟁**: Claude는 200K·1M 토큰, Gemini 1.5는 2M 토큰. 책 한 권을 통째로 이해.\n- **Temperature 조절**: 0이면 보수적 답변(코딩에 좋음), 높이면 창의적(아이디어 브레인스토밍).\n- **OpenAI Function Calling, Anthropic Tool Use**: LLM이 외부 도구를 호출해 환각을 줄이는 방법.\n- **AI 에이전트 (Claude Computer Use, Operator)**: 프롬프트로 컴퓨터를 직접 조작하게 만드는 차세대 기술.',
  },

  // ===== dl-basics (adult) =====
  "dl-basics/01-neural-network": {
    title: "신경망이 작동하는 분야들",
    content:
      "신경망은 **거의 모든 현대 AI 시스템의 백본**입니다.\n\n- **이미지 인식 (ResNet, EfficientNet)**: 의료 영상 진단, 얼굴 인식, 자율주행 인지.\n- **음성 인식·합성 (Whisper, ElevenLabs)**: Siri, Alexa, 통화 자동 받기.\n- **언어 모델 (GPT-4, Claude)**: 챗봇, 코딩 도우미, 번역.\n- **추천 시스템 (YouTube DNN, Meta DLRM)**: 페이스북·인스타·틱톡 피드.\n- **강화학습 (AlphaGo, AlphaZero)**: 게임 AI, 로봇 제어, 자율주행 의사결정.\n- **생성 모델 (Stable Diffusion, Sora)**: 이미지·동영상·음악 생성.\n- **단백질 구조 (AlphaFold)**: 신약 개발 시간을 수년 → 수일로 단축.",
  },
  "dl-basics/02-backpropagation": {
    title: "역전파가 학습시킨 AI들",
    content:
      "역전파는 **모든 신경망 학습의 엔진**입니다.\n\n- **PyTorch `.backward()`**: 모델 코드 한 줄로 모든 파라미터의 기울기를 자동 계산.\n- **TensorFlow GradientTape**: 구글이 만든 자동 미분 시스템. TPU에 최적화.\n- **JAX `jax.grad()`**: DeepMind이 즐겨 쓰는 함수형 자동 미분. AlphaFold가 사용.\n- **ChatGPT 학습**: 1.8조 파라미터에 대한 기울기를 매 스텝 역전파로 계산.\n- **Stable Diffusion 학습**: 노이즈→이미지 변환 함수의 기울기를 역전파.\n- **메모리 절약 기법 (gradient checkpointing)**: 역전파를 위한 중간값 저장을 줄여 거대 모델 학습 가능.\n- **혼합 정밀도 (mixed precision)**: 역전파 속도와 메모리를 모두 잡는 표준 기법.",
  },
  "dl-basics/03-cnn": {
    title: "CNN이 작동하는 곳",
    content:
      'CNN은 **이미지·영상·신호 처리의 표준** 도구입니다.\n\n- **사진 검색·분류 (Google Lens)**: 사진을 찍어 "이건 무슨 꽃인가?" 식별.\n- **의료 영상 진단**: 폐 결절, 피부암, 당뇨망막병증 검출. FDA 승인된 모델 다수.\n- **자율주행 카메라 인지**: Tesla, Waymo의 카메라 영상에서 차·보행자·차선 검출.\n- **얼굴 인식 (FaceID, ArcFace)**: CNN으로 얼굴 임베딩 추출 후 비교.\n- **공장 불량 검출**: 제조 공정의 자동 품질 검사. 삼성전자·LG의 스마트 팩토리.\n- **위성 사진 분석**: 산림 변화, 농업 작황, 도시 발전 모니터링.\n- **Vision Transformer로 대체 중**: 최신 모델은 ViT가 CNN을 능가하지만 CNN은 여전히 효율성 최강.',
  },

  // ===== kids-dl-basics =====
  "kids-dl-basics/01-brain-network": {
    title: "💡 AI 두뇌(신경망)가 작동하는 곳",
    content:
      '신경망은 우리 주변 모든 AI의 **두뇌**예요!\n\n- 📸 **사진에서 강아지·고양이 찾기**: 신경망이 사진을 보고 "강아지!", "고양이!" 알아맞혀요.\n- 🎤 **Siri, 빅스비 음성 인식**: 신경망이 내 목소리를 듣고 글자로 바꿔줘요.\n- 🤖 **ChatGPT**: 거대한 신경망이 "다음 단어"를 예측해 대답을 만들어요.\n- 🎮 **게임 AI (알파고)**: 신경망이 바둑판을 보고 "여기 두면 좋겠다!" 결정해요.\n- 🎨 **AI 그림 (미드저니)**: 신경망이 글자를 보고 멋진 그림을 그려줘요.\n- 🚗 **자율주행차**: 신경망이 카메라 영상을 보고 "앞에 사람!", "빨간불!" 알려줘요.',
  },
  "kids-dl-basics/02-find-the-cat": {
    title: "💡 작은 창문으로 사진 보는 AI",
    content:
      'CNN은 사진을 **"작은 창문으로 한 칸씩 들여다보는"** AI예요!\n\n- 📱 **Apple 사진 앱**: 우리 강아지 사진을 자동으로 모아줘요. CNN이 강아지 모양을 찾았거든요!\n- 🚗 **자율주행차**: 카메라로 본 사진에서 사람·자동차·신호등을 작은 창문으로 검사해요.\n- 🏥 **병원 X-ray 분석**: 의사 선생님을 도와 X-ray 사진에서 아픈 곳을 찾아요.\n- 📸 **인스타그램 필터**: 카메라가 내 얼굴을 찾아 토끼 귀를 씌워주는 것도 CNN!\n- 🏭 **공장 불량 검사**: 과자·자동차 부품 같은 제품의 작은 흠집을 자동으로 찾아내요.',
  },
  "kids-dl-basics/03-backprop": {
    title: '💡 "어디서 틀렸지?" 거꾸로 따라가는 AI',
    content:
      '역전파는 AI가 **"어디서 틀렸나?"** 거꾸로 찾아가서 고치는 방법이에요!\n\n- 🤖 **ChatGPT의 학습**: "답이 틀렸어! 어느 부분이 문제였지?" 거꾸로 따라가서 고쳐요.\n- 🎮 **알파고**: "이 수가 나빴구나! 그 전 어떤 판단이 잘못이었지?" 거꾸로 분석해요.\n- 🎨 **AI 그림 학습**: "내 그림이 진짜와 다르네! 어디부터 잘못 그렸지?" 거꾸로 짚어요.\n- 🚗 **자율주행차 학습**: "사고가 났네! 어느 판단이 잘못이었지?" 거꾸로 따라가요.\n- 💡 모든 AI가 똑똑해지는 비밀이 이 "거꾸로 찾기" 안에 숨어 있어요!',
  },

  // ===== teens-dl-basics =====
  "teens-dl-basics/01-neural-network": {
    title: "💡 신경망이 만든 AI 세계",
    content:
      "신경망은 **거의 모든 현대 AI의 뼈대**예요.\n\n- **ChatGPT, Claude, Gemini**: 96~120층 깊이의 거대 트랜스포머 신경망.\n- **YouTube·틱톡 추천 (DLRM)**: 메타·구글의 추천 신경망. 매일 수십억 명의 피드를 결정.\n- **Tesla FSD, Waymo**: 카메라·라이다 데이터를 받는 거대 신경망이 핸들·가속을 결정.\n- **얼굴 인식 (FaceID)**: 작은 온디바이스 신경망이 0.1초 만에 얼굴을 인식.\n- **AlphaFold (노벨상)**: 신경망이 단백질 3D 구조 예측 — 신약 개발 혁신.\n- **Stable Diffusion·Sora**: 노이즈를 이미지·영상으로 바꾸는 거대 신경망.",
  },
  "teens-dl-basics/02-cnn-image": {
    title: "💡 CNN이 작동하는 분야들",
    content:
      'CNN은 **이미지·영상·신호의 표준 도구**예요.\n\n- **Google Lens, Apple Vision**: 사진을 찍으면 "이건 무슨 꽃, 음식, 책인가?" 식별.\n- **의료 영상 (피부암 진단, 폐 결절 검출)**: FDA 승인된 CNN 모델 수십 개.\n- **자율주행 인지 (Tesla, Waymo)**: 8개 카메라 영상에서 차·보행자·차선 검출.\n- **얼굴 인식 (ArcFace)**: 얼굴 사진 → 512차원 임베딩 → 거리로 같은 사람인지 판단.\n- **공장 품질 검사 (삼성, LG 스마트 팩토리)**: 반도체·자동차 부품의 작은 결함 자동 탐지.\n- **위성 사진 분석**: 산림 파괴, 농업 작황, 도시 변화 모니터링.\n- **Vision Transformer로 대체 중**: 최신은 ViT가 SOTA이지만 CNN은 여전히 효율성의 왕.',
  },
  "teens-dl-basics/03-backprop": {
    title: "💡 역전파와 자동 미분, 실전에서",
    content:
      "역전파는 **모든 딥러닝의 학습 엔진**이에요.\n\n- **PyTorch `loss.backward()`**: 한 줄로 모든 파라미터 기울기 계산. 전 세계 ML 코드의 표준.\n- **TensorFlow `tf.GradientTape`**: 구글의 자동 미분 시스템. TPU에 최적화.\n- **JAX `jax.grad()`**: DeepMind이 자주 쓰는 함수형 자동 미분. AlphaFold도 JAX 기반.\n- **ChatGPT 학습**: 1.8조 파라미터의 기울기를 매 스텝 역전파로 계산. 한 번 학습에 수개월.\n- **Gradient Checkpointing**: 메모리 절약 트릭. 거대 모델 학습의 표준.\n- **Mixed Precision (FP16/BF16)**: 역전파를 더 빠르고 적은 메모리로. NVIDIA H100의 핵심 기능.\n- **Distributed Training (DDP, FSDP)**: 수천 개 GPU에 역전파를 분산.",
  },

  // ===== ai-apps (adult) =====
  "ai-apps/01-claude-api": {
    title: "Claude API로 만들어진 실제 서비스들",
    content:
      "Claude API는 **수많은 AI 제품의 엔진**입니다.\n\n- **Cursor, Claude Code, Zed**: 개발자용 AI 코딩 도우미.\n- **Notion AI, Quora Poe**: 노트·검색에 Claude를 결합.\n- **Perplexity Pro**: 검색 결과를 Claude로 요약·합성.\n- **DuckDuckGo AI Chat, Brave Leo**: 프라이버시 중심 챗봇.\n- **Slack, Zoom의 AI 요약**: 회의록 자동화에 Claude 사용.\n- **법률·의료 분석 (Harvey, Glass Health)**: 도메인 특화 AI 어시스턴트.\n- **고객 상담 자동화**: Intercom Fin, Ada — 수십%의 상담을 LLM이 처리.\n- **API 호출 패턴**: messages API + 시스템 프롬프트 + 도구 호출이 표준.",
  },
  "ai-apps/02-rag": {
    title: "RAG로 만들어진 서비스들",
    content:
      'RAG는 **"AI에게 외부 지식을 붙이는"** 가장 보편적인 패턴이에요.\n\n- **Perplexity, You.com**: 검색 결과를 LLM이 합성해 답변. 환각을 줄임.\n- **NotebookLM (구글)**: 내 문서를 업로드하면 그 안에서만 답변하는 RAG.\n- **사내 위키 챗봇 (Glean, Dust)**: 회사 문서·슬랙·노션을 인덱싱해 "우리 회사 정책은?" 답변.\n- **고객 지원 봇**: 매뉴얼·FAQ를 벡터 DB에 넣고 LLM이 답변.\n- **법률 검색 (Harvey)**: 판례 데이터베이스에서 관련 사례를 끌어와 답.\n- **의료 결정 보조 (OpenEvidence)**: 최신 의학 논문에서 증거를 끌어와 의사에게 제시.\n- **표준 스택**: OpenAI/Claude + Pinecone/pgvector + LangChain/LlamaIndex.',
  },
  "ai-apps/03-deployment": {
    title: "AI 앱 배포의 실제 패턴",
    content:
      '프로덕션 AI 앱은 **"API 호출 + 인프라"** 의 조합으로 만들어져요.\n\n- **Vercel**: Next.js 풀스택 배포의 표준. AI 앱 80%가 여기서 시작.\n- **Cloudflare Workers, AWS Lambda**: 서버리스로 비용 최적화.\n- **OpenAI/Anthropic API + 캐싱 (Prompt Caching)**: 입력 토큰 비용을 90% 절감 가능.\n- **레이트 리미팅·재시도 로직**: Upstash Redis로 사용자별 호출 제한.\n- **관찰성 (LangSmith, Helicone, Langfuse)**: 모든 LLM 호출을 로깅·분석.\n- **환경변수 관리**: `.env.local`은 로컬, Vercel 대시보드에 프로덕션 키. 절대 commit 금지.\n- **WAF·시크릿 스캐닝**: GitHub Secret Scanning이 키 누출을 감지하면 자동 폐기.',
  },

  // ===== kids-ai-apps =====
  "kids-ai-apps/01-talk-with-ai": {
    title: "💡 좋은 부탁이 좋은 결과를 만들어요!",
    content:
      'AI에게 잘 부탁하는 기술은 **"프롬프트 엔지니어링"** 이라는 진짜 직업이에요!\n\n- 💼 **새 직업 "프롬프트 엔지니어"**: AI에게 잘 시키는 사람을 회사들이 비싸게 채용해요.\n- 🎨 **그림 그리는 AI (미드저니)**: "멋진 강아지"보다 "황금빛 햇살 아래, 잔디밭 위 골든리트리버"라고 부탁하면 훨씬 멋진 그림이 나와요.\n- 📝 **숙제 도와주는 AI**: "수학 문제 풀어줘"보다 "이 문제를 단계별로 설명해줘"라고 부탁하면 더 잘 가르쳐줘요.\n- 🎬 **유튜브 스크립트**: 유튜버들도 AI에게 잘 부탁해서 영상 대본을 만들어요!',
  },
  "kids-ai-apps/02-build-my-helper": {
    title: "💡 역할 정해주기로 만든 AI 도우미들",
    content:
      'AI에게 역할을 정해주면 **나만의 비서·선생님·친구**가 돼요!\n\n- 🎮 **게임 NPC**: 게임 속 캐릭터들이 "넌 마법사 상인이야!" 같은 역할로 만들어진 AI예요.\n- 📚 **AI 영어 선생님 (스픽, 듀오링고)**: "넌 친절한 영어 선생님이야!" 역할을 받은 AI예요.\n- 🍳 **요리 AI (Whisk, Mealime)**: "넌 셰프야, 우리 집 재료로 만들 수 있는 요리를 추천해줘!"\n- 💼 **회사 비서 AI**: "넌 우리 회사 고객 상담사야!" 역할을 받아 24시간 일해요.\n- 💡 GPT 스토어, Claude Projects에서 누구나 자기 AI를 만들 수 있어요!',
  },
  "kids-ai-apps/03-study-with-ai": {
    title: "💡 AI와 똑똑하게 공부하는 사람들",
    content:
      'AI는 "답을 베끼는 도구"가 아니라 **"실력을 늘리는 친구"** 여야 해요!\n\n- 📚 **카이스트, 서울대 학생들**: AI에게 답을 묻지 않고 "이 개념을 다른 방식으로 설명해줘"라고 해요.\n- 💻 **프로그래머들**: 코드 답을 베끼지 않고 "왜 이 방법이 더 좋은지" AI에게 물어봐요.\n- 🌍 **칸 아카데미의 AI 튜터 (Khanmigo)**: 답을 알려주지 않고 "네 생각은 어떻게 다른데?" 되물어요.\n- 🎓 **외국어 공부**: 답안지를 보는 게 아니라 "내가 만든 문장의 어디가 어색해?" 라고 물어요.\n- 💡 AI를 잘 쓰는 사람은 **"답이 아니라 힌트"** 를 받아요!',
  },

  // ===== teens-ai-apps =====
  "teens-ai-apps/01-prompt-engineering": {
    title: "💡 프롬프트 엔지니어링이 진짜 직업이에요",
    content:
      '프롬프트 엔지니어링은 **2023년에 새로 생긴 직업**이에요!\n\n- **연봉 정보**: 프롬프트 엔지니어 연봉이 미국에서 30만 달러 이상까지 나와요.\n- **Chain of Thought**: "단계별로 생각해줘" 한 마디로 수학·논리 문제 정확도가 30%+ 상승.\n- **Few-shot 예시**: 좋은 예시 3~5개만 보여줘도 모델 성능이 크게 올라요.\n- **출력 형식 명시**: "JSON으로", "마크다운 표로" 라고 하면 후처리가 쉬워져요.\n- **시스템 프롬프트**: ChatGPT 커스텀 지시사항, Claude Projects, Cursor 시스템 프롬프트 모두 같은 원리.\n- **Anthropic Prompt Library**: Anthropic이 공개한 잘 쓴 프롬프트 모음.\n- **자동 프롬프트 최적화 (DSPy)**: AI가 AI 프롬프트를 자동으로 개선하는 라이브러리.',
  },
  "teens-ai-apps/02-rag-and-app": {
    title: "💡 RAG로 만들어진 진짜 서비스들",
    content:
      'RAG는 **"AI에게 내 자료로 답하게 하는"** 표준 패턴이에요.\n\n- **Perplexity, You.com**: 검색 결과를 LLM이 합성. 출처 인용으로 환각 방지.\n- **NotebookLM (구글)**: 내 PDF·문서를 업로드하면 그 안에서만 답해요.\n- **Glean, Dust**: 회사 위키·슬랙·노션·드라이브를 RAG로 묶어 사내 검색 봇으로 만듦.\n- **Cursor의 코드베이스 검색**: 코드를 인덱싱해 "이 함수는 어디서 쓰여?" 답함.\n- **Harvey (법률 AI)**: 판례 DB에서 관련 사례를 끌어와 변호사에게 제시.\n- **OpenEvidence (의료)**: 최신 의학 논문 수십만 건에서 증거 기반 답변.\n- **표준 스택**: Pinecone/pgvector + OpenAI/Claude + LangChain/LlamaIndex.',
  },
  "teens-ai-apps/03-tools-and-agents": {
    title: "💡 AI 에이전트가 만드는 미래",
    content:
      'AI 에이전트는 **"행동하는 AI"** 로, 차세대 AI의 핵심이에요.\n\n- **Claude Computer Use**: Claude가 직접 컴퓨터 화면을 보고 마우스·키보드로 조작.\n- **OpenAI Operator**: 웹 브라우저를 자동 조작해 예약·구매·검색.\n- **GitHub Copilot Workspace, Cursor Agent**: 코드를 직접 작성·수정·테스트하는 코딩 에이전트.\n- **Devin (Cognition AI)**: "이 버그 고쳐" 한 마디에 며칠 동안 자율 작업하는 SWE 에이전트.\n- **AutoGPT, BabyAGI**: "목표만 주면 알아서 단계를 계획·실행" 시도의 시초.\n- **Function Calling, Tool Use**: OpenAI·Anthropic API의 표준 기능. AI가 외부 API를 호출.\n- **MCP (Model Context Protocol)**: Anthropic이 만든 AI-도구 연결의 표준 프로토콜.',
  },
};

function processLesson(key, app) {
  const path = resolve(ROOT, `content/lessons/${key}.json`);
  const raw = readFileSync(path, "utf8");
  const lesson = JSON.parse(raw);

  if (lesson.sections.some((s) => s.type === "application")) {
    console.log(`SKIP (already has application): ${key}`);
    return;
  }

  const insertOrder = Math.max(...lesson.sections.map((s) => s.order)) + 1;

  lesson.sections.push({
    id: "s-app",
    type: "application",
    title: app.title,
    content: app.content,
    order: insertOrder,
  });

  lesson.sections.sort((a, b) => a.order - b.order);

  const now = new Date().toISOString();
  lesson.updatedAt = now;

  writeFileSync(path, JSON.stringify(lesson, null, 2) + "\n");
  console.log(`OK: ${key}`);
}

for (const [key, app] of Object.entries(APPLICATIONS)) {
  try {
    processLesson(key, app);
  } catch (err) {
    console.error(`FAIL: ${key} — ${err.message}`);
    process.exitCode = 1;
  }
}
