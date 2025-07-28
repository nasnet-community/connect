import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Stat,
  StatLabel,
  StatNumber,
  StatTrend,
  Tooltip,
  ProgressBar,
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
} from "../index";

/**
 * Comprehensive showcase of DataDisplay components in light and dark modes
 */
export const DarkModeShowcase = component$(() => {
  const isDarkMode = useSignal(false);
  const showLoader = useSignal(true);

  const toggleTheme = $(() => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark");
  });

  return (
    <div class={`min-h-screen ${isDarkMode.value ? "dark" : ""}`}>
      <div class="bg-gray-50 dark:bg-gray-900 p-6 space-y-8 transition-colors duration-300">
        {/* Header with theme toggle */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              Dark Mode Showcase
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Components optimized for both light and dark themes
            </p>
          </div>
          
          <button
            onClick$={toggleTheme}
            class="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDarkMode.value ? (
              <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg class="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Cards Section */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Cards & Surfaces</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default" elevation="sm">
              <CardHeader>
                <h3 class="font-medium text-gray-900 dark:text-white">Default Card</h3>
              </CardHeader>
              <CardBody>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Automatic color adaptation with smooth transitions between themes.
                </p>
              </CardBody>
              <CardFooter>
                <Badge color="primary">Light/Dark</Badge>
              </CardFooter>
            </Card>

            <Card variant="filled" elevation="md">
              <CardHeader>
                <h3 class="font-medium text-gray-900 dark:text-white">Filled Card</h3>
              </CardHeader>
              <CardBody>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Background fills adapt to provide proper contrast in both modes.
                </p>
              </CardBody>
              <CardFooter>
                <Badge color="secondary">Adaptive</Badge>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <h3 class="font-medium text-gray-900 dark:text-white">Outlined Card</h3>
              </CardHeader>
              <CardBody>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Border colors adjust for visibility in light and dark themes.
                </p>
              </CardBody>
              <CardFooter>
                <Badge color="success">Hoverable</Badge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Badges & Avatars */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Badges & Avatars</h2>
          
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <Badge color="primary">Primary</Badge>
              <Badge color="secondary">Secondary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="error">Error</Badge>
              <Badge color="info">Info</Badge>
              <Badge variant="outline" color="primary">Outline</Badge>
              <Badge variant="soft" color="secondary">Soft</Badge>
            </div>

            <div class="flex items-center gap-4">
              <AvatarGroup size="md" max={4}>
                <Avatar src="/api/placeholder/40/40" alt="User 1" />
                <Avatar src="/api/placeholder/40/40" alt="User 2" />
                <Avatar src="/api/placeholder/40/40" alt="User 3" />
                <Avatar src="/api/placeholder/40/40" alt="User 4" />
                <Avatar src="/api/placeholder/40/40" alt="User 5" />
              </AvatarGroup>
              
              <div class="flex gap-2">
                <Avatar 
                  initials="JD" 
                  size="lg" 
                  status="online"
                  statusPosition="bottom-right"
                />
                <Avatar 
                  initials="AS" 
                  size="lg" 
                  status="away"
                  statusPosition="bottom-right"
                />
                <Avatar 
                  initials="MK" 
                  size="lg" 
                  status="offline"
                  statusPosition="bottom-right"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Statistics</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Stat>
              <StatLabel>Total Users</StatLabel>
              <StatNumber value="1,234" />
              <StatTrend value={12.5} />
            </Stat>
            
            <Stat>
              <StatLabel>Revenue</StatLabel>
              <StatNumber value="$45,678" />
              <StatTrend value={-3.2} />
            </Stat>
            
            <Stat>
              <StatLabel>Active Sessions</StatLabel>
              <StatNumber value="892" />
              <StatTrend value={0} />
            </Stat>
            
            <Stat>
              <StatLabel>Completion Rate</StatLabel>
              <StatNumber value="98.2%" />
              <StatTrend value={5.7} />
            </Stat>
          </div>
        </section>

        {/* Progress & Loading */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Progress & Loading</h2>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <ProgressBar value={75} color="primary" label="Primary Progress" />
              <ProgressBar value={50} color="secondary" label="Secondary Progress" />
              <ProgressBar value={90} color="success" label="Success Progress" />
              <ProgressBar value={30} color="warning" size="sm" />
              <ProgressBar value={60} color="error" size="lg" animation="striped-animated" />
            </div>

            <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <Spinner size="sm" color="primary" />
              <Spinner size="md" color="secondary" variant="dots" />
              <Spinner size="lg" color="success" variant="bars" />
              <Spinner size="xl" color="info" variant="circle" />
            </div>

            <button
              onClick$={() => showLoader.value = !showLoader.value}
              class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Toggle Skeleton
            </button>

            {showLoader.value && (
              <div class="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-3">
                  <SkeletonAvatar size="lg" />
                  <div class="flex-1 space-y-2">
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="80%" />
                  </div>
                </div>
                <SkeletonText lines={3} />
                <Skeleton variant="rounded" width="100%" height={200} />
              </div>
            )}
          </div>
        </section>

        {/* Interactive Components */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Interactive Elements</h2>
          
          <Accordion type="single" collapsible variant="bordered">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span class="text-gray-900 dark:text-white">Theme Adaptation</span>
              </AccordionTrigger>
              <AccordionContent>
                <p class="text-gray-600 dark:text-gray-400">
                  All components automatically adapt their colors, shadows, and borders
                  to provide optimal contrast and readability in both light and dark modes.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span class="text-gray-900 dark:text-white">Color Palette</span>
              </AccordionTrigger>
              <AccordionContent>
                <p class="text-gray-600 dark:text-gray-400">
                  The color system includes carefully selected shades that maintain
                  WCAG AA compliance for accessibility in both themes.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span class="text-gray-900 dark:text-white">Smooth Transitions</span>
              </AccordionTrigger>
              <AccordionContent>
                <p class="text-gray-600 dark:text-gray-400">
                  Theme changes include smooth color transitions to prevent jarring
                  visual changes when switching between light and dark modes.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div class="flex items-center gap-4">
            <Tooltip content="Tooltips adapt to theme colors" placement="top">
              <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                Hover for tooltip
              </button>
            </Tooltip>
            
            <Tooltip content="Custom colored tooltip" placement="top" color="primary">
              <button class="px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-700 dark:text-primary-300">
                Primary tooltip
              </button>
            </Tooltip>
          </div>
        </section>

        {/* Theme Features */}
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Theme Features</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
              <h3 class="font-medium text-gray-900 dark:text-white">Automatic Adaptation</h3>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ Background colors adjust for proper contrast</li>
                <li>✓ Text colors maintain readability</li>
                <li>✓ Border colors adapt to theme</li>
                <li>✓ Shadow intensity adjusts appropriately</li>
              </ul>
            </div>
            
            <div class="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
              <h3 class="font-medium text-gray-900 dark:text-white">Accessibility</h3>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>✓ WCAG AA compliant color contrast</li>
                <li>✓ Reduced motion support</li>
                <li>✓ High contrast mode compatible</li>
                <li>✓ Screen reader optimized</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});