export function TreasureMapVector() {
  const startX = 60;
  const startY = 200;
  const endX = 320;
  const endY = 70;

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        🗺️ 보물지도 — 시작점에서 보물까지 가는 화살표가 벡터!
      </p>
      <svg
        viewBox="0 0 380 260"
        className="w-full max-w-md rounded-lg bg-amber-950/30"
      >
        <defs>
          <marker
            id="treasure-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="8"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L10,4 z" fill="#fbbf24" />
          </marker>
          <pattern
            id="grass"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <circle cx="5" cy="5" r="1" fill="#854d0e" opacity="0.4" />
            <circle cx="15" cy="12" r="1" fill="#854d0e" opacity="0.4" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="380" height="260" fill="url(#grass)" />

        {/* 시작점 — 캐릭터 */}
        <g>
          <circle cx={startX} cy={startY} r="22" fill="#fde68a" />
          <circle cx={startX - 7} cy={startY - 4} r="2.5" fill="#1f2937" />
          <circle cx={startX + 7} cy={startY - 4} r="2.5" fill="#1f2937" />
          <path
            d={`M${startX - 6},${startY + 6} Q${startX},${startY + 11} ${startX + 6},${startY + 6}`}
            stroke="#1f2937"
            strokeWidth="2"
            fill="none"
          />
          <text
            x={startX}
            y={startY + 38}
            textAnchor="middle"
            fontSize="12"
            fill="#fde68a"
            fontWeight="bold"
          >
            출발!
          </text>
        </g>

        {/* 벡터 화살표 */}
        <line
          x1={startX + 22}
          y1={startY}
          x2={endX - 28}
          y2={endY + 8}
          stroke="#fbbf24"
          strokeWidth="3"
          strokeDasharray="4,2"
          markerEnd="url(#treasure-arrow)"
        />

        {/* 보물 상자 */}
        <g>
          <rect
            x={endX - 24}
            y={endY - 10}
            width="48"
            height="36"
            rx="4"
            fill="#92400e"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <rect
            x={endX - 24}
            y={endY - 10}
            width="48"
            height="10"
            fill="#fbbf24"
          />
          <circle cx={endX} cy={endY + 8} r="3" fill="#fbbf24" />
          <text x={endX} y={endY - 18} textAnchor="middle" fontSize="18">
            💎
          </text>
          <text
            x={endX}
            y={endY + 50}
            textAnchor="middle"
            fontSize="12"
            fill="#fde68a"
            fontWeight="bold"
          >
            보물!
          </text>
        </g>

        {/* 라벨 */}
        <text
          x={(startX + endX) / 2 + 10}
          y={(startY + endY) / 2 - 16}
          textAnchor="middle"
          fontSize="13"
          fill="#fbbf24"
          fontWeight="bold"
        >
          → 벡터!
        </text>
      </svg>
      <div className="flex gap-4 text-xs text-amber-100/70">
        <span>화살표 길이 = 거리</span>
        <span>·</span>
        <span>화살표 방향 = 가는 쪽</span>
      </div>
    </div>
  );
}
