"use client";

export function LlmPipelineDiagram() {
  const stages = [
    {
      label: "사전학습",
      sub: "인터넷 텍스트\n수조 토큰",
      color: "#6366f1",
      x: 60,
    },
    {
      label: "파인튜닝",
      sub: "고품질\n지시 데이터",
      color: "#8b5cf6",
      x: 200,
    },
    {
      label: "RLHF",
      sub: "인간 피드백\n강화학습",
      color: "#10b981",
      x: 340,
    },
  ];

  return (
    <svg
      viewBox="0 0 420 150"
      className="w-full max-w-md mx-auto"
      aria-label="LLM 학습 3단계 파이프라인"
    >
      <defs>
        <marker
          id="llm-arr"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L7,3 z" fill="#475569" />
        </marker>
      </defs>

      {/* arrows between stages */}
      <line
        x1="112"
        y1="60"
        x2="148"
        y2="60"
        stroke="#475569"
        strokeWidth="2"
        markerEnd="url(#llm-arr)"
      />
      <line
        x1="252"
        y1="60"
        x2="288"
        y2="60"
        stroke="#475569"
        strokeWidth="2"
        markerEnd="url(#llm-arr)"
      />

      {/* stage boxes */}
      {stages.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x - 52}
            y={30}
            width={104}
            height={60}
            rx="8"
            fill={s.color}
            fillOpacity="0.15"
            stroke={s.color}
            strokeWidth="1.5"
          />
          <text
            x={s.x}
            y={55}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={s.color}
          >
            {s.label}
          </text>
          {s.sub.split("\n").map((line, i) => (
            <text
              key={i}
              x={s.x}
              y={70 + i * 13}
              textAnchor="middle"
              fontSize="9"
              fill="#94a3b8"
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* output label */}
      <text x="210" y="118" textAnchor="middle" fontSize="10" fill="#64748b">
        기반 모델 → 지시 수행 → 안전하고 도움이 되는 AI
      </text>

      {/* result arrow */}
      <line
        x1="392"
        y1="60"
        x2="415"
        y2="60"
        stroke="#10b981"
        strokeWidth="2"
        markerEnd="url(#llm-arr)"
      />
      <text x="416" y="56" fontSize="9" fill="#10b981">
        Claude
      </text>
      <text x="416" y="67" fontSize="9" fill="#10b981">
        GPT 등
      </text>
    </svg>
  );
}
