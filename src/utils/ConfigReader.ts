import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

/**
 * ConfigReader - Centralized configuration management
 * Supports multiple environments (dev, qa, uat, prod)
 */
export class ConfigReader {
    private static config: any;

    /**
     * Load configuration based on environment
     */
    static loadConfig(): void {
        const env = process.env.ENV || 'qa';

        this.config = {
            // Environment
            environment: env,

            // Browser settings
            browser: process.env.BROWSER || 'chromium',
            headless: process.env.HEADLESS !== 'false',

            // Application URLs
            baseUrl: this.resolveBaseUrl(env),

            // Timeouts
            defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
            pageLoadTimeout: parseInt(process.env.PAGE_LOAD_TIMEOUT || '60000'),

            // Retry settings
            retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '2'),

            // Screenshot settings
            screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE !== 'false',

            // Video settings
            videoOnFailure: process.env.VIDEO_ON_FAILURE !== 'false',

            // Parallel execution
            parallel: parseInt(process.env.PARALLEL || '2'),

            // Report settings
            reportPath: process.env.REPORT_PATH || 'reports',

            // Credentials (for demo purposes - use secure vault in production)
            credentials: {
                username: process.env.TEST_USERNAME || 'testuser',
                password: process.env.TEST_PASSWORD || 'testpass123'
            }
        };
    }

    /**
     * Resolve base URL based on environment (internal use)
     */
    private static resolveBaseUrl(env: string): string {
        const urls: { [key: string]: string } = {
            dev: process.env.DEV_URL || 'https://dev.example.com',
            qa: process.env.QA_URL || 'https://qa.example.com',
            uat: process.env.UAT_URL || 'https://uat.example.com',
            prod: process.env.PROD_URL || 'https://example.com'
        };

        return urls[env] || urls.qa;
    }

    /**
     * Get configuration object
     */
    static getConfig(): any {
        if (!this.config) {
            this.loadConfig();
        }
        return this.config;
    }

    /**
     * Get specific config value
     */
    static get(key: string): any {
        if (!this.config) {
            this.loadConfig();
        }
        return this.config[key];
    }

    /**
     * Get base URL
     */
    static getBaseUrl(): string {
        return this.get('baseUrl');
    }

    /**
     * Get browser type
     */
    static getBrowser(): string {
        return this.get('browser');
    }

    /**
     * Get environment
     */
    static getEnvironment(): string {
        return this.get('environment');
    }

    /**
     * Get credentials
     */
    static getCredentials(): { username: string; password: string } {
        return this.get('credentials');
    }
}

// Initialize configuration on import
ConfigReader.loadConfig();
