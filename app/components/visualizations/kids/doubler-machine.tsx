interface PairProps {
  x: number;
  input: number;
  output: number;
}

function ExamplePair({ x, input, output }: PairProps) {
  return (
    <g transform={`translate(${x},170)`}>
      <rect
        x="-22"
        y="-14"
        width="44"
        height="28"
        rx="6"
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth="1.5"
      />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#38bdf8"
      >
        {input}
      </text>

      <text x="38" y="6" textAnchor="middle" fontSize="16" fill="#fbbf24">
        →
      </text>

      <rect
        x="56"
        y="-14"
        width="44"
        height="28"
        rx="6"
        fill="#0f172a"
        stroke="#34d399"
        strokeWidth="1.5"
      />
      <text
        x="78"
        y="6"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#34d399"
      >
        {output}
      </text>
    </g>
  );
}

export function DoublerMachine() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        ✖️ "두 배 기계" — 어떤 숫자든 두 배로 만들어 주는 함수!
      </p>
      <svg
        viewBox="0 0 380 240"
        className="w-full max-w-md rounded-lg bg-gray-950/40"
      >
        <defs>
          <marker
            id="dm-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="8"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L10,4 z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* 위쪽: 기계 도식 */}
        <g transform="translate(40,30)">
          {/* 입력 */}
          <rect
            x="0"
            y="0"
            width="56"
            height="56"
            rx="6"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text
            x="28"
            y="34"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#38bdf8"
          >
            x
          </text>
          <text x="28" y="76" textAnchor="middle" fontSize="11" fill="#9ca3af">
            입력
          </text>

          {/* 화살표 */}
          <line
            x1="66"
            y1="28"
            x2="118"
            y2="28"
            stroke="#fbbf24"
            strokeWidth="2"
            markerEnd="url(#dm-arrow)"
          />

          {/* 기계 */}
          <g transform="translate(130,0)">
            <rect
              x="0"
              y="0"
              width="80"
              height="56"
              rx="10"
              fill="#7c2d12"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text
              x="40"
              y="34"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#fde68a"
            >
              × 2
            </text>
            {/* 눈 */}
            <circle cx="20" cy="14" r="2.5" fill="#fde68a" />
            <circle cx="60" cy="14" r="2.5" fill="#fde68a" />
            <text
              x="40"
              y="76"
              textAnchor="middle"
              fontSize="11"
              fill="#fde68a"
            >
              두 배 기계
            </text>
          </g>

          {/* 화살표 */}
          <line
            x1="220"
            y1="28"
            x2="272"
            y2="28"
            stroke="#fbbf24"
            strokeWidth="2"
            markerEnd="url(#dm-arrow)"
          />

          {/* 출력 */}
          <rect
            x="284"
            y="0"
            width="56"
            height="56"
            rx="6"
            fill="#0f172a"
            stroke="#34d399"
            strokeWidth="2"
          />
          <text
            x="312"
            y="34"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill="#34d399"
          >
            2x
          </text>
          <text x="312" y="76" textAnchor="middle" fontSize="11" fill="#9ca3af">
            출력
          </text>
        </g>

        {/* 아래쪽: 예시 */}
        <text x="50" y="150" fontSize="11" fill="#fde68a" fontWeight="bold">
          예시:
        </text>
        <ExamplePair x={120} input={1} output={2} />
        <ExamplePair x={230} input={3} output={6} />
      </svg>
      <p className="text-center text-xs text-gray-500">
        1을 넣으면 2, 3을 넣으면 6. 항상 같은 규칙으로 두 배가 돼요!
      </p>
    </div>
  );
}
