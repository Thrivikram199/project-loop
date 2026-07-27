import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const { question } = await req.json();

  const feedback = await prisma.feedback.findMany();

  let answer = "Sorry, I couldn't understand your question.";

  const q = question.toLowerCase();

  if (q.includes("positive")) {
    answer = `There are ${
      feedback.filter((f) => f.sentiment === "POSITIVE").length
    } positive feedback(s).`;
  }

  else if (q.includes("negative")) {
    answer = `There are ${
      feedback.filter((f) => f.sentiment === "NEGATIVE").length
    } negative feedback(s).`;
  }

  else if (q.includes("neutral")) {
    answer = `There are ${
      feedback.filter((f) => f.sentiment === "NEUTRAL").length
    } neutral feedback(s).`;
  }

  else if (q.includes("total")) {
    answer = `There are ${feedback.length} feedback records.`;
  }

  else if (q.includes("customer")) {
    answer = feedback.map((f) => f.customer).join(", ");
  }

  else if (
  q.includes("summary") ||
  q.includes("summarize") ||
  q.includes("overview")
) {
  const positive = feedback.filter(
    (f) => f.sentiment === "POSITIVE"
  ).length;

  const negative = feedback.filter(
    (f) => f.sentiment === "NEGATIVE"
  ).length;

  const neutral = feedback.filter(
    (f) => f.sentiment === "NEUTRAL"
  ).length;

  answer =
    `Customer Feedback Summary:\n\n` +
    `Total Feedback: ${feedback.length}\n` +
    `Positive: ${positive}\n` +
    `Negative: ${negative}\n` +
    `Neutral: ${neutral}\n\n`;

  if (positive > negative) {
    answer +=
      "Overall customers are satisfied with the service.";
  } else {
    answer +=
      "Customer satisfaction needs improvement.";
  }
}

else if (
  q.includes("complaint") ||
  q.includes("problem")
) {
  const complaints = feedback.filter(
    (f) => f.sentiment === "NEGATIVE"
  );

  if (complaints.length === 0) {
    answer = "No major complaints were found.";
  } else {
    answer = complaints
      .map((f) => `${f.customer}: ${f.message}`)
      .join("\n");
  }
}

  return NextResponse.json({ answer });
}