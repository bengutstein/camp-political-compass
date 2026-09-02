import { quizConfig } from "@/config/quizConfig";
import { questions } from "@/data/questions";
import type { Answer } from "@/lib/scoring";

export function validateAnswers(input: unknown): { valid: true; answers: Answer[] } | { valid: false; error: string } {
  if (!Array.isArray(input) || input.length !== questions.length) return { valid: false, error: "Every question requires an answer." };
  const validValues = new Set<number>(quizConfig.answerOptions.map((option) => option.value));
  const expectedIds = new Set(questions.map((question) => question.id));
  const seen = new Set<string>();
  const answers: Answer[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object" || typeof (item as Answer).questionId !== "string" || typeof (item as Answer).value !== "number") return { valid: false, error: "Answers have an invalid format." };
    const answer = item as Answer;
    if (!expectedIds.has(answer.questionId) || seen.has(answer.questionId) || !validValues.has(answer.value)) return { valid: false, error: "Answers include an invalid question or response." };
    seen.add(answer.questionId);
    answers.push(answer);
  }
  return { valid: true, answers };
}
