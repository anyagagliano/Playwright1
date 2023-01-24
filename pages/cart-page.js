// cart-page.js
const { expect } = require('@playwright/test');

// CartPage helper class to encapsulate common operations on the https://rahulshettyacademy.com/seleniumPractise/#/cart page
exports.CartPage = class CartPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

 // Element selectors for CartPage
  constructor(page) {
    this.page = page;
    this.productTable = page.locator('#productCartTables');
    this.totalAmount = page.locator('.discountAmt');
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' })
  }

  // Click on place order button 
  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}