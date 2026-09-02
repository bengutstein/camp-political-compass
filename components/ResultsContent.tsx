"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompassChart } from "@/components/CompassChart";
import { ResultSummary } from "@/components/ResultSummary";
import { ShareResults } from "@/components/ShareResults";
import { getQuadrant } from "@/lib/scoring";

function validCoordinate(input: string | null) { const n = Number(input); return input !== null && Number.isFinite(n) && n >= -10 && n <= 10 ? Math.round(n * 100) / 100 : null; }
export function ResultsContent() {
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const queryX = validCoordinate(params.get("x")); const queryY = validCoordinate(params.get("y"));
  const [stored, setStored] = useState<{ x: number; y: number; submissionId?: string } | null>(null);
  useEffect(() => { try { const result = JSON.parse(localStorage.getItem("where-do-you-stand-result") || "null"); if (result && typeof result.x === "number" && typeof result.y === "number") setStored(result); } catch { /* no stored result */ } }, []);
  const x = queryX ?? stored?.x ?? 0; const y = queryY ?? stored?.y ?? 0; const quadrant = getQuadrant(x, y);
  const saveResult = async () => {
    if (!name.trim()) return;
    setSaving(true); setSaveError("");
    try {
      const response = await fetch("/api/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, x, y, submissionId: stored?.submissionId }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save your result.");
      const next = { x, y, submissionId: result.id };
      setStored(next); localStorage.setItem("where-do-you-stand-result", JSON.stringify(next)); setSaved(true);
    } catch (error) { setSaveError(error instanceof Error ? error.message : "Could not save your result."); } finally { setSaving(false); }
  };
  return <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"><div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div className="fade-up"><ResultSummary x={x} y={y} quadrant={quadrant} displayName={name} /><div className="mt-8 flex flex-wrap gap-3"><ShareResults x={x} y={y} /><Link href="/quiz" className="px-5 py-3 text-sm font-bold underline decoration-moss decoration-2 underline-offset-4">Take Quiz Again</Link></div><div className="mt-10 max-w-sm border-t rule pt-7"><label className="block text-sm font-bold">Save this result publicly<input value={name} onChange={(event) => { setName(event.target.value); setSaved(false); }} placeholder="Enter your display name" maxLength={60} className="mt-2 w-full border border-line bg-white px-4 py-3 font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30" /></label><p className="mt-2 text-xs leading-5 text-ink/60">Your name and compass position will appear on the public map.</p>{saveError && <p className="mt-3 text-sm font-bold text-clay" role="alert">{saveError}</p>}<button type="button" onClick={saveResult} disabled={!name.trim() || saving} className="mt-4 bg-moss px-5 py-3 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving…" : saved ? "Saved to the map" : "Save my result"}</button></div></div><div className="fade-up border border-ink/20 bg-white p-2 shadow-[8px_8px_0_0_#d9e4db] sm:p-4"><CompassChart x={x} y={y} /></div></div></main>;
}
