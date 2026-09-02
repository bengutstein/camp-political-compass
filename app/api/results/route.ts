import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_NAME_LENGTH = 60;
const MIN_GESHER_YEAR = 1900;
const MAX_GESHER_YEAR = 2100;

function validScore(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= -10 && value <= 10;
}

function validGesherYear(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= MIN_GESHER_YEAR && value <= MAX_GESHER_YEAR;
}

export async function GET() {
  const results = await db.quizSubmission.findMany({
    where: { optionalName: { not: null } },
    select: { id: true, optionalName: true, xScore: true, yScore: true, gesherYear: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(results.map((result) => ({ id: result.id, name: result.optionalName!, x: result.xScore, y: result.yScore, gesherYear: result.gesherYear })));
}

export async function POST(request: Request) {
  let body: { name?: unknown; x?: unknown; y?: unknown; gesherYear?: unknown; submissionId?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: `Enter a display name of up to ${MAX_NAME_LENGTH} characters.` }, { status: 400 });
  if (!validScore(body.x) || !validScore(body.y)) return NextResponse.json({ error: "Scores must be between -10 and +10." }, { status: 400 });
  if (!validGesherYear(body.gesherYear)) return NextResponse.json({ error: `Enter a Gesher Year between ${MIN_GESHER_YEAR} and ${MAX_GESHER_YEAR}.` }, { status: 400 });
  try {
    const existingSubmission = await db.quizSubmission.findFirst({
      where: { optionalName: { equals: name, mode: "insensitive" } },
      select: { id: true },
    });
    const data = { xScore: body.x, yScore: body.y, optionalName: name, gesherYear: body.gesherYear };
    const submission = existingSubmission
      ? await db.quizSubmission.update({ where: { id: existingSubmission.id }, data })
      : typeof body.submissionId === "string"
      ? await db.quizSubmission.update({ where: { id: body.submissionId }, data })
      : await db.quizSubmission.create({ data: { xScore: body.x, yScore: body.y, answersJson: "[]", optionalName: name, gesherYear: body.gesherYear } });
    return NextResponse.json({ id: submission.id, name: submission.optionalName, x: submission.xScore, y: submission.yScore, gesherYear: submission.gesherYear });
  } catch (error) {
    console.error("Could not save public result", error);
    return NextResponse.json({ error: "Could not save this result. Please try again." }, { status: 503 });
  }
}
