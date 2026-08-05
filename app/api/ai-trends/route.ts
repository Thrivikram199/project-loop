import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/aiRetry";
import { SYSTEM_PROMPT } from "@/lib/prompts";



export async function GET() {
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
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        trends: "No feedback available.",
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
You are a senior business analyst.

Analyze these customer feedback records.

Return:

1. Overall Trend

2. Positive Trend

3. Negative Trend

4. Emerging Issues

5. Opportunities

6. Final Recommendation

Customer Feedback:

${context}
`,
    })
  );
  const prompt = `
${SYSTEM_PROMPT}

Generate business recommendations.

Customer Feedback:

${context}
`;
  console.log(
  `[AI] ${new Date().toISOString()} - AI request completed`
);

    return Response.json({
  trends: [
    { month: "Jan", positive: 82, negative: 18 },
    { month: "Feb", positive: 84, negative: 16 },
    { month: "Mar", positive: 87, negative: 13 },
    { month: "Apr", positive: 90, negative: 10 },
    { month: "May", positive: 91, negative: 9 },
    { month: "Jun", positive: 93, negative: 7 },
  ],
});
  } catch (error) {
    console.error(
  `[AI ERROR] ${new Date().toISOString()}`,
  error
);

    return NextResponse.json(
      {
        trends: "Unable to generate trend analysis.",
      },
      {
        status: 500,
      }
    );
  }
}