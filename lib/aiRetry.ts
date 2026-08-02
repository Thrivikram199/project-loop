export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 2
): Promise<T> {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (i < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
      }
    }
  }

  throw lastError;
}