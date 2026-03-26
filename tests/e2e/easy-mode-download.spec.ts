import { expect, test } from "@playwright/test";
import {
  clickEnabledStepperButton,
  expectStageOneButtons,
  getChooseState,
  getStarState,
  launchWizardFromLanding,
  routerCard,
  setupModeCard,
  wanLinkCard,
} from "./helpers";

test.describe("Easy Mode End-to-End", () => {
  test("landing page to configuration download completes the easy flow", async ({
    page,
  }) => {
    await launchWizardFromLanding(page);
    await expectStageOneButtons(page, false);

    await setupModeCard(page, "easy").click();
    await wanLinkCard(page, "both").click();
    await routerCard(page, "hAP ax lite LTE6").click();

    await expect.poll(async () => (await getChooseState(page)).RouterMode).toBe(
      "AP Mode",
    );
    await expect.poll(async () => (await getChooseState(page)).RouterModels.length).toBe(
      1,
    );

    const chooseState = await getChooseState(page);

    expect(chooseState.Mode).toBe("easy");
    expect(chooseState.WANLinkType).toBe("both");
    expect(chooseState.RouterMode).toBe("AP Mode");
    expect(chooseState.RouterModels).toHaveLength(1);
    expect(chooseState.RouterModels[0]).toMatchObject({
      Model: "hAP ax lite LTE6",
      isMaster: true,
    });

    await expectStageOneButtons(page, true);
    await clickEnabledStepperButton(page, "Go to next step");

    await expect(
      page.getByRole("heading", { name: /Foreign Network Connection/i }),
    ).toBeVisible();
    const foreignWanSection = page.getByRole("heading", {
      name: /Foreign Network Connection/i,
    });
    await foreignWanSection
      .locator('xpath=following::button[normalize-space()="Ethernet"][1]')
      .click();
    await foreignWanSection
      .locator('xpath=following::*[@data-testid="wan-interface-select-ethernet"][1]')
      .click();
    await page.getByRole("option", { name: /Ethernet 1/i }).click();
    await foreignWanSection
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.WANLink.Foreign?.WANConfigs[0])
      .toMatchObject({
        InterfaceConfig: {
          InterfaceName: "ether1",
        },
        ConnectionConfig: {
          isDHCP: true,
        },
      });

    const domesticWanSection = page.getByRole("heading", {
      name: /Domestic Network Connection/i,
    });
    await domesticWanSection
      .locator('xpath=following::button[normalize-space()="Ethernet"][1]')
      .click();
    await domesticWanSection
      .locator('xpath=following::*[@data-testid="wan-interface-select-ethernet"][1]')
      .click();
    await page.getByRole("option", { name: /Ethernet 1/i }).click();
    await domesticWanSection
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.WANLink.Domestic?.WANConfigs[0])
      .toMatchObject({
        InterfaceConfig: {
          InterfaceName: "ether1",
        },
        ConnectionConfig: {
          isDHCP: true,
        },
      });

    await expect(
      page.getByRole("heading", { name: /VPN Client Configuration/i }),
    ).toBeVisible();
    const vpnClientHeading = page.getByRole("heading", {
      name: /VPN Client Configuration/i,
    });
    await page.getByRole("heading", { name: "L2TP", exact: true }).click();
    const vpnClientSection = vpnClientHeading.locator(
      'xpath=following::div[.//h3[normalize-space()="Connection Settings"]][1]',
    );
    const vpnClientInputs = vpnClientSection.getByRole("textbox");
    await vpnClientSection
      .getByPlaceholder(/vpn\.example\.com or IP address/i)
      .fill("vpn.example.com");
    await vpnClientInputs.nth(1).fill("vpnclient1");
    await vpnClientInputs.nth(2).fill("VpnClientPass123!");
    const vpnClientSaveButton = vpnClientHeading.locator(
      'xpath=following::button[normalize-space()="Save"][1]',
    );
    await expect(vpnClientSaveButton).toBeEnabled();
    await vpnClientSaveButton.click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.VPNClient?.L2TP?.[0])
      .toMatchObject({
        Server: {
          Address: "vpn.example.com",
        },
        Credentials: {
          Username: "vpnclient1",
          Password: "VpnClientPass123!",
        },
        WanInterface: {
          WANType: "Foreign",
        },
      });

    await clickEnabledStepperButton(page, "Go to next step");

    await expect(
      page.getByRole("heading", { name: /Wireless Settings/i }),
    ).toBeVisible();
    await page.getByLabel(/Network Name \(SSID\)/i).fill("NasNet Test WiFi");
    await page.getByLabel(/Network Password/i).fill("StrongPass123!");
    await page
      .getByRole("heading", { name: /Wireless Settings/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.Wireless?.[0])
      .toMatchObject({
        SSID: "NasNet Test WiFi",
        Password: "StrongPass123!",
      });

    await expect(
      page.getByRole("heading", { name: /VPN Server Configuration/i }),
    ).toBeVisible();
    const vpnServerHeading = page.getByRole("heading", {
      name: /VPN Server Configuration/i,
    });
    const vpnServerSection = vpnServerHeading.locator(
      'xpath=following::div[@role="application"][1]',
    );

    await vpnServerSection
      .getByPlaceholder(/Enter a secure passphrase/i)
      .fill("VpnServerPass123!");
    await vpnServerSection.getByTestId("stepper-next-button").click();

    await vpnServerSection.getByLabel(/Username/i).fill("vpnuser1");
    await vpnServerSection.getByLabel(/Password/i).fill("VpnUserPass123!");
    await vpnServerSection
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.VPNServer)
      .toMatchObject({
        CertificatePassphrase: "VpnServerPass123!",
        Users: [
          {
            Username: "vpnuser1",
            Password: "VpnUserPass123!",
          },
        ],
      });

    await clickEnabledStepperButton(page, "Go to next step");

    const downloadButton = page.getByTestId("easy-download-configuration");
    await expect(downloadButton).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/^router_config_.*\.rsc$/);
  });
});
