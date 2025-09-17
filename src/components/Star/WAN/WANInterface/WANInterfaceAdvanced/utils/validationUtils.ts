import type { WANWizardState } from "../types";

export const getLinkErrors = (linkId: string, validationErrors: WANWizardState["validationErrors"]): string[] => {
  return Object.entries(validationErrors || {})
    .filter(([key]) => key.startsWith(`link-${linkId}`))
    .map(([, errors]) => errors)
    .flat() as string[];
};

export const getFieldErrors = (linkId: string, field: string, validationErrors: WANWizardState["validationErrors"]): string[] => {
  return (validationErrors || {})[`link-${linkId}-${field}`] || [];
};

export const hasValidationErrors = (validationErrors: WANWizardState["validationErrors"]): boolean => {
  return Object.keys(validationErrors || {}).length > 0;
};

export const isLinkConfigurationComplete = (link: WANWizardState["links"][0]): boolean => {
  if (!link.connectionType) return false;
  
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
  
  // For DHCP and LTE, automatically consider complete
  if (link.connectionType === "DHCP" || link.connectionType === "LTE") {
    return true;
  }
  
  return false;
};

export const isInterfaceConfigurationComplete = (link: WANWizardState["links"][0]): boolean => {
  return Boolean(link.interfaceName) && Boolean(link.interfaceType);
};