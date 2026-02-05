import { Page } from '@playwright/test';
import { testConfig } from '../config/test-config';

export class TestUtils {
    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState('networkidle');
    }

    static async takeScreenshot(page: Page, name: string) {
        const screenshotPath = `test-results/screenshots/${name}-${new Date().toISOString()}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });
        return screenshotPath;
    }

    static async wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
