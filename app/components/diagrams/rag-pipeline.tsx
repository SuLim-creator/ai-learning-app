"use client";

export function RagPipelineDiagram() {
  const steps = [
    { label: "질문", sub: "사용자 입력", color: "#6366f1", x: 50 },
    { label: "검색", sub: "벡터 DB\n유사 문서 탐색", color: "#8b5cf6", x: 160 },
    {
      label: "증강",
      sub: "문서 + 질문\n컨텍스트 결합",
      color: "#f59e0b",
      x: 270,
    },
    { label: "생성", sub: "LLM\n답변 생성", color: "#10b981", x: 380 },
  ];

  return (
    <svg
      viewBox="0 0 450 150"
      className="w-full max-w-md mx-auto"
      aria-label="RAG 파이프라인"
    >
      <defs>
        <marker
          id="rag-arr"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L7,3 z" fill="#475569" />
        </marker>
      </defs>

      {/* connecting arrows */}
      {[95, 205, 315].map((x) => (
        <line
          key={x}
          x1={x}
          y1={62}
          x2={x + 25}
          y2={62}
          stroke="#475569"
          strokeWidth="2"
          markerEnd="url(#rag-arr)"
        />
      ))}

      {/* step boxes */}
      {steps.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x - 45}
            y={32}
            width={90}
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
              y={70 + i * 12}
              textAnchor="middle"
              fontSize="9"
              fill="#94a3b8"
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* DB icon hint */}
      <ellipse
        cx={160}
        cy={110}
        rx={30}
        ry={8}
        fill="#8b5cf6"
        fillOpacity="0.2"
        stroke="#8b5cf6"
        strokeWidth="1"
      />
      <text x={160} y={113} textAnchor="middle" fontSize="8" fill="#8b5cf6">
        Vector DB
      </text>
      <line
        x1={160}
        y1={92}
        x2={160}
        y2={102}
        stroke="#8b5cf6"
        strokeWidth="1"
        strokeDasharray="3 2"
      />

      <text x={225} y={140} textAnchor="middle" fontSize="9" fill="#64748b">
        외부 지식을 검색해 LLM의 답변 정확도를 높임
      </text>
    </svg>
  );
}
