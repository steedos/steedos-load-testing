/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2023-02-28 11:56:46
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2023-02-28 18:44:16
 * @Description: 
 */
const puppeteer = require('puppeteer')

const timeout = 300000;


test('page title', async () => {
    const browser = await puppeteer.launch(require('../../jest-puppeteer.config').launch)
    const promises = []
    for (let index = 0; index < 3; index++) {
        promises.push(login(browser))
    }
    await Promise.all(promises)
}, timeout);

async function login(browser) {
    console.log('login')
    const page = await browser.newPage();

    // Go to your site
    await page.goto(STEEDOS_ROOT_URL);

    await new Promise(r => setTimeout(r, 2000));

    const title = await page.title();
    expect(title).toBe('登录您的账户 | 我的公司');

    const headerOne = await page.$('h2');
    const header = await page.evaluate(headerOne => headerOne.innerHTML, headerOne);
    expect(header).toBe("登录您的账户");

    await page.type('#loginId', STEEDOS_USERNAME);
    await page.type('#password', STEEDOS_PASSWORD);
    await new Promise(r => setTimeout(r, 1000));
    await page.click('[type=submit]')
    await new Promise(r => setTimeout(r, 2000));


    // // 选择并点击第一个企业
    // try {
    //     let xPath = '//*[@id="root"]/div/div[3]/div/div[2]/ul/li[1]';
    //     await page.waitForXPath(xPath);
    //     let elements = await page.$x(xPath);
    //     elements[0].click();
    // } catch (error) {}
    // await new Promise(r => setTimeout(r, 3000));

    // await distribute(page);
    await page.goto(`${STEEDOS_ROOT_URL}/workflow`)
}

async function distribute(p) {
    await p.goto(`${STEEDOS_ROOT_URL}/workflow`)
}