export interface QuizOption {
  key: string;
  text: string;
}

export interface ParsedQuiz {
  question: string;
  options: QuizOption[];
  answerKey: string;
  explanation: string;
}

export function parseQuiz(content: string): ParsedQuiz | null {
  const lines = content.split("\n").map((l) => l.trim());

  const questionLine = lines.find((l) => l.startsWith("Q:"));
  if (!questionLine) return null;
  const question = questionLine.replace(/^Q:\s*/, "");

  const options: QuizOption[] = lines
    .filter((l) => /^[A-D]\)/.test(l))
    .map((l) => ({ key: l[0], text: l.slice(3).trim() }));

  const answerLine = lines.find((l) => l.startsWith("정답:")) ?? "";
  const answerKey = answerLine.match(/[A-D]/)?.[0] ?? "";

  const explanationLine = lines.find((l) => l.startsWith("해설:")) ?? "";
  const explanation = explanationLine.replace(/^해설:\s*/, "");

  return { question, options, answerKey, explanation };
}
