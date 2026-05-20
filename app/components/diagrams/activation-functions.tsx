"use client";

export function ActivationFunctionsDiagram() {
  const W = 560;
  const H = 160;
  const padX = 50;
  const padY = 15;
  const graphW = (W - padX * 2 - 40) / 3;
  const graphH = H - padY * 2 - 20;

  const xMin = -3;
  const xMax = 3;
  const yMin = -1.2;
  const yMax = 1.2;

  function toSvg(x: number, y: number, gx: number) {
    const sx = gx + ((x - xMin) / (xMax - xMin)) * graphW;
    const sy = padY + graphH - ((y - yMin) / (yMax - yMin)) * graphH;
    return [sx, sy] as const;
  }

  function sigmoid(x: number) {
    return 1 / (1 + Math.exp(-x));
  }
  function tanh(x: number) {
    return Math.tanh(x);
  }
  function relu(x: number) {
    return Math.max(0, x);
  }

  function makePath(fn: (x: number) => number, gx: number) {
    const pts = Array.from({ length: 61 }, (_, i) => {
      const x = xMin + (i / 60) * (xMax - xMin);
      return toSvg(x, fn(x), gx);
    });
    return pts
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`,
      )
      .join(" ");
  }

  const graphs = [
    { label: "Sigmoid", fn: sigmoid, color: "#6366f1", range: "출력: 0~1" },
    { label: "Tanh", fn: tanh, color: "#8b5cf6", range: "출력: -1~1" },
    { label: "ReLU", fn: relu, color: "#10b981", range: "출력: 0~∞" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 30}`}
      className="w-full max-w-lg mx-auto"
      aria-label="활성화 함수 그래프"
    >
      {graphs.map((g, idx) => {
        const gx = padX + idx * (graphW + 20);
        const [ax0, ay0] = toSvg(xMin, 0, gx);
        const [ax1, ay1] = toSvg(xMax, 0, gx);
        const [ay0x, ay0y] = toSvg(0, yMin, gx);
        const [ay1x, ay1y] = toSvg(0, yMax, gx);

        return (
          <g key={g.label}>
            {/* axes */}
            <line
              x1={ax0}
              y1={ay0}
              x2={ax1}
              y2={ay1}
              stroke="#334155"
              strokeWidth="1"
            />
            <line
              x1={ay0x}
              y1={ay0y}
              x2={ay1x}
              y2={ay1y}
              stroke="#334155"
              strokeWidth="1"
            />

            {/* curve */}
            <path
              d={makePath(g.fn, gx)}
              fill="none"
              stroke={g.color}
              strokeWidth="2"
            />

            {/* label */}
            <text
              x={gx + graphW / 2}
              y={H + 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={g.color}
            >
              {g.label}
            </text>
            <text
              x={gx + graphW / 2}
              y={H + 22}
              textAnchor="middle"
              fontSize="9"
              fill="#64748b"
            >
              {g.range}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
