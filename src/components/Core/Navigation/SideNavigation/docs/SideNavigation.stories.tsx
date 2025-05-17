import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { SideNavigation } from './index';
import { SideNavigationProps } from './SideNavigation.types';
import { useSignal } from '@builder.io/qwik';
import { 
  HiHomeOutline, 
  HiUserOutline, 
  HiCogOutline, 
  HiDocumentOutline,
  HiQuestionMarkCircleOutline,
  HiShieldCheckOutline,
  HiServerOutline,
  HiChartBarOutline,
  HiEnvelopeOutline, // Updated from HiMailOutline
  HiPhotoOutline, // Updated from HiPhotographOutline
  HiLockClosedOutline
} from '@qwikest/icons/heroicons';

const meta: Meta<typeof SideNavigation> = {
  title: 'Core/Navigation/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  argTypes: {
    isCollapsed: { control: 'boolean', defaultValue: false },
    isCollapsible: { control: 'boolean', defaultValue: true },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'minimal'],
      defaultValue: 'default'
    },
    title: { control: 'text' },
    isMobileModal: { control: 'boolean', defaultValue: false },
    isMobileOpen: { control: 'boolean', defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof SideNavigation>;

// Sample navigation items
const sampleItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <HiHomeOutline />,
    isActive: true,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: <HiUserOutline />,
  },
  {
    label: 'Settings',
    icon: <HiCogOutline />,
    items: [
      {
        label: 'Account',
        href: '/settings/account',
      },
      {
        label: 'Security',
        href: '/settings/security',
        icon: <HiShieldCheckOutline />,
      },
      {
        label: 'Notifications',
        href: '/settings/notifications',
      },
    ],
    isExpanded: true,
  },
  {
    label: 'Reports',
    icon: <HiChartBarOutline />,
    items: [
      {
        label: 'Analytics',
        href: '/reports/analytics',
      },
      {
        label: 'Exports',
        href: '/reports/exports',
      },
      {
        label: 'Integration',
        href: '/reports/integration',
        isDisabled: true,
      },
    ],
  },
  {
    label: 'Documentation',
    href: '/docs',
    icon: <HiDocumentOutline />,
  },
  {
    label: 'Help',
    href: '/help',
    icon: <HiQuestionMarkCircleOutline />,
    badge: <span class="bg-primary-100 text-primary-800 rounded-full px-2 py-0.5 dark:bg-primary-900 dark:text-primary-300">New</span>,
  },
];

// Sample navigation items with many nested levels
const nestedItems = [
  {
    label: 'Infrastructure',
    icon: <HiServerOutline />,
    isExpanded: true,
    items: [
      {
        label: 'Networks',
        href: '/infrastructure/networks',
        isExpanded: true,
        items: [
          {
            label: 'VPNs',
            href: '/infrastructure/networks/vpns',
          },
          {
            label: 'Subnets',
            href: '/infrastructure/networks/subnets',
          },
        ],
      },
      {
        label: 'Servers',
        href: '/infrastructure/servers',
        isExpanded: true,
        items: [
          {
            label: 'Virtual Machines',
            href: '/infrastructure/servers/vms',
            isActive: true,
          },
          {
            label: 'Containers',
            href: '/infrastructure/servers/containers',
          },
        ],
      },
      {
        label: 'Storage',
        href: '/infrastructure/storage',
      },
    ],
  },
  {
    label: 'Security',
    icon: <HiLockClosedOutline />,
    items: [
      {
        label: 'Access Control',
        href: '/security/access',
      },
      {
        label: 'Auditing',
        href: '/security/auditing',
      },
    ],
  },
];

// Basic example
export const Basic: Story = {
  args: {
    items: sampleItems,
    title: 'Navigation',
  },
  render: (args: SideNavigationProps) => {
    return (
      <div class="h-[600px] flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <SideNavigation {...args} />
        <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Main Content Area</h2>
            <p class="text-gray-600 dark:text-gray-400">Selected content would appear here</p>
          </div>
        </div>
      </div>
    );
  },
};

// Size variants
export const SizeVariants: Story = {
  render: component$(() => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Small Size</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Small Nav"
              size="sm"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Medium Size (Default)</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Medium Nav"
              size="md"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Large Size</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Large Nav"
              size="lg"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
      </div>
    );
  }),
};

// Style variants
export const StyleVariants: Story = {
  render: component$(() => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Default Style</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Default Style"
              variant="default"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Bordered Style</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Bordered Style"
              variant="bordered"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Minimal Style</h3>
          <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[400px] flex overflow-hidden">
            <SideNavigation
              items={sampleItems.slice(0, 4)}
              title="Minimal Style"
              variant="minimal"
            />
            <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
      </div>
    );
  }),
};

// Collapsible navigation
export const Collapsible: Story = {
  render: component$(() => {
    const isCollapsed = useSignal(false);
    
    return (
      <div class="h-[500px] flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <SideNavigation
          items={sampleItems}
          title="Collapsible Nav"
          isCollapsed={isCollapsed.value}
          isCollapsible={true}
          onToggleCollapse$={() => {
            isCollapsed.value = !isCollapsed.value;
          }}
        />
        <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Main Content Area</h2>
            <p class="text-gray-600 dark:text-gray-400">
              {isCollapsed.value 
                ? 'Navigation is collapsed' 
                : 'Navigation is expanded'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }),
};

// Nested navigation
export const DeepNestedNavigation: Story = {
  render: component$(() => {
    return (
      <div class="h-[500px] flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <SideNavigation
          items={nestedItems}
          title="Infrastructure Management"
        />
        <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Virtual Machines</h2>
            <p class="text-gray-600 dark:text-gray-400">VM management dashboard</p>
          </div>
        </div>
      </div>
    );
  }),
};

// With custom header and footer
export const WithHeaderAndFooter: Story = {
  render: component$(() => {
    return (
      <div class="h-[500px] flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <SideNavigation
          items={sampleItems.slice(0, 4)}
          header={
            <div class="flex flex-col items-center py-2">
              <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white mb-2">
                <span class="font-semibold">AC</span>
              </div>
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">Admin Console</span>
            </div>
          }
          footer={
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <HiUserOutline class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-800 dark:text-gray-200">John Doe</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
              </div>
            </div>
          }
        />
        <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900" />
      </div>
    );
  }),
};

// Mobile modal navigation
export const MobileModal: Story = {
  render: component$(() => {
    const isMobileOpen = useSignal(true);
    
    return (
      <div>
        <p class="mb-4 text-gray-600 dark:text-gray-400">
          This example demonstrates how the navigation would appear as a modal on mobile devices.
          The backdrop would typically cover the entire screen.
        </p>
        
        <div class="mb-4">
          <button 
            onClick$={() => isMobileOpen.value = !isMobileOpen.value}
            class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            {isMobileOpen.value ? 'Close Navigation' : 'Open Navigation'}
          </button>
        </div>
        
        <div class="relative h-[500px] border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
          <SideNavigation
            items={sampleItems}
            title="Mobile Navigation"
            isMobileModal={true}
            isMobileOpen={isMobileOpen.value}
            onCloseMobile$={() => {
              isMobileOpen.value = false;
            }}
          />
          
          <div class="p-6 bg-gray-50 dark:bg-gray-900">
            <h2 class="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">App Content</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              This is the main content area of the application.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} class="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                  <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">Content Card {i + 1}</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Sample content for demonstration purposes.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }),
};

// In context example
export const InContext: Story = {
  render: component$(() => {
    const isCollapsed = useSignal(false);
    
    const mailItems = [
      {
        label: 'Inbox',
        href: '/mail/inbox',
        icon: <HiEnvelopeOutline />,
        badge: <span class="bg-primary-100 text-primary-800 rounded-full px-2 py-0.5 dark:bg-primary-900 dark:text-primary-300">12</span>,
        isActive: true,
      },
      {
        label: 'Sent',
        href: '/mail/sent',
        icon: <HiEnvelopeOutline />,
      },
      {
        label: 'Drafts',
        href: '/mail/drafts',
        icon: <HiDocumentOutline />,
        badge: <span class="bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 dark:bg-gray-700 dark:text-gray-300">3</span>,
      },
      {
        label: 'Archives',
        href: '/mail/archives',
        icon: <HiEnvelopeOutline />,
      },
      {
        label: 'Categories',
        icon: <HiPhotoOutline />,
        items: [
          {
            label: 'Work',
            href: '/mail/categories/work',
          },
          {
            label: 'Personal',
            href: '/mail/categories/personal',
          },
          {
            label: 'Important',
            href: '/mail/categories/important',
          },
        ],
      }
    ];
    
    return (
      <div class="border border-gray-200 dark:border-gray-800 rounded-md h-[600px] flex overflow-hidden">
        <SideNavigation
          items={mailItems}
          title="Mail App"
          isCollapsible={true}
          isCollapsed={isCollapsed.value}
          onToggleCollapse$={() => {
            isCollapsed.value = !isCollapsed.value;
          }}
          footer={
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span class="font-medium text-primary-800 dark:text-primary-300">JD</span>
              </div>
              <div class="flex-1 overflow-hidden">
                <div class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">john.doe@example.com</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">5GB used</div>
              </div>
            </div>
          }
        />
        
        <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          {/* Mail app header */}
          <div class="border-b border-gray-200 dark:border-gray-800 p-4 flex items-center">
            <h1 class="text-xl font-medium text-gray-800 dark:text-gray-200">Inbox</h1>
            <div class="ml-auto flex space-x-2">
              <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mail list */}
          <div class="flex-1 overflow-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} class={`p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex ${i === 0 ? 'bg-white dark:bg-gray-800' : ''}`}>
                <div class="w-8 flex-shrink-0">
                  <input type="checkbox" class="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <h3 class={`text-sm font-medium ${i < 3 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {['Team Updates', 'Project Status', 'Meeting Reminder', 'Account Security', 'Weekly Report'][i % 5]}
                    </h3>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {i === 0 ? 'Just now' : i === 1 ? '1 hour ago' : `${(i + 1) * 2}h ago`}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod justo at risus efficitur, id fringilla nunc faucibus.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }),
};

// RTL Support
export const RTLSupport: Story = {
  render: component$(() => {
    return (
      <div dir="rtl" class="h-[500px] flex border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
        <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900" />
        <SideNavigation
          items={sampleItems}
          title="التنقل"
        />
      </div>
    );
  }),
};
