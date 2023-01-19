// search-page.js
const { expect } = require('@playwright/test');

exports.MainPage = class MainPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.searchfield = page.getByPlaceholder('Search for Vegetables and Fruits');
    this.searchBtn = page.getByRole('banner').getByRole('button');
    this.product = page.getByRole('heading', { name: 'Tomato - 1 Kg' });
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await expect(this.page).toHaveTitle(/GreenKart - veg and fruits kart/);
  }

  async searchForProduct() {
    await this.searchfield.fill('tomato');
    await this.searchBtn.click();
    await expect(this.product).toBeVisible();
  }

}