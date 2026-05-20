export function VendingMachineFunction() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-amber-200/80">
        🥤 자판기 = 함수! 동전을 넣으면 정해진 음료가 나와요.
      </p>
      <svg
        viewBox="0 0 380 220"
        className="w-full max-w-md rounded-lg bg-gray-950/40"
      >
        <defs>
          <marker
            id="vm-arrow"
            markerWidth="12"
            markerHeight="12"
            refX="8"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L10,4 z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* 입력: 동전 */}
        <g transform="translate(40,110)">
          <text x="0" y="-30" textAnchor="middle" fontSize="11" fill="#9ca3af">
            입력
          </text>
          <circle
            cx="0"
            cy="0"
            r="22"
            fill="#fbbf24"
            stroke="#92400e"
            strokeWidth="2"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#92400e"
          >
            ₩
          </text>
          <text x="0" y="42" textAnchor="middle" fontSize="11" fill="#fde68a">
            동전
          </text>
        </g>

        {/* 화살표 */}
        <line
          x1="74"
          y1="110"
          x2="138"
          y2="110"
          stroke="#fbbf24"
          strokeWidth="2"
          markerEnd="url(#vm-arrow)"
        />

        {/* 자판기 */}
        <g transform="translate(150,40)">
          <rect
            x="0"
            y="0"
            width="100"
            height="150"
            rx="8"
            fill="#1e3a8a"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          {/* 디스플레이 */}
          <rect x="10" y="10" width="80" height="22" rx="3" fill="#0f172a" />
          <text x="50" y="26" textAnchor="middle" fontSize="11" fill="#34d399">
            FUNCTION
          </text>
          {/* 음료 선반 */}
          {[40, 70, 100].map((y, i) => (
            <rect
              key={i}
              x="14"
              y={y}
              width="72"
              height="22"
              rx="2"
              fill="#1e293b"
            />
          ))}
          <text x="50" y="55" textAnchor="middle" fontSize="14">
            🥤 🧃 🍹
          </text>
          <text x="50" y="85" textAnchor="middle" fontSize="14">
            🥛 ☕ 🍵
          </text>
          {/* 음료 나오는 출구 */}
          <rect x="20" y="125" width="60" height="14" fill="#0f172a" />
          {/* 캐릭터 눈 */}
          <circle cx="32" cy="20" r="2" fill="#fde68a" />
          <circle cx="68" cy="20" r="2" fill="#fde68a" />
        </g>

        {/* 화살표 */}
        <line
          x1="260"
          y1="110"
          x2="310"
          y2="110"
          stroke="#fbbf24"
          strokeWidth="2"
          markerEnd="url(#vm-arrow)"
        />

        {/* 출력: 음료 */}
        <g transform="translate(340,110)">
          <text x="0" y="-30" textAnchor="middle" fontSize="11" fill="#9ca3af">
            출력
          </text>
          <text x="0" y="10" textAnchor="middle" fontSize="36">
            🥤
          </text>
          <text x="0" y="42" textAnchor="middle" fontSize="11" fill="#fde68a">
            음료
          </text>
        </g>
      </svg>
      <p className="text-center text-xs text-gray-500">
        같은 동전 → 항상 같은 음료가 나와야 함수예요!
      </p>
    </div>
  );
}
