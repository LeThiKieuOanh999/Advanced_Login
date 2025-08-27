const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');
describe('Login', function () {
    this.timeout(20000);
    let driver;
    const URL = 'https://hoangduy0610.github.io/ncc-sg-automation-workshop-1/login.html';

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });

    after(async function () {
        await driver.quit();
    });

    it("Login successful with correct credentials", async function () {
        await driver.get(URL);
        await driver.findElement(By.id('username')).sendKeys("ncc01+2025@gmail.com");
        await driver.findElement(By.id('password')).sendKeys("123456");
        await driver.findElement(By.className('btn-primary')).click();

        // Wait for result message to appear
        const h1 = await driver.wait(until.elementLocated(By.css('h1')), 5000);
        const text = await h1.getText();
        assert.equal(text, 'Login');
    });

    it("Login fail with incorrect credentials", async function () {
        await driver.get(URL);
        await driver.findElement(By.id('username')).sendKeys("nnn");
        await driver.findElement(By.id('password')).sendKeys("123456");
        await driver.findElement(By.className('btn-primary')).click();

        // Wait for result message to appear
        const alert = await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
        const text = await alert.getText();
        assert.equal(text, 'Invalid username or password');
    });

    it("Login fail with empty username", async function () {
        await driver.get(URL);
        await driver.findElement(By.id("username")).sendKeys("");
        await driver.findElement(By.id("password")).sendKeys("");
        await driver.findElement(By.className('btn-primary')).click();
        const alert = await driver.findElement(By.css(".alert-danger"));
        const text = await alert.getText();
        assert.equal(text, 'Invalid username or password');
    });

    it("Login fail with incorrect password", async function () {
        await driver.get(URL);
        await driver.findElement(By.id("username")).sendKeys("ncc01+2025@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("wrongpassword");
        await driver.findElement(By.className('btn-primary')).click();
        const alert = await driver.findElement(By.css(".alert-danger"));
        const text = await alert.getText();
        assert.equal(text, 'Invalid username or password');
    });
    
    it("Login fail with incorrect Username", async function () {
        await driver.get(URL);
        await driver.findElement(By.id("username")).sendKeys("WrongUsername");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.className('btn-primary')).click();
        const alert = await driver.findElement(By.css(".alert-danger"));
        const text = await alert.getText();
        assert.equal(text, 'Invalid username or password');
    });
}); 