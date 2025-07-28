import { component$, useSignal, $ } from "@builder.io/qwik";
import { Select } from "../index";
import { Avatar } from "../../DataDisplay/Avatar/Avatar";
import Icon from "../../Iconography/Icon";
import {
  UserIcon,
  GlobeIcon,
  ServerIcon,
  ShieldIcon,
  SuccessIcon,
  ErrorIcon,
  RemoveCircleIcon,
  CubeIcon,
} from "../../Iconography/icons";

export default component$(() => {
  const selectedUser = useSignal<string>("");
  const selectedCountry = useSignal<string>("");
  const selectedServer = useSignal<string>("");
  const selectedStatus = useSignal<string>("");

  // User options with avatars
  const userOptions = [
    { 
      value: "john", 
      label: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "online"
    },
    { 
      value: "sarah", 
      label: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      status: "away"
    },
    { 
      value: "mike", 
      label: "Mike Davis",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      status: "offline"
    },
    { 
      value: "emma", 
      label: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "online"
    },
    { 
      value: "alex", 
      label: "Alex Chen",
      initials: "AC",
      status: "busy"
    },
  ];

  // Country options with flag emojis
  const countryOptions = [
    { value: "us", label: "United States", flag: "🇺🇸" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
    { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
    { value: "de", label: "Germany", flag: "🇩🇪" },
    { value: "fr", label: "France", flag: "🇫🇷" },
    { value: "jp", label: "Japan", flag: "🇯🇵" },
    { value: "au", label: "Australia", flag: "🇦🇺" },
    { value: "br", label: "Brazil", flag: "🇧🇷" },
  ];

  // Server options with icons and status
  const serverOptions = [
    { 
      value: "ny1", 
      label: "New York Server 1",
      location: "New York, US",
      load: "low",
      ping: "12ms"
    },
    { 
      value: "la2", 
      label: "Los Angeles Server 2",
      location: "Los Angeles, US",
      load: "medium",
      ping: "25ms"
    },
    { 
      value: "lon1", 
      label: "London Server 1",
      location: "London, UK",
      load: "high",
      ping: "45ms"
    },
    { 
      value: "tok1", 
      label: "Tokyo Server 1",
      location: "Tokyo, JP",
      load: "low",
      ping: "8ms"
    },
    { 
      value: "fra1", 
      label: "Frankfurt Server 1",
      location: "Frankfurt, DE",
      load: "offline",
      ping: "N/A"
    },
  ];

  // Status options with icons
  const statusOptions = [
    { value: "active", label: "Active", color: "success" },
    { value: "inactive", label: "Inactive", color: "error" },
    { value: "pending", label: "Pending", color: "warning" },
    { value: "maintenance", label: "Maintenance", color: "info" },
  ];

  const getStatusColor = $((status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  });

  const getLoadColor = $((load: string) => {
    switch (load) {
      case "low": return "text-green-600 dark:text-green-400";
      case "medium": return "text-yellow-600 dark:text-yellow-400";
      case "high": return "text-red-600 dark:text-red-400";
      case "offline": return "text-gray-500 dark:text-gray-400";
      default: return "text-gray-500";
    }
  });

  const getStatusIcon = $((status: string) => {
    switch (status) {
      case "active": return <Icon icon={SuccessIcon} size="sm" color="success" />;
      case "inactive": return <Icon icon={ErrorIcon} size="sm" color="error" />;
      case "pending": return <Icon icon={RemoveCircleIcon} size="sm" color="warning" />;
      case "maintenance": return <Icon icon={CubeIcon} size="sm" color="info" />;
      default: return null;
    }
  });

  return (
    <div class="space-y-8">
      {/* Users with Avatars */}
      <div class="space-y-4">
        <Select
          options={userOptions}
          value={selectedUser.value}
          onChange$={(value) => (selectedUser.value = value as string)}
          placeholder="Select a user"
          label="Team Members"
          searchable={true}
          optionRenderer$={$((option, isSelected) => {
            const userOption = userOptions.find(u => u.value === option.value);
            if (!userOption) return <span>{option.label}</span> as JSX.Element;
            
            return (
              <div class="flex items-center gap-3 py-1">
                <div class="relative">
                  <Avatar
                    src={userOption.avatar}
                    initials={userOption.initials}
                    alt={userOption.label}
                    size="sm"
                    variant={userOption.avatar ? "image" : "initials"}
                  />
                  <div class={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(userOption.status)}`}></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                    {userOption.label}
                  </div>
                  <div class={`text-xs ${isSelected ? "text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                    {userOption.status}
                  </div>
                </div>
              </div>
            ) as JSX.Element;
          })}
        />

        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected user: {selectedUser.value || "None"}
        </div>
      </div>

      {/* Countries with Flags */}
      <div class="space-y-4">
        <Select
          options={countryOptions}
          value={selectedCountry.value}
          onChange$={(value) => (selectedCountry.value = value as string)}
          placeholder="Select a country"
          label="Country/Region"
          searchable={true}
          optionRenderer$={$((option, isSelected) => {
            const countryOption = countryOptions.find(c => c.value === option.value);
            if (!countryOption) return <span>{option.label}</span> as JSX.Element;
            
            return (
              <div class="flex items-center gap-3 py-1">
                <span class="text-lg" role="img" aria-label={`${countryOption.label} flag`}>
                  {countryOption.flag}
                </span>
                <span class={`${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                  {countryOption.label}
                </span>
              </div>
            ) as JSX.Element;
          })}
        />

        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected country: {selectedCountry.value || "None"}
        </div>
      </div>

      {/* Servers with Status and Metrics */}
      <div class="space-y-4">
        <Select
          options={serverOptions}
          value={selectedServer.value}
          onChange$={(value) => (selectedServer.value = value as string)}
          placeholder="Select a server"
          label="VPN Servers"
          searchable={true}
          optionRenderer$={$((option, isSelected) => {
            const serverOption = serverOptions.find(s => s.value === option.value);
            if (!serverOption) return <span>{option.label}</span> as JSX.Element;
            
            return (
              <div class="flex items-center gap-3 py-2">
                <div class="flex-shrink-0">
                  <Icon 
                    icon={ServerIcon} 
                    size="sm" 
                    color={isSelected ? "inherit" : "muted"} 
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <div class={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                      {serverOption.label}
                    </div>
                    <div class="flex items-center gap-2">
                      <span class={`text-xs font-medium ${getLoadColor(serverOption.load)}`}>
                        {serverOption.load.toUpperCase()}
                      </span>
                      <span class={`text-xs ${isSelected ? "text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                        {serverOption.ping}
                      </span>
                    </div>
                  </div>
                  <div class={`text-xs ${isSelected ? "text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                    <Icon icon={GlobeIcon} size="xs" class="inline mr-1" />
                    {serverOption.location}
                  </div>
                </div>
              </div>
            ) as JSX.Element;
          })}
        />

        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected server: {selectedServer.value || "None"}
        </div>
      </div>

      {/* Status Options with Icons */}
      <div class="space-y-4">
        <Select
          options={statusOptions}
          value={selectedStatus.value}
          onChange$={(value) => (selectedStatus.value = value as string)}
          placeholder="Select status"
          label="Service Status"
          optionRenderer$={$((option, isSelected) => {
            const statusOption = statusOptions.find(s => s.value === option.value);
            if (!statusOption) return <span>{option.label}</span> as JSX.Element;
            
            return (
              <div class="flex items-center gap-3 py-1">
                {getStatusIcon(statusOption.value)}
                <span class={`${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                  {statusOption.label}
                </span>
              </div>
            ) as JSX.Element;
          })}
        />

        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected status: {selectedStatus.value || "None"}
        </div>
      </div>

      {/* Usage Examples */}
      <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Visual Enhancement Examples
        </h3>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center gap-2">
            <Icon icon={UserIcon} size="sm" color="primary" />
            <span><strong>User Selection:</strong> Avatars with online status indicators</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-lg">🌍</span>
            <span><strong>Country Selection:</strong> Flag emojis for visual identification</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon={ServerIcon} size="sm" color="info" />
            <span><strong>Server Selection:</strong> Load status, ping times, and location info</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon={ShieldIcon} size="sm" color="success" />
            <span><strong>Status Selection:</strong> Color-coded icons for different states</span>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Implementation Notes:</h4>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Uses <code>optionRenderer$</code> prop for custom option layouts</li>
            <li>• Combines Avatar, Icon, and custom styling components</li>
            <li>• Supports real-time status indicators and metrics</li>
            <li>• Maintains accessibility with proper ARIA labels</li>
            <li>• Responsive design works across all device sizes</li>
          </ul>
        </div>
      </div>
    </div>
  );
});