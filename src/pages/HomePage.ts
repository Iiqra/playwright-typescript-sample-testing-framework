import { Page, expect, Dialog } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

export class HomePage extends BasePage {
    // Locators
    private readonly loginLink = '#login2';
    private readonly signupLink = '#signin2';
    private readonly welcomeUsername = '#nameofuser';
    private readonly productItems = '.card';
    private readonly categories = '.list-group-item';
    private readonly productPrice = 'h5';
    private readonly addToCartButton = 'a:has-text("Add to cart")';
    private readonly cartLink = '#cartur';

    constructor(page: Page) {
        super(page);
    }

    // Actions
    async clickLogin() {
        await this.page.click(this.loginLink);
    }

    async clickSignUp() {
        await this.page.click(this.signupLink);
    }

    async getWelcomeMessage() {
        await this.page.waitForSelector(this.welcomeUsername);
        return await this.page.textContent(this.welcomeUsername);
    }

    async getProductCount(timeout: number = 10000): Promise<number> {
        try {
            // Wait for at least one product to be visible
            await this.page.waitForSelector(this.productItems, { 
                state: 'visible', 
                timeout 
            });
            
            // Get all product items
            const products = await this.page.$$(this.productItems);
            
            // If no products found, try waiting a bit more with a smaller timeout
            if (products.length === 0) {
                await this.page.waitForTimeout(2000);
                return (await this.page.$$(this.productItems)).length;
            }
            
            return products.length;
        } catch (error) {
            console.error('Error getting product count:', error);
            return 0;
        }
    }

    // Category and Product Actions
    async selectCategory(categoryName: string) {
        await this.page.click(`.list-group-item:has-text("${categoryName}")`);
        await this.page.waitForLoadState('networkidle');
    }

    async addProductToCart(index: number = 0) {
        // Set up dialog handler
        const dialogPromise = this.page.waitForEvent('dialog');
        
        // Click add to cart button for the specified product
        const addButtons = await this.page.$$(this.addToCartButton);
        if (index < addButtons.length) {
            await addButtons[index].click();
            
            // Handle the alert dialog
            const dialog = await dialogPromise;
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
            
            // Wait for any UI updates
            await this.page.waitForTimeout(500);
        }
    }

    async getProductPrice(index: number = 0): Promise<number> {
        const prices = await this.page.$$(this.productPrice);
        if (index < prices.length) {
            const priceText = await prices[index].textContent();
            return priceText ? parseInt(priceText.replace(/\D/g, '')) : 0;
        }
        return 0;
    }

    async navigateToCart() {
        await this.page.click(this.cartLink);
    }

    // Assertions
    async verifyPageLoaded() {
        await expect(this.page).toHaveTitle('STORE');
        await expect(this.page.locator(this.loginLink)).toBeVisible();
        await expect(this.page.locator(this.signupLink)).toBeVisible();
    }

    async verifyOnlyLaptopsDisplayed() {
        const productTitles = await this.page.$$('.card-title');
        for (const title of productTitles) {
            const text = await title.textContent();
            expect(text).toMatch(/(laptop|notebook|macbook|thinkpad|hp|dell|lenovo)/i);
        }
    }
}
