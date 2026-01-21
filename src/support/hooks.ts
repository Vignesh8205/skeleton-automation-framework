import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { BrowserFactory } from '../utils/BrowserFactory';
import { CustomWorld } from './world';
import { Logger } from '../utils/Logger';

const logger = new Logger();

/**
 * BeforeAll Hook - Runs once before all scenarios
 */
BeforeAll(async function () {
  logger.info('Test Suite Execution Started');
  logger.info(`Environment: ${process.env.ENV || 'qa'}`);
  logger.info(`Browser: ${process.env.BROWSER || 'chromium'}`);
});

/**
 * Before Hook - Runs before each scenario
 */
Before(async function (this: CustomWorld, { pickle }) {
  logger.scenarioStart(pickle.name);
  
  // Launch browser and create page
  const page = await BrowserFactory.createPage();
  const context = BrowserFactory.getContext();
  
  // Set page and context in world
  this.setPage(page);
  this.setContext(context);
  
  logger.info('Browser initialized for scenario');
});

/**
 * Before Hook with tag filter - Runs only for scenarios with @smoke tag
 */
Before({ tags: '@smoke' }, async function (this: CustomWorld) {
  logger.info('Executing SMOKE test scenario');
});

/**
 * Before Hook with tag filter - Runs only for scenarios with @regression tag
 */
Before({ tags: '@regression' }, async function (this: CustomWorld) {
  logger.info('Executing REGRESSION test scenario');
});

/**
 * BeforeStep Hook - Runs before each step
 */
BeforeStep(async function (this: CustomWorld, { pickleStep }) {
  logger.step(`Executing: ${pickleStep.text}`);
});

/**
 * AfterStep Hook - Runs after each step
 */
AfterStep(async function (this: CustomWorld, { pickleStep, result }) {
  if (result.status === Status.FAILED) {
    logger.error(`Step FAILED: ${pickleStep.text}`);
    
    // Take screenshot on step failure
    const timestamp = new Date().getTime();
    const screenshotPath = `reports/screenshots/failed-step-${timestamp}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    logger.info(`Screenshot saved: ${screenshotPath}`);
  } else {
    logger.info(`Step PASSED: ${pickleStep.text}`);
  }
});

/**
 * After Hook - Runs after each scenario
 */
After(async function (this: CustomWorld, { pickle, result }) {
  const scenarioName = pickle.name;
  const status = result?.status || Status.UNKNOWN;
  
  // Take screenshot on scenario failure
  if (status === Status.FAILED) {
    const timestamp = new Date().getTime();
    const screenshotPath = `reports/screenshots/failed-scenario-${timestamp}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    logger.error(`Scenario FAILED - Screenshot: ${screenshotPath}`);
  }
  
  // Close browser context
  await BrowserFactory.closeContext();
  
  logger.scenarioEnd(scenarioName, Status[status]);
});

/**
 * AfterAll Hook - Runs once after all scenarios
 */
AfterAll(async function () {
  // Cleanup browser resources
  await BrowserFactory.cleanup();
  
  logger.info('Test Suite Execution Completed');
  logger.info('Generating reports...');
});
