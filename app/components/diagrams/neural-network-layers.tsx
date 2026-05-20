"use client";

export function NeuralNetworkLayersDiagram() {
  const layers = [
    { label: "입력층", nodes: 3, color: "#6366f1", x: 80 },
    { label: "은닉층 1", nodes: 4, color: "#8b5cf6", x: 220 },
    { label: "은닉층 2", nodes: 4, color: "#8b5cf6", x: 360 },
    { label: "출력층", nodes: 2, color: "#10b981", x: 500 },
  ];
  const height = 220;
  const nodeR = 16;

  function nodeY(count: number, i: number) {
    const spacing = (height - 40) / (count + 1);
    return 20 + spacing * (i + 1);
  }

  return (
    <svg
      viewBox="0 0 580 220"
      className="w-full max-w-lg mx-auto"
      aria-label="신경망 레이어 구조"
    >
      {/* edges */}
      {layers.slice(0, -1).map((layer, li) => {
        const next = layers[li + 1];
        return Array.from({ length: layer.nodes }, (_, i) =>
          Array.from({ length: next.nodes }, (_, j) => (
            <line
              key={`${li}-${i}-${j}`}
              x1={layer.x}
              y1={nodeY(layer.nodes, i)}
              x2={next.x}
              y2={nodeY(next.nodes, j)}
              stroke="#334155"
              strokeWidth="1"
            />
          )),
        );
      })}

      {/* nodes */}
      {layers.map((layer) =>
        Array.from({ length: layer.nodes }, (_, i) => (
          <circle
            key={`${layer.x}-${i}`}
            cx={layer.x}
            cy={nodeY(layer.nodes, i)}
            r={nodeR}
            fill={layer.color}
            fillOpacity="0.85"
            stroke={layer.color}
            strokeWidth="1.5"
          />
        )),
      )}

      {/* labels */}
      {layers.map((layer) => (
        <text
          key={`label-${layer.x}`}
          x={layer.x}
          y={height - 4}
          textAnchor="middle"
          fontSize="11"
          fill="#94a3b8"
        >
          {layer.label}
        </text>
      ))}

      {/* input/output labels */}
      <text x="80" y="14" textAnchor="middle" fontSize="10" fill="#6366f1">
        X
      </text>
      <text x="500" y="14" textAnchor="middle" fontSize="10" fill="#10b981">
        ŷ
      </text>
    </svg>
  );
}
