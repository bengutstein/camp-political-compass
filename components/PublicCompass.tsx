"use client";

import { useEffect, useState } from "react";
import { quizConfig } from "@/config/quizConfig";
import { CompassPreview, type CompassPoint } from "./CompassPreview";

export function PublicCompass() {
  const [savedResults, setSavedResults] = useState<CompassPoint[]>([]);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState("");
  useEffect(() => { fetch("/api/results").then((response) => response.ok ? response.json() : []).then(setSavedResults).catch(() => setSavedResults([])); }, []);
  const fixtureResults = quizConfig.exampleResults.map((result) => ({
    ...result,
    alwaysShowName: true,
  }));
  const resetMap = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResetting(true); setResetError("");
    try {
      const response = await fetch("/api/results/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: resetCode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not reset the map.");
      setSavedResults([]); setResetCode(""); setResetOpen(false);
    } catch (error) { setResetError(error instanceof Error ? error.message : "Could not reset the map."); } finally { setResetting(false); }
  };

  return <div className="mx-auto w-full max-w-[420px]"><CompassPreview points={[...fixtureResults, ...savedResults]} /><div className="mt-4 text-right"><button type="button" onClick={() => { setResetOpen((open) => !open); setResetError(""); }} className="text-xs font-bold text-clay underline decoration-clay decoration-2 underline-offset-4 transition hover:text-ink">Reset map</button>{resetOpen && <form onSubmit={resetMap} className="mt-3 border border-line bg-white p-3 text-left"><label className="block text-xs font-bold">Enter reset code<input value={resetCode} onChange={(event) => setResetCode(event.target.value)} type="password" inputMode="numeric" autoComplete="off" autoFocus className="mt-2 w-full border border-line bg-paper px-3 py-2 font-normal outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/30" /></label>{resetError && <p className="mt-2 text-xs font-bold text-clay" role="alert">{resetError}</p>}<div className="mt-3 flex justify-end gap-3"><button type="button" onClick={() => { setResetOpen(false); setResetCode(""); setResetError(""); }} className="text-xs font-bold underline underline-offset-4">Cancel</button><button type="submit" disabled={!resetCode || resetting} className="bg-clay px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{resetting ? "Resetting…" : "Confirm reset"}</button></div></form>}</div></div>;
}
