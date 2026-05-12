"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Vec2 {
  x: number;
  y: number;
}

const SIZE = 300;
const ORIGIN = SIZE / 2;
const SCALE = 30; // pixels per unit

function toSvg(v: Vec2): Vec2 {
  return { x: ORIGIN + v.x * SCALE, y: ORIGIN - v.y * SCALE };
}

function fromSvg(sx: number, sy: number): Vec2 {
  return {
    x: Math.round((sx - ORIGIN) / SCALE),
    y: Math.round((ORIGIN - sy) / SCALE),
  };
}

function clamp(v: Vec2, max = 4): Vec2 {
  return {
    x: Math.max(-max, Math.min(max, v.x)),
    y: Math.max(-max, Math.min(max, v.y)),
  };
}

interface ArrowProps {
  from: Vec2;
  to: Vec2;
  color: string;
  dashed?: boolean;
}

function Arrow({ from, to, color, dashed }: ArrowProps) {
  const id = `ah-${color.replace("#", "")}`;
  const f = toSvg(from);
  const t = toSvg(to);
  const dx = t.x - f.x;
  const dy = t.y - f.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return null;

  return (
    <>
      <defs>
        <marker
          id={id}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <line
        x1={f.x}
        y1={f.y}
        x2={t.x}
        y2={t.y}
        stroke={color}
        strokeWidth={dashed ? 1.5 : 2}
        strokeDasharray={dashed ? "5,3" : undefined}
        markerEnd={`url(#${id})`}
      />
    </>
  );
}

function Grid() {
  const lines = [];
  for (let i = -4; i <= 4; i++) {
    const px = ORIGIN + i * SCALE;
    lines.push(
      <line
        key={`v${i}`}
        x1={px}
        y1={0}
        x2={px}
        y2={SIZE}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
      <line
        key={`h${i}`}
        x1={0}
        y1={ORIGIN - i * SCALE}
        x2={SIZE}
        y2={ORIGIN - i * SCALE}
        stroke="#374151"
        strokeWidth={i === 0 ? 1.5 : 0.5}
      />,
    );
    if (i !== 0) {
      lines.push(
        <text
          key={`lx${i}`}
          x={px}
          y={ORIGIN + 14}
          textAnchor="middle"
          fontSize="9"
          fill="#6b7280"
        >
          {i}
        </text>,
        <text
          key={`ly${i}`}
          x={ORIGIN - 10}
          y={ORIGIN - i * SCALE + 4}
          textAnchor="middle"
          fontSize="9"
          fill="#6b7280"
        >
          {i}
        </text>,
      );
    }
  }
  return <>{lines}</>;
}

function DragHandle({
  pos,
  color,
  svgRef,
  onChange,
}: {
  pos: Vec2;
  color: string;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onChange: (v: Vec2) => void;
}) {
  const dragging = useRef(false);
  const sp = toSvg(pos);

  function getSvgCoords(clientX: number, clientY: number): Vec2 | null {
    const el = svgRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return fromSvg(clientX - rect.left, clientY - rect.top);
  }

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;

      const onMove = (me: MouseEvent) => {
        if (!dragging.current) return;
        const v = getSvgCoords(me.clientX, me.clientY);
        if (v) onChange(clamp(v));
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      dragging.current = true;

      const onMove = (te: TouchEvent) => {
        if (!dragging.current || !te.touches[0]) return;
        const v = getSvgCoords(te.touches[0].clientX, te.touches[0].clientY);
        if (v) onChange(clamp(v));
      };
      const onEnd = () => {
        dragging.current = false;
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange],
  );

  return (
    <circle
      cx={sp.x}
      cy={sp.y}
      r={8}
      fill={color}
      stroke="white"
      strokeWidth={2}
      style={{ cursor: "grab" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}

export function VectorPlayground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [a, setA] = useState<Vec2>({ x: 3, y: 2 });
  const [b, setB] = useState<Vec2>({ x: -1, y: 3 });

  const sum: Vec2 = { x: a.x + b.x, y: a.y + b.y };
  const origin: Vec2 = { x: 0, y: 0 };

  return (
    <div className="flex flex-col gap-4">
      <svg
        ref={svgRef}
        width={SIZE}
        height={SIZE}
        className="rounded-lg border border-gray-700 bg-gray-900"
        style={{ touchAction: "none" }}
      >
        <Grid />
        {/* 벡터 합 보조선 (점선) */}
        <Arrow from={a} to={sum} color="#a78bfa" dashed />
        <Arrow from={b} to={sum} color="#34d399" dashed />
        {/* 벡터 A, B */}
        <Arrow from={origin} to={a} color="#6366f1" />
        <Arrow from={origin} to={b} color="#10b981" />
        {/* 벡터 합 */}
        <Arrow from={origin} to={sum} color="#f59e0b" />
        {/* 드래그 핸들 */}
        <DragHandle pos={a} color="#6366f1" svgRef={svgRef} onChange={setA} />
        <DragHandle pos={b} color="#10b981" svgRef={svgRef} onChange={setB} />
      </svg>

      {/* 좌표 패널 */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {[
          { label: "A", vec: a, color: "text-indigo-400" },
          { label: "B", vec: b, color: "text-emerald-400" },
          { label: "A+B", vec: sum, color: "text-yellow-400" },
        ].map(({ label, vec, color }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-700 bg-gray-900 py-2"
          >
            <p className={`mb-1 font-bold ${color}`}>{label}</p>
            <p className="font-mono text-gray-300">
              [{vec.x}, {vec.y}]
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500">
        화살표 끝점을 드래그해 벡터를 바꿔보세요
      </p>
    </div>
  );
}
