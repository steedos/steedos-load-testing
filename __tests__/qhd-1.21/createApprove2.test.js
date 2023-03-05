/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-05 11:47:37
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-05 16:52:06
 * @FilePath: /steedos-load-testing/__tests__/qhd-1.21/createApprove.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const timeout = 3000000; 

describe('Login And Approve', () => {
    
  beforeAll(async () => {
    await Login();
  }, timeout);

  test('Login', async () => {
    
    let num = 20;
    for( let i = 0; i < num; i ++ ) {
        createNewFile();
        console.log( '--------当前浏览器数量--------:' + (i + 1) + "/" + num);
    }
    await page.waitForSelector('.steedos99999', {timeout});
  }, timeout); 

});


async function Login(){
    await page.goto(STEEDOS_ROOT_URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#at-field-username_and_email');
    await page.type('#at-field-username_and_email', STEEDOS_USERNAME);
    await page.type('#at-field-password', STEEDOS_PASSWORD);
    await click_delay(page, '[type=submit]', 1000);
}

async function gotoWorkflow(){
    await page.waitForSelector('[data-appid="workflow"]');
    await click_delay('[data-appid="workflow"]');
}

async function createNewFile(){
    var page = await browser.newPage();
    await page.goto(process.env.STEEDOS_INBOX_URL);
    await page.waitForSelector('.instance_new');
    await click_delay(page, '.instance_new', 1000);
    await click_delay(page, '[data-flow="1ff12bc17e235503aff2c4c9"]',5000);
    await write_delay(page, '[name="发文类型"]', '政务发文');
    await write_delay(page, '[name="主送"]', '测试');
    await write_delay(page, '[title="标题"]', '测试');
    await click_delay(page, '[value="a005e57c-ecf0-4aa0-ac8d-a90a76c0b56f"]');
    await click_delay(page, '.selectUser-placeholder'); // 点击选择秘书 
    await click_delay(page, '#EayxjWDetqaP8BjP6'); // 选人 王海滨
    await click_delay(page, '#instance_submit'); // 发送
    // page = await browser.newPage();
    // await page.goto(STEEDOS_ROOT_URL);
    await page.waitForSelector('[data-appid="workflow"]');
}

// 延时后点击 
async function click_delay(page, str, time = 3000){ 
    await page.waitForTimeout(time);
    await page.$eval(str, (el) => {
        el.click();
    });
  };
    
// 延时后选择和填充
async function write_delay(page, str, content = 'test', time = 10000){
    await page.waitForTimeout(time);
    await page.$eval(str, (el, fillContent) => {
        el.value = fillContent;
    }, content);
};