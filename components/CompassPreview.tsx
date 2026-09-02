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
  filteredOut?: boolean;
};

export function CompassPreview({ points, featuredPoint }: { points?: readonly CompassPoint[]; featuredPoint?: CompassPoint }) {
  const q = quizConfig.quadrants;
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [tappedPoint, setTappedPoint] = useState<string | null>(null);
  const displayedPoints: readonly CompassPoint[] = points ?? quizConfig.exampleResults.map((point) => ({ ...point, alwaysShowName: true }));
  const activePoint = tappedPoint ?? hoveredPoint;
  const toggleTappedPoint = (pointKey: string) => setTappedPoint((current) => current === pointKey ? null : pointKey);
  return <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink/20 bg-white shadow-[8px_8px_0_0_#d9e4db]" role="group" aria-label="Interactive four-quadrant compass chart">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-75"><div style={{ backgroundColor: q["upper-left"].color }} /><div style={{ backgroundColor: q["upper-right"].color }} /><div style={{ backgroundColor: q["lower-left"].color }} /><div style={{ backgroundColor: q["lower-right"].color }} /></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%),linear-gradient(to_bottom,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%)]" />
    <span className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[.08em]">{q["upper-left"].name}</span><span className="absolute right-4 top-4 text-right text-[10px] font-bold uppercase tracking-[.08em]">{q["upper-right"].name}</span><span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[.08em]">{q["lower-left"].name}</span><span className="absolute bottom-4 right-4 text-right text-[10px] font-bold uppercase tracking-[.08em]">{q["lower-right"].name}</span>
    {displayedPoints.map((result) => {
      const pointKey = result.id ?? result.name;
      const isActive = activePoint === pointKey;
      const isMuted = !isActive && (result.filteredOut || activePoint !== null);
      const showLabel = result.alwaysShowName || isActive;
      return <button key={pointKey} type="button" aria-label={`Show ${result.name}`} aria-pressed={isActive} onClick={() => toggleTappedPoint(pointKey)} onPointerEnter={() => setHoveredPoint(pointKey)} onPointerLeave={() => setHoveredPoint(null)} className={`absolute z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss ${isActive ? "z-30" : ""}`} style={{ left: `${((result.x + 10) / 20) * 100}%`, top: `${((10 - result.y) / 20) * 100}%` }}><span aria-hidden className={`absolute left-1/2 top-1/2 h-[10.5px] w-[10.5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${isActive ? "scale-125" : ""} ${isMuted ? "bg-[#9ca3af] opacity-35 shadow-none" : "bg-ink shadow-sm"}`} /><span className={`pointer-events-none absolute left-[calc(50%+7px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-bold transition-all ${isMuted ? "text-[#9ca3af]" : "text-ink"} ${showLabel ? "opacity-100" : "opacity-0"} ${result.alwaysShowName && isActive ? "scale-110" : ""}`}>{result.name}</span></button>;
    })}
    {featuredPoint && (() => { const pointKey = featuredPoint.id ?? featuredPoint.name; const isActive = activePoint === pointKey; const isMuted = !isActive && activePoint !== null; return <button type="button" aria-label={`Show ${featuredPoint.name}`} aria-pressed={isActive} onClick={() => toggleTappedPoint(pointKey)} onPointerEnter={() => setHoveredPoint(pointKey)} onPointerLeave={() => setHoveredPoint(null)} className={`absolute z-20 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss ${isActive ? "z-30" : ""}`} style={{ left: `${((featuredPoint.x + 10) / 20) * 100}%`, top: `${((10 - featuredPoint.y) / 20) * 100}%` }}><span aria-hidden className={`absolute left-1/2 top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${isActive ? "scale-110" : ""} ${isMuted ? "bg-[#9ca3af] opacity-35 shadow-none ring-0" : "bg-red-600 shadow-md ring-2 ring-red-600/40"}`} /><span className={`pointer-events-none absolute left-[calc(50%+9px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-extrabold transition-colors ${isMuted ? "text-[#9ca3af]" : "text-ink"}`}>{featuredPoint.name}</span></button>; })()}
  </div>;
}
