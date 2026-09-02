import { quizConfig, type Quadrant } from "@/config/quizConfig";
import type { Question } from "@/data/questions";

export type Answer = { questionId: string; value: number };
export type Score = { x: number; y: number; quadrant: Quadrant };

export function getQuadrant(x: number, y: number): Quadrant {
  return `${y >= 0 ? "upper" : "lower"}-${x >= 0 ? "right" : "left"}` as Quadrant;
}

/**
 * Each raw axis total is divided by the largest possible absolute total for that
 * axis (sum of absolute weights × largest answer magnitude), then scaled to ±10.
 * The configurable intensity multiplier lets strongly consistent answer patterns
 * reach the outer range sooner; clamping still guarantees a ±10 boundary.
 */
export function calculateScore(answers: Answer[], questionSet: Question[]): Score {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.value]));
  let rawX = 0;
  let rawY = 0;
  let maxX = 0;
  let maxY = 0;
  const maxAnswer = Math.max(...quizConfig.answerOptions.map((option) => Math.abs(option.value)));

  for (const question of questionSet) {
    const answer = answerMap.get(question.id) ?? 0;
    const value = question.reverseScored ? -answer : answer;
    rawX += value * question.weights.x;
    rawY += value * question.weights.y;
    maxX += Math.abs(question.weights.x) * maxAnswer;
    maxY += Math.abs(question.weights.y) * maxAnswer;
  }

  const normalize = (raw: number, maximum: number) => {
    const score = maximum === 0 ? 0 : (raw / maximum) * 10 * quizConfig.scoring.intensityMultiplier;
    return Math.round(Math.max(-10, Math.min(10, score)) * 100) / 100;
  };
  const x = normalize(rawX, maxX);
  const y = normalize(rawY, maxY);
  return { x, y, quadrant: getQuadrant(x, y) };
}
