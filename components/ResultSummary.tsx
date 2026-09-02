import { quizConfig, type Quadrant } from "@/config/quizConfig";

const signed = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(2)}`;
export function ResultSummary({ x, y, quadrant, displayName }: { x: number; y: number; quadrant: Quadrant; displayName?: string }) {
  const result = quizConfig.quadrants[quadrant];
  return <section><p className="eyebrow text-moss">{displayName?.trim() || "Your Results"}</p><h1 className="display mt-3 text-5xl font-bold sm:text-6xl">{result.name}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">{result.description}</p><dl className="mt-9 grid max-w-md grid-cols-2 border-y rule"><div className="py-5"><dt className="text-xs font-bold uppercase tracking-[.12em] text-ink/55">{quizConfig.xAxis.title}</dt><dd className="display mt-2 text-3xl font-bold">{signed(x)}</dd></div><div className="border-l rule py-5 pl-5"><dt className="text-xs font-bold uppercase tracking-[.12em] text-ink/55">{quizConfig.yAxis.title}</dt><dd className="display mt-2 text-3xl font-bold">{signed(y)}</dd></div></dl></section>;
}
