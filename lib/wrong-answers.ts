const STORAGE_KEY = "wrong-answers";

export interface WrongAnswer {
  id: string;
  lessonId: string;
  lessonTitle: string;
  question: string;
  options: { key: string; text: string }[];
  selectedKey: string;
  correctKey: string;
  explanation: string;
  savedAt: string;
}

export function getWrongAnswers(): WrongAnswer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as WrongAnswer[];
  } catch {
    return [];
  }
}

export function saveWrongAnswer(
  data: Omit<WrongAnswer, "id" | "savedAt">,
): void {
  const existing = getWrongAnswers();
  const dupKey = `${data.lessonId}::${data.question}`;
  const hasDup = existing.some(
    (a) => `${a.lessonId}::${a.question}` === dupKey,
  );
  if (hasDup) return;

  const entry: WrongAnswer = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, entry]));
}

export function removeWrongAnswer(id: string): void {
  const filtered = getWrongAnswers().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearWrongAnswers(): void {
  localStorage.removeItem(STORAGE_KEY);
}
