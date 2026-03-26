import { expect, type Locator, type Page } from "@playwright/test";

export type ChooseStateSnapshot = {
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

export type StarTestStateSnapshot = {
  Choose: ChooseStateSnapshot;
  WAN: {
    WANLink: {
      Foreign?: {
        WANConfigs: Array<{
          name: string;
          InterfaceConfig: {
            InterfaceName: string;
          };
          ConnectionConfig?: {
            isDHCP?: boolean;
          };
        }>;
      };
      Domestic?: {
        WANConfigs: Array<{
          name: string;
          InterfaceConfig: {
            InterfaceName: string;
          };
          ConnectionConfig?: {
            isDHCP?: boolean;
          };
        }>;
      };
    };
    VPNClient?: {
      L2TP?: Array<{
        Name: string;
        Server: {
          Address: string;
        };
        Credentials: {
          Username: string;
          Password: string;
        };
        WanInterface?: {
          WANType: string;
          WANName: string;
        };
      }>;
    };
  };
  LAN: {
    Wireless?: Array<{
      SSID: string;
      Password: string;
      WifiTarget: string;
      NetworkName: string;
    }>;
    Interface?: Array<{
      name: string;
      bridge: string;
    }>;
    VPNServer?: {
      CertificatePassphrase?: string;
      L2tpServer?: {
        enabled?: boolean;
        IPsec?: {
          UseIpsec?: string;
          IpsecSecret?: string;
        };
      };
      Users?: Array<{
        Username: string;
        Password: string;
        VPNType?: string[];
      }>;
    };
    Subnets?: Record<string, unknown>;
  };
  ExtraConfig: Record<string, unknown>;
  ShowConfig: Record<string, unknown>;
};

declare global {
  interface Window {
    __PLAYWRIGHT_TEST__?: boolean;
    __NASNET_TEST_STATE__?: StarTestStateSnapshot;
  }
}

export const landingRoute = "/en/";
export const wizardRoute = "/en/star/";

export const toTestIdSegment = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

async function enablePlaywrightMode(page: Page) {
  await page.addInitScript(() => {
    window.__PLAYWRIGHT_TEST__ = true;
  });
}

export async function gotoLanding(page: Page) {
  await enablePlaywrightMode(page);
  await page.goto(landingRoute);
  await expect(
    page.getByRole("link", { name: "Get Started Free" }),
  ).toBeVisible();
}

export async function gotoWizard(page: Page) {
  await enablePlaywrightMode(page);
  await page.goto(wizardRoute);
  await expectWizardReady(page);
}

export async function expectWizardReady(page: Page) {
  await expect(page).toHaveURL(/\/en\/star\/?$/, { timeout: 15_000 });
  await expect(setupModeCard(page, "easy")).toBeVisible({ timeout: 15_000 });
  await expect(setupModeCard(page, "advance")).toBeVisible({ timeout: 15_000 });
}

export async function launchWizardFromLanding(page: Page) {
  await gotoLanding(page);
  await page.getByRole("link", { name: "Get Started Free" }).click();
  await expectWizardReady(page);
}

export function setupModeCard(page: Page, mode: "easy" | "advance") {
  return page.getByTestId(`setup-mode-${mode}`);
}

export function wanLinkCard(
  page: Page,
  linkType: "domestic" | "foreign" | "both",
) {
  return page.getByTestId(`wan-link-${linkType}`);
}

export function routerCard(pageOrSection: Page | Locator, routerName: string) {
  return pageOrSection.getByTestId(
    `router-card-${toTestIdSegment(routerName)}`,
  );
}

export function routerModeCard(page: Page, mode: "single" | "trunk") {
  return page.getByTestId(`router-mode-${mode}`);
}

export function trunkInterfaceTypeCard(page: Page, type: "wired" | "wireless") {
  return page.getByTestId(`trunk-interface-type-${type}`);
}

export function trunkInterfaceCard(
  pageOrSection: Page | Locator,
  section: "master" | "slave",
  interfaceName: string,
) {
  return pageOrSection.getByTestId(
    `trunk-interface-${section}-${toTestIdSegment(interfaceName)}`,
  );
}

export async function getChooseState(page: Page): Promise<ChooseStateSnapshot> {
  return page.evaluate(() => window.__NASNET_TEST_STATE__!.Choose);
}

export async function getStarState(page: Page): Promise<StarTestStateSnapshot> {
  return page.evaluate(() => window.__NASNET_TEST_STATE__!);
}

export async function expectStageOneButtons(page: Page, nextEnabled: boolean) {
  const previous = page.getByRole("button", { name: "Go to previous step" });
  const next = page.getByRole("button", { name: "Go to next step" });

  await expect(previous).toBeDisabled();
  if (nextEnabled) {
    await expect(next).toBeEnabled();
  } else {
    await expect(next).toBeDisabled();
  }
}

export async function clickEnabledStepperButton(
  page: Page,
  ariaLabel: "Go to next step" | "Go to previous step" | "Complete all steps",
) {
  const buttons = page.getByRole("button", { name: ariaLabel });
  await expect
    .poll(async () => {
      const count = await buttons.count();

      for (let index = count - 1; index >= 0; index -= 1) {
        const button = buttons.nth(index);
        if ((await button.isVisible()) && (await button.isEnabled())) {
          return index;
        }
      }

      return -1;
    })
    .not.toBe(-1);

  const count = await buttons.count();
  for (let index = count - 1; index >= 0; index -= 1) {
    const button = buttons.nth(index);
    if ((await button.isVisible()) && (await button.isEnabled())) {
      await button.click();
      return;
    }
  }

  throw new Error(`No visible enabled button found for ${ariaLabel}`);
}
