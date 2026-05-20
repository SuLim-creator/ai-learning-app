export function GameCharacterVector() {
  const SIZE = 320;
  const ORIGIN = SIZE / 2;
  const SCALE = 30;

  const dx = 4;
  const dy = 3;

  const startX = ORIGIN;
  const startY = ORIGIN;
  const endX = ORIGIN + dx * SCALE;
  const endY = ORIGIN - dy * SCALE;

  const gridLines = [];
  for (let i = -5; i <= 5; i++) {
    const px = ORIGIN + i * SCALE;
    gridLines.push(
      <line
        key={`v${i}`}
        x1={px}
        y1={0}
        x2={px}
        y2={SIZE}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
      <line
        key={`h${i}`}
        x1={0}
        y1={ORIGIN - i * SCALE}
        x2={SIZE}
        y2={ORIGIN - i * SCALE}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-sky-300/80">
        🎮 게임 캐릭터의 이동 = 벡터 (x축 이동량, y축 이동량)
      </p>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-sm">
        <defs>
          <marker
            id="gcv-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#fbbf24" />
          </marker>
        </defs>

        {gridLines}

        {/* x, y 라벨 */}
        <text x={SIZE - 12} y={ORIGIN - 6} fontSize="11" fill="#9ca3af">
          x
        </text>
        <text x={ORIGIN + 6} y={12} fontSize="11" fill="#9ca3af">
          y
        </text>

        {/* 보조선 (x 이동) */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={startY}
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        <text
          x={(startX + endX) / 2}
          y={startY + 16}
          textAnchor="middle"
          fontSize="11"
          fill="#38bdf8"
        >
          +{dx}
        </text>

        {/* 보조선 (y 이동) */}
        <line
          x1={endX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#34d399"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        <text
          x={endX + 14}
          y={(startY + endY) / 2}
          fontSize="11"
          fill="#34d399"
        >
          +{dy}
        </text>

        {/* 벡터 화살표 */}
        <line
          x1={startX}
          y1={startY}
          x2={endX - 5}
          y2={endY + 5}
          stroke="#fbbf24"
          strokeWidth="2.5"
          markerEnd="url(#gcv-arrow)"
        />

        {/* 시작 캐릭터 */}
        <text x={startX} y={startY + 6} textAnchor="middle" fontSize="22">
          🧙
        </text>

        {/* 도착 — 보물 */}
        <text x={endX} y={endY + 6} textAnchor="middle" fontSize="22">
          💎
        </text>

        {/* 벡터 라벨 */}
        <text
          x={(startX + endX) / 2 - 30}
          y={(startY + endY) / 2 - 8}
          fontSize="13"
          fill="#fbbf24"
          fontWeight="bold"
        >
          v = ({dx}, {dy})
        </text>
      </svg>
      <p className="text-center text-xs text-gray-500">
        캐릭터를 오른쪽으로 {dx}칸, 위로 {dy}칸 이동 → 벡터 ({dx}, {dy})
      </p>
    </div>
  );
}
