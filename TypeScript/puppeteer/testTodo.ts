// import puppeteer from "puppeteer";
// import fs from "fs";

// const delay = (ms: number) =>
//   new Promise(resolve => setTimeout(resolve, ms));

// (async () => {
//   // Create images folder if not exists
//   if (!fs.existsSync("images")) {
//     fs.mkdirSync("images");
//   }

//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Open React App
//   await page.goto("http://localhost:5173", {
//     waitUntil: "networkidle2",
//   });

//   // Navigate to Todo Page
//   await page.click('a[href="/todo"]');

//   // Wait for input field
//   await page.waitForSelector("input");

//   const todos: string[] = [
//     "Learn Puppeteer",
//     "Build Automation Script",
//     "Practice TypeScript",
//   ];


//   for (const todo of todos) {
//     await page.type("input", todo);
//     await page.click("button");

//     await delay(500);

//     await page.screenshot({
//       path: `images/todo-${Date.now()}.png`,
//     });
//   }

//   console.log("✅ Todos added and screenshots saved successfully");
//   await browser.close();
// })();


import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  // Create folders if they don't exist
  const imagesDir = path.join(__dirname, "images");
  const pdfDir = path.join(__dirname, "pdf");

  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // Open React App
  await page.goto("http://localhost:5173", { waitUntil: "networkidle2" });
  await page.click('a[href="/todo"]');
  await page.waitForSelector("input");

  const todos: string[] = [
    "Learn Puppeteer",
    "Build Automation Script",
    "Practice TypeScript",
  ];

  const imagePaths: string[] = [];

  for (const todo of todos) {
    await page.type("input", todo);
    await page.click("button");
    await delay(500);

    const imagePath = path.join(imagesDir, `todo-${Date.now()}.png`);
    await page.screenshot({ path: imagePath });
    imagePaths.push(imagePath);
  }
  console.log(imagePaths);
  

  console.log("✅ Todos added and screenshots saved successfully");

  // Create PDF HTML content
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          h2 { margin-bottom: 5px; }
          .todo-img { margin-bottom: 30px; width: 100%; max-width: 600px; }
        </style>
      </head>
      <body>
        <h1>My Todo Report</h1>
        ${todos
          .map(
            (todo, i) =>
              `<h2>${i + 1}. ${todo}</h2><img src="file://${imagePaths[i]}" class="todo-img"/>`
          )
          .join("")}
      </body>
    </html>
  `;

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfPath = path.join(pdfDir, "TodoReport.pdf");
  await pdfPage.pdf({ path: pdfPath, format: "A4", printBackground: true });

  console.log(`✅ PDF created successfully at ${pdfPath}`);
  await browser.close();
})();
