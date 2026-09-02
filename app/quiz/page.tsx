"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { QuizProgress } from "@/components/QuizProgress";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizNavigation } from "@/components/QuizNavigation";
import { quizConfig } from "@/config/quizConfig";
import { questions } from "@/data/questions";

const STORAGE_KEY = "where-do-you-stand-answers";

export default function QuizPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setAnswers(JSON.parse(saved)); } catch { localStorage.removeItem(STORAGE_KEY); } finally { setReady(true); } }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); }, [answers, ready]);
  const section = quizConfig.sections[page];
  const sectionQuestions = useMemo(() => questions.filter((question) => question.section === section.id), [section.id]);
  const answered = Object.keys(answers).length;
  const sectionComplete = sectionQuestions.every((question) => answers[question.id] !== undefined);
  const updateAnswer = (questionId: string, value: number) => { setAnswers((old) => ({ ...old, [questionId]: value })); setError(""); };
  const move = async () => {
    if (!sectionComplete) { setError("Please respond to every statement in this section before continuing."); return; }
    if (page < quizConfig.sections.length - 1) { setPage((value) => value + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/quiz/score", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers: questions.map((question) => ({ questionId: question.id, value: answers[question.id] })) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to calculate results.");
      localStorage.setItem("where-do-you-stand-result", JSON.stringify(result));
      router.push(`/results?x=${result.x}&y=${result.y}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Please try again."); } finally { setLoading(false); }
  };
  if (!ready) return <><Header /><main className="mx-auto max-w-4xl px-5 py-20"><p className="text-ink/60">Preparing your quiz…</p></main></>;
  return <><Header /><main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16"><QuizProgress current={page + 1} total={quizConfig.sections.length} answered={answered} questionCount={questions.length} /><section className="fade-up py-10" key={section.id}><p className="eyebrow text-moss">{section.title}</p><h1 className="display mt-3 text-4xl font-bold sm:text-5xl">{section.intro}</h1><p className="mt-4 text-ink/65">Choose the response that best reflects your first instinct.</p></section><div>{sectionQuestions.map((question, i) => <QuizQuestion key={question.id} question={question} index={page * 5 + i + 1} value={answers[question.id]} onChange={(value) => updateAnswer(question.id, value)} />)}</div>{error && <p className="mt-6 border-l-4 border-clay bg-[#f7e8e3] px-4 py-3 text-sm font-bold text-[#793324]" role="alert">{error}</p>}<QuizNavigation onBack={() => { setPage((value) => Math.max(0, value - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} onNext={move} isFirst={page === 0} isLast={page === quizConfig.sections.length - 1} disabled={!sectionComplete} loading={loading} /></main></>;
}
