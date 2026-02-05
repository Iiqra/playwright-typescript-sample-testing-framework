import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  // Where artifacts go (trace/video/screenshot, etc.)
  outputDir: './test-results',

  // Where the HTML report goes (keep separate!)
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
});
