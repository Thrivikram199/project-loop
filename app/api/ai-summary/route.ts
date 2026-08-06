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

const feedbacks = await prisma.feedback.findMany({
  where: {
    company: user?.company,
  },
});

    if (feedbacks.length === 0) {
      return NextResponse.json({
        summary: "No customer feedback available.",
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

    let summary = "";

    if (positive >= negative && positive >= neutral) {
      summary = `
📊 Executive Summary

Overall customer satisfaction is Positive.

Positive Feedback: ${positive}
Neutral Feedback: ${neutral}
Negative Feedback: ${negative}

Customers generally appreciate the product.

Recommendation:
Continue maintaining quality and improve minor issues.
`;
    } else if (
      negative >= positive &&
      negative >= neutral
    ) {
      summary = `
📊 Executive Summary

Overall customer satisfaction is Negative.

Positive Feedback: ${positive}
Neutral Feedback: ${neutral}
Negative Feedback: ${negative}

Main concerns:
• Delivery delays
• Customer support
• Payment issues

Recommendation:
Improve customer service, logistics, and issue resolution.
`;
    } else {
      summary = `
📊 Executive Summary

Overall customer satisfaction is Neutral.

Positive Feedback: ${positive}
Neutral Feedback: ${neutral}
Negative Feedback: ${negative}

Customers have mixed opinions.

Recommendation:
Focus on improving customer experience and reducing complaints.
`;
    }

    return NextResponse.json({
      summary,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to generate summary",
      },
      {
        status: 500,
      }
    );
  }
}