console.log(process.env.PUPPETEER_HEADLESS)

module.exports = {
  launch: { 
    headless: process.env.PUPPETEER_HEADLESS === 'true' ? true: false, 
    args: [
        '--lang=zh-CN' 
    ],
    slowMo: 30, 
  } 
}