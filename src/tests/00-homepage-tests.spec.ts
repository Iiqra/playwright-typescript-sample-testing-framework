import { test, expect } from '../fixtures/test-context';
import { testConfig } from '../config/test-config';

test.describe('Homepage Tests', () => {
    test.only('should load the homepage successfully', async ({ page }) => {
        // Verify page title and URL
        await expect(page).toHaveTitle('STORE');
        await expect(page).toHaveURL(testConfig.baseUrl);
        
        // Verify main elements are visible
        await expect(page.locator('#narvbarx')).toBeVisible();
        await expect(page.locator('#footc')).toBeVisible();
    });

    test('should display products on the homepage', async ({ page, homePage }) => {
        // Wait for the products container to be visible
        await page.waitForSelector('.card', { state: 'visible' });
        
        // Get the product count with a reasonable timeout
        const productCount = await homePage.getProductCount(5000);
        
        // Debug information
        if (productCount === 0) {
            const pageContent = await page.content();
            console.log('Page content:', pageContent);
            const productElements = await page.$$('.card');
            console.log('Number of product elements found:', productElements.length);
        }
        // Verify we have products
        expect(productCount).toBeGreaterThan(0);
    });
});
