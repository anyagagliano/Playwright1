// @ts-check
const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cart-page');
const { CountryPage } = require('../pages/country-page');
const { MainPage } = require('../pages/main-page');


test.describe('New purchase', () => {

  test('Search for different vegetables', async ({ page }) => {
    const greenkart = new MainPage(page);
    await greenkart.goto();
    await greenkart.searchForProduct();
    await expect(greenkart.product).toBeVisible();
})
  test('Cart contains right amount of items', async ({ page }) => {
    const greenkart = new MainPage(page);
    await greenkart.goto();
    await greenkart.addProducts();
    await greenkart.openCart();
    await expect(greenkart.list).toHaveCount(2); 
    await expect(greenkart.list).toContainText(['Brocolli - 1 Kg','Cauliflower - 1 Kg']);
})
  test('Complete purchase', async ({ page }) => {
    const greenkart = new MainPage(page);
    const cart = new CartPage(page);
    const country = new CountryPage(page);
    await greenkart.goto();
    await greenkart.addProducts();
    await greenkart.proceedToCheckout();
    await expect(cart.productTable).toBeVisible();
    await expect(cart.totalAmount).toHaveText('180');
    await cart.placeOrder();
    await country.selectCountry();
    await expect(country.countryDropDown).toContainText('Sweden');
    await country.checkBoxTC();
    await expect(country.checkbox).toBeChecked(); 
   /* const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('link', { name: 'Terms & Conditions' }).click()
  ]);
  await page1.getByRole('link', { name: 'Home' }).click();
  */
  await country.proceed();
    await expect(greenkart.list).toHaveCount(0);
});
  

  })

