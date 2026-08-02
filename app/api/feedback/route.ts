import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detectSentiment } from "@/utils/sentiment";

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Feedback GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { customer, message, userId } = await req.json();

const sentiment = detectSentiment(message);

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        sentiment,
        userId,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } 
  
  
  
  catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to add feedback" },
      { status: 500 }
    );
  }
}