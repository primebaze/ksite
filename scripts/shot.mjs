import chromiumExe from "@sparticuz/chromium";
import { chromium } from "playwright-core";

// Usage: node scripts/shot.mjs <outfile> <url> [host]
const [out, url, host = "localhost"] = process.argv.slice(2);

const execPath = await chromiumExe.executablePath();
const browser = await chromium.launch({
  executablePath: execPath,
  args: chromiumExe.args,
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
void host;
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);
