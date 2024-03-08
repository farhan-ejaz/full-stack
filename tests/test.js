const { By, Key, Builder } = require("selenium-webdriver");

require("chromedriver");
const Chrome = require('selenium-webdriver/chrome');

const assert = require('assert');

(async function example() {
    //1. Open Chrome window
    let driver = await new Builder().forBrowser("chrome").build();
    
    new Chrome.Options().addArguments(' — ignore-certificate-errors')
    try {
        //2. Go to website
        await driver.get("https://todo-devops-team2.netlify.app/");

        //3. find the input elem and enter 'Learn Selenium', then press return key
        await driver.findElement(By.id('title')).sendKeys("Learn Selenium", Key.RETURN);

        //4. find the Add button elem and enter
        await driver.findElement(By.id('btnAddTodo')).click();

        //5. Check it is added to list
        driver
            .executeScript('return window.localStorage.getItem("key");')
            .then((itemValue) => {
                console.log(itemValue);
            });


        //await new Promise(r => setTimeout(r, 50000));

    } finally {
        //close the browser
        await driver.quit();
    }
})();



//example()