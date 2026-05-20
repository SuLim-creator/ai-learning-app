export function OverfittingCurvesDiagram() {
  const padX = 40;
  const padY = 16;
  const w = 200;
  const h = 90;
  const svgW = w + padX + 20;
  const svgH = h + padY + 52;

  // x: epochs 0..1
  const N = 50;
  const toSvgX = (t: number) => padX + t * w;
  const toSvgY = (v: number) => padY + h - v * h;

  // Training loss: always decreasing
  const trainPath = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const v = 0.9 * Math.exp(-3.5 * t) + 0.05;
    return `${i === 0 ? "M" : "L"} ${toSvgX(t)} ${toSvgY(v)}`;
  }).join(" ");

  // Validation loss: decreases then rises (overfitting)
  const valPath = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const v =
      t < 0.45 ? 0.85 * Math.exp(-3 * t) + 0.1 : 0.25 + 0.6 * (t - 0.45) ** 1.5;
    return `${i === 0 ? "M" : "L"} ${toSvgX(t)} ${toSvgY(Math.min(v, 0.95))}`;
  }).join(" ");

  // Best stop point
  const stopT = 0.45;
  const stopX = toSvgX(stopT);

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">과적합 — 훈련 손실 vs 검증 손실</p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs">
        {/* Axes */}
        <line
          x1={padX}
          y1={padY}
          x2={padX}
          y2={padY + h}
          stroke="#374151"
          strokeWidth={1.5}
        />
        <line
          x1={padX}
          y1={padY + h}
          x2={padX + w}
          y2={padY + h}
          stroke="#374151"
          strokeWidth={1.5}
        />
        <text
          x={padX - 6}
          y={padY + 4}
          textAnchor="end"
          fontSize={9}
          fill="#6b7280"
        >
          손실
        </text>
        <text
          x={padX + w + 4}
          y={padY + h + 4}
          textAnchor="start"
          fontSize={9}
          fill="#6b7280"
        >
          에포크
        </text>

        {/* Shaded overfitting region */}
        <rect
          x={stopX}
          y={padY}
          width={padX + w - stopX}
          height={h}
          fill="#7f1d1d"
          opacity={0.15}
        />

        {/* Curves */}
        <path d={trainPath} fill="none" stroke="#6366f1" strokeWidth={2} />
        <path
          d={valPath}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="5 3"
        />

        {/* Early stop marker */}
        <line
          x1={stopX}
          y1={padY}
          x2={stopX}
          y2={padY + h}
          stroke="#34d399"
          strokeWidth={1.2}
          strokeDasharray="4 2"
        />
        <text
          x={stopX}
          y={padY - 4}
          textAnchor="middle"
          fontSize={8}
          fill="#34d399"
        >
          Early Stop ✓
        </text>

        {/* Region labels */}
        <text
          x={stopX - 30}
          y={padY + h + 14}
          textAnchor="middle"
          fontSize={8}
          fill="#94a3b8"
        >
          적정 학습
        </text>
        <text
          x={(stopX + padX + w) / 2}
          y={padY + h + 14}
          textAnchor="middle"
          fontSize={8}
          fill="#f87171"
        >
          과적합 구간
        </text>

        {/* Legend */}
        <line
          x1={padX}
          y1={svgH - 24}
          x2={padX + 20}
          y2={svgH - 24}
          stroke="#6366f1"
          strokeWidth={2}
        />
        <text x={padX + 24} y={svgH - 20} fontSize={9} fill="#94a3b8">
          훈련 손실
        </text>
        <line
          x1={padX + 80}
          y1={svgH - 24}
          x2={padX + 100}
          y2={svgH - 24}
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="5 3"
        />
        <text x={padX + 104} y={svgH - 20} fontSize={9} fill="#94a3b8">
          검증 손실
        </text>
      </svg>
      <p className="text-xs text-gray-500">
        검증 손실이 올라가기 시작하면 학습 중단 (Early Stopping)
      </p>
    </div>
  );
}
