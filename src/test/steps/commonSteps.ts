
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, expect, Logger, Page } from '@playwright/test';
import { fixture } from "../../hooks/pageFixture";
const { faker } = require('@faker-js/faker');



setDefaultTimeout(60 * 1000 * 2)

let Name:string;

Given("Navigate to inventory",async function(){
    
    await fixture.goto("https://test-inventory.simprasuite.com/login");
})
When("Login to inventory",async function(){

    const email=await fixture.page.locator("#username")
    const password=await fixture.page.locator("#password")
    const loginButton=await fixture.page.locator("//div[@class='sign-in']//input")

    await email.fill("ukaradeniz+manuel@protel.com.tr");
    await password.fill("Simpra123@")
    await loginButton.click();
})
Then("Verify home page opened",async function() {
   
    const dasboard=await fixture.page.locator("//a[@id='button-sidebar-Dashboard-link']")
    await fixture.page.waitForSelector('#button-sidebar-Dashboard-link', { state: 'visible' })
    await expect(dasboard).toBeVisible();
    
})

Then("Click to {string} sidebar menu",async function(pageName) {
    const dasboard=await fixture.page.locator("//a[@id='button-sidebar-Dashboard-link']")
    const element="//*[contains(text(),'"+pageName+"')]/..";
    const sideBar=await fixture.page.locator(element);
    await dasboard.click();
    await expect(sideBar).toBeVisible();
    await sideBar.click();
})
Then("Click to {string} list under sidebar menu",async function(listNmae){
    const element="//*[text()='"+listNmae+"']";
    const listName=await fixture.page.locator(element);
    await listName.scrollIntoViewIfNeeded();
    await listName.click();
})

Then("Click to {string} button",async function(buttonName){
    const text="//*[text()='"+buttonName+"']";
    const Button=await fixture.page.locator(text);
    await expect(Button).toBeVisible();
    await Button.scrollIntoViewIfNeeded();
    await Button.click();
})
Then("Enter random name to {string} field",async function(inputName){
    const element="//label[text()='" + inputName + "']/..//input";
    const input=await fixture.page.locator(element);
    await expect(input).toBeVisible();
    const randomName = faker.name.firstName();
    await input.fill(await randomName);
    Name=randomName;
    
    
})
Then("Enter random number to {string} field",async function(inputName) {
    const element="//label[text()='" + inputName + "']/..//input";
    const input=await fixture.page.locator(element);
    await expect(input).toBeVisible();
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    await input.fill(randomNumber.toString());
})
Then("Click to add button on pop'up",async function(){
    const popupButton=await fixture.page.locator("//button[@type='submit']")
    await popupButton.click();
    await fixture.page.waitForTimeout(2000);
})
Then("Close the pop'up and verify pop'up closed",async function(){
    const popupCloseButton=await fixture.page.locator("#btn-popup-close")
    await popupCloseButton.click();
    await fixture.page.waitForSelector("#btn-popup-close",{ state: 'hidden' });
})
Then("Verify pop'up closed",async function(){
    await fixture.page.waitForSelector("#btn-popup-close",{ state: 'hidden' });
})
Then("Verify addition successful",async function(){
    const element="//*[text()='"+Name+"']"
    const locator = fixture.page.locator(element);
    await fixture.page.waitForSelector(element);
})
Then("Click to action button",async function(){
    const actionButtonOne=await fixture.page.locator("(//button[@id='btn-table-show-actions-header'])[1]");
    await actionButtonOne.scrollIntoViewIfNeeded();
    await actionButtonOne.click();
})
Then("Verify edit button and click",async function(){
    const editButton=await fixture.page.locator("text=Düzenle");
    await editButton.isVisible();
    await editButton.scrollIntoViewIfNeeded();
    await editButton.click();
})


