import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_NAME_LENGTH = 60;

function validScore(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= -10 && value <= 10;
}

export async function GET() {
  const results = await db.quizSubmission.findMany({
    where: { optionalName: { not: null } },
    select: { id: true, optionalName: true, xScore: true, yScore: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(results.map((result) => ({ id: result.id, name: result.optionalName!, x: result.xScore, y: result.yScore })));
}

export async function POST(request: Request) {
  let body: { name?: unknown; x?: unknown; y?: unknown; submissionId?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: `Enter a display name of up to ${MAX_NAME_LENGTH} characters.` }, { status: 400 });
  if (!validScore(body.x) || !validScore(body.y)) return NextResponse.json({ error: "Scores must be between -10 and +10." }, { status: 400 });
  try {
    const submission = typeof body.submissionId === "string"
      ? await db.quizSubmission.update({ where: { id: body.submissionId }, data: { optionalName: name } })
      : await db.quizSubmission.create({ data: { xScore: body.x, yScore: body.y, answersJson: "[]", optionalName: name } });
    return NextResponse.json({ id: submission.id, name: submission.optionalName, x: submission.xScore, y: submission.yScore });
  } catch (error) {
    console.error("Could not save public result", error);
    return NextResponse.json({ error: "Could not save this result. Please try again." }, { status: 503 });
  }
}
