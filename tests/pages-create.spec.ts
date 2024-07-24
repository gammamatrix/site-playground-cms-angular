import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/pages/create');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CMS Create a Page/);
});
