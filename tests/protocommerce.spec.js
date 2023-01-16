// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
  });

test('Page has right title', async ({ page }) => {
    await expect(page).toHaveTitle(/ProtoCommerce/);
  });

test('Fill and submit the application form', async({ page }) => {
    
})

