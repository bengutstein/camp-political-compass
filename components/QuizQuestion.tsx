import type { Question } from "@/data/questions";
import { AnswerScale } from "./AnswerScale";
export function QuizQuestion({ question, index, value, onChange }: { question: Question; index: number; value?: number; onChange: (value: number) => void }) {
  return <article className="border-b rule py-9 first:pt-2"><p className="eyebrow text-ink/45">Statement {index}</p><h3 className="display mt-3 max-w-3xl text-2xl font-bold leading-tight sm:text-[1.7rem]">{question.text}</h3><AnswerScale questionId={question.id} value={value} onChange={onChange} /></article>;
}
