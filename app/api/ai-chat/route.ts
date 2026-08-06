import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    let answer = "";

    if (question.toLowerCase().includes("summary")) {
      answer =
        "Overall customer satisfaction is positive. Most users appreciate product quality.";
    } else if (question.toLowerCase().includes("complaints")) {
      answer =
        "Top complaints are delivery delays, payment issues and customer support.";
    } else if (question.toLowerCase().includes("recommend")) {
      answer =
        "Improve delivery, increase support staff and simplify checkout.";
    } else if (question.toLowerCase().includes("happy")) {
      answer =
        "Customers are happy with product quality and pricing.";
    } else {
      answer =
        "Based on customer feedback, the business is performing well.";
    }

    return NextResponse.json({
      answer,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        answer: "Unable to process your request.",
      },
      {
        status: 500,
      }
    );
  }
}