"use client";

export function ResetQuizButton() {
  const reset = () => {
    localStorage.removeItem("where-do-you-stand-answers");
    localStorage.removeItem("where-do-you-stand-result");
    // A full navigation also clears the in-memory quiz state when reset mid-quiz.
    window.location.assign("/quiz");
  };
  return <button type="button" onClick={reset} className="text-xs font-bold text-clay underline decoration-clay decoration-2 underline-offset-4 transition hover:text-ink">Reset quiz</button>;
}
