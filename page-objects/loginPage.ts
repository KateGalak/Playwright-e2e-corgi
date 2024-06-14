import { expect, type Locator, type Page } from "@playwright/test";
import { generateRandomEmail } from "../test-data/math-random-data";
import { getRandomNumber } from "../test-data/math-random-data";
import { LOGIN_PAGE_URL } from "../test-data/constants";
import { BASE_URL } from "../test-data/constants";

export class LoginPage {
  readonly page: Page;

  readonly getLoginField: Locator;
  readonly getLoginFieldTitle: Locator;
  readonly getPasswordField: Locator;
  readonly getLoginPwdTitle: Locator;
  readonly getLoginBtn: Locator;
  readonly getForgotPasswrotBtn: Locator;
  readonly getEmailField: Locator;
  readonly getResetBtn: Locator;
  readonly getResetTitle: Locator;
  readonly getVisibilityOffIcon: Locator;
  readonly getVisibilityIcon: Locator;
  readonly getConfirmPassBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLoginField = page.locator("#username");
    this.getLoginFieldTitle = page.locator("#username-label");
    this.getPasswordField = page.locator("#password");
    this.getLoginPwdTitle = page.locator("#password-label");
    this.getLoginBtn = page.locator("button[data-testid='Login-btn']");

    this.getForgotPasswrotBtn = page.locator(
      "a[data-testid='Forgot-Pass-btn']"
    );
    this.getEmailField = page.locator("#email");
    this.getResetBtn = page.locator("button[data-testid='Reset-Pass-btn']");
    this.getResetTitle = page.locator("h2[data-testid='reset-password-title']");
    this.getVisibilityOffIcon = page.locator(
      "svg[data-testid='VisibilityOffIcon']"
    );
    this.getVisibilityIcon = page.locator("svg[data-testid='VisibilityIcon']");
    this.getConfirmPassBtn = page.locator(
      "button[data-testid='conf-reset-pass']"
    );
  }

  async resetPassword() {
    await this.page.goto(LOGIN_PAGE_URL);
    await expect(this.getForgotPasswrotBtn).toBeVisible();
    await this.getForgotPasswrotBtn.click();
    await expect(this.page).toHaveURL(`${BASE_URL}password/reset/`);
    await expect(this.getResetTitle).toHaveText("Reset password");
    await expect(
      this.page.locator(
        ".MuiBox-root.css-1d66qed>.css-1iau83w-MuiTypography-root"
      )
    ).toHaveText(
      "Enter your email and we’ll send your instructions to reset your password."
    );
    await expect(this.page.locator("#email-label")).toHaveText("Email *");
    await expect(this.getEmailField).toBeVisible();
    await this.getResetBtn.click();
    await expect(
      this.page.locator("div[data-testid='email-helper-text']")
    ).toContainText("Required");

    await this.getEmailField.fill("invalid@email");
    await this.getResetBtn.click();
    await expect(
      this.page.locator("div[data-testid='email-helper-text']")
    ).toHaveText("Enter a valid email address.");
    await this.getEmailField.clear();

    const testEmail = "test-aqakuser@gmail.com";
    await this.getEmailField.fill(testEmail);
    await expect(this.getEmailField).toHaveValue(testEmail);
    await this.getResetBtn.click();
    await expect(this.page.locator(".MuiBox-root.css-1d66qed>span")).toHaveText(
      "Password reset link has been sent to your email:"
    );
    await expect(
      this.page.locator(
        ".MuiBox-root.css-1d66qed>.css-12td52x-MuiTypography-root"
      )
    ).toHaveText(testEmail);
    await expect(this.page.getByText("Back to Login")).toBeVisible();
    await this.page.getByText("Back to Login").click();
    await expect(this.page).toHaveURL(LOGIN_PAGE_URL);
    await this.getForgotPasswrotBtn.click();

    await expect(this.page.locator("a[href='/login/']")).toBeVisible();
    await this.page.locator("a[href='/login/']").click();
    await expect(this.page).toHaveURL(LOGIN_PAGE_URL);
  }

  async goto() {
    await this.page.goto(LOGIN_PAGE_URL);
  }

  async loginPageUI() {
    await this.page.goto(LOGIN_PAGE_URL);
    await expect(this.page.locator("h2[data-testid='login-title']")).toHaveText(
      "Welcome to Zorro-Corgi!"
    );
    await expect(this.getLoginFieldTitle).toHaveText("Login *");
    await expect(this.getLoginPwdTitle).toHaveText("Password *");
    await this.getLoginBtn.click();

    await expect(
      this.page.locator("div[data-testid='username-helper-text']")
    ).toHaveText("Required");
    await expect(
      this.page.locator("div[data-testid='password-helper-text']")
    ).toHaveText("Required");
  }

  async loginInvalidData() {
    await this.page.goto(LOGIN_PAGE_URL);

    const randomEmailInvalid = generateRandomEmail();
    await this.getLoginField.fill(randomEmailInvalid);
    await expect(this.getLoginField).toHaveValue(randomEmailInvalid);

    const getRandomNumInvalid = getRandomNumber();
    await this.getPasswordField.fill(getRandomNumInvalid);
    await expect(this.getPasswordField).toHaveValue(getRandomNumInvalid);

    await this.getVisibilityOffIcon.click();
    await expect(
      this.page.locator("input[name='password'][type='text']")
    ).toBeEnabled();
    await this.getVisibilityIcon.click();
    await expect(
      this.page.locator("input[name='password'][type='password']")
    ).toBeEnabled();

    await this.getLoginBtn.click();
    await expect(this.page.locator(".MuiBox-root.css-1oc95bs>div")).toHaveText(
      "Unable to log in with provided credentials."
    );
    await expect(
      this.page.locator("svg[data-testid='ErrorIcon']")
    ).toBeVisible();
    await this.getLoginBtn.click();
  }

  async resetPassPage() {
    await this.page.goto(`${BASE_URL}password/reset/confirm/data/`);
    await expect(
      this.page.locator("h2[data-testid='confirm-reset-password-title']")
    ).toHaveText("Confirm reset password");
    await expect(this.page.locator("#new_password1")).toBeVisible();
    await expect(this.page.locator("#new_password1-label")).toHaveText(
      "New password *"
    );
    await expect(this.page.locator("#new_password2-label")).toHaveText(
      "New password repeat *"
    );
    await this.getConfirmPassBtn.click();
    await expect(
      this.page.locator("div[data-testid='new_password1-helper-text']")
    ).toHaveText("Required");
    await expect(
      this.page.locator("div[data-testid='new_password2-helper-text']")
    ).toHaveText("Required");

    const passReqs = this.page.locator(
      "ul[data-testid='new-pass-requires']>li"
    );
    await expect(passReqs).toHaveText([
      "Your password can't be too similar to your other personal information",
      "Your password must contain at Least 8 characters",
      "Your password can't be a commonly used password",
      "Your password can't be entirely numeric",
      "Password must contain at least one digit, uppercase character, lowercase character and one special character(eg.!, @, #, $, %)",
    ]);
    await expect(this.getConfirmPassBtn).toBeVisible;
  }

  async loginAdmin() {
    await this.page.goto(LOGIN_PAGE_URL);
    await this.getLoginField.pressSequentially("test.aqakuser@gmail.com");
    await this.getPasswordField.pressSequentially("**********");
    await this.getLoginBtn.click();
  }
}
