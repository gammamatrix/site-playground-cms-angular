import { test, expect } from '@playwright/test';

import { AuthToken as iAuthToken } from '../src/app/app.types';

test('call api/login and verify title', async ({ page }) => {
  // Mock the api call before navigating
  await page.route('http://site-api-angular/api/login', async route => {
    // console.debug('tests/login.spec.ts', {
    //   route: route,
    // });
    const json: iAuthToken = {
      message: 'Authenticated',
      csrf_token: 'some-csrf-token',
      token: 'app-token',
    };
    await route.fulfill({ json });
  });

  // Go to the page
  await page.goto('http://localhost:4200/login');
  // console.debug('tests/login.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'test-login.png',
  });
  // Should get redirect to login.
  await expect(page).toHaveTitle(/Login/);
});
