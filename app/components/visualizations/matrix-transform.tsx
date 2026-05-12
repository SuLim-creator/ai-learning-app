"use client";

import { useState } from "react";

const SIZE = 300;
const ORIGIN = SIZE / 2;
const SCALE = 40;
const GRID_RANGE = 3;

interface Matrix2x2 {
  a: number;
  b: number;
  c: number;
  d: number;
}

function applyMatrix(m: Matrix2x2, x: number, y: number): [number, number] {
  return [m.a * x + m.b * y, m.c * x + m.d * y];
}

function toSvgX(x: number) {
  return ORIGIN + x * SCALE;
}
function toSvgY(y: number) {
  return ORIGIN - y * SCALE;
}

function TransformedGrid({ m }: { m: Matrix2x2 }) {
  const lines: React.ReactElement[] = [];

  for (let i = -GRID_RANGE; i <= GRID_RANGE; i++) {
    // 수직선: x=i, y -range~range
    const [x0, y0] = applyMatrix(m, i, -GRID_RANGE);
    const [x1, y1] = applyMatrix(m, i, GRID_RANGE);
    lines.push(
      <line
        key={`tv${i}`}
        x1={toSvgX(x0)}
        y1={toSvgY(y0)}
        x2={toSvgX(x1)}
        y2={toSvgY(y1)}
        stroke="#6366f1"
        strokeWidth={i === 0 ? 1.5 : 0.8}
        strokeOpacity={0.7}
      />,
    );
    // 수평선: y=i, x -range~range
    const [x2, y2] = applyMatrix(m, -GRID_RANGE, i);
    const [x3, y3] = applyMatrix(m, GRID_RANGE, i);
    lines.push(
      <line
        key={`th${i}`}
        x1={toSvgX(x2)}
        y1={toSvgY(y2)}
        x2={toSvgX(x3)}
        y2={toSvgY(y3)}
        stroke="#6366f1"
        strokeWidth={i === 0 ? 1.5 : 0.8}
        strokeOpacity={0.7}
      />,
    );
  }

  // 기저 벡터 표시
  const [ex, ey] = applyMatrix(m, 1, 0);
  const [fx, fy] = applyMatrix(m, 0, 1);

  return (
    <>
      {lines}
      {/* e1 기저 벡터 */}
      <line
        x1={ORIGIN}
        y1={ORIGIN}
        x2={toSvgX(ex)}
        y2={toSvgY(ey)}
        stroke="#f59e0b"
        strokeWidth={2.5}
      />
      {/* e2 기저 벡터 */}
      <line
        x1={ORIGIN}
        y1={ORIGIN}
        x2={toSvgX(fx)}
        y2={toSvgY(fy)}
        stroke="#10b981"
        strokeWidth={2.5}
      />
    </>
  );
}

function BaseGrid() {
  const lines: React.ReactElement[] = [];
  for (let i = -GRID_RANGE; i <= GRID_RANGE; i++) {
    lines.push(
      <line
        key={`bv${i}`}
        x1={toSvgX(i)}
        y1={0}
        x2={toSvgX(i)}
        y2={SIZE}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
      <line
        key={`bh${i}`}
        x1={0}
        y1={toSvgY(i)}
        x2={SIZE}
        y2={toSvgY(i)}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
    );
  }
  return <>{lines}</>;
}

const PRESETS: { label: string; m: Matrix2x2 }[] = [
  { label: "항등", m: { a: 1, b: 0, c: 0, d: 1 } },
  { label: "90° 회전", m: { a: 0, b: -1, c: 1, d: 0 } },
  { label: "2배 확대", m: { a: 2, b: 0, c: 0, d: 2 } },
  { label: "전단", m: { a: 1, b: 1, c: 0, d: 1 } },
];

function MatrixInput({
  m,
  onChange,
}: {
  m: Matrix2x2;
  onChange: (m: Matrix2x2) => void;
}) {
  function handleChange(key: keyof Matrix2x2, val: string) {
    const num = parseFloat(val);
    if (!isNaN(num)) onChange({ ...m, [key]: num });
  }

  const cell = (key: keyof Matrix2x2) => (
    <input
      key={key}
      type="number"
      step="0.5"
      value={m[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      className="w-14 rounded border border-gray-600 bg-gray-800 p-1 text-center text-sm text-white focus:border-indigo-500 focus:outline-none"
    />
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg text-gray-400">[</span>
      <div className="grid grid-cols-2 gap-1">
        {cell("a")}
        {cell("b")}
        {cell("c")}
        {cell("d")}
      </div>
      <span className="text-lg text-gray-400">]</span>
    </div>
  );
}

export function MatrixTransform() {
  const [m, setM] = useState<Matrix2x2>({ a: 1, b: 0, c: 0, d: 1 });

  const det = m.a * m.d - m.b * m.c;

  return (
    <div className="flex flex-col gap-4">
      <svg
        width={SIZE}
        height={SIZE}
        className="rounded-lg border border-gray-700 bg-gray-900"
      >
        <BaseGrid />
        <TransformedGrid m={m} />
        {/* 원점 */}
        <circle cx={ORIGIN} cy={ORIGIN} r={3} fill="#9ca3af" />
      </svg>

      {/* 행렬 입력 */}
      <div className="flex flex-wrap items-center gap-4">
        <MatrixInput m={m} onChange={setM} />
        <div className="text-xs text-gray-400">
          det ={" "}
          <span className="font-mono text-indigo-300">{det.toFixed(2)}</span>
        </div>
      </div>

      {/* 프리셋 */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setM(p.m)}
            className="rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-indigo-500 hover:text-indigo-300"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 기저벡터 범례 */}
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded bg-yellow-400" />
          <span className="text-gray-400">
            e₁ = [{m.a.toFixed(1)}, {m.c.toFixed(1)}]
          </span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded bg-emerald-400" />
          <span className="text-gray-400">
            e₂ = [{m.b.toFixed(1)}, {m.d.toFixed(1)}]
          </span>
        </span>
      </div>

      <p className="text-xs text-gray-500">
        행렬값을 바꾸거나 프리셋을 눌러 격자 변환을 확인하세요
      </p>
    </div>
  );
}
