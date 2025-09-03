import { component$, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { 
  CodeBlock,
  AspectRatio,
  Button,
  TimePicker,
  Alert,
  FrequencySelector
} from "~/components/Core";
import type { FrequencyValue } from "~/components/Core/DataDisplay/FrequencySelector/FrequencySelector.types";
import type { TimeValue } from "~/components/Core/TimePicker/Timepicker";
import { 
  LuGlobe, 
  LuShield, 
  LuRefreshCw,
  LuTerminal,
  LuPlayCircle,
  LuCheckCircle,
  LuClock,
  LuZap,
  LuLock,
  LuActivity,
  LuSettings,
  LuWifiOff
} from "@qwikest/icons/lucide";
import { generateDomesticIPScript } from "~/components/Star/ConfigGenerator/Extra/DomesticIPS";
import { formatRouterConfig } from "~/components/Star/ConfigGenerator/utils/ScriptSchedule";

export default component$(() => {
  // State management
  const scheduledTime = useSignal({ hour: "00", minute: "00" });
  const scheduledInterval = useSignal<FrequencyValue>("Daily");
  const showDisconnectionAlert = useSignal(true);
  const showScript = useSignal(false);
  
  const handleTimeChange$ = $((type: keyof TimeValue, value: string) => {
    if (type === "hour" || type === "minute") {
      scheduledTime.value = { ...scheduledTime.value, [type]: value };
    }
  });

  const handleIntervalChange$ = $((value: FrequencyValue) => {
    scheduledInterval.value = value;
  });

  // Generate MikroTik script based on scheduled time and interval
  const mikrotikScript = useComputed$(() => {
    const time = `${scheduledTime.value.hour.padStart(2, '0')}:${scheduledTime.value.minute.padStart(2, '0')}`;
    const scriptConfig = generateDomesticIPScript(time, scheduledInterval.value);
    
    // Add firewall mangle commands before the main script
    const mangleCommands = `/ip firewall mangle
add action=mark-routing chain=output comment="S4I Route" dst-address-list=!LOCAL-IP dst-port=443,80 new-routing-mark=to-SL passthrough=no protocol=tcp src-address=192.168.30.1

`;
    
    // Format the generated script for display
    const formattedScript = formatRouterConfig(scriptConfig, {
      escapeForScript: false,
      commandLineContinuation: true
    });
    
    return mangleCommands + formattedScript;
  });

  const features = [
    {
      iconName: "refresh",
      title: $localize`Auto-Update`,
      description: $localize`Automatically sync IP lists from remote sources`
    },
    {
      iconName: "shield",
      title: $localize`Enhanced Security`,
      description: $localize`Maintain current threat intelligence data`
    },
    {
      iconName: "globe",
      title: $localize`Geo-Based Control`,
      description: $localize`Route traffic based on geographic regions`
    },
    {
      iconName: "zap",
      title: $localize`High Performance`,
      description: $localize`Optimized for fast routing decisions`
    }
  ];

  const benefits = [
    {
      iconName: "activity",
      text: $localize`Real-time IP address list updates`
    },
    {
      iconName: "lock",
      text: $localize`Centralized security management`
    },
    {
      iconName: "settings",
      text: $localize`Reduced manual configuration`
    }
  ];

  const steps = [
    {
      number: "01",
      title: $localize`Access Router`,
      description: $localize`Connect via WinBox, WebFig, or SSH terminal`
    },
    {
      number: "02", 
      title: $localize`Copy Script`,
      description: $localize`Click the copy button to get the script`
    },
    {
      number: "03",
      title: $localize`Open Terminal`,
      description: $localize`Navigate to terminal in your router interface`
    },
    {
      number: "04",
      title: $localize`Execute`,
      description: $localize`Paste and run the script`
    },
    {
      number: "05",
      title: $localize`Schedule (Optional)`,
      description: $localize`Set up automatic daily updates`
    }
  ];

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-yellow-500/5 dark:to-blue-500/5" />
        <div class="absolute inset-0 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div class="container mx-auto px-4 py-24 relative">
          <div class="text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-yellow-500/20 dark:to-blue-500/20 dark:bg-slate-800/50 backdrop-blur-xl dark:shadow-2xl transition-all duration-300 hover:scale-110 dark:hover:shadow-yellow-500/20">
              <LuGlobe class="w-10 h-10 text-primary-500 dark:text-yellow-400" />
            </div>
            
            <h1 class="mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-yellow-400 dark:to-blue-400 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-bold text-transparent">
              {$localize`Remote Address List`}
            </h1>
            
            <p class="text-lg md:text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              {$localize`Automatically sync and manage IP address lists from remote sources for enhanced network control and security`}
            </p>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 pb-16 pt-16">
        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.title}
              class="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:hover:bg-slate-800/70 dark:hover:border-yellow-500/50 dark:hover:shadow-2xl dark:hover:shadow-yellow-500/10"
            >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-yellow-500/5 dark:to-blue-500/5" />
              
              <div class="relative">
                <div class="mb-4 w-fit rounded-xl bg-primary-500/10 p-3 transition-all duration-300 group-hover:scale-110 dark:bg-slate-700/50 dark:border dark:border-slate-600/50 dark:group-hover:border-yellow-500/30">
                  {feature.iconName === "refresh" && <LuRefreshCw class="w-6 h-6 text-primary-500 dark:text-yellow-400" />}
                  {feature.iconName === "shield" && <LuShield class="w-6 h-6 text-primary-500 dark:text-emerald-400" />}
                  {feature.iconName === "globe" && <LuGlobe class="w-6 h-6 text-primary-500 dark:text-blue-400" />}
                  {feature.iconName === "zap" && <LuZap class="w-6 h-6 text-primary-500 dark:text-amber-400" />}
                </div>
                
                <h3 class="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary-500 dark:text-slate-100 dark:group-hover:text-yellow-400">
                  {feature.title}
                </h3>
                
                <p class="text-sm text-gray-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Script Section - Takes 2 columns */}
          <div class="lg:col-span-2">
            <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden dark:border-slate-700/50 dark:bg-slate-900/90 dark:shadow-2xl">
              <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-850">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:bg-emerald-500/10 dark:border dark:border-emerald-500/30 flex items-center justify-center">
                      <LuTerminal class="w-5 h-5 text-primary-500 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        {$localize`RouterOS Script`}
                      </h2>
                      <p class="text-sm text-gray-600 dark:text-slate-400">
                        {$localize`Configure daily execution time and generate script`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                {!showScript.value ? (
                  <div class="space-y-6">
                    <div class="p-6 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                      <label class="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-3">
                        {$localize`Daily Execution Time (24-hour format)`}
                      </label>
                      <TimePicker
                        time={scheduledTime.value}
                        onChange$={handleTimeChange$}
                        format="24"
                        showSeconds={false}
                        size="lg"
                        variant="filled"
                        placeholder={{
                          hour: "HH",
                          minute: "MM"
                        }}
                      />
                      <p class="mt-3 text-sm text-gray-600 dark:text-slate-400">
                        {$localize`The script will run automatically`} <span class="font-medium text-primary-500 dark:text-yellow-400">{scheduledInterval.value.toLowerCase()}</span> {$localize`at`} <span class="font-medium text-primary-500 dark:text-yellow-400">{scheduledTime.value.hour.padStart(2, '0')}:{scheduledTime.value.minute.padStart(2, '0')}</span>
                      </p>
                    </div>

                    <div class="p-6 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50">
                      <FrequencySelector
                        value={scheduledInterval.value}
                        onChange$={handleIntervalChange$}
                        label={$localize`Update Frequency`}
                        recommendedOption="Daily"
                      />
                      <p class="mt-3 text-sm text-gray-600 dark:text-slate-400">
                        {$localize`The script will run`} <span class="font-medium text-primary-500 dark:text-yellow-400">{scheduledInterval.value.toLowerCase()}</span> {$localize`at the specified time`}
                      </p>
                    </div>
                    
                    <div class="flex justify-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick$={() => { showScript.value = true }}
                        class="min-w-[200px]"
                      >
                        <LuPlayCircle class="w-5 h-5 mr-2" />
                        {$localize`Generate Script`}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-3 rounded-lg bg-success-500/10 dark:bg-emerald-500/10 border border-success-500/20 dark:border-emerald-500/30">
                      <div class="flex items-center gap-2">
                        <LuCheckCircle class="w-5 h-5 text-success-500 dark:text-emerald-400" />
                        <span class="text-sm font-medium text-success-600 dark:text-emerald-300">
                          {$localize`Script generated for`} {scheduledInterval.value.toLowerCase()} {$localize`execution at`} {scheduledTime.value.hour.padStart(2, '0')}:{scheduledTime.value.minute.padStart(2, '0')}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick$={() => { showScript.value = false }}
                        class="hover:bg-primary-500/10"
                      >
                        <LuRefreshCw class="w-4 h-4 mr-2" />
                        {$localize`Change Time`}
                      </Button>
                    </div>
                    
                    <CodeBlock
                      code={mikrotikScript.value}
                      language="bash"
                      showLineNumbers={true}
                      copyButton={true}
                      theme="auto"
                      wrap={true}
                      maxHeight="400px"
                      borderRadius="lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits Section - Takes 1 column */}
          <div class="lg:col-span-1">
            <div class="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl p-6 h-full transition-all duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:hover:bg-slate-800/70 dark:shadow-2xl dark:shadow-blue-500/10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-success-500/10 to-success-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20 flex items-center justify-center">
                  <LuCheckCircle class="w-5 h-5 text-success-500 dark:text-emerald-400" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  {$localize`Key Benefits`}
                </h3>
              </div>
              
              <div class="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.text} class="flex items-start gap-3 group">
                    <div class="mt-1 w-8 h-8 rounded-lg bg-primary-500/10 dark:bg-slate-700/50 dark:border dark:border-slate-600/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 dark:group-hover:border-yellow-500/30">
                      {benefit.iconName === "activity" && <LuActivity class="w-4 h-4 text-primary-500 dark:text-yellow-400" />}
                      {benefit.iconName === "lock" && <LuLock class="w-4 h-4 text-primary-500 dark:text-blue-400" />}
                      {benefit.iconName === "settings" && <LuSettings class="w-4 h-4 text-primary-500 dark:text-amber-400" />}
                    </div>
                    <p class="text-gray-600 dark:text-slate-300">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              <div class="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-yellow-500/10 dark:to-blue-500/10 dark:bg-slate-700/30 border border-primary-500/20 dark:border-yellow-500/30">
                <div class="flex items-center gap-2 mb-2">
                  <LuClock class="w-4 h-4 text-primary-500 dark:text-yellow-400" />
                  <span class="text-sm font-medium text-primary-500 dark:text-yellow-400">{$localize`Pro Tip`}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-slate-400">
                  {$localize`Schedule this script to run`} {scheduledInterval.value.toLowerCase()} {$localize`for automatic IP list updates`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disconnection Warning Alert */}
        {showDisconnectionAlert.value && (
          <Alert 
            status="warning" 
            variant="solid"
            dismissible={true}
            onDismiss$={() => { showDisconnectionAlert.value = false }}
            class="mb-8 dark:!bg-amber-900/50 dark:!border-amber-700/50 dark:backdrop-blur-xl dark:shadow-2xl dark:shadow-amber-500/10"
          >
            <div class="space-y-2">
              <div class="font-semibold flex items-center gap-2 dark:text-amber-100">
                <LuWifiOff class="w-4 h-4 dark:text-amber-300" />
                {$localize`Internet Connection Will Be Temporarily Interrupted`}
              </div>
              <p class="text-sm dark:text-amber-100">
                {$localize`When this script runs, your internet connection will be disconnected for approximately`}
                <span class="font-semibold dark:text-amber-200"> {$localize`5-10 Minutes`}</span> {$localize`while the router updates its address lists and reconfigures routing rules.`}
              </p>
              <p class="text-xs opacity-90 dark:text-amber-200">
                {$localize`Plan accordingly and avoid scheduling during critical operations or video calls.`}
              </p>
            </div>
          </Alert>
        )}

        {/* Installation Steps */}
        <div class="rounded-2xl border border-gray-200 bg-white backdrop-blur-xl p-8 mb-16 dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:shadow-2xl">
          <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-yellow-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">
              {$localize`Quick Installation Guide`}
            </h2>
            <p class="text-gray-600 dark:text-slate-300">
              {$localize`Follow these simple steps to deploy the script on your MikroTik router`}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} class="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div class="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-primary-500/20 to-transparent dark:from-blue-500/30 dark:via-purple-500/20 dark:to-transparent -translate-x-1/2" />
                )}
                
                <div class="text-center">
                  <div class="mb-4 mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-yellow-500/10 dark:to-blue-500/10 dark:bg-slate-700/50 dark:border dark:border-slate-600/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 dark:group-hover:border-yellow-500/30 dark:group-hover:shadow-lg dark:group-hover:shadow-yellow-500/20">
                    <span class="text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-yellow-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                  
                  <h4 class="font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    {step.title}
                  </h4>
                  
                  <p class="text-sm text-gray-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="rounded-2xl border border-gray-200 bg-white backdrop-blur-xl p-8 dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:shadow-xl">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
              {$localize`Common Use Cases`}
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 dark:bg-yellow-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Block or allow traffic from specific countries`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 dark:bg-yellow-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Route traffic through different WAN connections`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 dark:bg-yellow-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Implement dynamic firewall rules`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-primary-500 dark:bg-yellow-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Manage VPN access control lists`}
                </span>
              </li>
            </ul>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white backdrop-blur-xl p-8 dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:shadow-xl">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
              {$localize`Requirements`}
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 dark:bg-blue-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`MikroTik RouterOS v6.45 or higher`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 dark:bg-blue-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Active internet connection for updates`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 dark:bg-blue-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Administrator access to router`}
                </span>
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1 w-2 h-2 rounded-full bg-secondary-500 dark:bg-blue-400 flex-shrink-0" />
                <span class="text-gray-600 dark:text-slate-300">
                  {$localize`Basic knowledge of RouterOS terminal`}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <div class="rounded-2xl border border-gray-200 bg-white backdrop-blur-xl overflow-hidden dark:border-slate-700/50 dark:bg-slate-800/50 dark:backdrop-blur-xl dark:shadow-2xl">
          <div class="px-8 py-6 border-b border-gray-200 dark:border-slate-700/50 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 dark:from-yellow-500/5 dark:to-blue-500/5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-purple-500/20 dark:to-pink-500/20 dark:bg-slate-700/50 flex items-center justify-center">
                <LuPlayCircle class="w-5 h-5 text-primary-500 dark:text-purple-400" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  {$localize`Video Tutorial`}
                </h2>
                <p class="text-sm text-gray-600 dark:text-slate-300">
                  {$localize`Watch our comprehensive setup guide`}
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <AspectRatio ratio="video" maxWidth="100%">
              <div class="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 rounded-xl">
                <div class="text-center">
                  <div class="mb-4 mx-auto w-20 h-20 rounded-full bg-white/80 dark:bg-slate-700/50 dark:border dark:border-purple-500/20 flex items-center justify-center shadow-lg dark:shadow-2xl dark:shadow-purple-500/10">
                    <LuPlayCircle class="w-10 h-10 text-primary-500 dark:text-purple-400" />
                  </div>
                  <p class="text-lg font-medium text-gray-600 dark:text-slate-100 mb-2">
                    {$localize`Video Tutorial Coming Soon`}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-slate-400">
                    {$localize`Complete walkthrough will be available here`}
                  </p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
});