import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const feedback = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}