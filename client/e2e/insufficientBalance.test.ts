import { test, expect } from '@playwright/test';
import { loginNewUser } from './utils/api';
import { fakeUser } from './utils/fakeData';

test.describe.serial('Ensure insufficient balance prevents withdrawal', () => {
  const user = fakeUser();

  test('user cannot create a withdraw transaction if balance is lower', async ({ page }) => {
    await loginNewUser(page, user);
    await page.goto('/dashboard');

    await page.getByTestId('createTransaction').click();

    await page.selectOption('#transaction-type', 'withdraw');

    const withdrawalAmount = '50';
    await page.fill('input[aria-label="Transaction Amount"]', withdrawalAmount);

    await page.fill('input[aria-label="Transaction Description"]', 'Test withdrawal with low balance');

    await page.getByRole('button', { name: 'Create' }).click();

    const errorLocator = page.getByTestId('errorMessage');
    await errorLocator.waitFor(); // Wait for the error message to be visible

    // Check that the error message contains the expected text
    const errorMessage = await errorLocator.textContent();
    expect(errorMessage).toContain('Insufficient balance');

  });
});
