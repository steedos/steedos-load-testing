/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-01 15:35:18
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-01 17:53:12
 * @FilePath: /steedos-load-testing/__tests__/approve2.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const timeout = 300000; 

// 如果网络不好，会出现问题
describe('Login And Approve', () => {

  beforeAll(async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.goto(STEEDOS_ROOT_URL);
    await page.waitForSelector('#loginId');
    const password = await page.$('#password');
    const loginId = await page.$('#loginId');
    await page.evaluate(() => loginId.value = "", loginId); 
    await page.type('#loginId', STEEDOS_USERNAME);
    await page.evaluate(() => password.value = "", password); 
    await page.type('#password', STEEDOS_PASSWORD);
    await page.click('[type=submit]')
    const appListBtn = await page.$('.steedos-header-container'); 
    expect(appListBtn).toBeDefined();
  }, timeout);

  test('homeToApprove', async () => { 
    await click_delay('[title="审批单"]', 7000);
    await click_delay('.steedos-button-instances-instance_new');
    await click_delay('[title="集团公司收文"]', 7000);
    await write_delay('[title="来文单位"]', 7000);
    await write_delay('[title="文件标题"]');
    await choose_delay('[title="所属部门"]');
    await click_delay('.nextStepUsers');
    await click_delay('.user-name');
    await click_delay('[title="发送"]');
    await page.waitForTimeout(10000);
  }, timeout); 

});



async function click_delay(str, time = 3000){
  /* 
    str 抓取的元素
  */
  await page.waitForTimeout(time);
  await page.click(str);
};

async function write_delay(str, time = 3000){
  await page.waitForTimeout(time);
  await page.$eval(str, (el) => {
    el.value = '同意';
})
};

async function choose_delay(str, time = 3000){
  await page.waitForTimeout(time);
  await page.$eval(str, (el) => {
    el.value = '集团办公室';
  });
}
