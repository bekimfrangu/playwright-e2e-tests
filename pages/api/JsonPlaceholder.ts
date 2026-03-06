import { BaseAPI } from './BaseAPI';

export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
}

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

/**
 * JsonPlaceholder API Page Object
 * This demonstrates API testing using POM pattern
 * API Documentation: https://jsonplaceholder.typicode.com
 */
export class JsonPlaceholderAPI extends BaseAPI {
  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    super(baseURL);
  }

  // ==================== POSTS ====================

  async getAllPosts() {
    return await this.get('/posts');
  }

  async getPostById(id: number) {
    return await this.get(`/posts/${id}`);
  }

  async getPostsByUserId(userId: number) {
    return await this.get('/posts', {
      params: { userId },
    });
  }

  async createPost(post: Post) {
    return await this.post('/posts', post);
  }

  async updatePost(id: number, post: Partial<Post>) {
    return await this.put(`/posts/${id}`, post);
  }

  async partialUpdatePost(id: number, post: Partial<Post>) {
    return await this.patch(`/posts/${id}`, post);
  }

  async deletePost(id: number) {
    return await this.delete(`/posts/${id}`);
  }

  async getPostComments(postId: number) {
    return await this.get(`/posts/${postId}/comments`);
  }

  // ==================== USERS ====================

  async getAllUsers() {
    return await this.get('/users');
  }

  async getUserById(id: number) {
    return await this.get(`/users/${id}`);
  }

  async getUserPosts(userId: number) {
    return await this.get('/posts', {
      params: { userId },
    });
  }

  async getUserTodos(userId: number) {
    return await this.get('/todos', {
      params: { userId },
    });
  }

  // ==================== TODOS ====================

  async getAllTodos() {
    return await this.get('/todos');
  }

  async getTodoById(id: number) {
    return await this.get(`/todos/${id}`);
  }

  async createTodo(todo: Todo) {
    return await this.post('/todos', todo);
  }

  async updateTodo(id: number, todo: Partial<Todo>) {
    return await this.put(`/todos/${id}`, todo);
  }

  async deleteTodo(id: number) {
    return await this.delete(`/todos/${id}`);
  }

  async getTodosByUserId(userId: number) {
    return await this.get('/todos', {
      params: { userId },
    });
  }

  async getCompletedTodos(userId: number) {
    return await this.get('/todos', {
      params: { userId, completed: true },
    });
  }

  // ==================== COMMENTS ====================

  async getAllComments() {
    return await this.get('/comments');
  }

  async getCommentById(id: number) {
    return await this.get(`/comments/${id}`);
  }

  async getCommentsByPostId(postId: number) {
    return await this.get('/comments', {
      params: { postId },
    });
  }

  // ==================== ALBUMS ====================

  async getAllAlbums() {
    return await this.get('/albums');
  }

  async getAlbumById(id: number) {
    return await this.get(`/albums/${id}`);
  }

  async getAlbumPhotos(albumId: number) {
    return await this.get(`/albums/${albumId}/photos`);
  }
}
