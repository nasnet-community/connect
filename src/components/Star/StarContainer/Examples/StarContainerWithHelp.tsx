import { component$, $, useSignal, useStore } from "@builder.io/qwik";
import { HStepper } from "~/components/Core/Stepper/HStepper/HStepper";
import type { StepItem } from "~/components/Core/Stepper/HStepper/HSteppertypes";
import {
  LuSettings2,
  LuGlobe,
  LuNetwork,
  LuWrench,
  LuClipboardList,
} from "@qwikest/icons/lucide";

/**
 * Comprehensive StarContainer HStepper sample with help modal functionality
 * Demonstrates router configuration wizard with rich help content
 */

// Mock step components for demonstration
const ChooseStepComponent = component$(() => (
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Choose Your Router
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Select your router model and configuration preferences
      </p>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2">
      <div class="p-4 border-2 border-primary-200 dark:border-primary-700 rounded-lg bg-primary-50 dark:bg-primary-900/20">
        <h3 class="font-semibold text-primary-900 dark:text-primary-100 mb-2">Easy Mode</h3>
        <p class="text-sm text-primary-700 dark:text-primary-300">
          Simplified setup with essential features only
        </p>
        <button class="mt-3 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Select Easy Mode
        </button>
      </div>
      
      <div class="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Advanced Mode</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Full control with all configuration options
        </p>
        <button class="mt-3 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          Select Advanced Mode
        </button>
      </div>
    </div>

    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Router Model Selection</h4>
      <select class="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-700">
        <option>MikroTik hEX S (RB760iGS)</option>
        <option>MikroTik RB4011iGS+</option>
        <option>MikroTik CCR1009-7G-1C-1S+</option>
        <option>MikroTik CRS328-24P-4S+</option>
      </select>
    </div>
  </div>
));

const WANStepComponent = component$(() => (
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        WAN Configuration
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Configure your internet connection and VPN settings
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Internet Connection</h3>
        <div class="space-y-3">
          <div class="flex items-center">
            <input type="radio" id="dhcp" name="connection" class="h-4 w-4 text-primary-600" />
            <label for="dhcp" class="ml-2 text-gray-900 dark:text-white">DHCP (Automatic)</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="static" name="connection" class="h-4 w-4 text-primary-600" />
            <label for="static" class="ml-2 text-gray-900 dark:text-white">Static IP</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="pppoe" name="connection" class="h-4 w-4 text-primary-600" />
            <label for="pppoe" class="ml-2 text-gray-900 dark:text-white">PPPoE</label>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">VPN Client</h3>
        <select class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
          <option value="">No VPN</option>
          <option value="wireguard">WireGuard</option>
          <option value="openvpn">OpenVPN</option>
          <option value="l2tp">L2TP/IPSec</option>
          <option value="pptp">PPTP</option>
        </select>
      </div>
    </div>

    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="font-medium text-green-900 dark:text-green-100">Multi-WAN Support</h4>
          <p class="text-sm text-green-700 dark:text-green-300 mt-1">
            Configure multiple internet connections for redundancy and load balancing.
          </p>
        </div>
      </div>
    </div>
  </div>
));

const LANStepComponent = component$(() => (
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        LAN Configuration
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Set up your local network and wireless settings
      </p>
    </div>

    <div class="grid gap-6">
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Network Segments</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <div class="font-medium text-blue-900 dark:text-blue-100">Split Network</div>
              <div class="text-sm text-blue-700 dark:text-blue-300">192.168.10.0/24</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-primary-600" checked />
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div>
              <div class="font-medium text-gray-900 dark:text-white">Domestic Network</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">192.168.20.0/24</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-primary-600" />
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div>
              <div class="font-medium text-gray-900 dark:text-white">VPN Network</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">192.168.40.0/24</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-primary-600" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wireless Configuration</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SSID Name</label>
            <input type="text" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" placeholder="MyNetwork" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input type="password" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" placeholder="••••••••" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const ExtraConfigComponent = component$(() => (
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Extra Configuration
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Advanced features and gaming optimizations
      </p>
    </div>

    <div class="grid gap-6">
      <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">Gaming Optimization</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-purple-900 dark:text-purple-100">Gaming Mode</div>
              <div class="text-sm text-purple-700 dark:text-purple-300">Prioritize gaming traffic</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-purple-600" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-purple-900 dark:text-purple-100">Port Forwarding</div>
              <div class="text-sm text-purple-700 dark:text-purple-300">Automatic game port setup</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Features</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900 dark:text-white">DDNS</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Dynamic DNS updates</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-primary-600" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900 dark:text-white">Auto Reboot</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Scheduled maintenance</div>
            </div>
            <input type="checkbox" class="h-4 w-4 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const ShowConfigComponent = component$(() => (
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Configuration Summary
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Review and download your router configuration
      </p>
    </div>

    <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <svg class="w-8 h-8 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-green-900 dark:text-green-100">Configuration Ready!</h3>
          <p class="text-green-700 dark:text-green-300">Your MikroTik router configuration has been generated successfully.</p>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border">
      <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Configuration Script Preview</h4>
      <div class="bg-gray-900 dark:bg-gray-950 rounded-md p-4 text-green-400 font-mono text-sm overflow-x-auto">
        <div>/system identity</div>
        <div>set name=MyRouter</div>
        <div class="mt-2">/ip address</div>
        <div>add address=192.168.10.1/24 interface=bridge1</div>
        <div class="mt-2">/interface wireless</div>
        <div>set [ find default-name=wlan1 ] disabled=no ssid=MyNetwork</div>
        <div class="mt-2 text-gray-500"># ... and 47 more configuration commands</div>
      </div>
    </div>

    <div class="flex gap-4 justify-center">
      <button class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
        Download Configuration
      </button>
      <button class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
        Copy to Clipboard
      </button>
    </div>
  </div>
));

export const StarContainerWithHelp = component$(() => {
  const activeStep = useSignal(0);
  const completionMessage = useSignal<string>('');
  
  const analyticsStore = useStore({
    sessionId: Math.random().toString(36).substr(2, 9),
    events: [] as any[]
  });

  // Define comprehensive steps with rich help content
  const steps: StepItem[] = [
    {
      id: 1,
      title: "Choose",
      icon: LuSettings2,
      component: ChooseStepComponent,
      isComplete: false,
      description: "Select your router model and configuration mode",
      
      // Rich help content for Choose step
      helpData: {
        title: "Router Selection & Configuration Mode",
        description: "This step helps you choose the right router model and configuration approach for your network needs.",
        sections: [
          {
            title: "Choosing Your Router Model",
            content: "Select your specific MikroTik router model from the dropdown. Each model has different capabilities, port configurations, and performance characteristics. If you're unsure, check the label on your router or the documentation that came with it.",
            type: "info" as const,
          },
          {
            title: "Easy vs Advanced Mode",
            content: "Easy Mode provides a simplified setup with essential features only, perfect for home users and small offices. Advanced Mode gives you full control over all configuration options, ideal for complex networks and experienced users.",
            type: "tip" as const,
          },
          {
            title: "Firmware Compatibility",
            content: "Ensure your router is running RouterOS 6.47 or later for optimal compatibility. Some advanced features may require newer firmware versions.",
            type: "warning" as const,
          },
          {
            title: "Example Configuration",
            content: "For a typical home setup with 2-3 devices and basic internet sharing, Easy Mode with hEX S model is recommended. For small businesses with VLANs and VPN needs, choose Advanced Mode.",
            type: "example" as const,
          },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        externalLinks: [
          {
            title: "MikroTik Router Comparison",
            url: "https://mikrotik.com/products",
          },
          {
            title: "RouterOS System Requirements",
            url: "https://help.mikrotik.com/docs/display/ROS/Requirements",
          }
        ]
      }
    },
    {
      id: 2,
      title: "WAN",
      icon: LuGlobe,
      component: WANStepComponent,
      isComplete: false,
      description: "Configure internet connection and VPN client settings",
      
      // Rich help content for WAN step
      helpData: {
        title: "WAN Configuration Guide",
        description: "Configure your internet connection, VPN client settings, and multi-WAN policies for optimal connectivity.",
        sections: [
          {
            title: "Internet Connection Types",
            content: "DHCP (automatic) is most common for home connections. Static IP is used when your ISP provides fixed IP addresses. PPPoE is common with DSL connections requiring username/password authentication.",
            type: "info" as const,
          },
          {
            title: "VPN Client Selection",
            content: "WireGuard offers the best performance and security for modern VPN connections. OpenVPN provides broad compatibility. L2TP/IPSec works well with mobile devices. Choose based on your VPN provider's support.",
            type: "tip" as const,
          },
          {
            title: "Multi-WAN Best Practices",
            content: "When using multiple internet connections, configure proper failover policies and load balancing rules. Test failover scenarios regularly to ensure redundancy works as expected.",
            type: "example" as const,
          },
          {
            title: "DNS Configuration",
            content: "Always configure backup DNS servers (like 1.1.1.1 or 8.8.8.8) to prevent connectivity issues if your primary DNS fails. Consider using DNS over HTTPS for enhanced privacy.",
            type: "warning" as const,
          },
        ],
        externalLinks: [
          {
            title: "MikroTik WAN Configuration",
            url: "https://help.mikrotik.com/docs/display/ROS/WAN",
          },
          {
            title: "VPN Client Setup Guide",
            url: "https://help.mikrotik.com/docs/display/ROS/VPN",
          }
        ]
      }
    },
    {
      id: 3,
      title: "LAN",
      icon: LuNetwork,
      component: LANStepComponent,
      isComplete: false,
      description: "Set up local network segments and wireless configuration",
      
      // Rich help content for LAN step
      helpData: {
        title: "LAN & Wireless Setup",
        description: "Configure your local network segments, wireless settings, and access policies for optimal security and performance.",
        sections: [
          {
            title: "Network Segmentation",
            content: "Split Network (192.168.10.0/24) is for general devices. Domestic Network (192.168.20.0/24) routes through domestic links. VPN Network (192.168.40.0/24) handles VPN server clients. This segmentation improves security and traffic management.",
            type: "info" as const,
          },
          {
            title: "Wireless Security Best Practices",
            content: "Always use WPA3 (or WPA2 if WPA3 isn't supported). Choose strong passwords with at least 12 characters including uppercase, lowercase, numbers, and symbols. Avoid personal information in SSIDs.",
            type: "tip" as const,
          },
          {
            title: "Guest Network Setup",
            content: "Create a separate guest network isolated from your main devices. Limit bandwidth and block access to local resources. Set automatic password rotation for enhanced security.",
            type: "example" as const,
          },
          {
            title: "Range and Interference",
            content: "Position your router centrally and away from interference sources like microwaves and baby monitors. Use WiFi analyzer tools to select the best channel for your environment.",
            type: "warning" as const,
          },
        ],
        externalLinks: [
          {
            title: "WiFi Security Guide",
            url: "https://help.mikrotik.com/docs/display/ROS/Wireless+Security",
          },
          {
            title: "VLAN Configuration",
            url: "https://help.mikrotik.com/docs/display/ROS/VLAN",
          }
        ]
      }
    },
    {
      id: 4,
      title: "Extra Config",
      icon: LuWrench,
      component: ExtraConfigComponent,
      isComplete: false,
      description: "Advanced features and gaming optimizations",
      
      // Rich help content for Extra Config step
      helpData: {
        title: "Advanced Features & Gaming",
        description: "Configure advanced features like gaming optimization, DDNS, and system maintenance for enhanced performance.",
        sections: [
          {
            title: "Gaming Optimization",
            content: "Gaming Mode prioritizes gaming traffic using QoS rules. Port forwarding automatically opens required ports for popular games. This reduces latency and improves online gaming experience.",
            type: "info" as const,
          },
          {
            title: "Dynamic DNS (DDNS)",
            content: "DDNS allows you to access your router remotely using a domain name even with changing IP addresses. Popular services include DynDNS, No-IP, and DuckDNS. Essential for remote management and VPN server access.",
            type: "tip" as const,
          },
          {
            title: "Scheduled Maintenance",
            content: "Auto-reboot can be scheduled weekly during low-usage hours (like 3 AM on Sundays) to clear memory and ensure optimal performance. Combine with automatic backups for reliability.",
            type: "example" as const,
          },
          {
            title: "Resource Monitoring",
            content: "Monitor CPU, memory, and disk usage regularly. High resource usage may indicate configuration issues or the need for hardware upgrade.",
            type: "warning" as const,
          },
        ],
        externalLinks: [
          {
            title: "QoS Configuration",
            url: "https://help.mikrotik.com/docs/display/ROS/QoS",
          },
          {
            title: "Gaming Setup Guide",
            url: "https://help.mikrotik.com/docs/display/ROS/Gaming+Setup",
          }
        ]
      }
    },
    {
      id: 5,
      title: "Show Config",
      icon: LuClipboardList,
      component: ShowConfigComponent,
      isComplete: false,
      description: "Review and download your router configuration",
      
      // Rich help content for Show Config step
      helpData: {
        title: "Configuration Review & Deployment",
        description: "Final step to review, download, and deploy your generated MikroTik router configuration.",
        sections: [
          {
            title: "Configuration Validation",
            content: "The generated script has been validated for syntax and compatibility with your selected router model. All commands are tested and verified to work correctly.",
            type: "info" as const,
          },
          {
            title: "Deployment Methods",
            content: "Copy the script to your router via WinBox, WebFig, or SSH terminal. You can paste the entire script at once, or execute section by section for better control and error checking.",
            type: "tip" as const,
          },
          {
            title: "Backup First!",
            content: "Always create a backup of your current configuration before applying new settings. Use /system backup save name=backup-before-config in terminal, or System > Backup in WinBox.",
            type: "warning" as const,
          },
          {
            title: "Post-Deployment Testing",
            content: "After applying the configuration, test all features: internet connectivity, WiFi access, VPN connections, and gaming performance. Document any issues for troubleshooting.",
            type: "example" as const,
          },
        ],
        externalLinks: [
          {
            title: "Configuration Deployment Guide",
            url: "https://help.mikrotik.com/docs/display/ROS/Configuration+Management",
          },
          {
            title: "Backup and Restore",
            url: "https://help.mikrotik.com/docs/display/ROS/Backup",
          },
          {
            title: "Troubleshooting Guide",
            url: "https://help.mikrotik.com/docs/display/ROS/Troubleshooting",
          }
        ]
      }
    }
  ];

  // Analytics event handlers
  const handleStepComplete$ = $((stepId: number) => {
    const event = {
      type: 'step_completed',
      stepId,
      timestamp: new Date().toISOString(),
      sessionId: analyticsStore.sessionId
    };
    analyticsStore.events.push(event);
    console.log(`✅ Step ${stepId} completed`, event);
  });

  const handleStepChange$ = $((stepId: number) => {
    activeStep.value = stepId - 1;
    const event = {
      type: 'step_navigated',
      stepId,
      timestamp: new Date().toISOString(),
      sessionId: analyticsStore.sessionId
    };
    analyticsStore.events.push(event);
    console.log(`📍 Navigated to step ${stepId}`, event);
  });

  const handleComplete$ = $(() => {
    completionMessage.value = '🎉 Configuration Generated Successfully! Your MikroTik router is ready for deployment.';
    const event = {
      type: 'wizard_completed',
      timestamp: new Date().toISOString(),
      sessionId: analyticsStore.sessionId,
      totalSteps: steps.length
    };
    analyticsStore.events.push(event);
    console.log('🎊 Configuration wizard completed!', event);
  });

  const handleHelpOpen$ = $((stepId: number) => {
    const event = {
      type: 'help_opened',
      stepId,
      timestamp: new Date().toISOString(),
      sessionId: analyticsStore.sessionId
    };
    analyticsStore.events.push(event);
    console.log(`❓ Help opened for step ${stepId}`, event);
  });

  const handleHelpClose$ = $((stepId: number) => {
    const event = {
      type: 'help_closed',
      stepId,
      timestamp: new Date().toISOString(),
      sessionId: analyticsStore.sessionId
    };
    analyticsStore.events.push(event);
    console.log(`✖️ Help closed for step ${stepId}`, event);
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Header */}
      <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div class="container mx-auto px-6 py-4">
          <div class="text-center">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent mb-2">
              MikroTik Router Configuration Wizard
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Generate professional router configurations with comprehensive help support
            </p>
            
            {/* Feature badges */}
            <div class="flex flex-wrap justify-center gap-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help System Enabled
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Press ? for Help
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Smart Assistance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {completionMessage.value && (
        <div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
          <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg border border-green-400">
            <div class="flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="font-medium">{completionMessage.value}</p>
            </div>
          </div>
        </div>
      )}

      {/* HStepper with Full Help System */}
      <HStepper
        steps={steps}
        activeStep={activeStep.value}
        onStepComplete$={handleStepComplete$}
        onStepChange$={handleStepChange$}
        onComplete$={handleComplete$}
        enableEnhancedFeatures={true}
        allowSkipSteps={false}
        
        // Enable comprehensive help system
        enableHelp={true}
        helpOptions={{
          enableKeyboardShortcuts: true,
          autoShowHelpOnFirstStep: false,
          helpKey: '?',
          onHelpOpen$: handleHelpOpen$,
          onHelpClose$: handleHelpClose$,
        }}
      />

      {/* Analytics Panel (Development Only) */}
      <div class="fixed bottom-4 right-4 max-w-sm">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </h4>
          <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>Session: {analyticsStore.sessionId}</div>
            <div>Events: {analyticsStore.events.length}</div>
            <div>Current Step: {activeStep.value + 1}/{steps.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
});