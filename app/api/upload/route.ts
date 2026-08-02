import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { Sentiment } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    const text = await file.text();

    const records = parse(text, {
  columns: true,
  skip_empty_lines: true,
}) as {
  customer: string;
  message: string;
  sentiment: string;
}[];

    const user = await prisma.user.findFirst();

if (!user) {
  return NextResponse.json(
    { message: "No user found." },
    { status: 400 }
  );
}

for (const row of records) {
  await prisma.feedback.create({
    data: {
      customer: row.customer,
      message: row.message,
      sentiment: row.sentiment as Sentiment,
      userId: user.id,
    },
  });
}

    return NextResponse.json({
      message: "CSV imported successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Import failed." },
      { status: 500 }
    );
  }
}