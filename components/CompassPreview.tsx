"use client";

import { useState } from "react";
import { quizConfig } from "@/config/quizConfig";

export type CompassPoint = {
  id?: string;
  name: string;
  x: number;
  y: number;
  gesherYear?: number | null;
  alwaysShowName?: boolean;
};

export function CompassPreview({ points, featuredPoint, highlightedPointId }: { points?: readonly CompassPoint[]; featuredPoint?: CompassPoint; highlightedPointId?: string | null }) {
  const q = quizConfig.quadrants;
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const xPosition = (value: number) => `${7 + ((value + 10) / 20) * 86}%`;
  const yPosition = (value: number) => `${7 + ((10 - value) / 20) * 86}%`;
  const displayedPoints: readonly CompassPoint[] = points ?? quizConfig.exampleResults.map((point) => ({ ...point, alwaysShowName: true }));
  const activePoint = hoveredPoint;
  return <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink/20 bg-white shadow-[8px_8px_0_0_#d9e4db]" role="group" aria-label="Interactive four-quadrant compass chart">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-75"><div style={{ backgroundColor: q["upper-left"].color }} /><div style={{ backgroundColor: q["upper-right"].color }} /><div style={{ backgroundColor: q["lower-left"].color }} /><div style={{ backgroundColor: q["lower-right"].color }} /></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%),linear-gradient(to_bottom,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%)]" />
    <span className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[.08em]">{q["upper-left"].name}</span><span className="absolute right-4 top-4 text-right text-[10px] font-bold uppercase tracking-[.08em]">{q["upper-right"].name}</span><span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[.08em]">{q["lower-left"].name}</span><span className="absolute bottom-4 right-4 text-right text-[10px] font-bold uppercase tracking-[.08em]">{q["lower-right"].name}</span>
    {displayedPoints.map((result) => {
      const pointKey = result.id ?? result.name;
      const isActive = activePoint === pointKey;
      const isHighlighted = highlightedPointId === pointKey;
      const isMuted = !isActive && activePoint !== null;
      const showLabel = result.alwaysShowName || isActive;
      const labelOnLeft = result.x > 3;
      return <div key={pointKey} role="button" tabIndex={0} aria-label={`Show ${result.name}'s result`} onPointerEnter={() => setHoveredPoint(pointKey)} onPointerLeave={() => setHoveredPoint(null)} onClick={() => setHoveredPoint(isActive ? null : pointKey)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setHoveredPoint(isActive ? null : pointKey); } }} className={`absolute z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ${isActive || isHighlighted ? "z-30" : ""}`} style={{ left: xPosition(result.x), top: yPosition(result.y) }}><span aria-hidden className={`absolute left-1/2 top-1/2 h-[10.5px] w-[10.5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${isActive ? "scale-125" : ""} ${isHighlighted ? "ring-2 ring-moss ring-offset-2" : ""} ${isMuted ? "bg-[#9ca3af] opacity-35 shadow-none" : "bg-ink shadow-sm"}`} /><span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold transition-all ${labelOnLeft ? "right-[calc(50%+7px)] origin-right text-right" : "left-[calc(50%+7px)] origin-left"} ${isMuted ? "text-[#9ca3af]" : "text-ink"} ${showLabel ? "opacity-100" : "opacity-0"} ${result.alwaysShowName && isActive ? "scale-110" : ""}`}>{result.name}</span></div>;
    })}
    {featuredPoint && (() => { const pointKey = featuredPoint.id ?? featuredPoint.name; const isActive = activePoint === pointKey; const isHighlighted = highlightedPointId === pointKey; const isMuted = !isActive && activePoint !== null; const labelOnLeft = featuredPoint.x > 3; return <div role="button" tabIndex={0} aria-label={`Show ${featuredPoint.name}'s result`} onPointerEnter={() => setHoveredPoint(pointKey)} onPointerLeave={() => setHoveredPoint(null)} onClick={() => setHoveredPoint(isActive ? null : pointKey)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setHoveredPoint(isActive ? null : pointKey); } }} className={`absolute z-20 h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ${isActive || isHighlighted ? "z-30" : ""}`} style={{ left: xPosition(featuredPoint.x), top: yPosition(featuredPoint.y) }}><span aria-hidden className={`absolute left-1/2 top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${isActive ? "scale-110" : ""} ${isHighlighted ? "ring-2 ring-moss ring-offset-2" : ""} ${isMuted ? "bg-[#9ca3af] opacity-35 shadow-none ring-0" : "bg-red-600 shadow-md ring-2 ring-red-600/40"}`} /><span className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-extrabold transition-colors ${labelOnLeft ? "right-[calc(50%+9px)] text-right" : "left-[calc(50%+9px)]"} ${isMuted ? "text-[#9ca3af]" : "text-ink"}`}>{featuredPoint.name}</span></div>; })()}
  </div>;
}
