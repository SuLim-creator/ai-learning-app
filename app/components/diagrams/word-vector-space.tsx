"use client";

export function WordVectorSpaceDiagram() {
  const words = [
    { label: "왕", x: 80, y: 50, color: "#6366f1" },
    { label: "여왕", x: 160, y: 50, color: "#6366f1" },
    { label: "남자", x: 80, y: 120, color: "#8b5cf6" },
    { label: "여자", x: 160, y: 120, color: "#8b5cf6" },
    { label: "고양이", x: 290, y: 70, color: "#10b981" },
    { label: "강아지", x: 290, y: 130, color: "#10b981" },
  ];

  const arrows = [
    { x1: 80, y1: 50, x2: 160, y2: 50, label: "+여성", color: "#f59e0b" },
    { x1: 80, y1: 120, x2: 160, y2: 120, label: "+여성", color: "#f59e0b" },
    { x1: 80, y1: 50, x2: 80, y2: 120, label: "-왕권", color: "#64748b" },
    { x1: 160, y1: 50, x2: 160, y2: 120, label: "", color: "#64748b" },
  ];

  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full max-w-sm mx-auto"
      aria-label="단어 벡터 공간"
    >
      <defs>
        <marker
          id="wv-arr"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" />
        </marker>
        <marker
          id="wv-gray"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
        </marker>
      </defs>

      {/* axes */}
      <line
        x1="30"
        y1="170"
        x2="380"
        y2="170"
        stroke="#1e293b"
        strokeWidth="1"
      />
      <line x1="30" y1="170" x2="30" y2="20" stroke="#1e293b" strokeWidth="1" />
      <text x="385" y="173" fontSize="9" fill="#475569">
        의미 축 1
      </text>
      <text x="32" y="16" fontSize="9" fill="#475569">
        의미 축 2
      </text>

      {/* relation arrows */}
      {arrows.map((a, i) => (
        <g key={i}>
          <line
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke={a.color}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd={a.color === "#f59e0b" ? "url(#wv-arr)" : "url(#wv-gray)"}
          />
          {a.label && (
            <text
              x={(a.x1 + a.x2) / 2}
              y={(a.y1 + a.y2) / 2 - 5}
              textAnchor="middle"
              fontSize="9"
              fill={a.color}
            >
              {a.label}
            </text>
          )}
        </g>
      ))}

      {/* word dots */}
      {words.map((w) => (
        <g key={w.label}>
          <circle
            cx={w.x}
            cy={w.y}
            r={18}
            fill={w.color}
            fillOpacity="0.2"
            stroke={w.color}
            strokeWidth="1.5"
          />
          <text
            x={w.x}
            y={w.y + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={w.color}
          >
            {w.label}
          </text>
        </g>
      ))}

      {/* divider */}
      <line
        x1="230"
        y1="30"
        x2="230"
        y2="160"
        stroke="#1e293b"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      <text x="200" y="182" textAnchor="middle" fontSize="9" fill="#64748b">
        유사한 단어끼리 가까운 위치
      </text>
      <text x="330" y="182" textAnchor="middle" fontSize="9" fill="#64748b">
        다른 의미군
      </text>
    </svg>
  );
}
