require('dotenv-flow').config({
  path: __dirname
});

console.log(__dirname);
console.log(process.env);
module.exports = {
  preset: "jest-puppeteer",
  globals: {
    STEEDOS_ROOT_URL: process.env.STEEDOS_ROOT_URL,
    STEEDOS_USERNAME: process.env.STEEDOS_USERNAME,
    STEEDOS_PASSWORD: process.env.STEEDOS_PASSWORD,
  },
  verbose: true
}