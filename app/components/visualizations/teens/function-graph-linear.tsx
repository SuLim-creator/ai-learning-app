export function FunctionGraphLinear() {
  const W = 340;
  const H = 240;
  const ORIGIN_X = 60;
  const ORIGIN_Y = 200;
  const SCALE = 28;

  // y = 2x, x ∈ [0, 5]
  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= 5; x += 0.1) {
    points.push({ x, y: 2 * x });
  }
  const path = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${ORIGIN_X + p.x * SCALE} ${ORIGIN_Y - p.y * SCALE * 0.5}`,
    )
    .join(" ");

  const highlights = [1, 2, 3];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-sky-300/80">
        📈 함수 y = 2x 의 그래프 — 입력 x에 항상 2배가 출력 y
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        <defs>
          <marker
            id="fg-axis"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#6b7280" />
          </marker>
        </defs>

        {/* 격자 */}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`gv${i}`}
            x1={ORIGIN_X + i * SCALE}
            y1={20}
            x2={ORIGIN_X + i * SCALE}
            y2={ORIGIN_Y}
            stroke="#1f2937"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`gh${i}`}
            x1={ORIGIN_X}
            y1={ORIGIN_Y - i * SCALE}
            x2={W - 20}
            y2={ORIGIN_Y - i * SCALE}
            stroke="#1f2937"
            strokeWidth="0.5"
          />
        ))}

        {/* 축 */}
        <line
          x1={ORIGIN_X}
          y1={ORIGIN_Y}
          x2={W - 20}
          y2={ORIGIN_Y}
          stroke="#9ca3af"
          strokeWidth="1.5"
          markerEnd="url(#fg-axis)"
        />
        <line
          x1={ORIGIN_X}
          y1={ORIGIN_Y}
          x2={ORIGIN_X}
          y2={20}
          stroke="#9ca3af"
          strokeWidth="1.5"
          markerEnd="url(#fg-axis)"
        />
        <text x={W - 14} y={ORIGIN_Y - 4} fontSize="11" fill="#9ca3af">
          x
        </text>
        <text x={ORIGIN_X - 10} y={16} fontSize="11" fill="#9ca3af">
          y
        </text>

        {/* x 라벨 */}
        {[0, 1, 2, 3, 4, 5].map((x) => (
          <text
            key={`xl${x}`}
            x={ORIGIN_X + x * SCALE}
            y={ORIGIN_Y + 14}
            textAnchor="middle"
            fontSize="10"
            fill="#6b7280"
          >
            {x}
          </text>
        ))}
        {/* y 라벨 */}
        {[0, 2, 4, 6, 8].map((y) => (
          <text
            key={`yl${y}`}
            x={ORIGIN_X - 8}
            y={ORIGIN_Y - y * SCALE * 0.5 + 3}
            textAnchor="end"
            fontSize="10"
            fill="#6b7280"
          >
            {y}
          </text>
        ))}

        {/* 함수 직선 */}
        <path d={path} stroke="#fbbf24" strokeWidth="2.5" fill="none" />

        {/* 강조 입력→출력 점들 */}
        {highlights.map((x) => {
          const y = 2 * x;
          const px = ORIGIN_X + x * SCALE;
          const py = ORIGIN_Y - y * SCALE * 0.5;
          return (
            <g key={`p${x}`}>
              <line
                x1={px}
                y1={ORIGIN_Y}
                x2={px}
                y2={py}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <line
                x1={ORIGIN_X}
                y1={py}
                x2={px}
                y2={py}
                stroke="#34d399"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <circle cx={px} cy={py} r="4" fill="#fbbf24" />
              <text
                x={px + 8}
                y={py - 6}
                fontSize="10"
                fill="#fde68a"
                fontWeight="bold"
              >
                ({x}, {y})
              </text>
            </g>
          );
        })}

        {/* 함수식 박스 */}
        <rect
          x={W - 110}
          y={30}
          width="100"
          height="34"
          rx="6"
          fill="#1e293b"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <text
          x={W - 60}
          y={52}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#fbbf24"
        >
          y = 2x
        </text>
      </svg>
      <p className="text-center text-xs text-gray-500">
        x = 1 → y = 2, x = 2 → y = 4, x = 3 → y = 6. 점들이 모여서 직선이
        됩니다.
      </p>
    </div>
  );
}
