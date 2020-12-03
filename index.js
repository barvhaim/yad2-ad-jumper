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
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1800,
    height: 768
  });
  await page.goto('https://my.yad2.co.il/login.php');
  await page.waitForSelector('#userName');
  await page.$eval('#userName', el => el.value = CREDS.username);
  await page.waitForSelector('#password');
  await page.$eval('#password', el => el.value = CREDS.password);
  await page.click('#submitLogonForm');
  await page.waitForSelector('.content-wrapper.active');
  await page.goto(CREDS.link);

  await page.waitForSelector('#sLightbox_container > div > div.close_btn');
  await page.click('#sLightbox_container > div > div.close_btn');
  await delay(2000);
  await page.waitForSelector('#bounceRatingOrderBtn');

  await page.focus('#bounceRatingOrderBtn');
  await page.click('#bounceRatingOrderBtn');

  await page.waitForSelector('.viewCommandGreenBtn');

  await delay(2000);
  await page.screenshot({
    path: (new Date().toLocaleString().split('/').join('-').split(':').join('-').replace(', ', '-').replace(' PM', '').replace(' AM') + '.png')
  });
  await browser.close();
}

cron.schedule('0 */4 * * *', () => {
  start()
});