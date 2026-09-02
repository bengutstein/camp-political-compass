import Link from "next/link";
import { quizConfig } from "@/config/quizConfig";
import { PublicCompass } from "./PublicCompass";

export function LandingHero() {
  return <main><section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
    <div className="fade-up"><p className="eyebrow text-moss">A two-dimensional view</p><h1 className="display mt-5 max-w-2xl text-5xl font-bold leading-[.95] sm:text-7xl">{quizConfig.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-ink/70">{quizConfig.description}</p><Link href="/quiz" className="mt-9 inline-flex items-center gap-3 bg-moss px-6 py-4 text-sm font-bold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-moss">Take the Quiz <span aria-hidden>→</span></Link></div>
    <PublicCompass />
  </section><section className="border-y rule bg-white/40"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8"><div><p className="eyebrow text-moss">01 / Respond</p><p className="mt-3 leading-7 text-ink/75">Take your time with thirty short statements. There are no right answers.</p></div><div><p className="eyebrow text-moss">02 / Compare</p><p className="mt-3 leading-7 text-ink/75">Your responses are considered across two independent dimensions.</p></div><div><p className="eyebrow text-moss">03 / Locate</p><p className="mt-3 leading-7 text-ink/75">See your position on a clear coordinate map and share it if you wish.</p></div></div></section></main>;
}
