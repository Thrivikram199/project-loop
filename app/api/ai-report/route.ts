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
      take: 50,
    });

    if (feedbacks.length === 0) {
      return NextResponse.json({
        report: "No feedback available.",
      });
    }

    const input = feedbacks
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
Generate a professional executive report.

Include:

1. Executive Summary

2. Positive Findings

3. Negative Findings

4. Customer Satisfaction

5. Business Risks

6. Recommendations

7. Final Conclusion

Feedback:

${input}
`,
    })
  );

  const prompt = `
${SYSTEM_PROMPT}

Generate business recommendations.

Customer Feedback:

${feedbacks}
`;
  
  console.log(
  `[AI] ${new Date().toISOString()} - AI request completed`
);

    return NextResponse.json({
      report: response.output_text,
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