import { test, expect } from '@playwright/test';

import { mockSnippetsOneResponse } from '../src/mock/snippets';

import { SnippetsResponse } from '../src/app/app.types';

test('call api/cms/snippets and verify title', async ({ page }) => {
  // Mock the api call before navigating
  await page.route(
    'http://site-api-angular/api/cms/snippets/index',
    async route => {
      // console.debug('tests/snippets.spec.ts', {
      //   route: route,
      // });
      const json: SnippetsResponse = mockSnippetsOneResponse;
      await route.fulfill({ json });
    }
  );

  // Go to the page
  await page.goto('http://localhost:4200/snippets');
  // console.debug('tests/snippets.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'test-snippets.png',
  });
  await expect(page).toHaveTitle(/CMS Snippets/);
  await expect(page.getByText('Revision')).toBeVisible();
});
