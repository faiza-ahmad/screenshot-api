const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const screenshot = await page.screenshot({ encoding: 'base64' });
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.end(Buffer.from(screenshot, 'base64'));
};
