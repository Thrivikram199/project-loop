import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const user = await prisma.user.findFirst();

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}