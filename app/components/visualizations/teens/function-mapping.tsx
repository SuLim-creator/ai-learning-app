export function FunctionMapping() {
  const W = 340;
  const H = 240;

  const pairs = [
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
  ];

  const leftX = 80;
  const rightX = 260;
  const topY = 40;
  const gap = 44;

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-sky-300/80">
        🔗 함수 = 정의역(입력)에서 치역(출력)으로의 매핑 규칙
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
        <defs>
          <marker
            id="fm-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* 정의역 박스 */}
        <rect
          x={leftX - 40}
          y={topY - 20}
          width="80"
          height={pairs.length * gap + 20}
          rx="8"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <text
          x={leftX}
          y={topY - 28}
          textAnchor="middle"
          fontSize="11"
          fill="#38bdf8"
          fontWeight="bold"
        >
          정의역 (입력 x)
        </text>

        {/* 치역 박스 */}
        <rect
          x={rightX - 40}
          y={topY - 20}
          width="80"
          height={pairs.length * gap + 20}
          rx="8"
          fill="#0f172a"
          stroke="#34d399"
          strokeWidth="1.5"
        />
        <text
          x={rightX}
          y={topY - 28}
          textAnchor="middle"
          fontSize="11"
          fill="#34d399"
          fontWeight="bold"
        >
          치역 (출력 y)
        </text>

        {/* 원소 + 화살표 */}
        {pairs.map((p, i) => {
          const y = topY + i * gap;
          return (
            <g key={i}>
              {/* 입력 */}
              <circle
                cx={leftX}
                cy={y}
                r="14"
                fill="#1e293b"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <text
                x={leftX}
                y={y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#38bdf8"
              >
                {p.x}
              </text>

              {/* 화살표 */}
              <line
                x1={leftX + 18}
                y1={y}
                x2={rightX - 22}
                y2={y}
                stroke="#fbbf24"
                strokeWidth="1.5"
                markerEnd="url(#fm-arrow)"
              />

              {/* 출력 */}
              <circle
                cx={rightX}
                cy={y}
                r="16"
                fill="#1e293b"
                stroke="#34d399"
                strokeWidth="1.5"
              />
              <text
                x={rightX}
                y={y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#34d399"
              >
                {p.y}
              </text>
            </g>
          );
        })}

        {/* 규칙 박스 */}
        <rect
          x={W / 2 - 50}
          y={H - 36}
          width="100"
          height="26"
          rx="6"
          fill="#7c2d12"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <text
          x={W / 2}
          y={H - 18}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#fde68a"
        >
          규칙: y = x²
        </text>
      </svg>
      <p className="text-center text-xs text-gray-500">
        함수는 한 입력에 정확히 하나의 출력을 정해 주는 규칙이에요.
      </p>
    </div>
  );
}
