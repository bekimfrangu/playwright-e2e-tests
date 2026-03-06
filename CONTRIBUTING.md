# Contributing to Playwright E2E Tests

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🎯 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code quality and testing best practices

## 🚀 Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**
```bash
git clone https://github.com/bekimfrangu/playwright-e2e-tests.git
cd playwright-e2e-tests
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Install dependencies**
```bash
npm install
npx playwright install
```

## 📋 Development Workflow

### Before You Start
- Check existing issues and pull requests
- Create an issue for bugs or features first
- Discuss approach in the issue before starting

### Making Changes

1. **Write tests first** (TDD approach)
```bash
# Create test file: tests/features/your-feature.spec.ts
# Write your test first before implementation
```

2. **Implement feature or fix**
```bash
# Create page objects or utilities as needed
# pages/YourPage.ts or utils/your-utility.ts
```

3. **Run tests**
```bash
npm test                # Run all tests
npm run test:headed     # Run with browser visible
npm run test:debug      # Debug single test
npm run test:ui         # Use interactive UI mode
```

4. **Check code quality**
```bash
npx tsc --noEmit        # Type check
```

## 🏗️ Project Structure

When adding features, follow the existing structure:

```
playwright-e2e-tests/
├── pages/               # Page Object Models
│   ├── BasePage.ts
│   ├── YourNewPage.ts  # Add your page here
│   └── api/
│       └── YourAPI.ts  # Add your API page here
├── tests/
│   ├── ui/
│   │   └── your-feature.spec.ts
│   └── api/
│       └── your-api.spec.ts
├── utils/              # Utility functions
│   ├── helpers.ts
│   ├── logger.ts
│   └── test-data.ts
└── config/
    └── env.ts
```

## 📝 Coding Standards

### TypeScript
- Use strict mode (`strict: true` in tsconfig.json)
- Type all function parameters and returns
- Use interfaces for complex data structures

```typescript
// ✅ Good
export async function createPost(post: Post): Promise<Post> {
  return await this.post('/posts', post);
}

// ❌ Avoid
export async function createPost(post: any) {
  return await this.post('/posts', post);
}
```

### Naming Conventions
- **Classes**: PascalCase (e.g., `TodoPage`, `JsonPlaceholderAPI`)
- **Methods**: camelCase (e.g., `addTodo()`, `verifyTodoCount()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `BASE_URL`, `TIMEOUT`)
- **Test blocks**: Descriptive (e.g., `should add todo and verify count`)

### Code Style
- Use 2-space indentation
- Use semicolons
- Use single quotes for strings (unless avoiding escapes)
- Add comments for complex logic

```typescript
// ✅ Good
private readonly todoInput = '.new-todo';

async addTodo(text: string): Promise<void> {
  await this.page.locator(this.todoInput).fill(text);
  await this.page.keyboard.press('Enter');
}

// ❌ Avoid
private todoInput = ".new-todo"

addTodo = (text) => {
  // unclear what this does
}
```

### Comments
```typescript
// ✅ Good - explains why, not what
// Wait for element to be visible before interacting
await this.page.waitForSelector(this.todoList);

// ❌ Avoid - obvious from code
// Set the text
await this.page.fill(selector, text);
```

## 🧪 Testing Guidelines

### Test Structure
```typescript
test('should verify specific functionality', async ({ page }) => {
  // Arrange - Set up test data and page
  const todoPage = new TodoPage(page);
  
  // Act - Perform actions
  await todoPage.addTodo('Test task');
  
  // Assert - Verify results
  await todoPage.verifyTodoExists('Test task');
});
```

### Test Naming
- Start with "should"
- Be descriptive about what is tested
- Include assertion details

```typescript
// ✅ Good
test('should add todo and verify count increases', async () => {

// ❌ Avoid
test('add', async () => {
test('test todo functionality', async () => {
```

### Reusable Test Data
Use `utils/test-data.ts` for test data:

```typescript
// ✅ Good
import { TEST_DATA } from '@utils/test-data';

test('should add todos', async () => {
  for (const todo of TEST_DATA.TODOS) {
    await todoPage.addTodo(todo.text);
  }
});

// ❌ Avoid
test('should add todos', async () => {
  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Walk dog');
  // Hardcoded data duplicated in many tests
});
```

## 🔍 Pull Request Process

1. **Push your changes**
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

2. **Create a Pull Request**
   - Use clear, descriptive title
   - Link related issues
   - Describe changes in detail
   - Include before/after if applicable

3. **PR Title Format**
```
feat: add API testing for posts endpoint
fix: correct todo filter logic
docs: improve configuration guide
refactor: optimize page object selectors
test: add comprehensive API tests
```

4. **PR Description Template**
```markdown
## Description
Brief description of changes

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
- [ ] Added/updated tests
- [ ] All tests pass
- [ ] No console errors

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Added comments for complex logic
- [ ] Tests added/updated
```

5. **Address Review Comments**
   - Respond to feedback
   - Make requested changes
   - Re-request review

6. **Merge**
   - Squash commits into logical units
   - Delete branch after merge

## 🐛 Reporting Bugs

Create an issue with:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, browsers)
- Code sample if applicable

```markdown
## Bug Report

### Title
Page Object method fails with timeout error

### Steps to Reproduce
1. Run test...
2. Navigate to...
3. Click on...

### Expected
Should complete in under 5 seconds

### Actual
Times out after 30 seconds

### Environment
- OS: Windows 11
- Node: 20.x
- Browser: Chromium
```

## 💡 Feature Requests

Create an issue with:
- Clear title
- Use case and motivation
- Proposed solution
- Alternative solutions
- Additional context

```markdown
## Feature Request

### Title
Add support for mobile viewport testing

### Motivation
Need to verify application works on mobile devices

### Proposed Solution
Add mobile viewport configurations to playwright.config.ts

### Example
```typescript
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } }
]
```

## 📚 Documentation

When adding features, update:
- [README.md](./README.md) - Overview and quick start
- [DOCS.md](./DOCS.md) - Detailed documentation
- [CONFIG.md](./CONFIG.md) - Configuration options
- Code comments - Inline documentation
- Example tests - Clear usage examples

## 🔄 Continuous Integration

All PRs must pass:
- ✅ All tests pass
- ✅ Type checking passes (`tsc --noEmit`)
- ✅ No console errors
- ✅ No `test.only` in code

These are verified automatically via GitHub Actions.

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://wiki.selenium.dev/display/SELAB/Page+Object+Model)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)

## ❓ Questions?

- Check existing issues and discussions
- Review code examples in existing tests
- Ask in issue comments

## 🎉 Thank You!

Your contributions make this project better. Thank you for helping!

---

**Happy Contributing! 🚀**
