import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detectSentiment } from "@/utils/sentiment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Load feedback
    if (body.action === "get") {
      const feedback = await prisma.feedback.findMany({
        where: {
          userId: body.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(feedback);
    }

    // Add feedback
    const { customer, message, userId } = body;

    const sentiment = detectSentiment(message);

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        sentiment,
        theme: "General",
        userId,
      },
    });

    return NextResponse.json(feedback, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to process feedback",
      },
      {
        status: 500,
      }
    );
  }
}