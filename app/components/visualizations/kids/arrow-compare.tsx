interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  label: string;
  markerId: string;
}

function LabeledArrow({ x1, y1, x2, y2, color, label, markerId }: ArrowProps) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        markerEnd={`url(#${markerId})`}
      />
      <text
        x={(x1 + x2) / 2 + 14}
        y={(y1 + y2) / 2 - 6}
        fontSize="12"
        fill={color}
        fontWeight="bold"
      >
        {label}
      </text>
    </g>
  );
}

export function ArrowCompare() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        같은 길이라도 방향이 다르면 다른 벡터!
      </p>
      <svg
        viewBox="0 0 360 220"
        className="w-full max-w-md rounded-lg bg-gray-950/60"
      >
        <defs>
          <marker
            id="arr-emerald"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#34d399" />
          </marker>
          <marker
            id="arr-sky"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#38bdf8" />
          </marker>
          <marker
            id="arr-rose"
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#fb7185" />
          </marker>
        </defs>

        {/* 중앙 출발점 */}
        <circle cx="180" cy="120" r="6" fill="#fde68a" />
        <text x="180" y="145" textAnchor="middle" fontSize="11" fill="#9ca3af">
          출발
        </text>

        {/* ↑ 북쪽 5걸음 */}
        <LabeledArrow
          x1={180}
          y1={120}
          x2={180}
          y2={40}
          color="#34d399"
          label="북쪽 5걸음"
          markerId="arr-emerald"
        />

        {/* → 동쪽 5걸음 */}
        <LabeledArrow
          x1={180}
          y1={120}
          x2={300}
          y2={120}
          color="#38bdf8"
          label="동쪽 5걸음"
          markerId="arr-sky"
        />

        {/* ↘ 남동 3걸음 (다른 거리) */}
        <LabeledArrow
          x1={180}
          y1={120}
          x2={120}
          y2={180}
          color="#fb7185"
          label="남서 3걸음"
          markerId="arr-rose"
        />

        {/* 나침반 */}
        <g transform="translate(40,40)">
          <circle cx="0" cy="0" r="18" fill="#1f2937" stroke="#4b5563" />
          <text x="0" y="-22" textAnchor="middle" fontSize="9" fill="#9ca3af">
            북
          </text>
          <text x="0" y="32" textAnchor="middle" fontSize="9" fill="#9ca3af">
            남
          </text>
          <text x="22" y="3" textAnchor="middle" fontSize="9" fill="#9ca3af">
            동
          </text>
          <text x="-22" y="3" textAnchor="middle" fontSize="9" fill="#9ca3af">
            서
          </text>
          <path d="M0,-10 L4,0 L0,10 L-4,0 z" fill="#fbbf24" />
        </g>
      </svg>
      <p className="text-center text-xs text-gray-500">
        세 화살표 모두 벡터예요. 길이와 방향이 모이면 "어디로 얼마나"가
        정해져요!
      </p>
    </div>
  );
}
