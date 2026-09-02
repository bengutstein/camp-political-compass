import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const aggregate = await db.quizSubmission.aggregate({ _count: { id: true }, _avg: { xScore: true, yScore: true } });
  return NextResponse.json({ totalSubmissions: aggregate._count.id, averageX: Math.round((aggregate._avg.xScore ?? 0) * 100) / 100, averageY: Math.round((aggregate._avg.yScore ?? 0) * 100) / 100 });
}
