/*
 * @Author: 何夏鹏 hexiapeng@steedos.com
 * @Date: 2023-03-05 11:47:37
 * @LastEditors: 何夏鹏 hexiapeng@steedos.com
 * @LastEditTime: 2023-03-05 18:33:46
 * @FilePath: /steedos-load-testing/__tests__/qhd-1.21/createApprove.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const timeout = 3000000; 

describe('Login And Approve', () => {
    
  beforeAll(async () => {
    await Login();
  }, timeout);

  test('Login', async () => {
    
    let num = 99;
    for( let i = 0; i < num; i ++ ) {
        await console.log( '--------当前浏览器数量--------:' + (i + 1) + "/" + num);
        await page.waitForTimeout(5000); // 等待记载
        await gotoWorkflow();
        await createNewFile();
        page = await browser.newPage();
        await page.goto(STEEDOS_OUTBOX_URL);
    }
    await page.waitForSelector('.steedos99999', {timeout});
  }, timeout); 

});


async function Login(){
    await page.goto(STEEDOS_OUTBOX_URL, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#loginId');
    await page.type('#loginId', STEEDOS_USERNAME);
    await page.type('#password', STEEDOS_PASSWORD);
    await click_delay('[type=submit]');
}

async function gotoWorkflow(){
    
}

async function createNewFile(){
    await wait_ele('.instance-new-btn');
    await click_delay('.instance-new-btn');
    await wait_ele('[title="集团公司发文"]');
    await click_delay('[title="集团公司发文"]');
    await wait_ele('[name="发文类型"]');
    await write_delay('[name="发文类型"]', '政务发文');
    await write_delay('[name="主送"]', '测试');
    await write_delay('[title="标题"]', '测试');
    await click_delay('[value="a005e57c-ecf0-4aa0-ac8d-a90a76c0b56f"]'); // 秘书核稿
    await click_delay('.selectUser-placeholder'); // 选择秘书 
    await click_delay('#EayxjWDetqaP8BjP6'); // 选人 王海滨
    await click_delay('#instance_submit'); // 发送    
}

// 延时后点击 
async function click_delay(str, time = 200){ 
    await wait_ele(str, time);
    await page.$eval(str, (el) => {
        el.click();
    });
  };
    
// 延时后选择和填充
async function write_delay(str, content = 'test', time = 100){
    await wait_ele(str, time);
    await page.$eval(str, (el, fillContent) => {
        el.value = fillContent;
    }, content);
};

// 等待元素加载页面加载
async function wait_ele(str, time = 200){
    while(true){
        await page.waitForTimeout(time);
        let temp = await page.$(str);
        if(temp) break;
    }
}