import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json'
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.locator('input[name="password"]').click();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await page.locator('input[name="password"]').click();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await page.locator('div').filter({ hasText: 'Placeholder CardThis will be' }).nth(1).click();
  await page.locator('#icons').click();
  await expect(page.locator('#icons')).toBeVisible();
  await expect(page.getByText('ProfileScheduleMapChatConnectDepartment of Information and Computer')).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Login').getByRole('link', { name: 'Sign in' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.locator('#bg-image').getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('User Home PageYou have XX new')).toBeVisible();
  await page.getByRole('button', { name: 'Edit Profile' }).click();
  await expect(page.getByText('Edit ProfileFirst NameLast')).toBeVisible();
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('#basic-navbar-nav').getByRole('link', { name: 'Schedule' }).click();
  await expect(page.getByText('HomeProfileScheduleMapChatConnectjohn@foo.comPage not')).toBeVisible();
  await page.locator('#basic-navbar-nav').getByRole('link', { name: 'Map' }).click();
  await expect(page.getByText('HomeProfileScheduleMapChatConnectjohn@foo.comPage not')).toBeVisible();
  await page.locator('#basic-navbar-nav').getByRole('link', { name: 'Chat' }).click();
  await expect(page.getByText('FriendsMasaki Sakai')).toBeVisible();
  await page.locator('.card-body').click();
  await page.locator('#basic-navbar-nav').getByRole('link', { name: 'Connect' }).click();
  await expect(page.getByText('John Foo').first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Computer Science, Graduate$/ })).toBeVisible();
  await expect(page.getByText('I like surfing and long walks')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('John Foo');
});