import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany();

    const total = feedbacks.length;

    const positive = feedbacks.filter(
      (f) => f.sentiment === "POSITIVE"
    ).length;

    const negative = feedbacks.filter(
      (f) => f.sentiment === "NEGATIVE"
    ).length;

    const neutral = feedbacks.filter(
      (f) => f.sentiment === "NEUTRAL"
    ).length;

    const themes: Record<string, number> = {};

    feedbacks.forEach((item) => {
      themes[item.theme] = (themes[item.theme] || 0) + 1;
    });

    const topTheme =
      Object.keys(themes).length > 0
        ? Object.keys(themes).reduce((a, b) =>
            themes[a] > themes[b] ? a : b
          )
        : "No Data";

    const satisfaction =
      total > 0
        ? Math.round((positive / total) * 100)
        : 0;

    return NextResponse.json({
      total,
      positive,
      negative,
      neutral,
      topTheme,
      satisfaction,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}