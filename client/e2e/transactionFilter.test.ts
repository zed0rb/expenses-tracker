import { test, expect } from '@playwright/test';
import { loginNewUser } from './utils/api';
import { fakeUser } from './utils/fakeData';

test.describe.serial('Transaction filter functionality', () => {
  const user = fakeUser();

  test('should filter transactions correctly by type', async ({ page }) => {
    await loginNewUser(page, user);
    await page.goto('/dashboard');

    // Create a deposit transaction
    await page.getByTestId('createTransaction').click();
    await page.selectOption('#transaction-type', 'deposit');

    const depositAmount = '100.00';
    await page.fill('input[aria-label="Transaction Amount"]', depositAmount);
    await page.fill('input[aria-label="Transaction Description"]', 'Test deposit');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.waitForTimeout(1000);

    await page.selectOption('.filter-dropdown', 'withdraw');

    const noTransactionsMessage = await page.locator('.no-transactions-message').textContent();
    expect(noTransactionsMessage).toContain('No transactions yet for "withdraw"');

    await page.selectOption('.filter-dropdown', 'deposit');
    const depositItems = await page.locator('.list > li.deposit').count();

    expect(depositItems).toBeGreaterThan(0);

  });
});
