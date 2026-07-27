import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { auth } from "@/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return Response.json(
      { error: "Access Denied" },
      { status: 403 }
    );
  }

  await prisma.feedback.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: "Deleted" });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { customer, message, sentiment } =
      await request.json();

    const feedback = await prisma.feedback.update({
      where: { id },
      data: {
        customer,
        message,
        sentiment,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}