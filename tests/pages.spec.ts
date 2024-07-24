import { test, expect } from '@playwright/test';

import { mockPagesOneResponse } from '../src/mock/pages';

import { PagesResponse } from '../src/app/app.types';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/pages');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CMS Pages/);
});

test('mock api/cms/pages', async ({ page }) => {
  // Mock the api call before navigating
  await page.route(
    'http://site-api-angular/api/cms/pages/index',
    async route => {
      // console.debug('tests/pages.spec.ts', {
      //   route: route,
      // });
      const json: PagesResponse = mockPagesOneResponse;
      await route.fulfill({ json });
    }
  );

  // Go to the page
  await page.goto('http://localhost:4200/pages');
  // console.debug('tests/pages.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'pages.png',
  });
  await expect(page).toHaveTitle(/CMS Pages/);
  await expect(page.getByText('Revision')).toBeVisible();
});
