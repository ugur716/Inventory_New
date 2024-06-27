import { BeforeAll, AfterAll, Before, After, Status, World, ITestCaseHookParameter } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import { fixture } from "./pageFixture";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});
// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});


After(async function (this: World, scenario) {
    if (scenario.result?.status === Status.FAILED) {
      await fixture.page.screenshot({path:"Register.png"});
      
    }
    await fixture.page.close();
  });


AfterAll(async function () {
    await browser.close();
})


