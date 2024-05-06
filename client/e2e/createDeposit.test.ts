import { test, expect } from '@playwright/test';
import { loginNewUser } from './utils/api';
import { fakeUser } from './utils/fakeData';

test.describe.serial('Ensure user can create a deposit transaction', () => {
  const user = fakeUser();

  test('user can create a deposit transaction', async ({ page }) => {
    await loginNewUser(page, user);
    await page.goto('/dashboard');

    await page.getByTestId('createTransaction').click();

    await page.selectOption('#transaction-type', 'deposit');

    const depositAmount = '100.00';
    await page.fill('input[aria-label="Transaction Amount"]', depositAmount);

    await page.fill('input[aria-label="Transaction Description"]', 'Test deposit');

    await page.getByRole('button', { name: 'Create' }).click();


    const currentUrl = page.url();
    expect(currentUrl).toContain('/dashboard');

    await page.waitForTimeout(1000);

    const balance = await page.locator('.balance').textContent();
    const updatedBalance = balance.replace('€', '');

    expect(updatedBalance).toBe(depositAmount);

  });
});
