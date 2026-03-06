# Configuration Guide

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

### Available Variables

#### Base URLs
- `BASE_URL` - Base URL for UI tests (default: `https://todomvc.com`)
- `API_BASE_URL` - Base URL for API tests (default: `https://jsonplaceholder.typicode.com`)

#### Browser Configuration
- `HEADLESS` - Run tests in headless mode (default: `true`)
- `SLOW_MO` - Slow down test execution in ms (default: `0`)
- `WORKERS` - Number of parallel workers (default: `4`)

#### Test Configuration
- `TEST_TIMEOUT` - Test timeout in ms (default: `30000`)
- `RETRIES` - Number of retries (default: `0`, auto `2` in CI)

#### Feature Flags
- `DEBUG` - Enable debug logging (default: `false`)
- `SCREENSHOT_ON_FAILURE` - Take screenshots on failure (default: `true`)
- `VIDEO_ON_FAILURE` - Record video on failure (default: `false`)
- `TRACE` - Collect traces (default: `on-first-retry`)

#### Logging
- `LOG_LEVEL` - Log level: ERROR, WARN, INFO, DEBUG (default: `INFO`)

## Playwright Configuration

Edit `playwright.config.ts` to customize:

### Test Directory
```typescript
testDir: './tests',
```

### Reporters
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/results.xml' }],
],
```

### Browser Projects
```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  // Add more browsers as needed
],
```

## CI/CD Configuration

### GitHub Actions

The project includes a GitHub Actions workflow in `.github/workflows/test.yml` that:
- Runs on push and pull requests
- Tests against multiple Node.js versions
- Generates reports and artifacts

Configure by updating `.github/workflows/test.yml`:

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

### Local CI Simulation

Run tests as if in CI environment:

```bash
CI=true npm test
```

## TypeScript Configuration

TypeScript settings are in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

### Path Aliases

Configure path aliases for cleaner imports:

```json
"paths": {
  "@pages/*": ["pages/*"],
  "@tests/*": ["tests/*"],
  "@utils/*": ["utils/*"]
}
```

Usage:
```typescript
import { TodoPage } from '@pages/TodoPage';
import { logger } from '@utils/logger';
```

## API Configuration

### Base URL

The API base URL is configured in:
1. `.env` file (`API_BASE_URL`)
2. `config/env.ts` (default: `'https://jsonplaceholder.typicode.com'`)

### Timeout

API timeout is configured in `config/env.ts`:

```typescript
API_TIMEOUT=30000  // 30 seconds
```

## Debugging

### Enable Debug Logging

```bash
DEBUG=true npm test
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### View Traces

```bash
npm run test:report
```

## Best Practices

1. **Never commit `.env`** - Only commit `.env.example`
2. **Use environment variables** - For sensitive data and configuration
3. **Document changes** - Update this file when changing configuration
4. **Test locally** - Run tests locally before pushing
5. **Use CI defaults** - Configuration automatically adjusts for CI environment

## Troubleshooting

### Port Conflicts
If another process is using the test URL port, configure a different port or ensure the service is running correctly.

### Browser Installation
If Playwright browsers aren't installed:
```bash
npx playwright install
```

### Timeout Issues
Increase timeout in `config/env.ts` or `.env`:
```env
TEST_TIMEOUT=60000
```

### Network Issues
For API tests, verify:
- Network connectivity
- API base URL is correct
- API service is running

---

For more information, see [README.md](./README.md) and [DOCS.md](./DOCS.md).
