import { test, expect } from '@playwright/test';

import { mockSnippetOneResponse } from '../src/mock/snippets';

import { SnippetResponse } from '../src/app/app.types';

test('mock api/cms/snippets/create and verify title', async ({ page }) => {
  // Mock the api call before navigating
  await page.route(
    'http://site-api-angular/api/cms/snippets/create?owned_by_id=&parent_id=&snippet_type=',
    async route => {
      // console.debug('tests/snippets-create.spec.ts', {
      //   route: route,
      // });
      const json: SnippetResponse = mockSnippetOneResponse;
      await route.fulfill({ json });
    }
  );

  // Go to the page
  await page.goto('http://localhost:4200/snippets/create');
  // console.debug('tests/snippets-create.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'test-snippets-create.png',
  });
  await expect(page).toHaveTitle(/CMS Create a Snippet/);
  await expect(page.getByText('Display Advanced Form')).toBeVisible();
});
