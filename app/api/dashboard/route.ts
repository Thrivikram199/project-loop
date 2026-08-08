import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body?.userId;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        {
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.company) {
      return NextResponse.json(
        {
          message: "User company is not set.",
        },
        {
          status: 400,
        }
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        company: user.company,
      },
    });

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

    const satisfaction =
      total > 0 ? Math.round((positive / total) * 100) : 0;

    const themes: Record<string, number> = {};

    feedbacks.forEach((item) => {
      if (item.theme) {
        themes[item.theme] =
          (themes[item.theme] || 0) + 1;
      }
    });

    const topTheme =
      Object.entries(themes).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "No themes available";

    return NextResponse.json({
      total,
      positive,
      negative,
      neutral,
      satisfaction,
      topTheme,
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown dashboard error";

    return NextResponse.json(
      {
        message: "Unable to load dashboard data.",
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}