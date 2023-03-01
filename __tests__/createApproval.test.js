const timeout = 400000

describe('CreateApproval', () => {

    // 输入账号密码并选择企业
    beforeAll(async () => {
        await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
        // 输入账号和密码点击登录
        await page.type('#loginId', STEEDOS_USERNAME);
        await page.type('#password', STEEDOS_PASSWORD);
        await page.waitForTimeout(1000);
        await page.click('[type=submit]')
        await page.waitForTimeout(1000);

        // 选择并点击第一个企业
        let xPath = '//*[@id="root"]/div/div[3]/div/div[2]/ul/li[1]';
        await page.waitForXPath(xPath);
        let elements = await page.$x(xPath);
        elements[0].click();
        await page.waitForTimeout(10000);
      }, timeout);

      describe('Test page title and header', () => {

        // 测试是否成功进入首页
        test('page title', async () => {
          const title = await page.title(); 
          expect(title).toBe('首页 | Steedos'); 
        }, timeout); 

        // 测试是否成功进入审批页面
        test('goto approval', async () => {
           await page.click('.slds-icon-waffle')
           await page.waitForTimeout(1000);
           let elements = await page.$$('.slds-p-horizontal_small') // 获取全部li标签
           elements[2].click()
           await page.waitForTimeout(2000)
           const approvalTitle = await page.title();
           expect(approvalTitle).toBe('审批 | Steedos')
        }, timeout)

        // 测试创建jest
        test('create approval', async () => {
            // 获取初始状态时草稿箱中草稿数量
            const oldDraftNumber = page.$eval('[aria-label="草稿"]', el => el.innerText);
            await page.click('[title="新建"]');
            (await page.waitForSelector('#chooseFlowTree-C4HD4tKLTjoS2E67W')).click();
            (await page.waitForSelector('#chooseFlowTree-RHqy9eWpEYyTLmMmG')).click();
        }, timeout)

        // // 补充表单内容
        test('fill out approval', async () => {
          await page.waitForTimeout(3000);
          await page.type('[title="单行文本"]', "111");
          await page.$eval('[title="提交"]', b => b.click());
        }, timeout)
      });
})