"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getWrongAnswers,
  clearWrongAnswers,
  type WrongAnswer,
} from "@/lib/wrong-answers";

function generatePdf(answers: WrongAnswer[]) {
  const date = new Date().toLocaleDateString("ko-KR");
  const rows = answers
    .map((ans, i) => {
      const lessonHeader =
        i === 0 || answers[i - 1].lessonTitle !== ans.lessonTitle
          ? `<tr><td colspan="2" class="lesson-header">${ans.lessonTitle}</td></tr>`
          : "";
      const options = ans.options
        .map((opt) => {
          const isCorrect = opt.key === ans.correctKey;
          const isSelected = opt.key === ans.selectedKey;
          const cls = isCorrect ? "correct" : isSelected ? "wrong" : "";
          const mark = isCorrect ? "✓" : isSelected ? "✗" : "";
          return `<div class="option ${cls}">${mark} ${opt.key}. ${opt.text}</div>`;
        })
        .join("");
      return `${lessonHeader}
        <tr>
          <td class="q-cell">Q${i + 1}. ${ans.question}<div class="options">${options}</div></td>
          <td class="exp-cell">${ans.explanation}</td>
        </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>오답노트 ${date}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Apple SD Gothic Neo', '맑은 고딕', sans-serif; font-size: 11pt; color: #111; }
    header { background: #4f46e5; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
    header h1 { font-size: 13pt; }
    header span { font-size: 9pt; opacity: .8; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    td { vertical-align: top; padding: 8px 10px; border-bottom: 1px solid #e5e7eb; }
    .lesson-header td { background: #eef2ff; color: #4338ca; font-weight: bold; font-size: 10pt; padding: 6px 10px; }
    .q-cell { width: 55%; }
    .exp-cell { width: 45%; color: #374151; font-size: 10pt; }
    .options { margin-top: 6px; display: flex; flex-direction: column; gap: 2px; }
    .option { font-size: 10pt; color: #6b7280; padding-left: 4px; }
    .option.correct { color: #059669; font-weight: bold; }
    .option.wrong { color: #dc2626; }
    @media print { @page { margin: 15mm; } }
  </style>
</head>
<body>
  <header><h1>AI 학습 앱 · 오답노트</h1><span>${date}</span></header>
  <table><tbody>${rows}</tbody></table>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
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

  function handleDownload() {
    if (answers.length === 0) return;
    setGenerating(true);
    generatePdf(answers);
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
