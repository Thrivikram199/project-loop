import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  return NextResponse.json({
    message: "Login API is working",
  });
}


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("Entered password:", password);
console.log("Stored password:", user.password);

const passwordMatch = await bcrypt.compare(
  password,
  user.password
);

console.log("Password Match:", passwordMatch);

if (!passwordMatch) {
  return NextResponse.json(
    {
      message: "Invalid email or password",
      match: passwordMatch,
    },
    { status: 401 }
  );
}

    return NextResponse.json({
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}