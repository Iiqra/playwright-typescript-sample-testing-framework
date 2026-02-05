import { test, expect } from '../fixtures/test-context';

test.describe('Cart Tests', () => {
    test('should handle alert when adding item to cart', async ({ page, homePage }) => {
        // Set up dialog handler before the action that triggers it
        const dialogPromise = page.waitForEvent('dialog');
        
        // Navigate to the first product
        const productLinks = await page.$$('.card a');
        await productLinks[0].click();
        
        // Wait for the product page to load
        await page.waitForSelector('h2.name');
        
        // Click add to cart
        const addToCartButton = await page.$('a:has-text("Add to cart")');
        await addToCartButton?.click();
        
        // Handle the alert dialog
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
        
        // Verify we can continue interacting with the page
        await expect(page).toHaveTitle(/STORE|Product store/);
    });
});
