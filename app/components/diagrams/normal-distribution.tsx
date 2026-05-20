"use client";

export function NormalDistributionDiagram() {
  const W = 400;
  const H = 140;
  const padX = 40;
  const padY = 16;
  const gW = W - padX * 2;
  const gH = H - padY * 2 - 20;

  function normal(x: number) {
    return Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
  }

  const xMin = -3.5;
  const xMax = 3.5;
  const yMax = normal(0) * 1.1;

  function toSvg(x: number, y: number) {
    const sx = padX + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = padY + gH - (y / yMax) * gH;
    return [sx, sy] as const;
  }

  const pts = Array.from({ length: 71 }, (_, i) => {
    const x = xMin + (i / 70) * (xMax - xMin);
    return toSvg(x, normal(x));
  });

  const curvePath = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  // fill path closes to baseline
  const [x0, y0] = toSvg(xMin, 0);
  const [xN, yN] = toSvg(xMax, 0);
  const fillPath = `${curvePath} L${xN.toFixed(1)},${y0.toFixed(1)} L${x0.toFixed(1)},${y0.toFixed(1)} Z`;

  // sigma markers at ±1, ±2
  const sigmas = [-2, -1, 1, 2];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-sm mx-auto"
      aria-label="정규분포 (종 모양 곡선)"
    >
      {/* fill */}
      <path d={fillPath} fill="#6366f1" fillOpacity="0.15" />

      {/* ±1σ shade */}
      {(() => {
        const l1 = pts.filter((_, i) => {
          const x = xMin + (i / 70) * (xMax - xMin);
          return x >= -1 && x <= 1;
        });
        if (l1.length < 2) return null;
        const [lx, ly] = l1[0];
        const [rx, ry] = l1[l1.length - 1];
        const [, by] = toSvg(0, 0);
        const inner =
          l1
            .map(
              ([x, y], i) =>
                `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`,
            )
            .join(" ") +
          ` L${rx.toFixed(1)},${by.toFixed(1)} L${lx.toFixed(1)},${by.toFixed(1)} Z`;
        return <path d={inner} fill="#6366f1" fillOpacity="0.3" />;
      })()}

      {/* curve */}
      <path d={curvePath} fill="none" stroke="#6366f1" strokeWidth="2" />

      {/* baseline */}
      <line x1={x0} y1={y0} x2={xN} y2={y0} stroke="#334155" strokeWidth="1" />

      {/* sigma tick lines */}
      {sigmas.map((s) => {
        const [sx, sy] = toSvg(s, 0);
        const [, top] = toSvg(s, normal(s));
        return (
          <g key={s}>
            <line
              x1={sx}
              y1={top}
              x2={sx}
              y2={sy}
              stroke="#475569"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <text
              x={sx}
              y={sy + 12}
              textAnchor="middle"
              fontSize="9"
              fill="#64748b"
            >
              {s > 0 ? `+${s}σ` : `${s}σ`}
            </text>
          </g>
        );
      })}

      {/* μ label */}
      {(() => {
        const [mx, my] = toSvg(0, 0);
        return (
          <text
            x={mx}
            y={my + 12}
            textAnchor="middle"
            fontSize="9"
            fill="#94a3b8"
          >
            μ
          </text>
        );
      })()}

      {/* 68% label */}
      {(() => {
        const [cx] = toSvg(0, 0);
        const [, peakY] = toSvg(0, normal(0));
        return (
          <text
            x={cx}
            y={peakY + 18}
            textAnchor="middle"
            fontSize="9"
            fill="#818cf8"
          >
            68%
          </text>
        );
      })()}

      <text x={W / 2} y={H - 2} textAnchor="middle" fontSize="9" fill="#64748b">
        ±1σ 안에 전체 데이터의 68%, ±2σ 안에 95%
      </text>
    </svg>
  );
}
