import { defineConfig, devices } from '@playwright/test';
import config from './config/env';

/**
 * Playwright configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!config.isCI,
  
  /* Retry on CI only */
  retries: config.retries,
  
  /* Opt out of parallel tests on CI */
  workers: config.isCI ? 1 : config.workers,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  /* Shared settings for all the projects */
  use: {
    /* Base URL to use in actions like `await page.goto('')` */
    baseURL: config.baseURL,

    /* Collect trace when retrying the failed test */
    trace: config.trace,

    /* Screenshot on failure */
    screenshot: config.screenshot ? 'only-on-failure' : 'off',

    /* Video on failure */
    video: config.video ? 'retain-on-failure' : 'off',

    /* Test timeout */
    navigationTimeout: config.timeout,
    actionTimeout: config.timeout,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports (optional) */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests (optional) */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

