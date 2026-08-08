import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const userId = formData.get("userId");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: "No CSV file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    if (typeof userId !== "string" || !userId) {
      return NextResponse.json(
        {
          message: "User ID is required.",
        },
        {
          status: 400,
        }
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
          message: "User not found.",
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
      customer?: string;
      message?: string;
      sentiment?: string;
      theme?: string;
    }[];

    if (records.length === 0) {
      return NextResponse.json(
        {
          message: "CSV file contains no records.",
        },
        {
          status: 400,
        }
      );
    }

    let imported = 0;

    for (const row of records) {
      if (!row.customer || !row.message) {
        continue;
      }

      const sentiment =
        (row.sentiment || "NEUTRAL").toUpperCase();

      const validSentiment =
        sentiment === "POSITIVE" ||
        sentiment === "NEGATIVE" ||
        sentiment === "NEUTRAL"
          ? sentiment
          : "NEUTRAL";

      await prisma.feedback.create({
        data: {
          customer: row.customer,
          message: row.message,
          sentiment: validSentiment,
          theme: row.theme || "General",
          userId: user.id,
          company: user.company,
        },
      });

      imported++;
    }

    return NextResponse.json({
      message: `CSV imported successfully! (${imported} records)`,
      imported,
    });
  } catch (error) {
    console.error("UPLOAD API ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}