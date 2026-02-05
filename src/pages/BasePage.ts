import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly baseUrl: string;

    constructor(page: Page, baseUrl: string = 'https://www.demoblaze.com/') {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    async navigate(path: string = '') {
        await this.page.goto(`${this.baseUrl}${path}`);
    }

    async getPageTitle() {
        return await this.page.title();
    }
}
