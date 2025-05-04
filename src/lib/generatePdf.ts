import hb from "handlebars";
import puppeteer from "puppeteer";

export const generatePdf = async (pdfFileAsString: string) => {
  const data = {};
  const template = hb?.compile(pdfFileAsString, { strict: true });
  const result = template(data);
  const html = result;

  const browser = await puppeteer.connect({
    browserWSEndpoint:
      "wss://chrome.browserless.io?token=SFCtpBeu6m6pR94e98f49a5585bdac978279adc532",
  });

  const page = await browser.newPage();

  // Add page margin
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = `
    @page {
        size: A4 landscape;
        margin: 2 rem;
        padding-top: 2rem; /* Add top padding between pages */
        padding-bottom: 2rem; /* Add bottom padding between pages */
    }
    body {
        margin: 2rem;
    }`;
    document.head.appendChild(style);
  });

  await page.setContent(html);
  const buffer = (await page.pdf({ printBackground: true })).buffer;
  await browser.close();
  return buffer;
};
