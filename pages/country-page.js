// country-page.js
const { expect } = require('@playwright/test');

exports.CountryPage = class CountryPage {

 /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.countryDropDown = page.getByRole('combobox');
    this.checkbox = page.getByRole('checkbox');
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
  }

  async selectCountry() {
    await this.countryDropDown.selectOption('Sweden');
  }

  async checkBoxTC() {
    await this.checkbox.check();
  }

  async proceed() {
    await this.proceedBtn.click();
  }
}