import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ConfigReader } from './ConfigReader';
import { Logger } from './Logger';

/**
 * BrowserFactory - Manages browser instances
 * Supports multiple browsers and configurations
 */
export class BrowserFactory {
    private static browser: Browser;
    private static context: BrowserContext;
    private static logger = new Logger();

    /**
     * Launch browser based on configuration
     */
    static async launchBrowser(): Promise<Browser> {
        const config = ConfigReader.getConfig();
        const browserType = config.browser || 'chromium';
        const headless = config.headless !== false;

        this.logger.info(`Launching ${browserType} browser in ${headless ? 'headless' : 'headed'} mode`);

        switch (browserType.toLowerCase()) {
            case 'chromium':
            case 'chrome':
                this.browser = await chromium.launch({
                    headless,
                    args: ['--start-maximized', '--disable-blink-features=AutomationControlled']
                });
                break;

            case 'firefox':
                this.browser = await firefox.launch({
                    headless,
                    args: ['--start-maximized']
                });
                break;

            case 'webkit':
            case 'safari':
                this.browser = await webkit.launch({
                    headless
                });
                break;

            default:
                throw new Error(`Unsupported browser: ${browserType}`);
        }

        this.logger.info(`${browserType} browser launched successfully`);
        return this.browser;
    }

    /**
     * Create browser context
     */
    static async createContext(): Promise<BrowserContext> {
        if (!this.browser) {
            await this.launchBrowser();
        }

        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true,
            recordVideo: {
                dir: 'reports/videos/',
                size: { width: 1920, height: 1080 }
            }
        });

        this.logger.info('Browser context created');
        return this.context;
    }

    /**
     * Create new page
     */
    static async createPage(): Promise<Page> {
        if (!this.context) {
            await this.createContext();
        }

        const page = await this.context.newPage();
        this.logger.info('New page created');
        return page;
    }

    /**
     * Get current browser instance
     */
    static getBrowser(): Browser {
        return this.browser;
    }

    /**
     * Get current context
     */
    static getContext(): BrowserContext {
        return this.context;
    }

    /**
     * Close browser context
     */
    static async closeContext(): Promise<void> {
        if (this.context) {
            await this.context.close();
            this.logger.info('Browser context closed');
        }
    }

    /**
     * Close browser
     */
    static async closeBrowser(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.logger.info('Browser closed');
        }
    }

    /**
     * Cleanup all browser resources
     */
    static async cleanup(): Promise<void> {
        await this.closeContext();
        await this.closeBrowser();
        this.logger.info('Browser cleanup completed');
    }
}
