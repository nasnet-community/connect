import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { TopNavigation } from './index';
import { TopNavigationProps } from './TopNavigation.types';
import { useSignal } from '@builder.io/qwik';
import { 
  HiHomeOutline, 
  HiUserOutline, 
  HiCogOutline, 
  HiDocumentOutline,
  HiQuestionMarkCircleOutline,
  HiShieldCheckOutline,
  HiEnvelopeOutline,
  HiChartBarOutline,
  HiSunOutline,
  HiMoonOutline,
  HiBellOutline,
  HiMagnifyingGlassOutline
} from '@qwikest/icons/heroicons';

const meta: Meta<typeof TopNavigation> = {
  title: 'Core/Navigation/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
  argTypes: {
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'filled'],
      defaultValue: 'default'
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
      defaultValue: 'static'
    },
    mobileMenuEnabled: { control: 'boolean', defaultValue: true },
    isMobileMenuOpen: { control: 'boolean', defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

// Sample navigation items
const sampleItems = [
  {
    label: 'Home',
    href: '/home',
    icon: <HiHomeOutline />,
    isActive: true,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <HiChartBarOutline />,
  },
  {
    label: 'Documentation',
    href: '/docs',
    icon: <HiDocumentOutline />,
  },
  {
    label: 'Settings',
    icon: <HiCogOutline />,
    items: [
      {
        label: 'Profile',
        href: '/settings/profile',
        icon: <HiUserOutline />,
      },
      {
        label: 'Security',
        href: '/settings/security',
        icon: <HiShieldCheckOutline />,
      },
      {
        label: 'Notifications',
        href: '/settings/notifications',
        icon: <HiBellOutline />,
      },
    ],
  },
  {
    label: 'Help',
    href: '/help',
    icon: <HiQuestionMarkCircleOutline />,
  },
];

// Sample Logo
const SampleLogo = component$(() => (
  <div class="flex items-center">
    <div class="h-8 w-8 rounded-md bg-primary-500 flex items-center justify-center text-white mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    </div>
    <span class="text-lg font-semibold text-gray-900 dark:text-white">Connect</span>
  </div>
));

// Basic navigation
export const Basic: Story = {
  args: {
    items: sampleItems,
    logo: <SampleLogo />,
    logoHref: '/',
    size: 'md',
    variant: 'default',
    position: 'static',
  },
  render: (args: TopNavigationProps) => (
    <div class="w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <TopNavigation {...args} />
      <div class="max-w-7xl mx-auto p-6">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Home Page</h1>
        <p class="text-gray-700 dark:text-gray-300">
          This is a basic example of the TopNavigation component. Try resizing your browser to see the responsive behavior.
        </p>
      </div>
    </div>
  ),
};

// Size variants
export const SizeVariants: Story = {
  render: component$(() => (
    <div class="space-y-8 bg-gray-50 dark:bg-gray-900 p-4">
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Small Size</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          size="sm"
        />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Medium Size (Default)</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          size="md"
        />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Large Size</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          size="lg"
        />
      </div>
    </div>
  )),
};

// Style variants
export const StyleVariants: Story = {
  render: component$(() => (
    <div class="space-y-8 bg-gray-50 dark:bg-gray-900 p-4">
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Default Style</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          variant="default"
        />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Minimal Style</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          variant="minimal"
        />
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Filled Style</h3>
        <TopNavigation
          items={sampleItems.slice(0, 4)}
          logo={<SampleLogo />}
          variant="filled"
        />
      </div>
    </div>
  )),
};

// Position variants
export const PositionVariants: Story = {
  render: component$(() => (
    <div class="space-y-16 bg-gray-50 dark:bg-gray-900 p-4">
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Static Position (Default)</h3>
        <TopNavigation
          items={sampleItems.slice(0, 3)}
          logo={<SampleLogo />}
          position="static"
        />
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded mt-2">
          <p class="text-gray-700 dark:text-gray-300">
            Static positioning: The navigation bar stays in the normal document flow.
          </p>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Sticky Position</h3>
        <p class="mb-2 text-gray-700 dark:text-gray-300">
          Sticky positioning: The navigation bar will stick to the top when scrolling.
          This is useful for main navigation that should always be accessible.
        </p>
        <div class="h-80 border border-gray-200 dark:border-gray-700 rounded overflow-auto relative">
          <TopNavigation
            items={sampleItems.slice(0, 3)}
            logo={<SampleLogo />}
            position="sticky"
          />
          <div class="p-4">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Scroll down to see sticky behavior</h4>
            {Array(10).fill(0).map((_, i) => (
              <p key={i} class="mb-6 text-gray-700 dark:text-gray-300">
                Content block {i + 1}. Scroll to see the sticky navigation bar in action.
                The navigation bar will stick to the top of its container when you scroll down.
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Fixed Position</h3>
        <p class="mb-2 text-gray-700 dark:text-gray-300">
          Fixed positioning: The navigation bar is fixed to the viewport and doesn't move when scrolling.
          This is typically used for global navigation in single-page applications.
        </p>
        <div class="h-80 border border-gray-200 dark:border-gray-700 rounded overflow-auto relative">
          <div class="h-16">
            {/* Placeholder for the fixed nav height */}
          </div>
          <TopNavigation
            items={sampleItems.slice(0, 3)}
            logo={<SampleLogo />}
            position="fixed"
            class="w-[calc(100%-2rem)]"
          />
          <div class="p-4">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Scroll down to see fixed behavior</h4>
            {Array(10).fill(0).map((_, i) => (
              <p key={i} class="mb-6 text-gray-700 dark:text-gray-300">
                Content block {i + 1}. The fixed navigation bar remains at the top of the viewport
                regardless of scrolling position, making it always accessible.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )),
};

// With right content
export const WithRightContent: Story = {
  render: component$(() => {
    const isDarkMode = useSignal(false);
    
    return (
      <div class="w-full bg-gray-50 dark:bg-gray-900">
        <TopNavigation
          items={sampleItems.slice(0, 3)}
          logo={<SampleLogo />}
          rightContent={
            <div class="flex items-center space-x-4">
              <button 
                type="button" 
                class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Search"
              >
                <HiMagnifyingGlassOutline class="w-5 h-5" />
              </button>
              
              <button 
                type="button" 
                class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Notifications"
              >
                <HiBellOutline class="w-5 h-5" />
              </button>
              
              <button 
                type="button" 
                class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme" 
                onClick$={() => {
                  isDarkMode.value = !isDarkMode.value;
                }}
              >
                {isDarkMode.value 
                  ? <HiSunOutline class="w-5 h-5" /> 
                  : <HiMoonOutline class="w-5 h-5" />
                }
              </button>
              
              <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-800 dark:text-primary-300">
                <span class="font-medium">JD</span>
              </div>
            </div>
          }
        />
        <div class="max-w-7xl mx-auto p-6">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard</h1>
          <p class="text-gray-700 dark:text-gray-300">
            This example shows how to add custom content to the right side of the navigation bar.
          </p>
        </div>
      </div>
    );
  }),
};

// Mobile menu
export const MobileMenu: Story = {
  render: component$(() => {
    const isMobileMenuOpen = useSignal(false);
    
    return (
      <div class="w-full bg-gray-50 dark:bg-gray-900">
        <TopNavigation
          items={sampleItems}
          logo={<SampleLogo />}
          mobileMenuEnabled={true}
          isMobileMenuOpen={isMobileMenuOpen.value}
          onMobileMenuToggle$={(isOpen) => {
            isMobileMenuOpen.value = isOpen;
          }}
        />
        <div class="max-w-7xl mx-auto p-6">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Mobile Menu Example</h1>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Resize your browser to see the mobile menu button appear on small screens. Click the button to toggle the mobile menu.
          </p>
          <div class="md:hidden">
            <button
              type="button"
              class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
              onClick$={() => {
                isMobileMenuOpen.value = !isMobileMenuOpen.value;
              }}
            >
              {isMobileMenuOpen.value ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
        </div>
      </div>
    );
  }),
};

// In context (page header)
export const InContext: Story = {
  render: component$(() => {
    const notifications = [
      { id: 1, text: 'Your profile has been updated', read: false },
      { id: 2, text: 'New message from John Doe', read: false },
      { id: 3, text: 'You have a new task assigned', read: true },
    ];
    
    const showNotifications = useSignal(false);
    
    const appItems = [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <HiChartBarOutline />,
        isActive: true,
      },
      {
        label: 'Analytics',
        href: '/analytics',
        icon: <HiChartBarOutline />,
      },
      {
        label: 'Projects',
        href: '/projects',
        icon: <HiDocumentOutline />,
        items: [
          {
            label: 'Current',
            href: '/projects/current',
          },
          {
            label: 'Archived',
            href: '/projects/archived',
          },
          {
            label: 'Upcoming',
            href: '/projects/upcoming',
          },
        ],
      },
      {
        label: 'Messages',
        href: '/messages',
        icon: <HiEnvelopeOutline />,
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: <HiCogOutline />,
      },
    ];
    
    return (
      <div class="w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
        <TopNavigation
          items={appItems}
          logo={<SampleLogo />}
          position="sticky"
          rightContent={
            <div class="flex items-center space-x-4">
              <div class="relative">
                <button
                  type="button"
                  class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Notifications"
                  onClick$={() => {
                    showNotifications.value = !showNotifications.value;
                  }}
                >
                  <div class="relative">
                    <HiBellOutline class="w-5 h-5" />
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      2
                    </span>
                  </div>
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications.value && (
                  <div class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                      <button class="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                        Mark all as read
                      </button>
                    </div>
                    <div class="max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          class={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'}`}
                        >
                          <div class="flex items-start">
                            <div class={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notification.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary-500'}`} />
                            <div class="ml-3">
                              <p class="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a href="/notifications" class="text-xs text-primary-600 dark:text-primary-400 hover:underline block text-center">
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div class="relative group">
                <button class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <span class="font-medium">JD</span>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:block">
                    John Doe
                  </span>
                </button>
              </div>
            </div>
          }
        />
        
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p class="text-gray-700 dark:text-gray-300">
              Welcome back, John! Here's an overview of your projects and activities.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status cards */}
            {[
              { title: 'Active Projects', value: '12', color: 'bg-blue-500' },
              { title: 'Tasks Completed', value: '48', color: 'bg-green-500' },
              { title: 'Pending Reviews', value: '5', color: 'bg-yellow-500' },
            ].map((card, i) => (
              <div key={i} class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center">
                  <div class={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center text-white mb-4`}>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                    </svg>
                  </div>
                </div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{card.value}</h2>
                <p class="text-gray-600 dark:text-gray-400">{card.title}</p>
              </div>
            ))}
          </div>
          
          <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
            <div class="space-y-4">
              {[
                { user: 'You', action: 'completed task', target: 'Update dashboard UI', time: '2 hours ago' },
                { user: 'Sarah', action: 'commented on', target: 'Project XYZ proposal', time: '4 hours ago' },
                { user: 'Michael', action: 'assigned you to', target: 'Review marketing materials', time: '1 day ago' },
                { user: 'You', action: 'created document', target: 'Q2 Strategy', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} class="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                  <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div class="ml-4">
                    <p class="text-sm text-gray-800 dark:text-gray-200">
                      <span class="font-medium">{activity.user}</span> {activity.action} <span class="font-medium">{activity.target}</span>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }),
};

// RTL Support
export const RTLSupport: Story = {
  render: component$(() => (
    <div dir="rtl" class="bg-gray-50 dark:bg-gray-900 p-4">
      <TopNavigation
        items={[
          {
            label: 'الرئيسية',
            href: '/home',
            icon: <HiHomeOutline />,
            isActive: true,
          },
          {
            label: 'لوحة المعلومات',
            href: '/dashboard',
            icon: <HiChartBarOutline />,
          },
          {
            label: 'التوثيق',
            href: '/docs',
            icon: <HiDocumentOutline />,
          },
          {
            label: 'الإعدادات',
            icon: <HiCogOutline />,
            items: [
              {
                label: 'الملف الشخصي',
                href: '/settings/profile',
                icon: <HiUserOutline />,
              },
              {
                label: 'الأمان',
                href: '/settings/security',
                icon: <HiShieldCheckOutline />,
              },
            ],
          },
        ]}
        logo={<SampleLogo />}
      />
      <div class="p-6 max-w-7xl mx-auto">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">دعم RTL</h1>
        <p class="text-gray-700 dark:text-gray-300">
          يعرض هذا المثال كيف يمكن استخدام المكون مع اللغات التي تُكتب من اليمين إلى اليسار، مثل العربية والعبرية والفارسية.
        </p>
      </div>
    </div>
  )),
};
