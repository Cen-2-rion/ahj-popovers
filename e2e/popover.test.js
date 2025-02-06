import puppeteer from "puppeteer";
import { fork } from "child_process";

// устанавливаем ожидание максимумом 30 секунд для каждого теста
jest.setTimeout(30000);

describe("popover form", () => {
  let server, browser, page;
  let url = "http://localhost:8080";

  // запускаем браузер с набором опций
  beforeAll(async () => {
    // запускаем сервер для тестирования
    server = fork(`${__dirname}/server.js`);

    browser = await puppeteer.launch({
      headless: false, // режим отладки
      slowMo: 100, // скорость выполнения тестов
      // devtools: true, // инструменты разработки (DevTools)
    });
    page = await browser.newPage();
  });

  test("clicking on the button should show a popover", async () => {
    await page.goto(url);

    await page.waitForSelector(".form"); // ожидаем появление формы

    // находим элементы и кликаем по кнопке
    const form = await page.$(".form");
    const button = await form.$(".btn");
    await button.click();

    // ожидаем появление элемента
    const popover = await page.waitForSelector(".popover-element");
    expect(popover).toBeTruthy();
  });

  test("сlicking the button again should hide the popover", async () => {
    await page.goto(url);

    await page.waitForSelector(".form");
    await page.click(".form button");
    await page.click(".form button");

    // проверяем наличие элемента
    const popover = await page.$(".popover-element");
    expect(popover).toBeFalsy();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });  
});
