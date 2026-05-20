export function SupervisedFlowDiagram() {
  const boxes = [
    {
      label: "입력 X",
      sub: "이메일 텍스트\n집 면적·방 개수",
      color: "#1e40af",
      border: "#3b82f6",
    },
    {
      label: "모델 f",
      sub: "함수를 찾는 중",
      color: "#4c1d95",
      border: "#8b5cf6",
    },
    {
      label: "예측값 ŷ",
      sub: "스팸 확률\n예상 집값",
      color: "#065f46",
      border: "#10b981",
    },
    {
      label: "손실 계산",
      sub: "ŷ vs 정답 y\n얼마나 틀렸나?",
      color: "#7c2d12",
      border: "#f97316",
    },
  ];

  const boxW = 80;
  const boxH = 56;
  const gapX = 36;
  const totalW = boxes.length * boxW + (boxes.length - 1) * gapX;
  const svgW = totalW + 40;
  const svgH = 160;
  const startX = 20;
  const boxY = 40;

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-xs text-gray-400">지도학습 학습 루프</p>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-sm">
        {boxes.map((box, i) => {
          const x = startX + i * (boxW + gapX);
          const cx = x + boxW / 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={boxY}
                width={boxW}
                height={boxH}
                rx={8}
                fill={box.color}
                stroke={box.border}
                strokeWidth={1.5}
              />
              <text
                x={cx}
                y={boxY + 20}
                textAnchor="middle"
                fontSize={12}
                fontWeight="bold"
                fill="#f1f5f9"
              >
                {box.label}
              </text>
              {box.sub.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={boxY + 34 + li * 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#94a3b8"
                >
                  {line}
                </text>
              ))}
              {/* Arrow to next box */}
              {i < boxes.length - 1 && (
                <g>
                  <line
                    x1={x + boxW}
                    y1={boxY + boxH / 2}
                    x2={x + boxW + gapX - 6}
                    y2={boxY + boxH / 2}
                    stroke="#475569"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${x + boxW + gapX - 6},${boxY + boxH / 2 - 4} ${x + boxW + gapX},${boxY + boxH / 2} ${x + boxW + gapX - 6},${boxY + boxH / 2 + 4}`}
                    fill="#475569"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Feedback arrow: 손실 → 모델 업데이트 */}
        <path
          d={`M ${startX + 3 * (boxW + gapX) + boxW / 2} ${boxY + boxH + 8} Q ${svgW / 2} ${svgH - 10} ${startX + boxW + gapX + boxW / 2} ${boxY + boxH + 8}`}
          fill="none"
          stroke="#f97316"
          strokeWidth={1.2}
          strokeDasharray="4 3"
        />
        <polygon
          points={`${startX + boxW + gapX + boxW / 2 - 4},${boxY + boxH + 4} ${startX + boxW + gapX + boxW / 2},${boxY + boxH + 8} ${startX + boxW + gapX + boxW / 2 + 4},${boxY + boxH + 4}`}
          fill="#f97316"
        />
        <text
          x={svgW / 2}
          y={svgH - 2}
          textAnchor="middle"
          fontSize={9}
          fill="#f97316"
        >
          파라미터 업데이트 (역전파)
        </text>
      </svg>
      <p className="text-xs text-gray-500">
        정답 y와 비교해 손실을 줄이도록 모델을 반복 수정
      </p>
    </div>
  );
}
