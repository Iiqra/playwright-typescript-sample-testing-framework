import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput = '#loginusername';
    private readonly passwordInput = '#loginpassword';
    private readonly loginButton = 'button:has-text("Log in")';
    private readonly closeButton = 'button.btn-secondary';

    constructor(page: Page) {
        super(page);
    }

    // Actions
    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async close() {
        await this.page.click(this.closeButton);
    }

    // Assertions
    async verifyLoginModalVisible() {
        await expect(this.page.locator(this.usernameInput)).toBeVisible();
        await expect(this.page.locator(this.passwordInput)).toBeVisible();
        await expect(this.page.locator(this.loginButton)).toBeVisible();
    }
}
