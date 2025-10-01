import { test, expect } from "@playwright/test";

const loginUrl = `${process.env.APP_BASE_URL}/login`;
const homeUrl = `${process.env.APP_BASE_URL}/`;

const username = process.env.API_LOGIN as string;
const password = process.env.API_PASSWORD as string;

test.describe("Authentication Flow", () => {
  test("Login success redirects to home", async ({ page }) => {
    // Login
    await page.goto(loginUrl);
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    //Wait for localStorage
    await page.waitForFunction(() => !!localStorage.getItem("token"));
    await page.waitForFunction(() => !!localStorage.getItem("username"));

    // Check LocalStorage
    const localToken = await page.evaluate(() => localStorage.getItem("token"));
    const localUsername = await page.evaluate(() =>
      localStorage.getItem("username")
    );
    expect(localToken).not.toBeNull();
    expect(localUsername).toBe(process.env.API_LOGIN);

    // Check redirection
    await expect(page).toHaveURL(homeUrl);
  });

  test("Login error shows error message", async ({ page }) => {
    // Login
    await page.goto(loginUrl);
    await page.fill('input[name="username"]', "wrong@gmail.com");
    await page.fill('input[name="password"]', "wrongpass");
    await page.click('button[type="submit"]');

    // Check error redirection and toast
    await expect(page).toHaveURL(loginUrl);
    await page.addLocatorHandler(
      page.locator('.toast[data-type="error"]'),
      async () => {
        await expect(page.locator('.toast[data-type="error"]')).toBeVisible();
      }
    );
  });

  test("Protected page redirects to login when not logged in", async ({
    page,
  }) => {
    // Check protected redirection without login
    await page.goto(homeUrl);
    await expect(page).toHaveURL(loginUrl);
  });

  test("Logout clears session and redirects", async ({ page }) => {
    // Login & check redirection
    await page.goto(loginUrl);
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(homeUrl);

    // Profile click
    await page.click("#avatar-menu");
    await page.addLocatorHandler(
      page.locator('div[data-radix-menu-content][data-state="open"]'),
      async () => {
        // Check Dropdown open & logout
        await expect(
          page.locator('div[data-radix-menu-content][data-state="open"]')
        ).toBeVisible();
        await page
          .locator('div[data-radix-menu-content][data-state="open"] >> div')
          .nth(1)
          .click();

        // Check session clean & redirection
        await expect(
          page.evaluate(() => localStorage.getItem("token"))
        ).toBeNull();
        await expect(
          page.evaluate(() => localStorage.getItem("username"))
        ).toBeNull();
        await expect(page).toHaveURL(loginUrl);
      }
    );
  });
});
