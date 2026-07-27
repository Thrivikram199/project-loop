import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const feedbacks = await req.json();

    await prisma.feedback.createMany({
      data: feedbacks,
    });

    return NextResponse.json({
      message: "CSV Imported Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Upload Failed" },
      { status: 500 }
    );
  }
}