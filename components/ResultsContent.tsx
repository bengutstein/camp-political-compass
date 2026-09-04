"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompassPreview, type CompassPoint } from "@/components/CompassPreview";
import { quizConfig } from "@/config/quizConfig";
import { ResultSummary } from "@/components/ResultSummary";
import { ShareResults } from "@/components/ShareResults";
import { getQuadrant } from "@/lib/scoring";

function validCoordinate(input: string | null) { const n = Number(input); return input !== null && Number.isFinite(n) && n >= -10 && n <= 10 ? Math.round(n * 100) / 100 : null; }

function ResultActions({ x, y, name }: { x: number; y: number; name?: string }) {
  return <div className="mt-8 flex flex-wrap gap-3"><ShareResults x={x} y={y} name={name} /><Link href="/quiz" className="inline-flex min-h-12 items-center px-5 py-3 text-sm font-bold underline decoration-moss decoration-2 underline-offset-4">Take Quiz Again</Link></div>;
}

function SavePublicResult({ name, gesherYear, saveError, saved, saving, onNameChange, onGesherYearChange, onSave }: { name: string; gesherYear: string; saveError: string; saved: boolean; saving: boolean; onNameChange: (value: string) => void; onGesherYearChange: (value: string) => void; onSave: () => void }) {
  return <section className="mt-8 max-w-sm border-2 border-moss bg-white p-5 lg:mt-10" aria-labelledby="save-result-heading"><p className="eyebrow text-moss">Final step</p><h2 id="save-result-heading" className="display mt-2 text-2xl font-bold">Save your result</h2><p className="mt-2 text-sm leading-6 text-ink/70">Enter your name and Gesher Year, then save. Your result will not appear on the public map until you do.</p><label className="mt-5 block text-sm font-bold">Your name <span className="text-clay">(required)</span><input value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Enter your display name" maxLength={60} required aria-required="true" className="mt-2 min-h-12 w-full border border-line bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30 sm:text-sm" /></label><label className="mt-4 block text-sm font-bold">Gesher Year <span className="text-clay">(required)</span><input value={gesherYear} onChange={(event) => onGesherYearChange(event.target.value)} type="number" inputMode="numeric" min="1900" max="2100" placeholder="e.g. 2024" required aria-required="true" className="mt-2 min-h-12 w-full border border-line bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30 sm:text-sm" /></label>{saveError && <p className="mt-3 text-sm font-bold text-clay" role="alert">{saveError}</p>}<button type="button" onClick={onSave} disabled={!name.trim() || !gesherYear || saving} className="mt-5 min-h-12 w-full bg-moss px-5 py-3 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving…" : saved ? "Saved — you are on the map" : "Save my name & result"}</button>{saved && <p className="mt-3 text-sm font-bold text-moss" role="status">Your result is now visible on the public map.</p>}</section>;
}

export function ResultsContent() {
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [gesherYear, setGesherYear] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedResults, setSavedResults] = useState<CompassPoint[]>([]);
  const queryX = validCoordinate(params.get("x")); const queryY = validCoordinate(params.get("y"));
  const [stored, setStored] = useState<{ x: number; y: number; gesherYear?: number; submissionId?: string } | null>(null);
  useEffect(() => { try { const result = JSON.parse(localStorage.getItem("where-do-you-stand-result") || "null"); if (result && typeof result.x === "number" && typeof result.y === "number") setStored(result); } catch { /* no stored result */ } }, []);
  useEffect(() => { fetch("/api/results").then((response) => response.ok ? response.json() : []).then(setSavedResults).catch(() => setSavedResults([])); }, []);
  const x = queryX ?? stored?.x ?? 0; const y = queryY ?? stored?.y ?? 0; const quadrant = getQuadrant(x, y);
  const saveResult = async () => {
    const parsedGesherYear = Number(gesherYear);
    if (!name.trim()) { setSaveError("Enter your name before saving your result."); return; }
    if (!Number.isInteger(parsedGesherYear) || parsedGesherYear < 1900 || parsedGesherYear > 2100) { setSaveError("Enter a Gesher Year between 1900 and 2100."); return; }
    setSaving(true); setSaveError("");
    try {
      const response = await fetch("/api/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, x, y, gesherYear: parsedGesherYear, submissionId: stored?.submissionId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save your result.");
      const next = { x, y, gesherYear: result.gesherYear, submissionId: result.id };
      setStored(next); localStorage.setItem("where-do-you-stand-result", JSON.stringify(next)); setSavedResults((current) => [result, ...current.filter((entry) => entry.id !== result.id)]); setSaved(true);
    } catch (error) { setSaveError(error instanceof Error ? error.message : "Could not save your result."); } finally { setSaving(false); }
  };
  const fixtureResults: CompassPoint[] = quizConfig.exampleResults.map((result) => ({ ...result, alwaysShowName: true }));
  const currentSubmissionId = stored?.x === x && stored.y === y ? stored.submissionId : undefined;
  const publicPoints = [...fixtureResults, ...savedResults.filter((result) => result.id !== currentSubmissionId)];
  const featuredPoint = { id: currentSubmissionId ?? "current-result", name: name.trim() || "Your result", x, y };
  const mostSimilarPeople = publicPoints
    .map((person) => ({ person, distance: Math.hypot(person.x - x, person.y - y) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map(({ person }) => person);
  const saveForm = <SavePublicResult name={name} gesherYear={gesherYear} saveError={saveError} saved={saved} saving={saving} onNameChange={(value) => { setName(value); setSaved(false); }} onGesherYearChange={(value) => { setGesherYear(value); setSaved(false); }} onSave={saveResult} />;
  const actions = <ResultActions x={x} y={y} name={saved ? name : undefined} />;
  return <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-16"><div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-12"><div className="fade-up"><ResultSummary x={x} y={y} quadrant={quadrant} displayName={name} /><div className="hidden lg:block">{saveForm}{actions}</div></div><div className="fade-up"><CompassPreview points={publicPoints} featuredPoint={featuredPoint} /><section className="mx-auto mt-7 w-full max-w-[420px] sm:mt-8"><p className="eyebrow text-moss">Closest on the compass</p><h2 className="display mt-2 text-3xl font-bold">Most similar people</h2><ol className="mt-4 divide-y border-y rule">{mostSimilarPeople.map((person, index) => <li key={person.id ?? person.name} className="flex min-h-12 items-center gap-4 py-3"><span className="text-xs font-bold text-ink/45">{String(index + 1).padStart(2, "0")}</span><span className="font-bold">{person.name}</span></li>)}</ol></section><div className="lg:hidden">{saveForm}{actions}</div></div></div></main>;
}
