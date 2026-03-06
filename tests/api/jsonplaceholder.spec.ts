import { test, expect } from '@playwright/test';
import { JsonPlaceholderAPI } from '../../pages/api/JsonPlaceholder';

test.describe('JsonPlaceholder API Tests', () => {
  let api: JsonPlaceholderAPI;

  test.beforeAll(async () => {
    api = new JsonPlaceholderAPI();
    await api.initialize();
  });

  test.afterAll(async () => {
    await api.teardown();
  });

  test.describe('Posts API', () => {
    test('should fetch all posts', async () => {
      const posts = await api.getAllPosts();

      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('body');
      expect(posts[0]).toHaveProperty('userId');
    });

    test('should fetch post by id', async () => {
      const post = await api.getPostById(1);

      expect(post).toBeDefined();
      expect(post.id).toBe(1);
      expect(post.title).toBeDefined();
      expect(post.body).toBeDefined();
      expect(post.userId).toBe(1);
    });

    test('should fetch posts by user id', async () => {
      const userId = 1;
      const posts = await api.getPostsByUserId(userId);

      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);

      posts.forEach((post: any) => {
        expect(post.userId).toBe(userId);
      });
    });

    test('should create a new post', async () => {
      const newPost = {
        title: 'Test Post',
        body: 'This is a test post created by automation',
        userId: 1,
      };

      const createdPost = await api.createPost(newPost);

      expect(createdPost).toBeDefined();
      expect(createdPost.title).toBe(newPost.title);
      expect(createdPost.body).toBe(newPost.body);
      expect(createdPost.userId).toBe(newPost.userId);
      expect(createdPost.id).toBeDefined();
    });

    test('should update a post', async () => {
      const postId = 1;
      const updatedData = {
        title: 'Updated Title',
        body: 'Updated body content',
      };

      const updatedPost = await api.updatePost(postId, updatedData);

      expect(updatedPost.id).toBe(postId);
      expect(updatedPost.title).toBe(updatedData.title);
      expect(updatedPost.body).toBe(updatedData.body);
    });

    test('should partially update a post', async () => {
      const postId = 1;
      const partialUpdate = { title: 'Partially Updated' };

      const updated = await api.partialUpdatePost(postId, partialUpdate);

      expect(updated.id).toBe(postId);
      expect(updated.title).toBe(partialUpdate.title);
    });

    test('should delete a post', async () => {
      const postId = 101;
      const result = await api.deletePost(postId);

      expect(result.status).toBeLessThan(400);
    });

    test('should get comments for a post', async () => {
      const postId = 1;
      const comments = await api.getPostComments(postId);

      expect(comments).toBeDefined();
      expect(Array.isArray(comments)).toBeTruthy();
      expect(comments.length).toBeGreaterThan(0);

      comments.forEach((comment: any) => {
        expect(comment.postId).toBe(postId);
        expect(comment.id).toBeDefined();
        expect(comment.name).toBeDefined();
        expect(comment.body).toBeDefined();
      });
    });
  });

  test.describe('Users API', () => {
    test('should fetch all users', async () => {
      const users = await api.getAllUsers();

      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
    });

    test('should fetch user by id', async () => {
      const userId = 1;
      const user = await api.getUserById(userId);

      expect(user).toBeDefined();
      expect(user.id).toBe(userId);
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
    });

    test('should get user posts', async () => {
      const userId = 1;
      const posts = await api.getUserPosts(userId);

      expect(Array.isArray(posts)).toBeTruthy();

      posts.forEach((post: any) => {
        expect(post.userId).toBe(userId);
      });
    });

    test('should get user todos', async () => {
      const userId = 1;
      const todos = await api.getUserTodos(userId);

      expect(Array.isArray(todos)).toBeTruthy();

      todos.forEach((todo: any) => {
        expect(todo.userId).toBe(userId);
        expect(todo).toHaveProperty('completed');
      });
    });
  });

  test.describe('Todos API', () => {
    test('should fetch all todos', async () => {
      const todos = await api.getAllTodos();

      expect(todos).toBeDefined();
      expect(Array.isArray(todos)).toBeTruthy();
      expect(todos.length).toBeGreaterThan(0);
    });

    test('should fetch todo by id', async () => {
      const todoId = 1;
      const todo = await api.getTodoById(todoId);

      expect(todo).toBeDefined();
      expect(todo.id).toBe(todoId);
      expect(todo).toHaveProperty('completed');
      expect(todo).toHaveProperty('userId');
    });

    test('should create a new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        completed: false,
        userId: 1,
      };

      const createdTodo = await api.createTodo(newTodo);

      expect(createdTodo.title).toBe(newTodo.title);
      expect(createdTodo.completed).toBe(newTodo.completed);
      expect(createdTodo.userId).toBe(newTodo.userId);
      expect(createdTodo.id).toBeDefined();
    });

    test('should update a todo', async () => {
      const todoId = 1;
      const updatedData = { completed: true };

      const updated = await api.updateTodo(todoId, updatedData);

      expect(updated.id).toBe(todoId);
      expect(updated.completed).toBe(true);
    });

    test('should get completed todos for a user', async () => {
      const userId = 1;
      const completedTodos = await api.getCompletedTodos(userId);

      expect(Array.isArray(completedTodos)).toBeTruthy();

      completedTodos.forEach((todo: any) => {
        expect(todo.userId).toBe(userId);
        expect(todo.completed).toBe(true);
      });
    });
  });

  test.describe('Comments API', () => {
    test('should fetch all comments', async () => {
      const comments = await api.getAllComments();

      expect(comments).toBeDefined();
      expect(Array.isArray(comments)).toBeTruthy();
      expect(comments.length).toBeGreaterThan(0);
    });

    test('should fetch comment by id', async () => {
      const commentId = 1;
      const comment = await api.getCommentById(commentId);

      expect(comment).toBeDefined();
      expect(comment.id).toBe(commentId);
      expect(comment).toHaveProperty('postId');
      expect(comment).toHaveProperty('name');
      expect(comment).toHaveProperty('body');
    });

    test('should fetch comments by post id', async () => {
      const postId = 1;
      const comments = await api.getCommentsByPostId(postId);

      expect(Array.isArray(comments)).toBeTruthy();

      comments.forEach((comment: any) => {
        expect(comment.postId).toBe(postId);
      });
    });
  });
});
