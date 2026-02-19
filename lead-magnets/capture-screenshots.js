const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const files = [
  '01-dmv-buyer-blueprint.html',
  '02-7-days-to-closing.html',
  '03-neighborhood-hot-sheet.html',
  '04-open-house-survival-guide.html'
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const file of files) {
    const filePath = `file://${path.resolve(file)}`;
    const page = await browser.newPage();
    
    await page.setViewport({ width: 800, height: 1000 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    const outputName = file.replace('.html', '.png');
    await page.screenshot({ path: outputName, fullPage: false });
    console.log(`Captured: ${outputName}`);
    
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured!');
}

captureScreenshots().catch(console.error);