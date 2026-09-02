import Link from "next/link";
import { quizConfig } from "@/config/quizConfig";
import { ResetQuizButton } from "./ResetQuizButton";

export function Header() {
  return <header className="border-b rule"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
    <div className="flex items-center gap-4"><Link href="/" className="display text-xl font-bold" aria-label="Home">{quizConfig.title}</Link><ResetQuizButton /></div>
    <Link href="/quiz" className="text-sm font-bold underline decoration-moss decoration-2 underline-offset-4">Take the quiz</Link>
  </div></header>;
}
