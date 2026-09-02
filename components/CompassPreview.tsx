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
  const displayedPoints: readonly CompassPoint[] = points ?? quizConfig.exampleResults.map((point) => ({ ...point, alwaysShowName: true }));
  return <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink/20 bg-white shadow-[8px_8px_0_0_#d9e4db]" aria-label="Preview of a four-quadrant compass chart">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-75"><div style={{ backgroundColor: q["upper-left"].color }} /><div style={{ backgroundColor: q["upper-right"].color }} /><div style={{ backgroundColor: q["lower-left"].color }} /><div style={{ backgroundColor: q["lower-right"].color }} /></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%),linear-gradient(to_bottom,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%)]" />
    <span className="absolute left-4 top-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-left"].name}</span><span className="absolute right-4 top-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-right"].name}</span><span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-left"].name}</span><span className="absolute bottom-4 right-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-right"].name}</span>
    {displayedPoints.map((result) => {
      const pointKey = result.id ?? result.name;
      const isDimmed = hoveredPoint !== null && hoveredPoint !== pointKey;
      const isHovered = hoveredPoint === pointKey;
      const isMuted = !isHovered && (result.filteredOut || isDimmed);
      return <div key={pointKey} onMouseEnter={() => setHoveredPoint(pointKey)} onMouseLeave={() => setHoveredPoint(null)} className="group absolute z-10 group-hover:z-30 group-focus-within:z-30" style={{ left: `${((result.x + 10) / 20) * 100}%`, top: `${((10 - result.y) / 20) * 100}%` }}><div className={`h-[10.5px] w-[10.5px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all group-hover:scale-125 ${isMuted ? "bg-[#9ca3af] opacity-35 shadow-none" : "bg-ink shadow-sm"}`} /><span className={`pointer-events-none absolute left-2 top-1 inline-block origin-left whitespace-nowrap text-[9px] font-bold transition-colors ${isMuted ? "text-[#9ca3af]" : "text-ink"} ${result.alwaysShowName ? "opacity-100 transition-transform group-hover:scale-110" : "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"}`}>{result.name}</span></div>;
    })}
    {featuredPoint && <div onMouseEnter={() => setHoveredPoint(featuredPoint.id ?? featuredPoint.name)} onMouseLeave={() => setHoveredPoint(null)} className="group absolute z-20 group-hover:z-30" style={{ left: `${((featuredPoint.x + 10) / 20) * 100}%`, top: `${((10 - featuredPoint.y) / 20) * 100}%` }}><div className={`h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all group-hover:scale-110 ${hoveredPoint !== null && hoveredPoint !== (featuredPoint.id ?? featuredPoint.name) ? "bg-[#9ca3af] opacity-35 shadow-none ring-0" : "bg-red-600 shadow-md ring-2 ring-red-600/40"}`} /><span className={`pointer-events-none absolute left-3 top-1 whitespace-nowrap text-[10px] font-extrabold transition-colors ${hoveredPoint !== null && hoveredPoint !== (featuredPoint.id ?? featuredPoint.name) ? "text-[#9ca3af]" : "text-ink"}`}>{featuredPoint.name}</span></div>}
  </div>;
}
