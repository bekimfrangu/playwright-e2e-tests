import { test } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';
import { TEST_DATA } from '../../utils/test-data';

test.describe('TodoMVC - UI Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.navigateTo('/examples/react/dist/');
    });

    test('should add, complete and filter todos', async () => {
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

    test('should add multiple todos from test data', async () => {
        // Add multiple todos using test data
        for (const todo of TEST_DATA.TODOS) {
            await todoPage.addTodo(todo.text);
        }

        // Verify all todos were added
        await todoPage.verifyTodoCount(TEST_DATA.TODOS.length);

        // Verify each todo exists
        for (const todo of TEST_DATA.TODOS) {
            await todoPage.verifyTodoExists(todo.text);
        }
    });

    test('should edit existing todo', async () => {
        await todoPage.addTodo('Original task');
        await todoPage.editTodo(0, 'Updated task');
        
        await todoPage.verifyTodoExists('Updated task');
    });

    test('should delete todo', async () => {
        await todoPage.addTodo('Task to delete');
        await todoPage.addTodo('Task to keep');
        
        await todoPage.deleteTodo(0);
        
        await todoPage.verifyTodoCount(1);
        await todoPage.verifyTodoExists('Task to keep');
    });
});