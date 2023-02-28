const timeout = 300000; 

describe('Login And Approve', () => {

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
  test('approving', async () => { 
    await page.waitForTimeout(3000);
    // await page.click('[title="待审核"]');
    // await page.waitForTimeout(2000);
    await page.click('.odd');
    await page.waitForTimeout(3000);

    await page.type('#suggestion', '同意');

    await page.waitForTimeout(3000);


    await page.$eval("[name=project_type]", (el) => {
      el.value = 'engineering';
    })

    // 有可能没有.nextStepUsers标签，需要判断
    await page.waitForTimeout(10000);
    const nextStepUsers = await page.$('.nextStepUsers'); 
    console.log(nextStepUsers);
    // if(nextStepUsers == null)

   


    await page.waitForTimeout(3000);
    await page.click('.user-name');
    await page.waitForTimeout(3000);
    await page.click('[title = "确认"]');
    await page.waitForTimeout(3000);
    await page.click('[title = "提交"]');
    await page.waitForTimeout(50000);
  }, timeout);
  
  
});

