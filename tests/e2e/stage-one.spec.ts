import { expect, test, type Locator, type Page } from "@playwright/test";

type ChooseStateSnapshot = {
  Mode: string;
  Firmware: string;
  RouterMode: string;
  WANLinkType: string;
  TrunkInterfaceType?: string;
  RouterModels: Array<{
    Model: string;
    isMaster: boolean;
    MasterSlaveInterface?: string;
  }>;
};

declare global {
  interface Window {
    __PLAYWRIGHT_TEST__?: boolean;
    __NASNET_TEST_STATE__?: {
      Choose: ChooseStateSnapshot;
    };
  }
}

const route = "/en/star/";

async function bootWizard(page: Page) {
  await page.addInitScript(() => {
    window.__PLAYWRIGHT_TEST__ = true;
  });
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "Choose Your Setup Mode" })).toBeVisible();
}

function clickableCardFromHeading(pageOrSection: Page | Locator, heading: string | RegExp, nth = 0) {
  return pageOrSection
    .getByRole("heading", { name: heading })
    .nth(nth)
    .locator('xpath=ancestor::div[contains(@class, "group relative h-full") or contains(@class, "cursor-pointer")][1]');
}

async function chooseMasterRouter(page: Page, routerName = "hAP ax lite LTE6") {
  await clickableCardFromHeading(page, routerName).click();
}

async function getChooseState(page: Page): Promise<ChooseStateSnapshot> {
  return page.evaluate(() => window.__NASNET_TEST_STATE__!.Choose);
}

async function expectStageOneButtons(page: Page, nextEnabled: boolean) {
  const previous = page.getByRole("button", { name: "Go to previous step" });
  const next = page.getByRole("button", { name: "Go to next step" });

  await expect(previous).toBeDisabled();
  if (nextEnabled) {
    await expect(next).toBeEnabled();
  } else {
    await expect(next).toBeDisabled();
  }
}

test.describe("Stage One Wizard Flows", () => {
  test("easy mode path stores state and enables next button", async ({ page }) => {
    await bootWizard(page);
    await expectStageOneButtons(page, false);

    await clickableCardFromHeading(page, "Easy Mode").click();
    await clickableCardFromHeading(page, /I only have (Domestic|Iran) Link/).click();
    await chooseMasterRouter(page);

    await expect.poll(async () => (await getChooseState(page)).RouterMode).toBe("AP Mode");
    await expect.poll(async () => (await getChooseState(page)).RouterModels.length).toBe(1);

    const chooseState = await getChooseState(page);

    expect(chooseState.Mode).toBe("easy");
    expect(chooseState.WANLinkType).toBe("domestic");
    expect(chooseState.RouterMode).toBe("AP Mode");
    expect(chooseState.RouterModels).toHaveLength(1);
    expect(chooseState.RouterModels[0]).toMatchObject({
      Model: "hAP ax lite LTE6",
      isMaster: true,
    });

    await expectStageOneButtons(page, true);
  });

  test("advanced single-router path stores state and enables next button", async ({ page }) => {
    await bootWizard(page);
    await expectStageOneButtons(page, false);

    await clickableCardFromHeading(page, "Advanced Mode").click();
    await clickableCardFromHeading(page, /I only have (Foreign|Starlink) Link/).click();
    await chooseMasterRouter(page);
    await clickableCardFromHeading(page, "Single Router Mode").click();

    await expect.poll(async () => (await getChooseState(page)).RouterMode).toBe("AP Mode");
    await expect.poll(async () => (await getChooseState(page)).RouterModels.length).toBe(1);

    const chooseState = await getChooseState(page);

    expect(chooseState.Mode).toBe("advance");
    expect(chooseState.WANLinkType).toBe("foreign");
    expect(chooseState.RouterMode).toBe("AP Mode");
    expect(chooseState.RouterModels).toHaveLength(1);
    expect(chooseState.RouterModels[0]).toMatchObject({
      Model: "hAP ax lite LTE6",
      isMaster: true,
    });

    await expect(page.getByRole("heading", { name: "Choose Slave Routers" })).toHaveCount(0);
    await expectStageOneButtons(page, true);
  });

  test("advanced trunk path stores state and only enables next button after interface selection", async ({ page }) => {
    await bootWizard(page);
    await expectStageOneButtons(page, false);

    await clickableCardFromHeading(page, "Advanced Mode").click();
    await clickableCardFromHeading(page, "I have both").click();
    await chooseMasterRouter(page);
    await clickableCardFromHeading(page, "Router + Access Point Mode").click();

    const slaveSection = page
      .getByRole("heading", { name: "Choose Slave Routers" })
      .locator('xpath=ancestor::div[contains(@class, "rounded-xl")][1]');

    await expect(slaveSection).toBeVisible();
    await expectStageOneButtons(page, false);

    await clickableCardFromHeading(slaveSection, "hAP ax²").click();
    await clickableCardFromHeading(page, "Wired Router + Access Point").click();

    await expect(page.getByRole("heading", { name: "Master Router Interface" })).toBeVisible();
    await expectStageOneButtons(page, false);

    await page
      .getByRole("heading", { name: "Master Router Interface" })
      .locator('xpath=ancestor::div[contains(@class, "space-y-4")][1]//div[contains(@class, "interface-card")][1]')
      .click();
    await expectStageOneButtons(page, false);

    await page
      .getByRole("heading", { name: "Slave Router Interface" })
      .locator('xpath=ancestor::div[contains(@class, "space-y-4")][1]//div[contains(@class, "interface-card")][1]')
      .click();

    await expect(page.getByText("Router + Access Point ready")).toBeVisible();

    const chooseState = await getChooseState(page);

    expect(chooseState.Mode).toBe("advance");
    expect(chooseState.WANLinkType).toBe("both");
    expect(chooseState.RouterMode).toBe("Trunk Mode");
    expect(chooseState.TrunkInterfaceType).toBe("wired");
    expect(chooseState.RouterModels).toHaveLength(2);
    expect(chooseState.RouterModels[0]).toMatchObject({
      Model: "hAP ax lite LTE6",
      isMaster: true,
    });
    expect(chooseState.RouterModels[1]).toMatchObject({
      Model: "hAP ax2",
      isMaster: false,
    });
    expect(chooseState.RouterModels.every((routerModel) => Boolean(routerModel.MasterSlaveInterface))).toBe(true);

    await expectStageOneButtons(page, true);
  });
});
