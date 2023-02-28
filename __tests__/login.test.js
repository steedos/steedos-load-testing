const timeout = 30000; 

describe('Login', () => {
  
  beforeAll(async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForTimeout(2000);
  }, timeout);

  describe('Test page title and header', () => {
    test('page title', async () => {
      const title = await page.title(); 
      expect(title).toBe('登录您的账户 | 华炎软件'); 
    }, timeout); 
    test('Header', async () => { 
      const headerOne = await page.$('h2'); 
      const header = await page.evaluate(headerOne => headerOne.innerHTML, headerOne); 
      expect(header).toBe("登录您的账户"); 
    }, timeout); 
    test('Login', async () => { 
      await page.type('#loginId', STEEDOS_USERNAME);
      await page.type('#password', 'bad-password');
      await page.waitForTimeout(1000);
      await page.click('[type=submit]')
      await page.waitForTimeout(1000);
      const snackbar = await page.$('#client-snackbar');
      const msg = await page.evaluate(snackbar => snackbar.innerText, snackbar); 
      expect(msg).toBe("账号或密码错。"); 
    }, timeout); 
  });
});