import * as reporter from 'cucumber-html-reporter';
import * as path from 'path';

/**
 * ReportGenerator - Generates Cucumber HTML reports
 * Converts JSON report to beautiful HTML format
 */
export class ReportGenerator {
  /**
   * Generate Cucumber HTML Report
   */
  static generate(): void {
    const options = {
      theme: 'bootstrap',
      jsonFile: path.join('reports', 'cucumber-report', 'cucumber-report.json'),
      output: path.join('reports', 'cucumber-report', 'cucumber-report.html'),
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: false,
      metadata: {
        'App Version': '1.0.0',
        'Test Environment': process.env.ENV || 'qa',
        'Browser': process.env.BROWSER || 'chromium',
        'Platform': process.platform,
        'Node Version': process.version,
        'Parallel': 'Scenarios',
        'Executed': 'Local',
        'Application': 'APEX UI'
      },
      failedSummaryReport: true,
      brandTitle: 'Skeleton Automation Framework - APEX UI',
      name: 'Test Execution Report',
      columnLayout: 1
    };

    try {
      reporter.generate(options);
      console.log('✅ Cucumber HTML report generated successfully!');
      console.log(`📊 Report location: ${options.output}`);
    } catch (error) {
      console.error('❌ Error generating report:', error);
      process.exit(1);
    }
  }
}

// Execute if run directly
if (require.main === module) {
  ReportGenerator.generate();
}
