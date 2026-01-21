import { Page, BrowserContext } from '@playwright/test';

/**
 * TestContext - Manages test execution context
 * Stores page, context, and test data for scenario execution
 */
export class TestContext {
    private page: Page | undefined;
    private context: BrowserContext | undefined;
    private testData: Map<string, any>;

    constructor() {
        this.testData = new Map();
    }

    /**
     * Set page instance
     */
    setPage(page: Page): void {
        this.page = page;
    }

    /**
     * Get page instance
     */
    getPage(): Page {
        if (!this.page) {
            throw new Error('Page is not initialized. Please initialize page in hooks.');
        }
        return this.page;
    }

    /**
     * Set browser context
     */
    setContext(context: BrowserContext): void {
        this.context = context;
    }

    /**
     * Get browser context
     */
    getContext(): BrowserContext {
        if (!this.context) {
            throw new Error('Browser context is not initialized.');
        }
        return this.context;
    }

    /**
     * Store test data
     */
    setData(key: string, value: any): void {
        this.testData.set(key, value);
    }

    /**
     * Retrieve test data
     */
    getData(key: string): any {
        return this.testData.get(key);
    }

    /**
     * Check if data exists
     */
    hasData(key: string): boolean {
        return this.testData.has(key);
    }

    /**
     * Clear specific data
     */
    clearData(key: string): void {
        this.testData.delete(key);
    }

    /**
     * Clear all test data
     */
    clearAllData(): void {
        this.testData.clear();
    }

    /**
     * Get all test data
     */
    getAllData(): Map<string, any> {
        return this.testData;
    }

    /**
     * Reset context
     */
    reset(): void {
        this.page = undefined;
        this.context = undefined;
        this.testData.clear();
    }
}
