"use client";

export function AttentionMapDiagram() {
  const tokens = ["나는", "사과를", "먹었다"];
  const weights = [
    [0.7, 0.2, 0.1],
    [0.1, 0.8, 0.1],
    [0.2, 0.3, 0.5],
  ];
  const cellSize = 60;
  const offsetX = 80;
  const offsetY = 40;

  function toColor(w: number) {
    const r = Math.round(99 + (139 - 99) * w);
    const g = Math.round(102 + (92 - 102) * w);
    const b = Math.round(241 + (246 - 241) * w);
    return `rgb(${r},${g},${b})`;
  }

  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full max-w-xs mx-auto"
      aria-label="Attention 가중치 맵"
    >
      <text x="160" y="16" textAnchor="middle" fontSize="11" fill="#94a3b8">
        Self-Attention 가중치
      </text>

      {/* column headers (Query) */}
      {tokens.map((t, i) => (
        <text
          key={`col-${i}`}
          x={offsetX + i * cellSize + cellSize / 2}
          y={offsetY - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#818cf8"
        >
          {t}
        </text>
      ))}

      {/* row headers (Key) */}
      {tokens.map((t, i) => (
        <text
          key={`row-${i}`}
          x={offsetX - 6}
          y={offsetY + i * cellSize + cellSize / 2 + 4}
          textAnchor="end"
          fontSize="10"
          fill="#818cf8"
        >
          {t}
        </text>
      ))}

      {/* cells */}
      {weights.map((row, ri) =>
        row.map((w, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect
              x={offsetX + ci * cellSize}
              y={offsetY + ri * cellSize}
              width={cellSize - 2}
              height={cellSize - 2}
              rx="4"
              fill={toColor(w)}
              fillOpacity="0.85"
            />
            <text
              x={offsetX + ci * cellSize + cellSize / 2}
              y={offsetY + ri * cellSize + cellSize / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#fff"
            >
              {w.toFixed(1)}
            </text>
          </g>
        )),
      )}

      <text x="160" y="230" textAnchor="middle" fontSize="10" fill="#64748b">
        밝을수록 높은 Attention 집중도
      </text>
    </svg>
  );
}
