import Link from "next/link";
import { quizConfig } from "@/config/quizConfig";
import { ResetQuizButton } from "./ResetQuizButton";

export function Header() {
  return <header className="border-b rule"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:gap-4 sm:px-8 sm:py-5">
    <div className="flex min-w-0 items-center gap-4"><Link href="/" className="display truncate text-lg font-bold sm:text-xl" aria-label="Home"><span className="sm:hidden">Berkshires Compass</span><span className="hidden sm:inline">{quizConfig.title}</span></Link><span className="hidden sm:block"><ResetQuizButton /></span></div>
    <div className="flex shrink-0 items-center gap-3"><span className="sm:hidden"><ResetQuizButton /></span><Link href="/quiz" className="text-sm font-bold underline decoration-moss decoration-2 underline-offset-4"><span className="sm:hidden">Start</span><span className="hidden sm:inline">Take the quiz</span></Link></div>
  </div></header>;
}
