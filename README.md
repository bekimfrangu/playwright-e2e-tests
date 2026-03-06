# Playwright E2E & API Tests with Page Object Model (TypeScript)

A professional, production-ready testing framework demonstrating modern QA engineering practices using Playwright, TypeScript, and the Page Object Model (POM) pattern.

## 🎯 Features

- **Page Object Model (POM)** - Clean, maintainable test architecture
- **UI Testing** - Comprehensive Playwright tests for web applications
- **API Testing** - RESTful API testing with POM pattern
- **Multi-Browser Testing** - Chromium, Firefox, WebKit support
- **TypeScript** - Type-safe test code
- **Configuration Management** - Environment-based configuration
- **CI/CD Ready** - GitHub Actions workflow included
- **HTML Reporting** - Beautiful test reports with traces
- **Utility Helpers** - Reusable functions for common operations
- **Custom Fixtures** - Test fixtures for advanced scenarios

## 📁 Project Structure

```
playwright-e2e-tests/
├── pages/                 # Page Object Models
│   ├── BasePage.ts       # Base class for all pages
│   ├── TodoPage.ts       # TodoMVC page object
│   └── api/              # API page objects
│       └── JsonPlaceholder.ts
├── tests/                # Test specifications
│   ├── ui/
│   │   └── todo.spec.ts
│   └── api/
│       └── jsonplaceholder.spec.ts
├── utils/                # Utility functions
│   ├── helpers.ts
│   ├── logger.ts
│   └── test-data.ts
├── config/               # Configuration files
│   └── env.ts
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (download from [nodejs.org](https://nodejs.org))
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/playwright-e2e-tests.git
cd playwright-e2e-tests
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Configure environment** (optional)
```bash
cp .env.example .env
```

## 📋 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run UI mode (interactive)
```bash
npm run test:ui
```

### View test report
```bash
npm run test:report
```

## 🏗️ Architecture Overview

### Page Object Model Pattern

The POM pattern encapsulates page interactions into reusable classes:

```typescript
// pages/TodoPage.ts
export class TodoPage extends BasePage {
  private readonly newTodoInput = '.new-todo';

  async addTodo(text: string) {
    await this.page.locator(this.newTodoInput).fill(text);
    await this.page.keyboard.press('Enter');
  }
}

// tests/ui/todo.spec.ts
test('should add a todo', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.addTodo('Write tests');
});
```

**Benefits:**
- ✅ Reduced code duplication
- ✅ Easier maintenance (selector changes in one place)
- ✅ Improved readability
- ✅ Better test organization
- ✅ Scalable test suite

### API Testing with POM

API page objects follow the same pattern for REST APIs:

```typescript
// pages/api/JsonPlaceholder.ts
export class JsonPlaceholderAPI extends BaseAPI {
  async getPosts() {
    return await this.get('/posts');
  }
  
  async createPost(data: PostData) {
    return await this.post('/posts', data);
  }

  async updatePost(id: number, data: PostData) {
    return await this.put(`/posts/${id}`, data);
  }

  async deletePost(id: number) {
    return await this.delete(`/posts/${id}`);
  }
}

// tests/api/jsonplaceholder.spec.ts
test('should fetch posts', async () => {
  const api = new JsonPlaceholderAPI();
  const posts = await api.getPosts();
  expect(posts).toHaveLength(100);
});
```

## 🌍 Environment Variables

Copy `.env.example` to `.env`:

```env
BASE_URL=https://todomvc.com
API_BASE_URL=https://jsonplaceholder.typicode.com
HEADLESS=true
DEBUG=false
SCREENSHOT_ON_FAILURE=true
```

## 📊 Test Reports

Playwright generates HTML reports automatically:

```bash
npm run test:report
```

Reports include:
- ✅ Test results and status
- ✅ Video recordings (on failure)
- ✅ Traces and network logs
- ✅ Execution duration

## ✅ Best Practices Implemented

1. **DRY (Don't Repeat Yourself)** - POM eliminates selector duplication
2. **Single Responsibility** - Each page object handles one responsibility
3. **Type Safety** - TypeScript ensures compile-time error checking
4. **Configuration Management** - Environment-based configs
5. **Separation of Concerns** - Clear separation between tests and page objects
6. **CI/CD Integration** - GitHub Actions workflow
7. **Comprehensive Logging** - Detailed logs for debugging
8. **Code Organization** - Clear, scalable folder structure

## 🐛 Debugging Tests

### Run single test with debug UI
```bash
npm run test:debug
```

### View test report with traces
```bash
npm run test:report
```

### Enable detailed Playwright logging
```bash
DEBUG=pw:api npm test
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Best Practices](https://wiki.selenium.dev/display/SELAB/Page+Object+Model)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [API Testing Guide](https://playwright.dev/docs/api-testing)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## ⭐ Show Your Support

If you found this helpful, please star this repository! It helps other QA engineers discover this testing framework.

---

**Happy Testing! 🎉**

