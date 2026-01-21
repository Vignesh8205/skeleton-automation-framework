# 🚀 Skeleton Automation Framework

A production-ready Test Automation Framework built with **Playwright**, **TypeScript**, and **Cucumber BDD** for the APEX UI application.

## ✨ Features

- ✅ **Playwright** - Modern browser automation
- ✅ **TypeScript** - Type-safe development
- ✅ **Cucumber BDD** - Business-readable test scenarios
- ✅ **Page Object Model** - Maintainable and reusable code
- ✅ **Multi-Browser Support** - Chromium, Firefox, WebKit
- ✅ **Parallel Execution** - Fast test runs
- ✅ **Beautiful Reports** - HTML, JSON, JUnit formats
- ✅ **CI/CD Ready** - GitHub Actions pipeline included
- ✅ **Screenshot & Video** - Auto-capture on failures
- ✅ **Comprehensive Logging** - Winston-based logging

## 📦 Prerequisites

- Node.js v18 or higher
- npm (comes with Node.js)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

### 3. Configure Environment
Update `.env` file with your application details:
```env
BASE_URL=https://apex-ui.itccompliance.co.uk/
TEST_USERNAME=your-username
TEST_PASSWORD=your-password
```

### 4. Run Tests
```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run with specific tag
npx cucumber-js --tags "@positive"
```

### 5. View Reports
```bash
# Windows
start reports/cucumber-report/cucumber-report.html

# Mac/Linux
open reports/cucumber-report/cucumber-report.html
```

## 📁 Project Structure

```
skeleton-automation-framework/
├── .github/workflows/     # CI/CD pipeline
├── features/              # BDD feature files
├── src/
│   ├── pages/            # Page objects
│   ├── steps/            # Step definitions
│   ├── support/          # Hooks & World
│   └── utils/            # Utilities
├── reports/              # Test reports
└── config files
```

## 🎯 Available Scripts

```bash
npm test                  # Run all tests
npm run test:smoke        # Run smoke tests
npm run test:regression   # Run regression tests
npm run test:parallel     # Run tests in parallel
npm run test:chromium     # Run on Chromium
npm run test:firefox      # Run on Firefox
npm run test:webkit       # Run on WebKit
npm run report            # Generate HTML report
npm run clean             # Clean reports directory
```

## 🔧 Configuration

### Environment Variables (.env)
- `ENV` - Environment (dev/qa/uat/prod)
- `BROWSER` - Browser type (chromium/firefox/webkit)
- `HEADLESS` - Run in headless mode (true/false)
- `BASE_URL` - Application URL
- `TEST_USERNAME` - Test credentials username
- `TEST_PASSWORD` - Test credentials password

### Cucumber Configuration (cucumber.json)
- Parallel execution settings
- Report formats
- Retry configuration
- Timeout settings

## 🎭 CI/CD Pipeline

GitHub Actions workflow automatically:
- Installs dependencies
- Runs tests on push/PR
- Generates reports
- Uploads artifacts
- Comments on PRs with results

## 📊 Reports

After test execution, reports are generated in:
- `reports/cucumber-report/` - HTML/JSON/JUnit reports
- `reports/screenshots/` - Failure screenshots
- `reports/videos/` - Test recordings
- `reports/logs/` - Execution logs

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Playwright | 1.41.0 | Browser automation |
| TypeScript | 5.3.3 | Type-safe programming |
| Cucumber | 10.3.1 | BDD framework |
| Winston | 3.11.0 | Logging |
| Node.js | 18+ | Runtime environment |

## 📝 Writing Tests

### 1. Create Feature File
```gherkin
@smoke
Feature: Login to APEX UI
  Scenario: Successful login
    Given I navigate to the APEX UI application
    When I enter training username "HPFUGHDN"
    And I enter training password "London123@"
    And I click the login button
    Then I should be logged in successfully
```

### 2. Create Page Object
```typescript
export class YourPage extends BasePage {
  private readonly selectors = {
    button: '#your-button'
  };
  
  async clickButton(): Promise<void> {
    await this.click(this.page.locator(this.selectors.button));
  }
}
```

### 3. Create Step Definitions
```typescript
Given('I navigate to your page', async function (this: CustomWorld) {
  yourPage = new YourPage(this.page);
  await yourPage.navigate('/your-path');
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Happy Testing! 🎉**
