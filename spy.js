const puppeteer = require('puppeteer');

async function spy(ip, goodsIds) {
  const args = [];
  if (ip) args.push(`--proxy-server=${ip}`);
  const browser = await puppeteer.launch({
    headless: true,
    args,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 0,
    height: 0,
    isMobile: true,
  });

  const goods = [];
  for (let i = 0; i < goodsIds.length; i++) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
    const url = `https://m.jiaoyimao.com/goods/${goodsIds[i]}.html`;
    await page.goto(url, {waitUntil: 'networkidle0'});

    let content = await page.content();
    const reg =  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (reg.test(content)) {
      content = content.replace(reg, '');
    }
		goods.push(content.replace(/\<script.*\<\/script\>/g, ''));
  }

  await browser.close();

  return goods;
}

module.exports = spy;
