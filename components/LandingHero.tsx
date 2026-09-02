import Link from "next/link";
import { quizConfig } from "@/config/quizConfig";
import { PublicCompass } from "./PublicCompass";

export function LandingHero() {
  return <main><section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
    <div className="fade-up"><p className="eyebrow text-moss">A two-dimensional view</p><h1 className="display mt-4 max-w-2xl text-4xl font-bold leading-[.95] sm:mt-5 sm:text-7xl">{quizConfig.title}</h1><p className="mt-5 max-w-xl text-base leading-7 text-ink/70 sm:mt-7 sm:text-lg sm:leading-8">{quizConfig.description}</p><Link href="/quiz" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-moss px-6 py-4 text-sm font-bold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-moss sm:mt-9 sm:w-auto">Take the Quiz <span aria-hidden>→</span></Link></div>
    <PublicCompass />
  </section><section className="border-y rule bg-white/40"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-12"><div><p className="eyebrow text-moss">01 / Respond</p><p className="mt-3 leading-7 text-ink/75">Take your time with thirty short statements. There are no right answers.</p></div><div><p className="eyebrow text-moss">02 / Compare</p><p className="mt-3 leading-7 text-ink/75">Your responses are considered across two independent dimensions.</p></div><div><p className="eyebrow text-moss">03 / Locate</p><p className="mt-3 leading-7 text-ink/75">See your position on a clear coordinate map and share it if you wish.</p></div></div></section></main>;
}
