import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import { cleanupUser } from "./lib/utils";

test.describe("Auth", () => {
  let email = "";
  let shouldDeleteUser = false;

  test.beforeEach(() => {
    email = `${faker.internet.userName()}@example.com`;
  });

  test.afterEach(async ({ page }) => {
    if (shouldDeleteUser) {
      await cleanupUser(email, page);
    }

    shouldDeleteUser = false;
  });

  test("should load landing page without needing authentication", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Get started by editing src/")).toBeVisible();
  });

  test("should redirect from dashboard to login if the user is unauthenticated", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page.getByText("Please log in to continue")).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });

  test("should redirect to dashboard after logging in", async ({ page }) => {
    await page.goto("/login");
    await page
      .getByPlaceholder("Enter your email address")
      .fill("rachel@remix.run");
    await page.getByPlaceholder("Enter password").fill("racheliscool");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("should redirect to dashboard after signing up", async ({ page }) => {
    shouldDeleteUser = true;
    await page.goto("/register");
    await page.getByPlaceholder("Enter your email address").fill(email);
    await page
      .getByPlaceholder("Enter password")
      .fill(faker.internet.password());
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("should display error if login credentials are invalid and the user does not exist", async ({ page }) => {
    await page.goto("/login");
    await page
      .getByPlaceholder("Enter your email address")
      .fill(email);
    await page.getByPlaceholder("Enter password").fill(faker.internet.password());
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(/Invalid Credentials/i)).toBeVisible();
  });

  test("should display error if login credentials are invalid and the user does exist", async ({ page }) => {
    await page.goto("/login");
    await page
      .getByPlaceholder("Enter your email address")
      .fill('rachel@remix.run');
    await page.getByPlaceholder("Enter password").fill(faker.internet.password());
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText(/Invalid Credentials/i)).toBeVisible();
  });
});
