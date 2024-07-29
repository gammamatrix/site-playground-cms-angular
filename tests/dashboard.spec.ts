import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CMS Dashboard/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.screenshot({
    fullPage: true,
    path: 'output/test-dashboard.png',
  });

  // Click the get started link.
  await page.getByRole('link', { name: 'Dashboard' }).click();
});
