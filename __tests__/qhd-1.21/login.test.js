/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-01 18:06:14
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-05 16:26:58
 * @FilePath: /steedos-load-testing/__tests__/qhd-1.21/login.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const timeout = 300000; 

describe('Login And Approve', () => {
    
  beforeAll(async () => {
    
  }, timeout);

  test('Login', async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#at-field-username_and_email');
    await page.type('#at-field-username_and_email', STEEDOS_USERNAME);
    await page.type('#at-field-password', STEEDOS_PASSWORD);
    await click_delay('[type=submit]');
    await page.waitForTimeout(10000);
  }, timeout); 
  
});

// 延时后点击
async function click_delay(str, time = 3000){ 
  await page.waitForTimeout(time);
  await page.$eval(str, (el) => {
      el.click();
  });
};
  
/* 
  延时后可以进行 选择\写入
  str 选择元素
  content 传入的值
  time 延时时间，可以不传
*/
async function write_delay(str, content, time = 3000){
  await page.waitForTimeout(time);
  await page.$eval(str, (el, fillContent) => {
  el.value = fillContent;
  }, content);
};