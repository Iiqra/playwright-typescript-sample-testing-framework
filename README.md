# DemoBlaze Test Automation Framework

This is a test automation framework for [DemoBlaze](https://www.demoblaze.com/) using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## Project Structure

```
src/
├── config/               # Test configuration
│   └── test-config.ts    # Environment variables and test settings
├── fixtures/             # Test fixtures and context
│   └── test-context.ts   # Test context and page object initialization
├── models/               # Data models and interfaces
├── pages/                # Page Object Model classes
│   ├── BasePage.ts       # Base page with common functionality
│   ├── HomePage.ts       # Home page object
│   └── LoginPage.ts      # Login page object
├── tests/                # Test files
│   └── homepage.spec.ts  # Example test file
└── utils/                # Utility functions
    └── test-utils.ts     # Common test utilities
```

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests:
  ```bash
  npx playwright test
  ```

- Run tests in headed mode:
  ```bash
  npx playwright test --headed
  ```

- Run a specific test file:
  ```bash
  npx playwright test tests/homepage.spec.ts
  ```

- Run tests with a specific browser:
  ```bash
  npx playwright test --browser=chromium
  ```

## Test Reports

After running tests, you can view the HTML report with:

```bash
npx playwright show-report
```

## Environment Variables

Create a `.env` file in the root directory to set environment-specific variables:

```
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
```

## Best Practices

1. **Page Object Model**: Each page has its own class with locators and methods.
2. **Fixtures**: Use fixtures for test context and page object initialization.
3. **Selectors**: Use data-testid attributes when possible for more stable tests.
4. **Assertions**: Use Playwright's built-in assertions for better error messages.
5. **Configuration**: Keep test data and environment-specific settings in config files.

## Contributing

1. Create a new branch for your feature or bugfix
2. Write tests for your changes
3. Ensure all tests pass
4. Submit a pull request
