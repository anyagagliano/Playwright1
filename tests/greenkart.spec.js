// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  });

test('Page has right title', async ({ page }) => {
    await expect(page).toHaveTitle(/GreenKart - veg and fruits kart/);
  });


test.describe('New purchase', () => {
    
 test('Cart contains right amount of items', async ({ page }) => {
    const list = page.locator('ul.cart-items');
    await page.locator('.product-action > button').first().click();
    await page.locator('div:nth-child(2) > .product-action > button').click();
    await page.locator('.cart-icon').click();
    await expect(list).toHaveCount(2); 
    await expect(list).toContainText(['Brocolli - 1 Kg','Cauliflower - 1 Kg']);
})
  test('Complete purchase', async ({ page }) => {
    const productTable = page.locator('#productCartTables');
    const list = page.locator('ul.cart-items');
   // const numberOfItems = page.locator('text:right-of(:text("No. of Items : "))');
    const totalAmount = page.locator('.discountAmt');
    await page.locator('.product-action > button').first().click();
    await page.locator('div:nth-child(2) > .product-action > button').click();
    await page.locator('.cart-icon').click();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await expect(productTable).toBeVisible();
    //await expect(productTable).toHaveText(['Product', 'Name', 'Quantiry', 'Price', 'Total', 'Brocolli - 1 Kg', '1', '120', '120', 'Cauliflower - 1 Kg', '1', '60', '60']);
    //await expect(numberOfItems).toContainText('2');
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

