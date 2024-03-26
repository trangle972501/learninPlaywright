// @ts-check
const { test, expect } = require('@playwright/test');
const { Otps } = require('../src/database/models/otps');

let otps;

const url = "https://staging.dashboard.quizrrapp.com/signin";

test('has title', async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Quizrr Dashboard/);
});

test('Sigin page', async ({ page }) => {
  await page.goto(url);

  // Step 1:  Enter email
  await page.locator("[id='email']").fill("trang.le@sioux.asia");

  // Click the Sign in button.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Expects page the verification Code displayed.
  await expect(page.getByText('Check your inbox. We have sent a 6-digit code to ')).toBeVisible();
  await expect(page.getByText('trang.le@sioux.asia')).toBeVisible();
  await expect(page.getByText(', enter it below to verify your email address.')).toBeVisible();

});
