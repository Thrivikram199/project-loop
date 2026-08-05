import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
  name: user.name,
  email: user.email,
  phone: user.phone,
  department: user.department,
  company: user.company,
  role: user.role,
  createdAt: user.createdAt,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error loading profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const {
      userId,
      name,
      email,
      phone,
      department,
      company,
    } = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        phone,
        department,
        company,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}