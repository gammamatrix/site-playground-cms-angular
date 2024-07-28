import { test, expect } from '@playwright/test';

import { LogoutToken as iLogoutToken } from '../src/app/app.types';

test('call api/logout and verify title', async ({ page }) => {
  // Mock the api call before navigating
  await page.route('http://site-api-angular/api/logout', async route => {
    // console.debug('tests/logout.spec.ts', {
    //   route: route,
    // });
    const json: iLogoutToken = {
      everywhere: false,
      message: '',
      csrf_token: '',
    };
    await route.fulfill({ json });
  });

  // Go to the page
  await page.goto('http://localhost:4200/logout');
  // console.debug('tests/logout.spec.ts', {
  //   content: await page.content(),
  // });
  await page.screenshot({
    fullPage: true,
    path: 'test-logout.png',
  });
  // Should get redirect to login.
  await expect(page).toHaveTitle(/Login/);
});
