// @ts-check
const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main-page');


test.describe('New purchase', () => {

  test('Search for different vegetables', async ({ page }) => {
    const greenkart = new MainPage(page);
    await greenkart.goto();
    await greenkart.searchForProduct();
    await expect(greenkart.product).toBeVisible();
})
  test('Cart contains right amount of items', async ({ page }) => {
    const list = page.locator('ul.cart-items');
    const greenkart = new MainPage(page);
    await greenkart.goto();
    await page.locator('.product-action > button').first().click();
    await page.locator('div:nth-child(2) > .product-action > button').click();
    await page.locator('.cart-icon').click();
    await expect(list).toHaveCount(2); 
    await expect(list).toContainText(['Brocolli - 1 Kg','Cauliflower - 1 Kg']);
})
  test('Complete purchase', async ({ page }) => {
    const greenkart = new MainPage(page);
    await greenkart.goto();
    const productTable = page.locator('#productCartTables');
    const list = page.locator('ul.cart-items');
    const totalAmount = page.locator('.discountAmt');
    await page.locator('.product-action > button').first().click();
    await page.locator('div:nth-child(2) > .product-action > button').click();
    await page.locator('.cart-icon').click();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await expect(productTable).toBeVisible();
    await expect(totalAmount).toHaveText('180');
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByRole('combobox').selectOption('Sweden');
    await expect(page.getByRole('combobox')).toContainText('Sweden');
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked(); 
    const [page1] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Terms & Conditions' }).click()
    ]);
    await page1.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('button', { name: 'Proceed' }).click();
    await expect(list).toHaveCount(0);
});

  })

