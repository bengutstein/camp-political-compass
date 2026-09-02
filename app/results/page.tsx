import { Suspense } from "react";
import { Header } from "@/components/Header";
import { ResultsContent } from "@/components/ResultsContent";

export default function ResultsPage() {
  return <><Header /><Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><p className="text-ink/60">Loading your results…</p></main>}><ResultsContent /></Suspense></>;
}
