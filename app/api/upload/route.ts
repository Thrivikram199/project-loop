import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 400 }
      );
    }

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

if (!user.company) {
  return NextResponse.json(
    {
      message: "User company is not set.",
    },
    {
      status: 400,
    }
  );
}

    const text = await file.text();

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as {
      customer: string;
      message: string;
      sentiment: string;
    }[];

    let imported = 0;

    for (const row of records) {
      await prisma.feedback.create({
  data: {
    customer: row.customer,
    message: row.message,
    sentiment: (row.sentiment ?? "NEUTRAL").toUpperCase() as
      | "POSITIVE"
      | "NEGATIVE"
      | "NEUTRAL",
    theme: "General",
    userId,
    company: user.company,
  },
});

      imported++;
    }

    return NextResponse.json({
      message: `CSV imported successfully! (${imported} records)`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}