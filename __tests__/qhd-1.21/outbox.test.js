/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-01 18:06:14
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-01 18:54:06
 * @FilePath: /steedos-load-testing/__tests__/qhd-1.21/login.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const timeout = 600000; 

// 如果网络不好，会出现问题
describe('Login And Approve', () => {
    
  beforeAll(async () => {
    
    
  }, timeout);


  test('Login', async () => {
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#at-field-username_and_email');
    await page.type('#at-field-username_and_email', STEEDOS_USERNAME);
    await page.type('#at-field-password', STEEDOS_PASSWORD);
    await page.waitForTimeout(3000);

    await page.$eval('[type=submit]', (el) => {
        el.click();
      });
    await page.waitForTimeout(10000);
  }, timeout); 

  test('Apps', async () => { 


    // 设置开启多少个浏览器
    var apps_num = 100;
    for(var i = 0; i < apps_num; i++ ) {
      console.log( '当前浏览器数量：' + i );
      page = await browser.newPage();
      await page.goto(process.env.STEEDOS_OUTBOX_URL);
      // await page.waitForSelector('.steedos-header-container');
    }
    await page.waitForSelector('.steedos-header-container2', {timeout});
    const appListBtn = await page.$('.steedos-header-container');
    expect(appListBtn).toBeDefined();
    
  }, timeout); 
  
});




/* 
    str 抓取的元素
*/
async function click_delay(str, time = 3000){
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
