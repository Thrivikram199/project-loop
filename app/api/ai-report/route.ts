import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    let report = `
📄 AI Executive Report

Total Feedback: ${total}

Positive Feedback: ${positive}

Neutral Feedback: ${neutral}

Negative Feedback: ${negative}

`;

    if (positive >= negative && positive >= neutral) {
      report += `
Overall Sentiment:
Positive

Key Findings:
• Customers are satisfied with the product.
• Product quality is appreciated.
• Customer experience is improving.

Recommendations:
• Continue improving delivery.
• Enhance customer support.
• Introduce loyalty rewards.
`;
    } else if (negative >= positive && negative >= neutral) {
      report += `
Overall Sentiment:
Negative

Key Findings:
• Customers report delivery delays.
• Customer support needs improvement.
• Payment issues are affecting satisfaction.

Recommendations:
• Improve logistics.
• Increase support staff.
• Optimize payment gateway.
`;
    } else {
      report += `
Overall Sentiment:
Neutral

Key Findings:
• Customers have mixed opinions.
• Some appreciate the product while others report issues.

Recommendations:
• Focus on improving customer experience.
• Reduce complaints through faster support.
`;
    }

    return NextResponse.json({
      report,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        report: "Unable to generate report.",
      },
      {
        status: 500,
      }
    );
  }
}