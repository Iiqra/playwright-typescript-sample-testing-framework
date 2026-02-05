import { test, expect } from '../fixtures/test-context';

test.describe('Price Calculation Tests', () => {
    test('should calculate total price correctly', async ({ page, homePage }) => {
        let totalPrice = 0;
        const numberOfItems = 3;
        
        // Navigate to the home page
        await homePage.navigate();
        
        // Add items to cart
        for (let i = 0; i < numberOfItems; i++) {
            // Navigate to product page
            const productLinks = await page.$$('.card a');
            await productLinks[i].click();
            
            // Get product price
            await page.waitForSelector('h3.price-container');
            const priceText = await page.$eval('h3.price-container', el => el.textContent || '0');
            const price = parseInt(priceText.replace(/\D/g, ''));
            totalPrice += price;
            
            // Add to cart
            const dialogPromise = page.waitForEvent('dialog');
            await page.click('a:has-text("Add to cart")');
            const dialog = await dialogPromise;
            await dialog.accept();
            
            // Go back to home page
            await page.goBack();
            await page.waitForLoadState('networkidle');
        }
        
        // Go to cart
        await page.click('#cartur');
        await page.waitForSelector('#totalp');
        
        // Get displayed total
        const displayedTotalText = await page.$eval('#totalp', el => el.textContent || '0');
        const displayedTotal = parseInt(displayedTotalText);
        
        // Verify total
        expect(displayedTotal).toBe(totalPrice);
        
        // Clean up: remove items from cart
        const deleteButtons = await page.$$('a:has-text("Delete")');
        for (const button of deleteButtons) {
            await button.click();
            await page.waitForTimeout(500); // Small delay for cart update
        }
    });
});
