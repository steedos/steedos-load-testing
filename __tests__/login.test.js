/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-02-28 14:55:54
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-02-28 16:06:45
 * @FilePath: /steedos-load-testing/__tests__/1.login.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEu
 */
const timeout = 30000; 

describe('Login', () => {
  
  beforeAll(async () => {
    await page.goto(STEEDOS_ROOT_URL);
    await page.waitForSelector('#loginId');
  }, timeout);

  describe('Login', () => {
    test('Check Title', async () => {
      const title = await page.title(); 
      expect(title).toContain('登录您的账户'); 
    }, timeout); 
    test('Check Header', async () => { 
      const headerOne = await page.$('h2'); 
      const header = await page.evaluate(headerOne => headerOne.innerHTML, headerOne); 
      expect(header).toBe("登录您的账户"); 
    }, timeout); 
    test('Login Failed', async () => { 
      await page.type('#loginId', STEEDOS_USERNAME);
      await page.type('#password', 'bad-password');
      await page.click('[type=submit]')
      await page.waitForSelector('#client-snackbar');
      const snackbar = await page.$('#client-snackbar');
      const msg = await page.evaluate(snackbar => snackbar.innerText, snackbar); 
      expect(msg).toBe("账号或密码错。"); 
    }, timeout); 
    
    test('Login Success', async () => {
      const password = await page.$('#password');
      const loginId = await page.$('#loginId');
      await page.evaluate(() => loginId.value = "", loginId); 
      await page.type('#loginId', STEEDOS_USERNAME);
      await page.evaluate(() => password.value = "", password); 
      await page.type('#password', STEEDOS_PASSWORD);
      await page.click('[type=submit]')
      await page.waitForSelector('.steedos-header-container');
      const appListBtn = await page.$('.steedos-header-container'); 
      expect(appListBtn).toBeDefined();
    }, timeout); 
  });
});
