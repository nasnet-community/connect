import type { WANWizardState } from "../types";
import { getLinkErrors, isInterfaceConfigurationComplete, isLinkConfigurationComplete } from "./validationUtils";

export type LinkStatus = "complete" | "partial" | "error" | "incomplete";

export const getLinkStatus = (
  link: WANWizardState["links"][0],
  validationErrors: WANWizardState["validationErrors"],
  step: "interface" | "connection"
): LinkStatus => {
  const errors = getLinkErrors(link.id, validationErrors);
  if (errors.length > 0) return "error";
  
  if (step === "interface") {
    if (isInterfaceConfigurationComplete(link)) return "complete";
    if (Boolean(link.interfaceName) || Boolean(link.interfaceType)) return "partial";
    return "incomplete";
  }
  
  if (step === "connection") {
    if (!link.connectionType) return "incomplete";
    if (isLinkConfigurationComplete(link)) return "complete";
    return "partial";
  }
  
  return "incomplete";
};

export const filterLinks = (
  links: WANWizardState["links"],
  searchQuery: string
): WANWizardState["links"] => {
  if (!searchQuery) return links;
  
  const query = searchQuery.toLowerCase();
  return links.filter(link => 
    (link.name && link.name.toLowerCase().includes(query)) ||
    (link.interfaceName && link.interfaceName.toLowerCase().includes(query)) ||
    (link.interfaceType && link.interfaceType.toLowerCase().includes(query)) ||
    (link.connectionType && link.connectionType.toLowerCase().includes(query))
  );
};

export const getUsedInterfaces = (links: WANWizardState["links"]): string[] => {
  return links
    .map((l) => l.interfaceName)
    .filter((name): name is string => Boolean(name));
};

export const getLinkStatistics = (
  links: WANWizardState["links"],
  validationErrors: WANWizardState["validationErrors"]
) => {
  const activeLinks = links.filter(l => l.interfaceName).length;
  const configuredLinks = links.filter(l => l.connectionType).length;
  const completedConnections = links.filter(l => isLinkConfigurationComplete(l)).length;
  const hasErrors = Object.keys(validationErrors || {}).length > 0;
  
  return {
    activeLinks,
    configuredLinks,
    completedConnections,
    hasErrors,
  };
};

export const sortLinksByPriority = (links: WANWizardState["links"]): WANWizardState["links"] => {
  return [...links].sort((a, b) => (a.priority || 0) - (b.priority || 0));
};

export const initializeWeights = (links: WANWizardState["links"]): Array<{ id: string; updates: { weight: number } }> => {
  const equalWeight = Math.floor(100 / links.length);
  const remainder = 100 - (equalWeight * links.length);
  
  return links.map((link, index) => ({
    id: link.id,
    updates: {
      weight: equalWeight + (index === 0 ? remainder : 0),
    }
  }));
};

export const initializePriorities = (links: WANWizardState["links"]): Array<{ id: string; updates: { priority: number } }> => {
  return links.map((link, index) => ({
    id: link.id,
    updates: {
      priority: index + 1,
    }
  }));
};