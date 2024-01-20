import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

import { cleanupUser } from "./lib/utils";

test.describe("Auth", () => {
  const seededUser = "admin@test.com";
  const seededPassword = "p4ssw0rd";

  let email = "";
  let password = "";
  let shouldDeleteUser = false;

  test.beforeEach(() => {
    email = `${faker.internet.userName()}@example.com`;
    password = faker.internet.password();
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
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });

  test("should redirect to dashboard after logging in", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("name@example.com").fill(seededUser);
    await page.getByPlaceholder("password").fill(seededPassword);
    await page.getByRole("button", { name: "Sign In with Email" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("should redirect to dashboard after signing up", async ({ page }) => {
    shouldDeleteUser = true;
    await page.goto("/register");
    await page.getByPlaceholder("name@example.com").fill(email);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "Sign Up with Email" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test("should display error if login credentials are invalid and the user does not exist", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByPlaceholder("name@example.com").fill(email);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "Sign In with Email" }).click();
    await expect(page.getByText(/Invalid Credentials./i)).toBeVisible();
  });

  test("should display error if login credentials are invalid and the user does exist", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByPlaceholder("name@example.com").fill(seededUser);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "Sign In with Email" }).click();
    await expect(page.getByText(/Invalid Credentials./i)).toBeVisible();
  });

  test("should display error if the user attempts to register with an existing email", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByPlaceholder("name@example.com").fill(seededUser);
    await page.getByPlaceholder("password").fill(password);
    await page.getByRole("button", { name: "Sign Up with Email" }).click();
    await expect(
      page.getByText(/Email address already exists./i),
    ).toBeVisible();
  });

  test("should redirect to login after logging out", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("name@example.com").fill(seededUser);
    await page.getByPlaceholder("password").fill(seededPassword);
    await page.getByRole("button", { name: "Sign In with Email" }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
  });
});
