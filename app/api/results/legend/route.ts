import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const LEGEND_CODE = process.env.LEGEND_CODE ?? "2016";

export async function POST(request: Request) {
  let body: { code?: unknown; name?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (body.code !== LEGEND_CODE) {
    return NextResponse.json({ error: "Incorrect legend code." }, { status: 403 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name || name.length > 60) {
    return NextResponse.json({ error: "Enter the saved name you want to make a legend." }, { status: 400 });
  }

  try {
    const submission = await db.quizSubmission.findFirst({
      where: { optionalName: { equals: name, mode: "insensitive" } },
      select: { id: true },
    });
    if (!submission) {
      return NextResponse.json({ error: "No saved public result has that name." }, { status: 404 });
    }

    const legend = await db.quizSubmission.update({
      where: { id: submission.id },
      data: { isLegend: true },
    });
    return NextResponse.json({
      id: legend.id,
      name: legend.optionalName,
      x: legend.xScore,
      y: legend.yScore,
      gesherYear: legend.gesherYear,
      isLegend: legend.isLegend,
    });
  } catch (error) {
    console.error("Could not make legend", error);
    return NextResponse.json({ error: "Could not update this result. Please try again." }, { status: 503 });
  }
}
