import { Page } from '@playwright/test';
import { Logger } from './Logger';

/**
 * WaitHelper - Advanced wait utilities
 * Provides custom wait conditions beyond Playwright defaults
 */
export class WaitHelper {
  private page: Page;
  private logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
  }

  /**
   * Wait for element to be clickable
   */
  async waitForClickable(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout
    });
    await this.page.waitForSelector(selector, {
      state: 'attached',
      timeout
    });
    const isEnabled = await this.page.isEnabled(selector);
    if (!isEnabled) {
      throw new Error(`Element ${selector} is not clickable`);
    }
    this.logger.info(`Element is clickable: ${selector}`);
  }

  /**
   * Wait for URL to contain specific text
   */
  async waitForUrlContains(text: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(`**/*${text}*`, { timeout });
    this.logger.info(`URL contains: ${text}`);
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
    this.logger.info('Network is idle');
  }

  /**
   * Wait for element count to be specific number
   */
  async waitForElementCount(
    selector: string,
    count: number,
    timeout: number = 10000
  ): Promise<void> {
    await this.page.waitForFunction(
      ({ selector, count }) => {
        return document.querySelectorAll(selector).length === count;
      },
      { selector, count },
      { timeout }
    );
    this.logger.info(`Element count is ${count}: ${selector}`);
  }

  /**
   * Wait for text to be present
   */
  async waitForText(text: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForFunction(
      (text) => document.body.innerText.includes(text),
      text,
      { timeout }
    );
    this.logger.info(`Text is present: ${text}`);
  }

  /**
   * Wait for element to disappear
   */
  async waitForElementToDisappear(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'hidden',
      timeout
    });
    this.logger.info(`Element disappeared: ${selector}`);
  }

  /**
   * Custom wait with retry
   */
  async waitWithRetry(
    condition: () => Promise<boolean>,
    maxAttempts: number = 5,
    delayMs: number = 1000
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await condition();
        if (result) {
          this.logger.info(`Condition met on attempt ${attempt}`);
          return;
        }
      } catch (error) {
        this.logger.warn(`Attempt ${attempt} failed: ${error}`);
      }
      
      if (attempt < maxAttempts) {
        await this.page.waitForTimeout(delayMs);
      }
    }
    
    throw new Error(`Condition not met after ${maxAttempts} attempts`);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('load');
    this.logger.info('Page fully loaded');
  }
}
