
const timeout = 30000; 

describe('Login', () => {

  beforeAll(async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForTimeout(2000);
  }, timeout);

  test('Login', async () => { 
    await page.type('#loginId', STEEDOS_USERNAME);
    await page.type('#password', STEEDOS_PASSWORD);
    await page.waitForTimeout(1000);
    await page.click('[type=submit]')
    await page.waitForTimeout(3000);
    const appListBtn = await page.$('.app-list-btn');
    console.log(appListBtn)
    expect(appListBtn).toBeDefined(); 
  }, timeout); 
});