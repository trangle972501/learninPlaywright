const { Given, When, Then } = require('@cucumber/cucumber');
const { SigninPage } = require('../../../pages/dashboard/signin/signinPage');
const { UsersV2 } = require('../../../database/models/usersV2');
const { Otps } = require('../../../database/models/otps');

let signinPage;
let usersV2;
let otps;

signinPage = new SigninPage();
usersV2 = new UsersV2();
otps = new Otps();

Given("the user navigates to the web application link", async function() {
  await signinPage.navigateToLoginPage();
})

When("the user enters the email adress as {string}", async function(email) {
  await signinPage.enterEmailAdress(email);
})

When("the user clicks on Sign in button", async function() {
  await signinPage.clickOnSigninButton();
})

When("the user enters the verification code of {string} email", async function(email) {
    const code = await otps.getCodeByEmailAdress(email);
    await signinPage.enterVerficationCode(code);
    await signinPage.clickOnSigninButton();
})

Then("the Dashboard page should be displayed", async function() {
    await signinPage.verifyVerificationCodeDisplay()
})
