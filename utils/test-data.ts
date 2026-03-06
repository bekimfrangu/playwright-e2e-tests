/**
 * Test data constants and helper functions
 * Centralize test data to avoid duplication and make tests more maintainable
 */

export const TEST_DATA = {
  TODOS: [
    {
      text: 'Buy milk',
      description: 'Milk from grocery store',
    },
    {
      text: 'Walk dog',
      description: 'Morning walk',
    },
    {
      text: 'Write tests',
      description: 'E2E tests for the application',
    },
    {
      text: 'Review code',
      description: 'Code review for pull requests',
    },
    {
      text: 'Deploy application',
      description: 'Deploy to production',
    },
  ],

  USERS: [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      username: 'bobjohnson',
    },
  ],

  POSTS: [
    {
      title: 'My First Post',
      body: 'This is the content of my first blog post',
      tags: ['test', 'automation'],
    },
    {
      title: 'API Testing Best Practices',
      body: 'Best practices for testing APIs in automation',
      tags: ['api', 'testing', 'best-practices'],
    },
    {
      title: 'E2E Testing with Playwright',
      body: 'Guide to E2E testing using Playwright framework',
      tags: ['playwright', 'e2e', 'testing'],
    },
  ],

  EXTERNAL_API: {
    JSONPLACEHOLDER_BASE_URL: 'https://jsonplaceholder.typicode.com',
    VALID_USER_ID: 1,
    VALID_POST_ID: 1,
    INVALID_ID: 99999,
  },

  TIMEOUTS: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 10000,
  },

  DELAYS: {
    MINIMAL: 100,
    SHORT: 500,
    MEDIUM: 1000,
    LONG: 2000,
  },

  URLs: {
    TODOMVC: 'https://todomvc.com',
    TODOMVC_REACT: 'https://todomvc.com/examples/react/dist/',
  },
};

/**
 * Get a random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get n random items from array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Create a mock post
 */
export function createMockPost(overrides: any = {}) {
  return {
    title: 'Test Post',
    body: 'This is a test post',
    userId: 1,
    ...overrides,
  };
}

/**
 * Create a mock todo
 */
export function createMockTodo(overrides: any = {}) {
  return {
    title: 'Test Todo',
    completed: false,
    userId: 1,
    ...overrides,
  };
}

/**
 * Create a mock user
 */
export function createMockUser(overrides: any = {}) {
  return {
    name: 'Test User',
    email: 'test@example.com',
    username: 'testuser',
    ...overrides,
  };
}
