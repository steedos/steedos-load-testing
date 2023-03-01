const timeout = 300000; 


// 如果网络不好，会出现问题
describe('Login And Approve', () => {

  beforeAll(async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForTimeout(2000);
  }, timeout);
  
  test('Login', async () => { 
    await page.type('#loginId', STEEDOS_USERNAME1);
    await page.type('#password', STEEDOS_PASSWORD);
    await page.waitForTimeout(1000);
    await page.click('[type=submit]')
    await page.waitForTimeout(3000);
    await page.click('li');
    await page.waitForTimeout(3000);
    const appListBtn = await page.$('.app-list-btn');
    expect(appListBtn).toBeDefined(); 
  }, timeout); 

  test('homeToApprove', async () => { 
    await page.waitForTimeout(5000);
    await page.click('.app-list-btn');
    await page.waitForTimeout(2000);
    // 通过属性值抓取元素
    await page.click('[data-appid="approve_workflow"]');
  }, timeout); 

  // 新建审批单

  // 审核审批单
  var round = 10;
  for( var i = 0; i < round; i ++ ) {
    test('approving', async () => { 
      await page.waitForTimeout(5000);
      await page.click('.odd'); 
      await page.waitForTimeout(3000);
      // 文本传值 eval
      await page.$eval('#suggestion', (el) => {
          el.value = '同意';
      })
      await page.waitForTimeout(3000);
      await page.click('[title = "发送"]');
    }, timeout);
  }
  
  
  
});

