import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [stageCount, lessonCount] = await Promise.all([
      prisma.stage.count(),
      prisma.lesson.count(),
    ]);
    return NextResponse.json({
      status: "ok",
      db: { stages: stageCount, lessons: lessonCount },
    });
  } catch (error) {
    console.error("[health] db error", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
