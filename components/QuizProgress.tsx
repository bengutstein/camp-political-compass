export function QuizProgress({ current, total, answered, questionCount }: { current: number; total: number; answered: number; questionCount: number }) {
  const percent = (answered / questionCount) * 100;
  return <div className="border-b rule pb-6"><div className="flex items-baseline justify-between"><p className="eyebrow text-moss">Section {current} of {total}</p><p className="text-sm text-ink/60">{answered} of {questionCount} answered</p></div><div className="mt-4 h-1.5 bg-line"><div className="h-full bg-moss transition-all duration-300" style={{ width: `${percent}%` }} /></div></div>;
}
