import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detectSentiment } from "@/utils/sentiment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Load feedback for the user's company
    if (body.action === "get") {
      const user = await prisma.user.findUnique({
        where: {
          id: body.userId,
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

      const feedback = await prisma.feedback.findMany({
        where: {
          company: user.company,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(feedback);
    }

    // Add feedback
    const { customer, message, userId } = body;

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

    const sentiment = detectSentiment(message);

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        sentiment,
        theme: "General",
        userId,
        company: user.company,
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