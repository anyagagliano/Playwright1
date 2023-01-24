// cart-page.js
const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.productTable = page.locator('#productCartTables');
    this.totalAmount = page.locator('.discountAmt');
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' })
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}