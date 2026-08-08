import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
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

    if (feedbacks.length === 0) {
      return NextResponse.json({
        recommendations: [
          "No customer feedback available yet.",
          "Add customer feedback to generate recommendations.",
        ],
      });
    }

    const positive = feedbacks.filter(
      (f) => f.sentiment === "POSITIVE"
    ).length;

    const negative = feedbacks.filter(
      (f) => f.sentiment === "NEGATIVE"
    ).length;

    const neutral = feedbacks.filter(
      (f) => f.sentiment === "NEUTRAL"
    ).length;

    const recommendations: string[] = [];

    if (positive >= negative && positive >= neutral) {
      recommendations.push(
        "Maintain the current product quality and customer experience."
      );
      recommendations.push(
        "Reward loyal customers with special offers."
      );
      recommendations.push(
        "Encourage satisfied customers to leave reviews."
      );
      recommendations.push(
        "Continue monitoring customer satisfaction regularly."
      );
      recommendations.push(
        "Analyze positive feedback to identify best practices."
      );
    } else if (negative >= positive && negative >= neutral) {
      recommendations.push(
        "Improve customer support response time."
      );
      recommendations.push(
        "Investigate recurring customer complaints."
      );
      recommendations.push(
        "Reduce delivery and service delays."
      );
      recommendations.push(
        "Improve product quality based on customer feedback."
      );
      recommendations.push(
        "Track complaint resolution to improve satisfaction."
      );
    } else {
      recommendations.push(
        "Collect more detailed customer feedback."
      );
      recommendations.push(
        "Improve communication with customers."
      );
      recommendations.push(
        "Analyze feedback trends every month."
      );
      recommendations.push(
        "Address common customer concerns."
      );
      recommendations.push(
        "Focus on increasing positive customer experiences."
      );
    }

    return NextResponse.json({
      recommendations,
    });
  } catch (error) {
    console.error("AI recommendations error:", error);

    return NextResponse.json(
      {
        message: "Unable to generate recommendations.",
      },
      {
        status: 500,
      }
    );
  }
}