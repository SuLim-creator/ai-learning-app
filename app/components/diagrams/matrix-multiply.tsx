"use client";

export function MatrixMultiplyDiagram() {
  const cell = 36;
  const a = [
    [1, 2],
    [3, 4],
  ];
  const b = [
    [5, 6],
    [7, 8],
  ];
  const c = [
    [1 * 5 + 2 * 7, 1 * 6 + 2 * 8],
    [3 * 5 + 4 * 7, 3 * 6 + 4 * 8],
  ];

  function Grid({
    data,
    ox,
    oy,
    color,
    highlight,
  }: {
    data: number[][];
    ox: number;
    oy: number;
    color: string;
    highlight?: [number, number];
  }) {
    return (
      <>
        {data.map((row, r) =>
          row.map((val, c) => {
            const isHl = highlight && highlight[0] === r && highlight[1] === c;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={ox + c * cell}
                  y={oy + r * cell}
                  width={cell - 2}
                  height={cell - 2}
                  rx="4"
                  fill={isHl ? color : "#1e293b"}
                  fillOpacity={isHl ? 0.6 : 1}
                  stroke={isHl ? color : "#334155"}
                  strokeWidth="1.5"
                />
                <text
                  x={ox + c * cell + cell / 2 - 1}
                  y={oy + r * cell + cell / 2 + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={isHl ? "#fff" : "#94a3b8"}
                >
                  {val}
                </text>
              </g>
            );
          }),
        )}
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 480 160"
      className="w-full max-w-md mx-auto"
      aria-label="행렬 곱셈"
    >
      {/* A */}
      <text x="44" y="16" textAnchor="middle" fontSize="11" fill="#6366f1">
        A (2×2)
      </text>
      <Grid data={a} ox={10} oy={24} color="#6366f1" highlight={[0, 0]} />

      {/* × */}
      <text x="108" y="78" textAnchor="middle" fontSize="20" fill="#475569">
        ×
      </text>

      {/* B */}
      <text x="164" y="16" textAnchor="middle" fontSize="11" fill="#8b5cf6">
        B (2×2)
      </text>
      <Grid data={b} ox={130} oy={24} color="#8b5cf6" highlight={[0, 0]} />

      {/* = */}
      <text x="228" y="78" textAnchor="middle" fontSize="20" fill="#475569">
        =
      </text>

      {/* C */}
      <text x="284" y="16" textAnchor="middle" fontSize="11" fill="#10b981">
        C (2×2)
      </text>
      <Grid data={c} ox={250} oy={24} color="#10b981" highlight={[0, 0]} />

      {/* formula */}
      <text x="240" y="120" textAnchor="middle" fontSize="10" fill="#6366f1">
        C[0][0] = (1×5) + (2×7) = 19
      </text>
      <text x="240" y="134" textAnchor="middle" fontSize="10" fill="#64748b">
        행 × 열 의 합 → 각 출력 원소
      </text>

      {/* bracket lines A */}
      <line x1="8" y1="22" x2="8" y2="94" stroke="#6366f1" strokeWidth="2" />
      <line x1="84" y1="22" x2="84" y2="94" stroke="#6366f1" strokeWidth="2" />
      {/* bracket lines B */}
      <line
        x1="128"
        y1="22"
        x2="128"
        y2="94"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
      <line
        x1="204"
        y1="22"
        x2="204"
        y2="94"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
      {/* bracket lines C */}
      <line
        x1="248"
        y1="22"
        x2="248"
        y2="94"
        stroke="#10b981"
        strokeWidth="2"
      />
      <line
        x1="324"
        y1="22"
        x2="324"
        y2="94"
        stroke="#10b981"
        strokeWidth="2"
      />
    </svg>
  );
}
