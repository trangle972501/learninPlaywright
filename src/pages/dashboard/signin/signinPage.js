const {setDefaultTimeout} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const {fixture} = require('../../../hooks/fixture');
const { SigninLocators } = require('./locators');

setDefaultTimeout(60 * 1000 * 2)

exports.SigninPage = class SigninPage extends SigninLocators {

  async navigateToLoginPage() {
    const uri = process.env.DASHBOARD_STAGING + "/signin";
    await fixture.page.goto(uri);
  }

  async enterEmailAdress(email) {
    await fixture.page.locator(this.SignInElements.emailTbx).fill(email);
  }

  async clickOnSigninButton() {
    await fixture.page.locator(this.SignInElements.signInBtn).click();
  }

  async enterVerficationCode(verificationCode) {
    const arrCodes = Array.from(String(verificationCode), Number);
    for (let i = 0; i < arrCodes.length; i++) {
      await fixture.page.locator(this.SignInElements.verficationCodeInput.replace('{index}', i)).fill(arrCodes[i].toString());
    }
  }

  async verifyVerificationCodeDisplay() {
    await expect(
      fixture.page.locator(this.SignInElements.verificationTitle)
    ).toBeVisible();
  }
}
