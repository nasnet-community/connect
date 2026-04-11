import type { WANWizardState } from "../types";

export const getLinkErrors = (
  linkId: string,
  validationErrors: WANWizardState["validationErrors"] = {},
): string[] => {
  return Object.entries(validationErrors)
    .filter(([key]) => key.startsWith(`link-${linkId}`))
    .map(([, errors]) => errors)
    .flat() as string[];
};

export const getFieldErrors = (
  linkId: string,
  field: string,
  validationErrors: WANWizardState["validationErrors"] = {},
): string[] => {
  const errorKey = `link-${linkId}-${field}`;
  return errorKey in validationErrors ? validationErrors[errorKey] : [];
};

export const hasValidationErrors = (
  validationErrors: WANWizardState["validationErrors"] = {},
): boolean => {
  return Object.keys(validationErrors).length > 0;
};

export const isLinkConfigurationComplete = (
  link: WANWizardState["links"][0],
): boolean => {
  if (!link.connectionType) return false;

  if (link.connectionType === "LTE") {
    return Boolean(link.lteSettings?.apn);
  }

  if (link.connectionType === "PPPoE") {
    return !!(
      link.connectionConfig?.pppoe?.username &&
      link.connectionConfig.pppoe.password
    );
  }

  if (link.connectionType === "Static") {
    return !!(
      link.connectionConfig?.static?.ipAddress &&
      link.connectionConfig.static.subnet &&
      link.connectionConfig.static.gateway &&
      link.connectionConfig.static.DNS
    );
  }

  // DHCP does not require additional configuration.
  return true;
};

export const isInterfaceConfigurationComplete = (
  link: WANWizardState["links"][0],
): boolean => {
  return Boolean(link.interfaceName) && Boolean(link.interfaceType);
};
