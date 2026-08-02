import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/aiRetry";
import { SYSTEM_PROMPT } from "@/lib/prompts";
import {
  getCachedValue,
  setCachedValue,
} from "@/lib/aiCache";

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
      take: 20,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        summary: "No feedback available.",
      });
    }

    const feedbackText = feedbacks
      .map(
        (f) =>
          `Customer: ${f.customer}
Message: ${f.message}
Sentiment: ${f.sentiment}`
      )
      .join("\n\n");

    const cacheKey = "ai-summary";

const cached = getCachedValue(cacheKey);

if (cached) {
  return NextResponse.json({
    summary: cached,
    cached: true,
  });
}

    const response = await withRetry(() => openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a business analyst.

Analyze the following customer feedback.

Return:

1. Overall customer satisfaction
2. Most common issues
3. Business recommendations
4. Executive summary

Feedback:

${feedbackText}
`,
    })
  );
  const prompt = `
${SYSTEM_PROMPT}

Generate an executive summary using this feedback.

Customer Feedback:

${feedbackText}
`;

    setCachedValue(
  cacheKey,
  response.output_text
);
console.log(
  `[AI] ${new Date().toISOString()} - AI request completed`
);
return NextResponse.json({
  summary: response.output_text,
  cached: false,
});
  } catch (error) {
  console.error(
  `[AI ERROR] ${new Date().toISOString()}`,
  error
);

  return NextResponse.json(
    {
      success: false,
      summary:
        "Unable to generate AI summary at the moment. Please try again later.",
    },
    {
      status: 500,
    }
  );
}
}