/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-01 15:35:18
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-05 16:46:32
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
    await page.click('[type=submit]');
    const appListBtn = await page.$('.steedos-header-container'); 
    expect(appListBtn).toBeDefined();
  }, timeout);

  test('homeToApprove', async () => { 
    await click_delay('[title="审批单"]', 7000);
    await click_delay('.steedos-button-instances-instance_new');
    await click_delay('[title="集团公司收文"]', 7000);
    await write_delay('[title="来文单位"]', '同意', 7000);
    await write_delay('[title="文件标题"]', '同意');
    await write_delay('[title="所属部门"]', '集团办公室');
    await click_delay('.nextStepUsers');
    await click_delay('.user-name');
    await click_delay('[title="发送"]');
    await page.waitForTimeout(10000);
  }, timeout); 

});



// 延时后点击
async function click_delay(str, time = 3000){
  await page.waitForTimeout(time);
  await page.click(str);
};

/* 
  延时后可以进行 选择\写入
  str 选择元素
  value 传入的值
  time 延时时间，可以不传
*/
async function write_delay(str, content, time = 3000){
  
  await page.waitForTimeout(time);
  await page.$eval(str, (el, fillContent) => {
    el.value = fillContent;
  }, content);
};