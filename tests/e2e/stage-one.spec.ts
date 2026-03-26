import { expect, test } from "@playwright/test";
import {
  expectStageOneButtons,
  getChooseState,
  gotoWizard,
  routerCard,
  routerModeCard,
  setupModeCard,
  trunkInterfaceCard,
  trunkInterfaceTypeCard,
  wanLinkCard,
} from "./helpers";

test.describe("Stage One Wizard Flows", () => {
  test("easy mode path stores state and enables next button", async ({ page }) => {
    await gotoWizard(page);
    await expectStageOneButtons(page, false);

    await setupModeCard(page, "easy").click();
    await wanLinkCard(page, "domestic").click();
    await routerCard(page, "hAP ax lite LTE6").click();

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
    await gotoWizard(page);
    await expectStageOneButtons(page, false);

    await setupModeCard(page, "advance").click();
    await wanLinkCard(page, "foreign").click();
    await routerCard(page, "hAP ax lite LTE6").click();
    await routerModeCard(page, "single").click();

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
    await gotoWizard(page);
    await expectStageOneButtons(page, false);

    await setupModeCard(page, "advance").click();
    await wanLinkCard(page, "both").click();
    await routerCard(page, "hAP ax lite LTE6").click();
    await routerModeCard(page, "trunk").click();

    const slaveSection = page
      .getByRole("heading", { name: "Choose Slave Routers" })
      .locator('xpath=ancestor::div[contains(@class, "rounded-xl")][1]');

    await expect(slaveSection).toBeVisible();
    await expectStageOneButtons(page, false);

    await routerCard(slaveSection, "hAP ax²").click();
    await trunkInterfaceTypeCard(page, "wired").click();

    await expect(page.getByRole("heading", { name: "Master Router Interface" })).toBeVisible();
    await expectStageOneButtons(page, false);

    await trunkInterfaceCard(page, "master", "ether1").click();
    await expectStageOneButtons(page, false);

    await trunkInterfaceCard(page, "slave", "ether1").click();

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
