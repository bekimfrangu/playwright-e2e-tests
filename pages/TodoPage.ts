import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  // Selectors
  private readonly newTodoInput = '.new-todo';
  private readonly todoList = '.todo-list li';
  private readonly toggleButton = '.toggle';
  private readonly filterAll = 'text=All';
  private readonly filterActive = 'text=Active';
  private readonly filterCompleted = 'text=Completed';
  private readonly clearCompletedButton = '.clear-completed';

  constructor(page: Page) {
    super(page);
  }

  async addTodo(text: string) {
    await this.page.locator(this.newTodoInput).fill(text);
    await this.page.keyboard.press('Enter');
    // Wait for the todo item to be added
    await this.page.waitForSelector(this.todoList);
  }

  async toggleTodo(index: number) {
    await this.page.locator(this.todoList).nth(index).locator(this.toggleButton).check();
  }

  async getTodoCount() {
    return await this.page.locator(this.todoList).count();
  }

  async filterByAll() {
    await this.page.locator(this.filterAll).click();
  }

  async filterByActive() {
    await this.page.locator(this.filterActive).click();
  }

  async filterByCompleted() {
    await this.page.locator(this.filterCompleted).click();
  }

  async clearCompleted() {
    await this.page.locator(this.clearCompletedButton).click();
  }

  async verifyTodoExists(text: string) {
    await this.page.locator(this.todoList).filter({ hasText: text }).first().isVisible();
  }

  async verifyTodoCount(count: number) {
    const elements = this.page.locator(this.todoList);
    const actualCount = await elements.count();
    if (actualCount !== count) {
      throw new Error(`Expected ${count} todos, but found ${actualCount}`);
    }
  }

  async deleteTodo(index: number) {
    const todoItem = this.page.locator(this.todoList).nth(index);
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
  }

  async editTodo(index: number, newText: string) {
    const todoItem = this.page.locator(this.todoList).nth(index);
    await todoItem.locator('label').dblclick();
    await todoItem.locator('input[class="edit"]').fill(newText);
    await this.page.keyboard.press('Enter');
  }
}