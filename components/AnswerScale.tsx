import { quizConfig } from "@/config/quizConfig";

export function AnswerScale({ questionId, value, onChange }: { questionId: string; value?: number; onChange: (value: number) => void }) {
  return <fieldset className="mt-5"><legend className="sr-only">Your response</legend><div className="grid gap-2 sm:grid-cols-4">{quizConfig.answerOptions.map((option) => { const id = `${questionId}-${option.value}`; const selected = value === option.value; return <div key={id}><input className="answer-input sr-only" type="radio" id={id} name={questionId} checked={selected} onChange={() => onChange(option.value)} /><label htmlFor={id} className={`flex min-h-14 cursor-pointer items-center justify-center border px-3 py-3 text-center text-sm font-bold transition ${selected ? "border-moss bg-moss text-white" : "border-line bg-white hover:border-moss hover:bg-[#eef4ee]"}`}>{option.label}</label></div>; })}</div></fieldset>;
}
