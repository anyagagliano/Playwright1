// main-page.js
const { expect } = require('@playwright/test');

// CartPage helper class to encapsulate common operations on the https://rahulshettyacademy.com/seleniumPractise/#/ page
exports.MainPage = class MainPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

 // Element selectors for MainPage
  constructor(page) {
    this.page = page;
    this.searchfield = page.getByPlaceholder('Search for Vegetables and Fruits');
    this.searchBtn = page.getByRole('banner').getByRole('button');
    this.product = page.getByRole('heading', { name: 'Tomato - 1 Kg' });
    this.brocolli = page.locator('.product-action > button').first();
    this.cauliflower = page.locator('div:nth-child(2) > .product-action > button');
    this.cart = page.locator('.cart-icon');
    this.checkoutBtn = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    this.list = page.locator('ul.cart-items');
  }

 // Open the main page and expect that the Title matches
  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(this.page).toHaveTitle(/GreenKart - veg and fruits kart/);
  }

 // Search for a certain product on the main page and expect certain product to be visible 
  async searchForProduct() {
    await this.searchfield.fill('tomato');
    await this.searchBtn.click();
    await expect(this.product).toBeVisible();
  }

 // Add Brocolli and Cauliflower to the cart
  async addProducts() {
    await this.brocolli.click();
    await this.cauliflower.click();
  }
 
  // Open the cart
  async openCart() {
    await this.cart.click();
  }

  // Open the cart and click on proceed button
  async proceedToCheckout() {
    await this.cart.click();
    await this.checkoutBtn.click()
  }
}