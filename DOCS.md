# Playwright E2E & API Testing Framework

A professional, maintainable testing framework for QA Engineers demonstrating modern testing best practices.

## 📚 Documentation

## 🎯 What This Project Showcases

### ✅ For LinkedIn Visibility as a QA Engineer:
1. **Modern Testing Framework** - Playwright with TypeScript (industry leading)
2. **Page Object Model (POM)** - Professional test architecture pattern
3. **UI & API Testing** - Full-stack testing capabilities
4. **Type-Safe Code** - TypeScript ensures code quality
5. **CI/CD Integration** - GitHub Actions workflow
6. **Test Data Management** - Centralized test data approach
7. **Logging & Utilities** - Production-grade logging and helpers
8. **Configuration Management** - Environment-based configuration
9. **Multi-Browser Testing** - Cross-browser compatibility verification
10. **Best Practices** - Clean code and professional structure

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run tests in headed mode to see the browser
npm run test:headed

# Debug a test
npm run test:debug

# View test report
npm run test:report
```

## 🏗️ API Testing Example

The project includes a complete API testing example using the JsonPlaceholder API:

```typescript
// pages/api/JsonPlaceholder.ts
export class JsonPlaceholderAPI extends BaseAPI {
  async getAllPosts() {
    return await this.get('/posts');
  }

  async createPost(post: Post) {
    return await this.post('/posts', post);
  }
}

// tests/api/jsonplaceholder.spec.ts
test('should fetch all posts', async () => {
  const api = new JsonPlaceholderAPI();
  await api.initialize();
  
  const posts = await api.getAllPosts();
  expect(posts).toHaveLength(100);
  
  await api.teardown();
});
```

## 💻 UI Testing Example

Example of testing TodoMVC application:

```typescript
// tests/ui/todo.spec.ts
test('should add todos and filter', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.navigateTo('/examples/react/dist/');
  
  // Add todos
  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Write tests');
  
  // Verify todos
  await todoPage.verifyTodoCount(2);
  
  // Filter and complete
  await todoPage.toggleTodo(0);
  await todoPage.filterByCompleted();
  await todoPage.verifyTodoCount(1);
});
```

## 📊 Test Reports

After running tests, view the detailed HTML report:

```bash
npm run test:report
```

Reports include:
- Test pass/fail status
- Video recordings on failure
- Playwright traces for debugging
- Network logs
- Screenshots
- Execution duration

## 🔧 Configuration Files

### Environment Variables (.env)
```env
BASE_URL=https://todomvc.com
API_BASE_URL=https://jsonplaceholder.typicode.com
HEADLESS=true
DEBUG=false
```

### Playwright Configuration
- Multi-browser setup (Chromium, Firefox, WebKit)
- Screenshots on failure
- Video recording on failure
- Trace collection
- Custom timeouts
- HTML reporting

## 📁 Project Structure

```
playwright-e2e-tests/
├── pages/                # Page Object Models
│   ├── BasePage.ts      # Base class
│   ├── TodoPage.ts      # TodoMVC page object
│   └── api/
│       ├── BaseAPI.ts   # API base class
│       └── JsonPlaceholder.ts
├── tests/                # Test specifications
│   ├── ui/              # UI tests
│   │   └── todo.spec.ts
│   └── api/             # API tests
│       └── jsonplaceholder.spec.ts
├── utils/               # Utilities
│   ├── helpers.ts
│   ├── logger.ts
│   └── test-data.ts
├── config/              # Configuration
│   └── env.ts
├── .github/workflows/   # GitHub Actions
│   └── test.yml
├── playwright.config.ts # Playwright config
├── package.json
├── README.md
└── LICENSE
```

## 🎓 Learning Path

1. **Start here**: Read this file and [README.md](./README.md)
2. **UI Tests**: Check [tests/ui/todo.spec.ts](./tests/ui/todo.spec.ts)
3. **Page Objects**: Review [pages/TodoPage.ts](./pages/TodoPage.ts)
4. **API Tests**: Explore [tests/api/jsonplaceholder.spec.ts](./tests/api/jsonplaceholder.spec.ts)
5. **API Page Objects**: Study [pages/api/JsonPlaceholder.ts](./pages/api/JsonPlaceholder.ts)
6. **Utilities**: Check [utils/](./utils/) for helpers, logging, and test data

## 🔄 CI/CD Pipeline

This project includes a GitHub Actions workflow that:
- Runs tests on every push and pull request
- Tests against Node.js 18.x and 20.x
- Generates test reports
- Uploads artifacts
- Comments on PRs with test results

See [.github/workflows/test.yml](./.github/workflows/test.yml)

## 📚 Key Features Explained

### Page Object Model (POM)
- Encapsulates page interactions
- Reduces code duplication
- Improves maintainability
- Makes tests more readable

### API Testing with POM
- Same benefits as UI POM
- Cleaner API client code
- Reusable API methods
- Type-safe requests/responses

### Configuration Management
- Environment-based settings
- Easy CI/CD integration
- Centralized config (config/env.ts)
- Default and override values

### Test Data Management
- Centralized test data (utils/test-data.ts)
- Mock data generators
- Easy to update and reuse
- Follows DRY principle

### Logging
- Custom logger with levels
- Timestamp included
- Structured output
- Easy debugging

## ✨ Best Practices Demonstrated

1. **Clean Code** - Easy to read and understand
2. **DRY Principle** - No code duplication
3. **Type Safety** - TypeScript throughout
4. **Separation of Concerns** - Clear responsibilities
5. **Reusability** - Utilities and helpers
6. **Scalability** - Easy to add new tests
7. **Maintainability** - Well-organized structure
8. **Documentation** - Inline comments and README

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Questions

If you have questions about:
- **Testing** - See the [README.md](./README.md)
- **API Testing** - Check [pages/api/JsonPlaceholder.ts](./pages/api/JsonPlaceholder.ts)
- **Configuration** - Review [config/env.ts](./config/env.ts)
- **GitHub Issues** - Open an issue for bugs or feature requests

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## 🌟 Show Your Support

If this project helped you, please:
- ⭐ Star this repository
- 📤 Share it on LinkedIn
- 🐛 Report bugs and issues
- 💡 Suggest improvements

**Happy Testing! 🎉**
