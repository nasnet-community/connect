import { expect, test } from "@playwright/test";

const PANEL_URL = "https://www.joinnasnet.com/fa/products/nasnet-panel/";

test.describe("Sunset notice", () => {
  const titles = {
    en: "NasNet Connect Has Been Discontinued",
    fa: "پایان پشتیبانی از نس نت کانکت",
  };

  for (const locale of ["en", "fa"] as const) {
    test(`opens on load at /${locale}/ in both languages, page language first`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      const dialog = page.locator("#sunset-modal");
      await expect(dialog).toBeVisible();
      const other = locale === "en" ? "fa" : "en";
      await expect(dialog.getByRole("heading")).toHaveText([
        titles[locale],
        titles[other],
      ]);
      await expect(dialog.getByRole("link")).toHaveAttribute("href", PANEL_URL);
    });
  }

  test("pages are marked noindex", async ({ page }) => {
    const response = await page.goto("/en/");
    expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });

  test("blocks page links and reopens the notice", async ({ page }) => {
    await page.goto("/en/");
    const dialog = page.locator("#sunset-modal");
    await dialog.getByRole("button").click();
    await expect(dialog).toBeHidden();
    const urlBefore = page.url();

    await page.getByRole("link", { name: "Get Started Free" }).click();

    await expect(dialog).toBeVisible();
    expect(page.url()).toBe(urlBefore);
  });

  test("social links stay clickable", async ({ page, context }) => {
    await page.goto("/en/");
    const dialog = page.locator("#sunset-modal");
    await dialog.getByRole("button").click();

    await context.route("https://x.com/**", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "ok" }),
    );
    const popup = context.waitForEvent("page");
    await page.locator("footer a[data-sunset-allow][href^='https://x.com']").click();

    expect((await popup).url()).toContain("x.com");
    await expect(dialog).toBeHidden();
  });

  test("closes with Escape", async ({ page }) => {
    await page.goto("/en/star/");
    const dialog = page.locator("#sunset-modal");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
