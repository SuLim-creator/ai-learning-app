"use client";

export function ForwardBackwardPassDiagram() {
  const steps = [
    { label: "입력 X", x: 60, color: "#6366f1" },
    { label: "예측값 ŷ", x: 210, color: "#8b5cf6" },
    { label: "손실 L", x: 360, color: "#ef4444" },
  ];
  const cy = 80;
  const r = 30;

  return (
    <svg
      viewBox="0 0 440 170"
      className="w-full max-w-md mx-auto"
      aria-label="순전파 역전파 흐름"
    >
      {/* forward arrows */}
      <defs>
        <marker
          id="fwd"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#6366f1" />
        </marker>
        <marker
          id="bwd"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* forward pass line */}
      <line
        x1={steps[0].x + r}
        y1={cy}
        x2={steps[1].x - r}
        y2={cy}
        stroke="#6366f1"
        strokeWidth="2"
        markerEnd="url(#fwd)"
      />
      <line
        x1={steps[1].x + r}
        y1={cy}
        x2={steps[2].x - r}
        y2={cy}
        stroke="#6366f1"
        strokeWidth="2"
        markerEnd="url(#fwd)"
      />
      <text
        x="135"
        y={cy - 10}
        textAnchor="middle"
        fontSize="10"
        fill="#6366f1"
      >
        순전파 →
      </text>
      <text
        x="285"
        y={cy - 10}
        textAnchor="middle"
        fontSize="10"
        fill="#6366f1"
      >
        손실 계산
      </text>

      {/* backward pass arc */}
      <path
        d={`M ${steps[2].x} ${cy + r} Q 210 160 ${steps[0].x} ${cy + r}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="6 3"
        markerEnd="url(#bwd)"
      />
      <text x="210" y="158" textAnchor="middle" fontSize="10" fill="#f59e0b">
        ← 역전파 (가중치 업데이트)
      </text>

      {/* nodes */}
      {steps.map((s) => (
        <g key={s.x}>
          <circle
            cx={s.x}
            cy={cy}
            r={r}
            fill={s.color}
            fillOpacity="0.15"
            stroke={s.color}
            strokeWidth="1.5"
          />
          <text
            x={s.x}
            y={cy + 4}
            textAnchor="middle"
            fontSize="11"
            fill={s.color}
            fontWeight="600"
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* model box between X and ŷ */}
      <rect
        x="145"
        y={cy - 18}
        width="50"
        height="36"
        rx="6"
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="1"
      />
      <text x="170" y={cy + 4} textAnchor="middle" fontSize="10" fill="#94a3b8">
        모델
      </text>
    </svg>
  );
}
