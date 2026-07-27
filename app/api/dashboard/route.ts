import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.feedback.count();

    const positive = await prisma.feedback.count({
      where: {
        sentiment: "POSITIVE",
      },
    });

    const negative = await prisma.feedback.count({
      where: {
        sentiment: "NEGATIVE",
      },
    });

    const neutral = await prisma.feedback.count({
      where: {
        sentiment: "NEUTRAL",
      },
    });

    return NextResponse.json({
      total,
      positive,
      negative,
      neutral,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Dashboard Error" },
      { status: 500 }
    );
  }
}