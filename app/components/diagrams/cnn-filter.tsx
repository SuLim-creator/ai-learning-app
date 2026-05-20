"use client";

export function CnnFilterDiagram() {
  const cellSize = 28;
  const inputGrid = 5;
  const filterSize = 3;

  const inputHighlight = new Set([
    "0-0",
    "0-1",
    "0-2",
    "1-0",
    "1-1",
    "1-2",
    "2-0",
    "2-1",
    "2-2",
  ]);

  return (
    <svg
      viewBox="0 0 420 180"
      className="w-full max-w-md mx-auto"
      aria-label="CNN 합성곱 필터"
    >
      <text x="10" y="16" fontSize="11" fill="#94a3b8">
        입력 이미지 (5×5)
      </text>
      {/* input grid */}
      {Array.from({ length: inputGrid }, (_, r) =>
        Array.from({ length: inputGrid }, (_, c) => {
          const key = `${r}-${c}`;
          const highlighted = inputHighlight.has(key);
          return (
            <rect
              key={key}
              x={10 + c * cellSize}
              y={24 + r * cellSize}
              width={cellSize - 2}
              height={cellSize - 2}
              rx="2"
              fill={highlighted ? "#6366f1" : "#1e293b"}
              fillOpacity={highlighted ? "0.5" : "1"}
              stroke={highlighted ? "#818cf8" : "#334155"}
              strokeWidth="1"
            />
          );
        }),
      )}

      {/* filter highlight border */}
      <rect
        x={9}
        y={23}
        width={filterSize * cellSize}
        height={filterSize * cellSize}
        rx="3"
        fill="none"
        stroke="#818cf8"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* filter box */}
      <text x="165" y="16" fontSize="11" fill="#94a3b8">
        필터 (3×3)
      </text>
      {Array.from({ length: filterSize }, (_, r) =>
        Array.from({ length: filterSize }, (_, c) => {
          const vals = [1, 0, -1, 0, 1, 0, -1, 0, 1];
          const val = vals[r * filterSize + c];
          return (
            <g key={`f-${r}-${c}`}>
              <rect
                x={165 + c * cellSize}
                y={24 + r * cellSize}
                width={cellSize - 2}
                height={cellSize - 2}
                rx="2"
                fill={val > 0 ? "#7c3aed" : val < 0 ? "#dc2626" : "#1e293b"}
                fillOpacity="0.6"
                stroke="#475569"
                strokeWidth="1"
              />
              <text
                x={165 + c * cellSize + 13}
                y={24 + r * cellSize + 17}
                textAnchor="middle"
                fontSize="10"
                fill="#e2e8f0"
              >
                {val}
              </text>
            </g>
          );
        }),
      )}

      {/* arrow */}
      <defs>
        <marker
          id="arr"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
        </marker>
      </defs>
      <line
        x1="270"
        y1="80"
        x2="300"
        y2="80"
        stroke="#10b981"
        strokeWidth="2"
        markerEnd="url(#arr)"
      />

      {/* output grid 3x3 */}
      <text x="310" y="16" fontSize="11" fill="#94a3b8">
        출력 (3×3)
      </text>
      {Array.from({ length: filterSize }, (_, r) =>
        Array.from({ length: filterSize }, (_, c) => (
          <rect
            key={`o-${r}-${c}`}
            x={310 + c * cellSize}
            y={24 + r * cellSize}
            width={cellSize - 2}
            height={cellSize - 2}
            rx="2"
            fill={r === 0 && c === 0 ? "#10b981" : "#1e293b"}
            fillOpacity={r === 0 && c === 0 ? "0.5" : "1"}
            stroke={r === 0 && c === 0 ? "#34d399" : "#334155"}
            strokeWidth="1"
          />
        )),
      )}

      <text x="210" y="155" textAnchor="middle" fontSize="10" fill="#64748b">
        필터가 슬라이딩하며 특징을 추출
      </text>
    </svg>
  );
}
