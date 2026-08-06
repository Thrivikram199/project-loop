import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        company: user.company,
      },
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        trends: [
          {
            title: "No Feedback Available",
            description:
              "Upload customer feedback to generate trend analysis.",
          },
        ],
      });
    }

    const positive = feedbacks.filter(
      (f: typeof feedbacks[number]) =>
        f.sentiment === "POSITIVE"
    ).length;

    const negative = feedbacks.filter(
      (f: typeof feedbacks[number]) =>
        f.sentiment === "NEGATIVE"
    ).length;

    const neutral = feedbacks.filter(
      (f: typeof feedbacks[number]) =>
        f.sentiment === "NEUTRAL"
    ).length;

    const trends = [
      {
        title: "Overall Trend",
        description:
          positive >= negative
            ? "Customer satisfaction is generally positive."
            : "Customer satisfaction requires improvement.",
      },
      {
        title: "Positive Feedback",
        description: `${positive} positive feedback records received.`,
      },
      {
        title: "Negative Feedback",
        description: `${negative} negative feedback records received.`,
      },
      {
        title: "Neutral Feedback",
        description: `${neutral} neutral feedback records received.`,
      },
      {
        title: "Recommendation",
        description:
          negative > positive
            ? "Focus on improving customer support and resolving complaints."
            : "Continue maintaining product quality and customer satisfaction.",
      },
    ];

    return NextResponse.json({
      trends,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to generate trend analysis.",
      },
      {
        status: 500,
      }
    );
  }
}