# Playwright E2E Tests with Page Object Model (TypeScript)

This repository demonstrates a professional implementation of end-to-end testing using Playwright with TypeScript, following the Page Object Model (POM) pattern.

## What is included
- Playwright Test with TypeScript
- Page Object Model (POM) implementation:
  - `pages/BasePage.ts` — Base page object with common functionality
  - `pages/TodoPage.ts` — TodoMVC specific page object
- Example tests:
  - `tests/todo.spec.ts` — TodoMVC flow (add, complete, filter) using POM
- Clean architecture and maintainable test structure
- `playwright.config.ts` with basic projects (chromium, firefox), retries & artifacts
- GitHub Actions workflow to run tests on push / pull request
- Comprehensive documentation

---

## Quick start (local)

1. Clone:
```bash
git clone https://github.com/<you>/playwright-e2e-tests.git
cd playwright-e2e-tests

2. Install dependencies
```bash
npm install

3. Install Playwright browsers
```bash
npx playwright install

4. Run tests
```bash
npm test

5. Run tests headed (to see the browser)
```bash
npm run test:headed

5. View HTML report
```bash
npm run test:report
# then in your browser open playwright-report/index.html

