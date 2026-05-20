export function PuzzleMatrix() {
  const rows = 3;
  const cols = 3;
  const cellSize = 60;
  const padX = 40;
  const padY = 40;

  // 색깔/이모지 퍼즐 조각
  const pieces = [
    ["🍎", "🍌", "🍇"],
    ["🐶", "🐱", "🐰"],
    ["⭐", "🌙", "☀️"],
  ];
  const colors = [
    ["#fee2e2", "#fef3c7", "#ede9fe"],
    ["#dbeafe", "#fce7f3", "#dcfce7"],
    ["#fef9c3", "#e0e7ff", "#fef3c7"],
  ];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        🧩 행렬은 격자 안에 퍼즐 조각을 차곡차곡 끼우는 것!
      </p>
      <svg
        viewBox={`0 0 ${padX * 2 + cols * cellSize} ${padY * 2 + rows * cellSize}`}
        className="w-full max-w-xs"
      >
        {/* 열 라벨 */}
        {Array.from({ length: cols }, (_, c) => (
          <text
            key={`col-${c}`}
            x={padX + c * cellSize + cellSize / 2}
            y={padY - 12}
            textAnchor="middle"
            fontSize="11"
            fill="#38bdf8"
            fontWeight="bold"
          >
            {c + 1}열
          </text>
        ))}

        {/* 행 라벨 */}
        {Array.from({ length: rows }, (_, r) => (
          <text
            key={`row-${r}`}
            x={padX - 10}
            y={padY + r * cellSize + cellSize / 2 + 4}
            textAnchor="end"
            fontSize="11"
            fill="#34d399"
            fontWeight="bold"
          >
            {r + 1}행
          </text>
        ))}

        {/* 퍼즐 칸 */}
        {pieces.map((row, r) =>
          row.map((emoji, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={padX + c * cellSize}
                y={padY + r * cellSize}
                width={cellSize - 4}
                height={cellSize - 4}
                rx="6"
                fill={colors[r][c]}
                stroke="#fbbf24"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x={padX + c * cellSize + (cellSize - 4) / 2}
                y={padY + r * cellSize + (cellSize - 4) / 2 + 9}
                textAnchor="middle"
                fontSize="24"
              >
                {emoji}
              </text>
            </g>
          )),
        )}
      </svg>
      <p className="text-center text-xs text-gray-500">
        가로 줄(행)이 3개, 세로 줄(열)이 3개 → 3행 3열 행렬!
      </p>
    </div>
  );
}
