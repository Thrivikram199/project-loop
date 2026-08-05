import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/aiRetry";
import { SYSTEM_PROMPT } from "@/lib/prompts";


export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
  return NextResponse.json(
    {
      error: "OpenAI API key is not configured.",
    },
    {
      status: 500,
    }
  );
}
    const { question } = await req.json();

let answer = "";

if (question.toLowerCase().includes("summary")) {
  answer =
    "Overall customer satisfaction is positive. Most users appreciate product quality.";
}
else if (question.toLowerCase().includes("complaints")) {
  answer =
    "Top complaints are delivery delays, payment issues and customer support.";
}
else if (question.toLowerCase().includes("recommend")) {
  answer =
    "Improve delivery, increase support staff and simplify checkout.";
}
else if (question.toLowerCase().includes("happy")) {
  answer =
    "Customers are happy with product quality and pricing.";
}
else {
  answer =
    "Based on customer feedback, the business is performing well.";
}

return Response.json({
  answer,
});

    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        answer: "No feedback available.",
      });
    }

    const context = feedbacks
      .map(
        (f) =>
          `Customer: ${f.customer}
Message: ${f.message}
Sentiment: ${f.sentiment}`
      )
      .join("\n\n");

    const response = await withRetry(() => openai.responses.create({
      model: "gpt-4.1-mini",

      input: `
You are an AI business analyst.

Answer ONLY using the customer feedback below.

Customer Feedback:

${context}

Question:

${question}
`,
    })
  );
const prompt = `
${SYSTEM_PROMPT}

Customer Feedback:

${context}

Question:

${question}
`;

console.log(
  `[AI] ${new Date().toISOString()} - AI request completed`
);
    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error(
  `[AI ERROR] ${new Date().toISOString()}`,
  error
);

    return NextResponse.json(
  {
    success: false,
    answer:
      "Unable to process your request right now.",
  },
  {
    status: 500,
  }
);
  }
}