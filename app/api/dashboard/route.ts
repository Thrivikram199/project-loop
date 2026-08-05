import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const feedbacks = await prisma.feedback.findMany({
      where: {
        userId,
      },
    });

    const total = feedbacks.length;

    const positive = feedbacks.filter(
  (f: typeof feedbacks[number]) => f.sentiment === "POSITIVE"
).length;

const negative = feedbacks.filter(
  (f: typeof feedbacks[number]) => f.sentiment === "NEGATIVE"
).length;

const neutral = feedbacks.filter(
  (f: typeof feedbacks[number]) => f.sentiment === "NEUTRAL"
).length;

    const themes: Record<string, number> = {};

    feedbacks.forEach((item: typeof feedbacks[number]) => {
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
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}