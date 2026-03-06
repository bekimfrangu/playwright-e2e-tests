import { Page } from '@playwright/test';

/**
 * Utility function to wait for network to be idle
 * Useful when dealing with dynamic content loading
 */
export async function waitForNetworkIdle(page: Page, timeout = 1000) {
  await page.waitForTimeout(timeout);
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  initialDelay = 1000
): Promise<T> {
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      attempt++;
      if (attempt < maxAttempts) {
        const delay = initialDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  return `test-${generateRandomString(8)}@example.com`;
}

/**
 * Sleep for specified milliseconds
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extract numbers from string
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Compare two objects (shallow comparison)
 */
export function areObjectsEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Retry playwright locator operations with custom timeout
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  maxAttempts = 5,
  delayMs = 500
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      if (await condition()) {
        return true;
      }
    } catch (error) {
      // Continue to next attempt
    }

    if (i < maxAttempts - 1) {
      await sleep(delayMs);
    }
  }

  return false;
}
