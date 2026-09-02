import { quizConfig } from "@/config/quizConfig";

export type CompassPoint = {
  id?: string;
  name: string;
  x: number;
  y: number;
  alwaysShowName?: boolean;
};

export function CompassPreview({ points, featuredPoint }: { points?: readonly CompassPoint[]; featuredPoint?: CompassPoint }) {
  const q = quizConfig.quadrants;
  const displayedPoints: readonly CompassPoint[] = points ?? quizConfig.exampleResults.map((point) => ({ ...point, alwaysShowName: true }));
  return <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink/20 bg-white shadow-[8px_8px_0_0_#d9e4db]" aria-label="Preview of a four-quadrant compass chart">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-75"><div style={{ backgroundColor: q["upper-left"].color }} /><div style={{ backgroundColor: q["upper-right"].color }} /><div style={{ backgroundColor: q["lower-left"].color }} /><div style={{ backgroundColor: q["lower-right"].color }} /></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%),linear-gradient(to_bottom,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%)]" />
    <span className="absolute left-4 top-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-left"].name}</span><span className="absolute right-4 top-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-right"].name}</span><span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-left"].name}</span><span className="absolute bottom-4 right-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-right"].name}</span>
    {displayedPoints.map((result) => <div key={result.id ?? result.name} className="group absolute z-10 group-hover:z-30 group-focus-within:z-30" style={{ left: `${((result.x + 10) / 20) * 100}%`, top: `${((10 - result.y) / 20) * 100}%` }}><div className="h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow-sm transition-transform group-hover:scale-125" /><span className={`pointer-events-none absolute left-2 top-1 inline-block origin-left whitespace-nowrap text-[9px] font-bold text-ink ${result.alwaysShowName ? "opacity-100 transition-transform group-hover:scale-110" : "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"}`}>{result.name}</span></div>)}
    {featuredPoint && <div className="absolute z-20" style={{ left: `${((featuredPoint.x + 10) / 20) * 100}%`, top: `${((10 - featuredPoint.y) / 20) * 100}%` }}><div className="h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 shadow-md ring-2 ring-red-600/40" /><span className="pointer-events-none absolute left-3 top-1 whitespace-nowrap text-[10px] font-extrabold text-ink">{featuredPoint.name}</span></div>}
  </div>;
}
