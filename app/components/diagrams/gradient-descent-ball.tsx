export function GradientDescentBallDiagram() {
  const svgW = 280;
  const svgH = 160;

  // Hill shape: a parabola bowl
  const toY = (x: number) => 130 - 90 * Math.exp(-((x - 140) ** 2) / 8000);
  const hillPoints = Array.from({ length: 101 }, (_, i) => {
    const x = 20 + i * 2.4;
    return `${x},${toY(x)}`;
  }).join(" ");

  // Ball positions showing descent (right slope → bottom)
  const balls = [
    { x: 230, label: "출발", lr: "큰 걸음\n(학습률 높음)", color: "#f87171" },
    { x: 195, label: null, lr: null, color: "#fb923c" },
    { x: 168, label: null, lr: null, color: "#facc15" },
    { x: 148, label: "도착", lr: "최솟값", color: "#34d399" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">
        경사하강법 — 공이 계곡으로 굴러내려오기
      </p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xs">
        {/* Ground fill */}
        <polygon
          points={`20,${svgH} 20,${toY(20)} ${hillPoints} 260,${toY(260)} 260,${svgH}`}
          fill="#1e1b4b"
          opacity={0.6}
        />
        {/* Hill curve */}
        <polyline
          points={hillPoints}
          fill="none"
          stroke="#6366f1"
          strokeWidth={2.5}
        />

        {/* Arrows between balls */}
        {balls.slice(0, -1).map((b, i) => {
          const x1 = b.x;
          const y1 = toY(x1) - 7;
          const x2 = balls[i + 1].x;
          const y2 = toY(x2) - 7;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2 + (x2 > x1 ? -4 : 4)}
                y2={y2}
                stroke="#475569"
                strokeWidth={1}
                strokeDasharray="3 2"
              />
            </g>
          );
        })}

        {/* Balls */}
        {balls.map((b, i) => {
          const cy = toY(b.x) - 7;
          return (
            <g key={i}>
              <circle cx={b.x} cy={cy} r={7} fill={b.color} opacity={0.9} />
              {b.label && (
                <text
                  x={b.x}
                  y={cy - 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill={b.color}
                  fontWeight="bold"
                >
                  {b.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Learning rate annotation */}
        <text x={14} y={14} fontSize={9} fill="#94a3b8">
          학습률(보폭)이 너무 크면 →
        </text>
        <text x={14} y={26} fontSize={9} fill="#f87171">
          최솟값을 지나쳐 발산 위험
        </text>

        {/* Min marker */}
        <line
          x1={140}
          y1={toY(140)}
          x2={140}
          y2={svgH - 8}
          stroke="#34d399"
          strokeWidth={1}
          strokeDasharray="3 2"
        />
        <text
          x={140}
          y={svgH - 2}
          textAnchor="middle"
          fontSize={8}
          fill="#34d399"
        >
          최솟값 (손실 0)
        </text>
      </svg>
      <div className="flex gap-4 text-xs text-gray-500">
        <span>
          <span className="text-red-400 font-bold">●</span> 출발 (손실 높음)
        </span>
        <span>
          <span className="text-emerald-400 font-bold">●</span> 도착 (손실 최소)
        </span>
      </div>
    </div>
  );
}
