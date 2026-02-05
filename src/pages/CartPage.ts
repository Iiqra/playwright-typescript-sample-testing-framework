import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    // Locators
    private readonly cartItems = '.success';
    private readonly totalPrice = '#totalp';
    private readonly placeOrderButton = 'button:has-text("Place Order")';
    private readonly deleteItemButton = 'a:has-text("Delete")';

    constructor(page: Page) {
        super(page);
    }

    // Actions
    async getItemCount() {
        await this.page.waitForSelector(this.cartItems, { state: 'attached' });
        return (await this.page.$$(this.cartItems)).length;
    }

    async getTotalPrice() {
        return await this.page.textContent(this.totalPrice);
    }

    async removeAllItems() {
        const deleteButtons = await this.page.$$(this.deleteItemButton);
        for (const button of deleteButtons) {
            await button.click();
            await this.page.waitForTimeout(500); // Small delay for cart update
        }
    }

    // Assertions
    async verifyCartIsEmpty() {
        await expect(this.page.locator(this.cartItems)).toHaveCount(0);
    }

    async verifyTotalPrice(expectedTotal: number) {
        const totalText = await this.getTotalPrice();
        const actualTotal = totalText ? parseInt(totalText) : 0;
        expect(actualTotal).toBe(expectedTotal);
    }
}
