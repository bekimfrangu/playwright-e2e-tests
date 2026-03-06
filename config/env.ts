/**
 * Environment configuration
 * Loads environment variables with sensible defaults
 */

import dotenv from 'dotenv';

// Load .env file if it exists
dotenv.config();

export const config = {
  // Base URLs
  baseURL: process.env.BASE_URL || 'https://todomvc.com',
  apiBaseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',

  // Browser configuration
  headless: process.env.HEADLESS !== 'false',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  workers: parseInt(process.env.WORKERS || '4', 10),

  // Test configuration
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000', 10),
  retries: parseInt(process.env.RETRIES || '0', 10),

  // Feature flags
  isCI: !!process.env.CI,
  debug: process.env.DEBUG === 'true',
  screenshot: process.env.SCREENSHOT_ON_FAILURE === 'true',
  video: process.env.VIDEO_ON_FAILURE === 'true',
  trace: (process.env.TRACE || 'on-first-retry') as 'on' | 'off' | 'on-first-retry',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'INFO',
};

// CI/CD specific overrides
if (config.isCI) {
  config.workers = 1;
  config.retries = 2;
  config.screenshot = true;
  config.trace = 'on';
}

export default config;
