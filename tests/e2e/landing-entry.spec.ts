import { expect, test } from "@playwright/test";
import { gotoLanding, expectWizardReady } from "./helpers";

test.describe("Landing Page Entry", () => {
  test("hero CTA opens the Star wizard", async ({ page }) => {
    await gotoLanding(page);

    await page.getByRole("link", { name: "Get Started Free" }).click();

    await expect(page).toHaveURL(/\/en\/star\/?$/);
    await expectWizardReady(page);
  });
});
