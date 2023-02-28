module.exports = {
  launch: { 
    headless: process.env.PUPPETEER_HEADLESS === 'true' ? true: false, 
    args: [
        '--lang=zh-CN', 
        '-–disable-gpu', // GPU硬件加速
        '-–disable-dev-shm-usage', // 创建临时文件共享内存
        '-–disable-setuid-sandbox', // uid沙盒
        '-–no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
        '-–no-sandbox', // 沙盒模式
        '-–no-zygote',
        '-–single-process' // 单进程运行
    ],
    slowMo: 0, 
  } 
}