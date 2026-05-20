"use client";

import { useState } from "react";
import Link from "next/link";

export interface TrackInfo {
  id: "kids" | "teens" | "adult";
  emoji: string;
  shortLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  lessonCount: number;
  totalMinutes: number;
  accent: "indigo" | "amber" | "sky";
}

const ACCENT_CLASSES: Record<
  TrackInfo["accent"],
  {
    border: string;
    hover: string;
    badge: string;
    cta: string;
    pillActive: string;
  }
> = {
  indigo: {
    border: "border-indigo-700/40",
    hover:
      "hover:border-indigo-500 hover:bg-indigo-900/20 hover:shadow-indigo-900/30",
    badge: "bg-indigo-900/40 text-indigo-300",
    cta: "text-indigo-300 group-hover:text-indigo-200",
    pillActive: "bg-indigo-600 text-white shadow-md shadow-indigo-900/40",
  },
  amber: {
    border: "border-amber-600/40",
    hover:
      "hover:border-amber-500 hover:bg-amber-900/20 hover:shadow-amber-900/30",
    badge: "bg-amber-900/40 text-amber-200",
    cta: "text-amber-200 group-hover:text-amber-100",
    pillActive: "bg-amber-500 text-white shadow-md shadow-amber-900/40",
  },
  sky: {
    border: "border-sky-700/40",
    hover: "hover:border-sky-500 hover:bg-sky-900/20 hover:shadow-sky-900/30",
    badge: "bg-sky-900/40 text-sky-300",
    cta: "text-sky-300 group-hover:text-sky-200",
    pillActive: "bg-sky-500 text-white shadow-md shadow-sky-900/40",
  },
};

interface TrackSelectorProps {
  tracks: TrackInfo[];
  defaultId?: TrackInfo["id"];
}

export function TrackSelector({
  tracks,
  defaultId = "adult",
}: TrackSelectorProps) {
  const [selectedId, setSelectedId] = useState<TrackInfo["id"]>(defaultId);
  const selected = tracks.find((t) => t.id === selectedId) ?? tracks[0];
  const accent = ACCENT_CLASSES[selected.accent];

  return (
    <div className="flex flex-col gap-8">
      {/* Segmented pill control */}
      <div
        role="tablist"
        aria-label="연령대 선택"
        className="mx-auto inline-flex rounded-full border border-gray-800 bg-gray-900 p-1"
      >
        {tracks.map((track) => {
          const isActive = track.id === selectedId;
          const trackAccent = ACCENT_CLASSES[track.accent];
          return (
            <button
              key={track.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedId(track.id)}
              className={`
                flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                transition-all duration-150
                ${
                  isActive
                    ? trackAccent.pillActive
                    : "text-gray-400 hover:text-gray-200"
                }
              `}
            >
              <span aria-hidden>{track.emoji}</span>
              <span>{track.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Selected track card */}
      <Link
        href={selected.href}
        className={`
          group flex flex-col gap-5 rounded-2xl border bg-gray-900 p-8
          transition-all duration-200 hover:shadow-xl
          ${accent.border} ${accent.hover}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden>
            {selected.emoji}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${accent.badge}`}
          >
            {selected.badge}
          </span>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            {selected.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            {selected.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{selected.lessonCount}개 레슨</span>
          <span>·</span>
          <span>약 {selected.totalMinutes}분</span>
        </div>

        <div className={`mt-2 text-sm font-medium ${accent.cta}`}>
          시작하기 →
        </div>
      </Link>
    </div>
  );
}
