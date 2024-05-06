import { test, expect } from '@playwright/test';
import { loginNewUser } from './utils/api';
import { fakeUser } from './utils/fakeData';

test.describe.serial('Delete transaction functionality', () => {
  const user = fakeUser();

  test('user can delete a transaction', async ({ page }) => {
    // Log in to the application
    await loginNewUser(page, user);
    await page.goto('/dashboard');

    // Create a transaction
    await page.getByTestId('createTransaction').click();
    await page.selectOption('#transaction-type', 'deposit');
    await page.fill('input[aria-label="Transaction Amount"]', '50.00');
    await page.fill('input[aria-label="Transaction Description"]', 'Test transaction to delete');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(1000);

    await page.locator('.list > li:nth-child(2) .delete-btn').click();

    await page.waitForTimeout(1000);

    const finalTransactionCount = await page.locator('.list > li').count();

    expect(finalTransactionCount).toBe(0);
  });
});
