import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const RESET_CODE = process.env.MAP_RESET_CODE ?? "1985";

export async function POST(request: Request) {
  let body: { code?: unknown; name?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 }); }
  if (body.code !== RESET_CODE) return NextResponse.json({ error: "Incorrect reset code." }, { status: 403 });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (name.length > 60) return NextResponse.json({ error: "Enter a name of up to 60 characters." }, { status: 400 });

  try {
    const result = await db.quizSubmission.deleteMany({ where: name ? { optionalName: { equals: name, mode: "insensitive" } } : { optionalName: { not: null } } });
    return NextResponse.json({ resetCount: result.count });
  } catch (error) {
    console.error("Could not reset the public map", error);
    return NextResponse.json({ error: "Could not reset the map. Please try again." }, { status: 503 });
  }
}
