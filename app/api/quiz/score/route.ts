import { NextResponse } from "next/server";
import { questions } from "@/data/questions";
import { db } from "@/lib/db";
import { calculateScore } from "@/lib/scoring";
import { validateAnswers } from "@/lib/validation";

export async function POST(request: Request) {
  let body: { answers?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  const validation = validateAnswers(body.answers);
  if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });
  const score = calculateScore(validation.answers, questions);
  try {
    const submission = await db.quizSubmission.create({ data: { xScore: score.x, yScore: score.y, answersJson: JSON.stringify(validation.answers) } });
    return NextResponse.json({ ...score, submissionId: submission.id });
  } catch (error) { console.error("Could not save anonymous quiz submission", error); return NextResponse.json({ error: "Could not record this submission. Initialize the local database and try again." }, { status: 503 }); }
}
