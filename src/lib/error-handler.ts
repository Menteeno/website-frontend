/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  public status: number;
  public errors?: Record<string, string[]> | undefined;

  constructor(
    message: string,
    status: number = 500,
    errors?: Record<string, string[]> | undefined
  ) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Handle API errors and convert them to ApiException
 * @param error - Error from API response
 * @returns ApiException instance
 */
export function handleApiError(error: any): ApiException {
  if (error instanceof ApiException) {
    return error;
  }

  if (error?.response?.data) {
    const { message, errors, status } = error.response.data;
    return new ApiException(
      message || "An error occurred",
      status || 500,
      errors
    );
  }

  if (error?.message) {
    return new ApiException(error.message, error.status || 500);
  }

  return new ApiException("An unexpected error occurred", 500);
}

/**
 * Log error to console in development
 * @param error - Error to log
 * @param context - Additional context
 */
export function logError(error: Error, context?: string) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context || "Error"}]:`, error);
  }
}

/**
 * Get user-friendly error message
 * @param error - Error instance
 * @returns User-friendly message
 */
export function getErrorMessage(error: Error | ApiException): string {
  if (error instanceof ApiException) {
    return error.message;
  }

  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Check if error is a network error
 * @param error - Error to check
 * @returns True if network error
 */
export function isNetworkError(error: any): boolean {
  return (
    error?.code === "NETWORK_ERROR" ||
    error?.message?.includes("Network Error") ||
    error?.message?.includes("fetch")
  );
}

/**
 * Check if error is a timeout error
 * @param error - Error to check
 * @returns True if timeout error
 */
export function isTimeoutError(error: any): boolean {
  return (
    error?.code === "TIMEOUT" ||
    error?.message?.includes("timeout") ||
    error?.message?.includes("TIMEOUT")
  );
}

/**
 * Retry function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise that resolves with function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Don't retry on client errors (4xx)
      if (
        error instanceof ApiException &&
        error.status >= 400 &&
        error.status < 500
      ) {
        throw error;
      }

      // Wait with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
