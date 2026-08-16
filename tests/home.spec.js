import { test, expect } from '@playwright/test';

test.describe('Example Domain smoke testing', () => {
  test('user can open the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Example Domain');

    await expect(
      page.getByRole('heading', {
        name: 'Example Domain',
      }),
    ).toBeVisible();

    await expect(page.getByRole('link')).toBeVisible();
  });
});