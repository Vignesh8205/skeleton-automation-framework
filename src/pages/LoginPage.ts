import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object for Login functionality
 * Demonstrates POM pattern with centralized selectors
 */
export class LoginPage extends BasePage {
    // Centralized Selectors
    private readonly selectors = {
        usernameInput: '#username',
        passwordInput: '#password',
        loginButton: 'button[type="submit"]',
        errorMessage: '.error-message',
        welcomeMessage: '.welcome-message',
        forgotPasswordLink: 'a[href="/forgot-password"]',
        loginTitle: 'h1.login-title'
    };

    // Locators
    private get usernameInput(): Locator {
        return this.page.locator(this.selectors.usernameInput);
    }

    private get passwordInput(): Locator {
        return this.page.locator(this.selectors.passwordInput);
    }

    private get loginButton(): Locator {
        return this.page.locator(this.selectors.loginButton);
    }

    private get errorMessage(): Locator {
        return this.page.locator(this.selectors.errorMessage);
    }

    private get welcomeMessage(): Locator {
        return this.page.locator(this.selectors.welcomeMessage);
    }

    private get forgotPasswordLink(): Locator {
        return this.page.locator(this.selectors.forgotPasswordLink);
    }

    private get loginTitle(): Locator {
        return this.page.locator(this.selectors.loginTitle);
    }

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to login page
     */
    async navigateToLoginPage(url: string): Promise<void> {
        await this.navigateTo(url);
        await this.waitForElement(this.loginTitle);
    }

    /**
     * Enter username
     */
    async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameInput, username);
    }

    /**
     * Enter password
     */
    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLoginButton(): Promise<void> {
        await this.click(this.loginButton);
    }

    /**
     * Complete login flow
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Get error message
     */
    async getErrorMessage(): Promise<string> {
        await this.waitForElement(this.errorMessage);
        return await this.getText(this.errorMessage);
    }

    /**
     * Verify login success
     */
    async verifyLoginSuccess(): Promise<void> {
        await this.verifyElementVisible(this.welcomeMessage);
    }

    /**
     * Verify login failure
     */
    async verifyLoginFailure(): Promise<void> {
        await this.verifyElementVisible(this.errorMessage);
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword(): Promise<void> {
        await this.click(this.forgotPasswordLink);
    }

    /**
     * Verify login page is displayed
     */
    async verifyLoginPageDisplayed(): Promise<void> {
        await this.verifyElementVisible(this.loginTitle);
        await this.verifyText(this.loginTitle, 'Login');
    }
}
