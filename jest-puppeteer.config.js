module.exports = {
  launch: {
    headless: process.env.PUPPETEER_HEADLESS === 'true' ? true : false,
    args: [
      '--lang=zh-CN',
      '-–disable-gpu',            // GPU硬件加速
      '-–disable-dev-shm-usage',  // 创建临时文件共享内存
      '-–disable-setuid-sandbox', // uid沙盒
      '-–no-first-run',           // 没有设置首页。在启动的时候，就会打开一个空白页面。
      '-–no-sandbox',             // 沙盒模式
      '-–no-zygote',
      '-–single-process',         // 单进程运行
      '--window-size=1920,1080',  // 控制浏览器窗口大小
    ],
    defaultViewport: {              // 控制浏览器内窗口大小
      width: 1920,
      height: 1080
    },
    slowMo: 0,
    ignoreHTTPSErrors: true,
  }
}