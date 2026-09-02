import { describe, expect, it } from "vitest";
import { calculateScore, getQuadrant } from "@/lib/scoring";
import type { Question } from "@/data/questions";

const questions: Question[] = [
  { id: "x", text: "x", section: "test", weights: { x: 1, y: 0 } },
  { id: "y", text: "y", section: "test", weights: { x: 0, y: 1 } },
  { id: "both", text: "both", section: "test", weights: { x: 0.5, y: -0.5 } },
  { id: "reverse", text: "reverse", section: "test", weights: { x: 1, y: 0 }, reverseScored: true },
];
const answers = (value: number) => questions.map((question) => ({ questionId: question.id, value }));

describe("calculateScore", () => {
  it("normalizes all strongly agree responses into the expected range", () => { const score = calculateScore(answers(2), questions); expect(score.x).toBe(3.3); expect(score.y).toBe(5.5); });
  it("normalizes all strongly disagree responses", () => { const score = calculateScore(answers(-2), questions); expect(score.x).toBe(-3.3); expect(score.y).toBe(-5.5); });
  it("combines mixed answers and reverse scoring", () => { const score = calculateScore([{ questionId: "x", value: 2 }, { questionId: "y", value: -2 }, { questionId: "both", value: 1 }, { questionId: "reverse", value: 2 }], questions); expect(score.x).toBe(1.65); expect(score.y).toBe(-10); expect(score.quadrant).toBe("lower-right"); });
  it("clamps a maximum raw score to +10", () => { const score = calculateScore([{ questionId: "only", value: 999 }], [{ id: "only", text: "only", section: "test", weights: { x: 1, y: 0 } }]); expect(score.x).toBe(10); });
  it("clamps a minimum raw score to -10", () => { const score = calculateScore([{ questionId: "only", value: -999 }], [{ id: "only", text: "only", section: "test", weights: { x: 1, y: 0 } }]); expect(score.x).toBe(-10); });
  it("keeps a neutral-ish combination near center", () => { const score = calculateScore([{ questionId: "x", value: 1 }, { questionId: "y", value: -1 }, { questionId: "both", value: -1 }, { questionId: "reverse", value: -1 }], questions); expect(score.x).toBe(4.95); expect(score.y).toBe(-2.75); });
  it("identifies all quadrants", () => { expect(getQuadrant(-1, 1)).toBe("upper-left"); expect(getQuadrant(1, 1)).toBe("upper-right"); expect(getQuadrant(-1, -1)).toBe("lower-left"); expect(getQuadrant(1, -1)).toBe("lower-right"); });
});
