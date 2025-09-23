export const getConnectionTypeDisplay = (type?: string): string => {
  if (!type) return "Not configured";
  const types: Record<string, string> = {
    DHCP: "DHCP Client",
    PPPoE: "PPPoE",
    Static: "Static IP",
    LTE: "LTE/4G",
  };
  return types[type] || type;
};

export const getStrategyDisplay = (strategy?: string): string => {
  const strategies: Record<string, string> = {
    LoadBalance: "Load Balance",
    Failover: "Failover",
    RoundRobin: "Round Robin",
    Both: "Load Balance + Failover",
  };
  return strategies[strategy || ""] || "";
};

export const getLoadBalanceMethodDisplay = (method?: string): string => {
  const methods: Record<string, string> = {
    PCC: "PCC (Per Connection Classifier)",
    NTH: "NTH (Nth Connection)",
    ECMP: "ECMP (Equal Cost Multi-Path)",
    Bonding: "Bonding",
  };
  return methods[method || ""] || method || "";
};

export const getCardStyleByStatus = (status: string): string => {
  switch (status) {
    case "complete":
      return "bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md";
    case "error":
      return "bg-white dark:bg-gray-800 border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600 hover:shadow-md";
    case "partial":
      return "bg-white dark:bg-gray-800 border-yellow-300 dark:border-yellow-700 hover:border-yellow-400 dark:hover:border-yellow-600 hover:shadow-md";
    default:
      return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 opacity-75";
  }
};

export const getStatusColorClass = (status: string): { bg: string; text: string } => {
  switch (status) {
    case "complete":
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
      };
    case "error":
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
      };
    case "partial":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-700",
        text: "text-gray-600 dark:text-gray-400",
      };
  }
};

export const getPriorityColorClass = (index: number): string => {
  switch (index) {
    case 0:
      return "bg-green-500";
    case 1:
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
};