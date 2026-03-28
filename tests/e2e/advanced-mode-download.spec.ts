import { expect, test } from "@playwright/test";
import {
  clickEnabledStepperButton,
  expectStageOneButtons,
  getChooseState,
  getStarState,
  launchWizardFromLanding,
  routerCard,
  routerModeCard,
  setupModeCard,
  wanLinkCard,
} from "./helpers";

test.describe("Advanced Mode End-to-End", () => {
  test("landing page to configuration download completes an advanced single-router flow", async ({
    page,
  }) => {
    test.setTimeout(90_000);

    await launchWizardFromLanding(page);
    await expectStageOneButtons(page, false);

    await setupModeCard(page, "advance").click();
    await wanLinkCard(page, "both").click();
    await routerCard(page, "hAP ax lite LTE6").click();
    await routerModeCard(page, "single").click();

    await expect.poll(async () => (await getChooseState(page)).RouterMode).toBe(
      "AP Mode",
    );
    await expect
      .poll(async () => (await getChooseState(page)).RouterModels.length)
      .toBe(1);

    const chooseState = await getChooseState(page);

    expect(chooseState.Mode).toBe("advance");
    expect(chooseState.WANLinkType).toBe("both");
    expect(chooseState.RouterMode).toBe("AP Mode");
    expect(chooseState.RouterModels).toHaveLength(1);
    expect(chooseState.RouterModels[0]).toMatchObject({
      Model: "hAP ax lite LTE6",
      isMaster: true,
    });

    await expectStageOneButtons(page, true);
    await clickEnabledStepperButton(page, "Go to next step");

    await expect(page.getByText(/No WAN links configured/i)).toBeVisible();
    const foreignWanHeading = page.getByRole("heading", {
      name: /Foreign WAN Configuration/i,
    });
    const foreignWanStepper = foreignWanHeading.locator(
      'xpath=following::div[@role="application" and @aria-label="Multi-step form"][1]',
    );
    await page.getByRole("button", { name: /Add Foreign Link/i }).click();
    await page.getByRole("button", { name: "Ethernet" }).click();
    await page.getByRole("button", { name: /Select Interface/i }).click();
    await page.getByRole("option", { name: /ether1/i }).click();
    await foreignWanStepper.getByTestId("stepper-next-button").click();

    await page.getByRole("button", { name: /DHCP Client/i }).click();
    await foreignWanStepper.getByTestId("stepper-next-button").click();
    await foreignWanStepper
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.WANLink.Foreign?.WANConfigs[0])
      .toMatchObject({
        name: "Foreign Link 1",
        InterfaceConfig: {
          InterfaceName: "ether1",
        },
        ConnectionConfig: {
          isDHCP: true,
        },
      });

    await expect(
      page.getByRole("heading", { name: /Domestic WAN Configuration/i }),
    ).toBeVisible();
    const domesticWanHeading = page.getByRole("heading", {
      name: /Domestic WAN Configuration/i,
    });
    const domesticWanStepper = domesticWanHeading.locator(
      'xpath=following::div[@role="application" and @aria-label="Multi-step form"][1]',
    );
    await page.getByRole("button", { name: /Add Domestic Link/i }).click();
    await page.getByRole("button", { name: "Ethernet" }).click();
    await page.getByRole("button", { name: /Select Interface/i }).click();
    await page.getByRole("option", { name: /ether3/i }).click();
    await domesticWanStepper.getByTestId("stepper-next-button").click();

    await page.getByRole("button", { name: /DHCP Client/i }).click();
    await domesticWanStepper.getByTestId("stepper-next-button").click();
    await domesticWanStepper
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.WANLink.Domestic?.WANConfigs[0])
      .toMatchObject({
        name: "Domestic Link 1",
        InterfaceConfig: {
          InterfaceName: "ether3",
        },
        ConnectionConfig: {
          isDHCP: true,
        },
      });

    const advancedVpnHeading = page
      .getByRole("heading", { name: /Advanced VPN Client Configuration/i })
      .last();
    await expect(advancedVpnHeading).toBeVisible({ timeout: 10_000 });
    await advancedVpnHeading.scrollIntoViewIfNeeded();
    const advancedVpnStepper = advancedVpnHeading.locator(
      'xpath=following::div[@role="application" and @aria-label="Multi-step form"][1]',
    );
    await advancedVpnStepper
      .getByRole("button", {
        name: /L2TP/i,
      })
      .click();
    await page.getByRole("button", { name: /Select WAN Interface/i }).click();
    await page.getByRole("option", { name: /Foreign Link 1/i }).click();
    await expect(
      page.getByText(/Please select a VPN protocol to continue/i),
    ).toHaveCount(0);
    await advancedVpnStepper.getByTestId("stepper-next-button").click();

    await expect(
      page.getByRole("heading", { name: /L2TP Configuration/i }),
    ).toBeVisible();
    const l2tpConfigurationSection = page
      .getByRole("heading", { name: /L2TP Configuration/i })
      .locator('xpath=ancestor::div[contains(@class,"rounded-lg border border-gray-200 p-4")][1]');
    const l2tpServerInput = l2tpConfigurationSection.getByPlaceholder(
      "vpn.example.com",
    );
    const l2tpUsernameInput = l2tpConfigurationSection.getByPlaceholder(
      "Your username",
    );
    const l2tpPasswordInput = l2tpConfigurationSection.getByPlaceholder(
      "Your password",
    );

    await l2tpServerInput.fill("vpn.example.com");
    await expect(l2tpServerInput).toHaveValue("vpn.example.com", {
      timeout: 10_000,
    });
    await l2tpUsernameInput.fill("advancedvpn1");
    await expect(l2tpUsernameInput).toHaveValue("advancedvpn1", {
      timeout: 10_000,
    });
    await l2tpPasswordInput.fill("AdvancedVpnPass123!");
    await expect(l2tpPasswordInput).toHaveValue("AdvancedVpnPass123!", {
      timeout: 10_000,
    });
    await expect(advancedVpnStepper.getByTestId("stepper-next-button")).toBeEnabled({
      timeout: 10_000,
    });
    await advancedVpnStepper.getByTestId("stepper-next-button").click();
    await advancedVpnStepper
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect
      .poll(async () => (await getStarState(page)).WAN.VPNClient?.L2TP?.[0])
      .toMatchObject({
        Server: {
          Address: "vpn.example.com",
        },
        Credentials: {
          Username: "advancedvpn1",
          Password: "AdvancedVpnPass123!",
        },
        WanInterface: {
          WANType: "Foreign",
          WANName: "Foreign Link 1",
        },
      });

    await expect(
      page.getByRole("button", { name: "Go to next step" }).last(),
    ).toBeEnabled();

    await clickEnabledStepperButton(page, "Go to next step");

    await expect(
      page.getByRole("heading", { name: /Wireless Settings/i }),
    ).toBeVisible();
    await page.getByLabel(/Network Name \(SSID\)/i).fill(
      "NasNet Advanced WiFi",
    );
    await page.getByLabel(/Network Password/i).fill("AdvancedWifiPass123!");
    await page
      .getByRole("heading", { name: /Wireless Settings/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.Wireless?.[0])
      .toMatchObject({
        SSID: "NasNet Advanced WiFi",
        Password: "AdvancedWifiPass123!",
      });

    await expect(
      page.getByRole("heading", { name: /LAN Interface Configuration/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /Save Settings/i }).click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.Interface)
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "ether2",
            bridge: "Split",
          }),
          expect.objectContaining({
            name: "ether4",
            bridge: "Split",
          }),
        ]),
      );

    await expect(
      page.getByRole("heading", { name: /VPN Server Configuration/i }),
    ).toBeVisible();
    const vpnServerStepper = page
      .getByRole("heading", { name: /VPN Server Configuration/i })
      .locator('xpath=following::div[@role="application" and @aria-label="Multi-step form"][1]');

    await page.getByText(/Enable L2TP\/IPsec/i).click();
    await vpnServerStepper.getByTestId("stepper-next-button").click();
    await vpnServerStepper.getByTestId("stepper-next-button").click();

    const configureL2tpStep = page.getByRole("heading", {
      name: /Step 3: Configure L2TP\/IPsec/i,
    });
    await expect(configureL2tpStep).toBeVisible();
    await vpnServerStepper.getByTestId("stepper-next-button").click();

    const vpnUsersStep = page.getByRole("heading", {
      name: /Step 4: Users/i,
    });
    await expect(vpnUsersStep).toBeVisible();
    await vpnUsersStep
      .locator('xpath=following::input[@placeholder="Enter username"][1]')
      .fill("advancedvpnuser1");
    await vpnUsersStep
      .locator('xpath=following::input[@placeholder="Enter password"][1]')
      .fill("AdvancedVpnUserPass123!");
    await vpnUsersStep
      .locator('xpath=following::*[normalize-space()="Select All"][1]')
      .click();
    await vpnServerStepper
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.VPNServer)
      .toMatchObject({
        L2tpServer: {
          enabled: true,
        },
        Users: [
          {
            Username: "advancedvpnuser1",
            Password: "AdvancedVpnUserPass123!",
            VPNType: ["L2TP"],
          },
        ],
      });

    await expect(
      page.getByRole("heading", { name: /Network Tunnels/i }),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /Network Tunnels/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect(
      page.getByRole("heading", { name: /Network Subnets/i }),
    ).toBeVisible();
    await page.getByRole("button", { name: /Save & Continue/i }).click();

    await expect
      .poll(async () => (await getStarState(page)).LAN.Subnets)
      .toMatchObject({
        BaseSubnets: expect.objectContaining({
          Foreign: expect.objectContaining({
            subnet: "192.168.30.0/24",
          }),
          VPN: expect.objectContaining({
            subnet: "192.168.40.0/24",
          }),
        }),
      });

    await clickEnabledStepperButton(page, "Go to next step");

    await expect(
      page.getByRole("heading", { name: /Identity Settings/i }),
    ).toBeVisible();
    await page.getByPlaceholder(/Enter router identity/i).fill("nasnet-adv-1");
    await page
      .getByRole("heading", { name: /Identity Settings/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(
        async () =>
          (await getStarState(page)).ExtraConfig.RouterIdentityRomon,
      )
      .toMatchObject({
        RouterIdentity: "nasnet-adv-1",
        isRomon: true,
      });

    await expect(
      page.getByRole("heading", { name: /Services Configuration/i }),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /Services Configuration/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect(
      page.getByRole("heading", { name: /System Management/i }),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /System Management/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await expect
      .poll(async () => (await getStarState(page)).ExtraConfig.RUI)
      .toMatchObject({
        Timezone: "UTC",
        IPAddressUpdate: expect.objectContaining({
          interval: "Daily",
        }),
      });

    await expect(
      page.getByRole("heading", { name: /Useful Services/i }),
    ).toBeVisible();
    const usefulServicesStepper = page
      .getByRole("heading", { name: /^Useful Services$/i })
      .locator('xpath=ancestor::div[contains(@class,"group relative overflow-hidden")][1]')
      .getByRole("application", { name: "Multi-step form" });
    for (let stepIndex = 0; stepIndex < 5; stepIndex += 1) {
      await usefulServicesStepper.getByTestId("stepper-next-button").click();
    }
    await usefulServicesStepper
      .getByRole("button", { name: /Complete all steps/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /Game/i }),
    ).toBeVisible();
    await page
      .getByRole("heading", { name: /Game/i })
      .locator('xpath=following::button[normalize-space()="Save"][1]')
      .click();

    await clickEnabledStepperButton(page, "Go to next step");

    const downloadButton = page.getByTestId("advanced-download-rsc");
    await expect(downloadButton).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/^router_config_.*\.rsc$/);
  });
});
