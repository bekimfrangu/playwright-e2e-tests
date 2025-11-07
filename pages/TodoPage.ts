import { Page, expect } from '@playwright/test';
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
        await expect(this.page.locator(this.todoList)).toContainText(text);
    }

    async verifyTodoCount(count: number) {
        await expect(this.page.locator(this.todoList)).toHaveCount(count);
    }
}