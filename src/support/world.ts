import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page, BrowserContext } from '@playwright/test';
import { TestContext } from '../utils/TestContext';
import { Logger } from '../utils/Logger';

/**
 * CustomWorld - Cucumber World object
 * Provides shared context across step definitions
 */
export class CustomWorld extends World {
    public testContext: TestContext;
    public logger: Logger;
    public page!: Page;
    public context!: BrowserContext;

    constructor(options: IWorldOptions) {
        super(options);
        this.testContext = new TestContext();
        this.logger = new Logger();
    }

    /**
     * Set page instance
     */
    setPage(page: Page): void {
        this.page = page;
        this.testContext.setPage(page);
    }

    /**
     * Get page instance
     */
    getPage(): Page {
        return this.page;
    }

    /**
     * Set browser context
     */
    setContext(context: BrowserContext): void {
        this.context = context;
        this.testContext.setContext(context);
    }

    /**
     * Get browser context
     */
    getContext(): BrowserContext {
        return this.context;
    }

    /**
     * Store scenario data
     */
    setData(key: string, value: any): void {
        this.testContext.setData(key, value);
    }

    /**
     * Retrieve scenario data
     */
    getData(key: string): any {
        return this.testContext.getData(key);
    }

    /**
     * Log message
     */
    log(message: string): void {
        this.logger.info(message);
    }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);
