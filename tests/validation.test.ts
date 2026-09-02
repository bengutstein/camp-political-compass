import { describe, expect, it } from "vitest";
import { questions } from "@/data/questions";
import { validateAnswers } from "@/lib/validation";

const valid = questions.map((question) => ({ questionId: question.id, value: 1 }));
describe("score API input validation", () => {
  it("accepts one supported answer per question", () => expect(validateAnswers(valid).valid).toBe(true));
  it("rejects incomplete answer sets", () => expect(validateAnswers(valid.slice(1)).valid).toBe(false));
  it("rejects invalid response values", () => expect(validateAnswers([{ ...valid[0], value: 0 }, ...valid.slice(1)]).valid).toBe(false));
  it("rejects duplicate questions", () => expect(validateAnswers([valid[0], valid[0], ...valid.slice(2)]).valid).toBe(false));
});
