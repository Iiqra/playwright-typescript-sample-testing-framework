import { test, expect } from '../fixtures/test-context';

test.describe('Category and Product Tests', () => {
 
    test('should have categories section with expected items', async ({ page, homePage }) => {
        // Define expected categories
        const expectedCategories = [
            'Phones',
            'Laptops',
            'Monitors'
        ];

        // Get all category items
        const categoryElements = await page.$$('.list-group-item');
        const categories = await Promise.all(
            categoryElements.map(async (element) => {
                const text = await element.textContent();
                return text ? text.trim() : '';
            })
        );

        // Verify categories
        for (const category of expectedCategories) {
            expect(categories).toContain(category);
        }
    });
    test('should filter products by category', async ({ page, homePage }) => {
        // Select Laptops category
        const categoryName = 'Laptops';
        
        // Wait for the category to be visible and click it
        await page.waitForSelector('.list-group-item', { state: 'visible' });
        await homePage.selectCategory(categoryName);
        
        // Wait for products to load
        await page.waitForSelector('.card', { state: 'visible' });
        
        // Get all product titles
        const productTitles = await page.$$eval('.card-title', elements => 
            elements.map(el => el.textContent?.toLowerCase() || '')
        );
        
        // Verify we have products
        expect(productTitles.length).toBeGreaterThan(0);
        
        // Verify all products are laptops
        const laptopKeywords = ['laptop', 'notebook', 'macbook', 'thinkpad', 'hp', 'dell', 'lenovo'];
        
        for (const title of productTitles) {
            const isLaptop = laptopKeywords.some(keyword => title.includes(keyword));
            expect(isLaptop, `Product '${title}' is not a laptop`).toBeTruthy();
        }
    });
});
