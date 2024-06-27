import { Page } from "@playwright/test";
import { assert } from "console";
import { Logger } from "winston";
const { faker } = require('@faker-js/faker');



export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    logger: undefined as unknown as Logger,
    
    
    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    },

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    },

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }

}






