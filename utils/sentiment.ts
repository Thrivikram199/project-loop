export function detectSentiment(message: string) {
  const text = message.toLowerCase();

  const positiveWords = [
    "excellent",
    "good",
    "great",
    "awesome",
    "love",
    "happy",
    "fast",
    "best",
    "amazing",
    "perfect",
  ];

  const negativeWords = [
    "bad",
    "late",
    "poor",
    "worst",
    "delay",
    "broken",
    "hate",
    "slow",
    "terrible",
    "issue",
  ];

  let positiveScore = 0;
  let negativeScore = 0;

  positiveWords.forEach((word) => {
    if (text.includes(word)) positiveScore++;
  });

  negativeWords.forEach((word) => {
    if (text.includes(word)) negativeScore++;
  });

  if (positiveScore > negativeScore) return "POSITIVE";

  if (negativeScore > positiveScore) return "NEGATIVE";

  return "NEUTRAL";
}