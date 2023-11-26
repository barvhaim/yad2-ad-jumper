const puppeteer = require('puppeteer');
var cron = require('node-cron');
const CREDS = require('./creds');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const start = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1800,
    height: 768
  });
  await page.goto('https://my.yad2.co.il/login.php');

  const emailSelector = '[data-testid="email"]';
  await page.waitForSelector(emailSelector);
  await page.type(emailSelector, CREDS.username);

  const passwordSelector = '[data-testid="password"]';
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, CREDS.password);

  await page.click('[data-testid="submit"]');

  const targetText = 'המודעות שלי';
  const xpathSelector = `//p[contains(text(), '${targetText}')]`;
  await page.waitForXPath(xpathSelector);

  await delay(2000);

  const targetButtonContent = `הקפצה`;
  await page.evaluate((targetButtonContent) => {
    const buttons = document.querySelectorAll('button');
    const targetButton = Array.from(buttons).find(button => button.textContent === targetButtonContent);
    targetButton.click();
  }, targetButtonContent);

  await delay(2000);

  await browser.close();
}

start();
// cron.schedule('0 */4 * * *', () => {
//   start()
// });
