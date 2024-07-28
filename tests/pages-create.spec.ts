import { test, expect } from '@playwright/test';

import { mockPageOneResponse } from '../src/mock/pages';

import { PageResponse } from '../src/app/app.types';

test('mock api/cms/pages/create and verify title', async ({ page }) => {
  // Mock the api call before navigating
  await page.route(
    'http://site-api-angular/api/cms/pages/create?owned_by_id=&parent_id=&page_type=',
    async route => {
      // console.debug('tests/pages-create.spec.ts', {
      //   route: route,
      // });
      const json: PageResponse = mockPageOneResponse;
      await route.fulfill({ json });
    }
  );

  // Go to the page
  await page.goto('http://localhost:4200/pages/create');
  // console.debug('tests/pages-create.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'test-pages-create.png',
  });
  await expect(page).toHaveTitle(/CMS Create a Page/);
  await expect(page.getByText('Display Advanced Form')).toBeVisible();
});
