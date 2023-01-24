// country-page.js
const { expect } = require('@playwright/test');

// CountryPage helper class to encapsulate common operations on the https://rahulshettyacademy.com/seleniumPractise/#/country page
exports.CountryPage = class CountryPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

 // Element selectors for MainPage
  constructor(page) {
    this.page = page;
    this.countryDropDown = page.getByRole('combobox');
    this.checkbox = page.getByRole('checkbox');
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
  }

  // Select Sweden as country 
  async selectCountry() {
    await this.countryDropDown.selectOption('Sweden');
  }

  // Check the box for Terms & Conditions 
  async checkBoxTC() {
    await this.checkbox.check();
  }

  // Click on the proceed button
  async proceed() {
    await this.proceedBtn.click();
  }
}