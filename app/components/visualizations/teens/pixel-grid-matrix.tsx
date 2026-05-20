export function PixelGridMatrix() {
  const size = 8;
  const cell = 28;
  const padX = 30;
  const padY = 30;

  // 8x8 흑백 픽셀 데이터 (간단한 하트 모양)
  const heart = [
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 2, 2, 1, 1, 2, 2, 1],
    [1, 2, 3, 2, 2, 3, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // 밝기 0-3을 색상으로 매핑
  const colorMap = ["#0f172a", "#475569", "#a5b4fc", "#f472b6"];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-sky-300/80">
        🖼️ 이미지 = 픽셀의 행렬. 각 칸의 숫자가 색/밝기를 의미해요.
      </p>
      <svg
        viewBox={`0 0 ${padX * 2 + size * cell} ${padY * 2 + size * cell}`}
        className="w-full max-w-xs"
      >
        {/* 열 인덱스 */}
        {Array.from({ length: size }, (_, c) => (
          <text
            key={`col-${c}`}
            x={padX + c * cell + cell / 2}
            y={padY - 6}
            textAnchor="middle"
            fontSize="9"
            fill="#6b7280"
          >
            {c}
          </text>
        ))}
        {/* 행 인덱스 */}
        {Array.from({ length: size }, (_, r) => (
          <text
            key={`row-${r}`}
            x={padX - 6}
            y={padY + r * cell + cell / 2 + 3}
            textAnchor="end"
            fontSize="9"
            fill="#6b7280"
          >
            {r}
          </text>
        ))}

        {/* 픽셀 */}
        {heart.map((row, r) =>
          row.map((val, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={padX + c * cell}
                y={padY + r * cell}
                width={cell - 1}
                height={cell - 1}
                fill={colorMap[val]}
                stroke="#1f2937"
                strokeWidth="0.5"
              />
              <text
                x={padX + c * cell + cell / 2}
                y={padY + r * cell + cell / 2 + 3}
                textAnchor="middle"
                fontSize="9"
                fill={val >= 2 ? "#0f172a" : "#6b7280"}
                fontWeight={val >= 2 ? "bold" : "normal"}
              >
                {val}
              </text>
            </g>
          )),
        )}

        {/* 안내 라벨 */}
        <text
          x={padX + (size * cell) / 2}
          y={padY + size * cell + 20}
          textAnchor="middle"
          fontSize="11"
          fill="#a5b4fc"
        >
          8 × 8 행렬 — 픽셀 64개로 만든 ❤️
        </text>
      </svg>
      <div className="flex gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-slate-900 border border-slate-700" />
          0 어두움
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm bg-pink-400" />3 가장
          밝음
        </span>
      </div>
    </div>
  );
}
