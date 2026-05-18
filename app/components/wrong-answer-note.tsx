"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWrongAnswers,
  clearWrongAnswers,
  type WrongAnswer,
} from "@/lib/wrong-answers";

function generatePdf(answers: WrongAnswer[]) {
  // dynamic import to avoid SSR issues
  return import("jspdf").then(({ jsPDF }) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 16;
    const contentW = pageW - margin * 2;
    let y = 20;

    const addText = (
      text: string,
      size: number,
      color: [number, number, number],
      bold = false,
    ) => {
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, contentW) as string[];
      const lineH = size * 0.45;
      if (y + lines.length * lineH > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(lines, margin, y);
      y += lines.length * lineH + 2;
    };

    // Title
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageW, 14, "F");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("AI 학습 앱 · 오답노트", margin, 9);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString("ko-KR"), pageW - margin - 20, 9);
    y = 24;

    answers.forEach((ans, i) => {
      // Lesson separator
      if (i === 0 || answers[i - 1].lessonTitle !== ans.lessonTitle) {
        if (i !== 0) y += 4;
        addText(`[ ${ans.lessonTitle} ]`, 10, [99, 102, 241], true);
        y += 1;
      }

      // Question
      addText(`Q${i + 1}. ${ans.question}`, 9, [229, 231, 235], true);

      // Options
      ans.options.forEach((opt) => {
        const isCorrect = opt.key === ans.correctKey;
        const isSelected = opt.key === ans.selectedKey;
        const prefix = isCorrect ? "[O]" : isSelected ? "[X]" : "   ";
        const color: [number, number, number] = isCorrect
          ? [52, 211, 153]
          : isSelected
            ? [248, 113, 113]
            : [156, 163, 175];
        addText(`  ${prefix} ${opt.key}. ${opt.text}`, 8, color);
      });

      y += 1;
      // Explanation
      addText(`\ud95c설: ${ans.explanation}`, 8, [209, 213, 219]);
      y += 4;

      // Divider
      doc.setDrawColor(55, 65, 81);
      doc.line(margin, y - 2, pageW - margin, y - 2);
    });

    doc.save(`오답노트_${new Date().toISOString().slice(0, 10)}.pdf`);
  });
}

export function WrongAnswerNote() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<WrongAnswer[]>([]);
  const [generating, setGenerating] = useState(false);

  const refresh = useCallback(() => {
    const data = getWrongAnswers();
    setCount(data.length);
    setAnswers(data);
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 2000);
    return () => clearInterval(id);
  }, [refresh]);

  async function handleDownload() {
    if (answers.length === 0) return;
    setGenerating(true);
    await generatePdf(answers);
    setGenerating(false);
  }

  function handleClear() {
    clearWrongAnswers();
    refresh();
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
      >
        <span className="text-base">📝</span>
        <span className="flex-1 text-left">오답노트 정리</span>
        {count > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-72 rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
          <div className="border-b border-gray-800 px-4 py-3">
            <p className="text-sm font-semibold text-white">오답노트</p>
            <p className="text-xs text-gray-500">틀린 문제 {count}개 저장됨</p>
          </div>

          {answers.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-gray-600">
              아직 틀린 문제가 없습니다 🎉
            </p>
          ) : (
            <ul className="max-h-56 overflow-y-auto divide-y divide-gray-800">
              {answers.map((a) => (
                <li key={a.id} className="px-4 py-2.5">
                  <p className="text-xs font-medium text-indigo-400 mb-0.5">
                    {a.lessonTitle}
                  </p>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {a.question}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2 border-t border-gray-800 p-3">
            <button
              onClick={handleDownload}
              disabled={answers.length === 0 || generating}
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generating ? "생성 중..." : "PDF 다운로드"}
            </button>
            <button
              onClick={handleClear}
              disabled={answers.length === 0}
              className="rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-red-700 hover:text-red-400 disabled:opacity-40"
            >
              전체 삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
