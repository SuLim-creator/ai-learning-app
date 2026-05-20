export function LossCurveDiagram() {
  const padX = 48;
  const padY = 20;
  const w = 240;
  const h = 120;
  const svgW = w + padX + 24;
  const svgH = h + padY + 36;

  // U-shaped MSE curve: loss = (x - 5)^2, x from 0..10
  const points = Array.from({ length: 41 }, (_, i) => {
    const x = i * 0.25; // 0..10
    const loss = (x - 5) ** 2;
    return { x, loss };
  });
  const maxLoss = 25;
  const toSvgX = (x: number) => padX + (x / 10) * w;
  const toSvgY = (loss: number) => padY + h - (loss / maxLoss) * h;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x)} ${toSvgY(p.loss)}`)
    .join(" ");

  // Optimal point at x=5
  const optX = toSvgX(5);
  const optY = toSvgY(0);

  // Gradient descent steps
  const steps = [8, 7.1, 6.3, 5.7, 5.2, 5.05];
  const stepPoints = steps.map((x) => ({
    sx: toSvgX(x),
    sy: toSvgY((x - 5) ** 2),
  }));

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">
        손실 함수 — 최솟값을 향해 내려가기
      </p>
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
          파라미터
        </text>

        {/* Curve */}
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth={2} />

        {/* Gradient descent path */}
        {stepPoints.map((p, i) =>
          i < stepPoints.length - 1 ? (
            <line
              key={i}
              x1={p.sx}
              y1={p.sy}
              x2={stepPoints[i + 1].sx}
              y2={stepPoints[i + 1].sy}
              stroke="#f97316"
              strokeWidth={1.2}
              strokeDasharray="3 2"
            />
          ) : null,
        )}
        {stepPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.sx}
            cy={p.sy}
            r={4}
            fill="#f97316"
            opacity={1 - i * 0.1}
          />
        ))}

        {/* Optimal marker */}
        <circle cx={optX} cy={optY + 2} r={5} fill="#10b981" />
        <text
          x={optX}
          y={optY - 6}
          textAnchor="middle"
          fontSize={9}
          fill="#10b981"
        >
          최솟값
        </text>

        {/* Legend */}
        <circle cx={padX + 8} cy={svgH - 10} r={4} fill="#f97316" />
        <text x={padX + 16} y={svgH - 6} fontSize={9} fill="#94a3b8">
          경사하강 경로
        </text>
      </svg>
      <p className="text-xs text-gray-500">
        파라미터를 조금씩 바꿔가며 손실이 가장 낮은 지점을 찾음
      </p>
    </div>
  );
}
