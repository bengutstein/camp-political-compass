export function QuizProgress({ current, total, answered, questionCount }: { current: number; total: number; answered: number; questionCount: number }) {
  const percent = (answered / questionCount) * 100;
  return <div className="sticky top-0 z-20 -mx-5 border-b rule bg-paper/95 px-5 py-4 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-6 sm:pt-0 sm:backdrop-blur-none"><div className="flex items-baseline justify-between"><p className="eyebrow text-moss">Section {current} of {total}</p><p className="text-sm text-ink/60">{answered} of {questionCount} answered</p></div><div className="mt-3 h-1.5 bg-line sm:mt-4"><div className="h-full bg-moss transition-all duration-300" style={{ width: `${percent}%` }} /></div></div>;
}
