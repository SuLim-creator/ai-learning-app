export function SeatingGrid() {
  const rows = 3;
  const cols = 4;
  const cellSize = 52;
  const padX = 50;
  const padY = 40;

  const students = [
    "🦊",
    "🐻",
    "🐼",
    "🐯",
    "🐰",
    "🐱",
    "🐶",
    "🐸",
    "🦁",
    "🐮",
    "🐷",
    "🐵",
  ];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        🏫 우리 반 자리 배치도 = 3행 4열 행렬!
      </p>
      <svg
        viewBox={`0 0 ${padX * 2 + cols * cellSize} ${padY + rows * cellSize + 60}`}
        className="w-full max-w-md"
      >
        {/* 칠판 */}
        <rect
          x={padX}
          y={5}
          width={cols * cellSize}
          height={20}
          rx="3"
          fill="#065f46"
          stroke="#34d399"
          strokeWidth="1"
        />
        <text
          x={padX + (cols * cellSize) / 2}
          y={19}
          textAnchor="middle"
          fontSize="10"
          fill="#a7f3d0"
        >
          📋 칠판
        </text>

        {/* 행 라벨 */}
        {Array.from({ length: rows }, (_, r) => (
          <text
            key={`row-${r}`}
            x={padX - 8}
            y={padY + r * cellSize + cellSize / 2 + 4}
            textAnchor="end"
            fontSize="11"
            fill="#34d399"
            fontWeight="bold"
          >
            {r + 1}행
          </text>
        ))}

        {/* 열 라벨 */}
        {Array.from({ length: cols }, (_, c) => (
          <text
            key={`col-${c}`}
            x={padX + c * cellSize + cellSize / 2}
            y={padY + rows * cellSize + 16}
            textAnchor="middle"
            fontSize="11"
            fill="#38bdf8"
            fontWeight="bold"
          >
            {c + 1}열
          </text>
        ))}

        {/* 책상 */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const idx = r * cols + c;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={padX + c * cellSize + 4}
                  y={padY + r * cellSize + 4}
                  width={cellSize - 8}
                  height={cellSize - 8}
                  rx="4"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text
                  x={padX + c * cellSize + cellSize / 2}
                  y={padY + r * cellSize + cellSize / 2 + 8}
                  textAnchor="middle"
                  fontSize="22"
                >
                  {students[idx]}
                </text>
              </g>
            );
          }),
        )}

        {/* 총 개수 안내 */}
        <text
          x={padX + (cols * cellSize) / 2}
          y={padY + rows * cellSize + 40}
          textAnchor="middle"
          fontSize="11"
          fill="#fbbf24"
          fontWeight="bold"
        >
          책상 = 3 × 4 = 12개
        </text>
      </svg>
    </div>
  );
}
