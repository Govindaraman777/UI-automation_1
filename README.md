# Playwright + TypeScript POM Framework

A sample UI automation framework built with [Playwright](https://playwright.dev/) and TypeScript using the **Page Object Model (POM)** design pattern.

## Structure

```
.
├── pages/                     # Page objects
│   ├── BasePage.ts            # Shared actions for all pages
│   └── GoogleSearchPage.ts    # Google search page object
├── tests/                     # Test specs
│   └── google-search.spec.ts  # Sample test case
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test              # Run all tests (headless)
npm run test:headed   # Run with a visible browser
npm run test:ui       # Run in Playwright UI mode
npm run test:debug    # Debug mode
npm run report        # Open the last HTML report
```

## Sample test case

`tests/google-search.spec.ts`:

1. Launches `https://www.google.com`
2. Enters **what's up** in the search box
3. Submits the search and verifies results are displayed
```
