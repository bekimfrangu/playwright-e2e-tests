import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.navigateTo('/examples/react/dist/');
    });

    test.only('should add, complete and filter todos', async () => {
        // Add todos
        await todoPage.addTodo('Buy milk');
        await todoPage.addTodo('Walk dog');
        await todoPage.addTodo('Write tests');

        // Verify initial count
        await todoPage.verifyTodoCount(3);

        // Complete second todo
        await todoPage.toggleTodo(1);

        // Filter by completed
        await todoPage.filterByCompleted();
        await todoPage.verifyTodoCount(1);
        await todoPage.verifyTodoExists('Walk dog');

        // Filter by active
        await todoPage.filterByActive();
        await todoPage.verifyTodoCount(2);
        await todoPage.verifyTodoExists('Buy milk');
        await todoPage.verifyTodoExists('Write tests');
    });

    test('should clear completed todos', async () => {
        // Add and complete todos
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');
        await todoPage.toggleTodo(0);
        
        // Clear completed
        await todoPage.clearCompleted();
        await todoPage.verifyTodoCount(1);
        await todoPage.verifyTodoExists('Task 2');
    });
});