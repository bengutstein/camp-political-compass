import { quizConfig } from "@/config/quizConfig";

export type CompassPoint = { id?: string; name: string; x: number; y: number };

export function CompassPreview({ points = quizConfig.exampleResults }: { points?: readonly CompassPoint[] }) {
  const q = quizConfig.quadrants;
  return <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-ink/20 bg-white shadow-[8px_8px_0_0_#d9e4db]" aria-label="Preview of a four-quadrant compass chart">
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-75"><div style={{ backgroundColor: q["upper-left"].color }} /><div style={{ backgroundColor: q["upper-right"].color }} /><div style={{ backgroundColor: q["lower-left"].color }} /><div style={{ backgroundColor: q["lower-right"].color }} /></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%),linear-gradient(to_bottom,transparent_49.7%,rgba(24,33,30,.7)_49.8%,rgba(24,33,30,.7)_50.2%,transparent_50.3%)]" />
    <span className="absolute left-4 top-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-left"].name}</span><span className="absolute right-4 top-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["upper-right"].name}</span><span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-left"].name}</span><span className="absolute bottom-4 right-4 text-right text-[9px] font-bold uppercase tracking-[.1em]">{q["lower-right"].name}</span>
    {points.map((result) => <div key={result.id ?? result.name} className="group absolute z-10" style={{ left: `${((result.x + 10) / 20) * 100}%`, top: `${((10 - result.y) / 20) * 100}%` }}><div className="h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-sm transition-transform group-hover:scale-125" /><span className="pointer-events-none absolute left-2 top-1 whitespace-nowrap bg-paper px-1.5 py-0.5 text-[9px] font-bold text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{result.name}</span></div>)}
  </div>;
}
