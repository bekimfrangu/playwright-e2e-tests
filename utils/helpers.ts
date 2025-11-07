import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 1000) {
  // naive wait for network to be mostly idle; useful in demos
  await page.waitForTimeout(timeout);
}