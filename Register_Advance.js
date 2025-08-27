const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');
describe('Register', function () {
    this.timeout(5000);
    let driver;
    const URL = " https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/register.html"
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });
    after(async function () {
        await driver.quit();
    });
    it("Register successful with valid credential", async function () {
        await driver.get(URL);
        await driver.findElement(By.id("email")).sendKeys("testRegister+111@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.className("btn-primary")).click();
        const alert = await driver.wait(until.elementLocated(By.css('.alert-success')), 5000);
        expect(await alert.getText()).to.equal("Registration successful");
    });
    it("Register fail with empty email", async function () {
       await driver.get(URL);
       await driver.findElement(By.id("email")).sendKeys("");
       await driver.findElement(By.id("password")).sendKeys("123456789");
       await driver.findElement(By.className("btn-primary")).click();
       const alert = await driver.findElement(By.css('.alert-danger'));
       expect(await alert.getText()).to.equal("Username already exists");
    });
});
