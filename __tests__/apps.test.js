
const timeout = 3000000; 

describe('Browse Apps', () => {

  beforeAll(async () => {
  }, timeout);

  test('Login', async () => {
    await page.goto(STEEDOS_ROOT_URL);
    await page.waitForSelector('#loginId');
    const password = await page.$('#password');
    const loginId = await page.$('#loginId');
    await page.evaluate(() => loginId.value = "", loginId); 
    await page.type('#loginId', STEEDOS_USERNAME);
    await page.evaluate(() => password.value = "", password); 
    await page.type('#password', STEEDOS_PASSWORD);
    await page.click('[type=submit]')
    await page.waitForNavigation();
    const appListBtn = await page.$('.steedos-header-container'); 
    expect(appListBtn).toBeDefined();
  }, timeout); 

  
  test('Apps', async () => { 


    // 设置开启多少个浏览器
    var round_apps = 50;
    for(var i = 0; i < round_apps; i ++ ) {
      page = await browser.newPage();
      await page.goto(STEEDOS_ROOT_URL);
      await page.waitForNavigation();
      await page.waitForSelector('.steedos-header-container');
    }
    await page.waitForSelector('.steedos-header-container2', {timeout});
    const appListBtn = await page.$('.steedos-header-container');
    expect(appListBtn).toBeDefined();
  }, timeout); 


});