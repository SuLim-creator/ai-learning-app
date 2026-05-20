export function MatrixGridDiagram() {
  const rows = 3;
  const cols = 4;
  const cellW = 56;
  const cellH = 40;
  const padX = 60;
  const padY = 50;
  const values = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">
        3×4 행렬 — 행(row)과 열(column) 구조
      </p>
      <svg
        viewBox={`0 0 ${padX * 2 + cols * cellW} ${padY + rows * cellH + 30}`}
        className="w-full max-w-xs"
      >
        {/* Column labels */}
        {Array.from({ length: cols }, (_, c) => (
          <text
            key={`col-${c}`}
            x={padX + c * cellW + cellW / 2}
            y={padY - 12}
            textAnchor="middle"
            fontSize={11}
            fill="#818cf8"
          >
            열 {c + 1}
          </text>
        ))}

        {/* Row labels */}
        {Array.from({ length: rows }, (_, r) => (
          <text
            key={`row-${r}`}
            x={padX - 10}
            y={padY + r * cellH + cellH / 2 + 4}
            textAnchor="end"
            fontSize={11}
            fill="#34d399"
          >
            행 {r + 1}
          </text>
        ))}

        {/* Cells */}
        {values.map((row, r) =>
          row.map((val, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={padX + c * cellW}
                y={padY + r * cellH}
                width={cellW}
                height={cellH}
                fill={r === 0 && c === 0 ? "#312e81" : "#1e1b4b"}
                stroke="#4338ca"
                strokeWidth={1}
                rx={3}
              />
              <text
                x={padX + c * cellW + cellW / 2}
                y={padY + r * cellH + cellH / 2 + 5}
                textAnchor="middle"
                fontSize={13}
                fontWeight={r === 0 && c === 0 ? "bold" : "normal"}
                fill={r === 0 && c === 0 ? "#a5b4fc" : "#e2e8f0"}
              >
                {val}
              </text>
            </g>
          )),
        )}

        {/* Highlight annotation: A[1][1] */}
        <text
          x={padX + cellW / 2}
          y={padY + rows * cellH + 20}
          textAnchor="middle"
          fontSize={10}
          fill="#a5b4fc"
        >
          A[1][1] = 1
        </text>
      </svg>
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-gray-400">행(가로)</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-indigo-400" />
          <span className="text-gray-400">열(세로)</span>
        </span>
      </div>
    </div>
  );
}
