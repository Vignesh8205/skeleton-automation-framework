import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * BasePage - Foundation class for all Page Objects
 * Provides common Playwright actions and utilities
 */
export class BasePage {
    protected page: Page;
    protected logger: Logger;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger();
    }

    /**
     * Navigate to a specific URL
     */
    async navigateTo(url: string): Promise<void> {
        this.logger.info(`Navigating to: ${url}`);
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    /**
     * Click on an element
     */
    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
        this.logger.info(`Clicked on element: ${locator}`);
    }

    /**
     * Fill text in an input field
     */
    async fill(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.clear();
        await locator.fill(text);
        this.logger.info(`Filled text: ${text}`);
    }

    /**
     * Get text from an element
     */
    async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        const text = await locator.textContent();
        this.logger.info(`Retrieved text: ${text}`);
        return text || '';
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
        this.logger.info(`Element is visible`);
    }

    /**
     * Wait for element to be hidden
     */
    async waitForElementToDisappear(locator: Locator, timeout: number = 10000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
        this.logger.info(`Element is hidden`);
    }

    /**
     * Check if element is visible
     */
    async isVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if element is enabled
     */
    async isEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    /**
     * Select option from dropdown
     */
    async selectDropdown(locator: Locator, value: string): Promise<void> {
        await locator.selectOption(value);
        this.logger.info(`Selected dropdown value: ${value}`);
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        const title = await this.page.title();
        this.logger.info(`Page title: ${title}`);
        return title;
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
        this.logger.info(`Screenshot saved: ${name}`);
    }

    /**
     * Wait for page load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        this.logger.info('Page loaded');
    }

    /**
     * Press keyboard key
     */
    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
        this.logger.info(`Pressed key: ${key}`);
    }

    /**
     * Verify element text
     */
    async verifyText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
        this.logger.info(`Verified text: ${expectedText}`);
    }

    /**
     * Verify element is visible
     */
    async verifyElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
        this.logger.info('Verified element is visible');
    }

    /**
     * Get current URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Reload page
     */
    async reloadPage(): Promise<void> {
        await this.page.reload();
        this.logger.info('Page reloaded');
    }

    /**
     * Go back
     */
    async goBack(): Promise<void> {
        await this.page.goBack();
        this.logger.info('Navigated back');
    }

    /**
     * Close page
     */
    async closePage(): Promise<void> {
        await this.page.close();
        this.logger.info('Page closed');
    }
}
