import { component$ } from '@builder.io/qwik';
import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from './index';
import { CardProps } from './Card.types';

const meta: Meta<typeof Card> = {
  title: 'Core/DataDisplay/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'sm'
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
      defaultValue: 'md'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      defaultValue: 'default'
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'raise', 'border', 'shadow'],
      defaultValue: 'none'
    },
    interactive: { control: 'boolean', defaultValue: false },
    fullHeight: { control: 'boolean', defaultValue: false },
    fullWidth: { control: 'boolean', defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    bgColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card example
export const Basic: Story = {
  args: {
    elevation: 'sm',
    radius: 'md',
    variant: 'default',
  },
  render: (args: CardProps) => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900">
      <Card {...args} class="max-w-md">
        <CardBody>
          <h3 class="text-lg font-medium mb-2">Basic Card</h3>
          <p class="text-gray-600 dark:text-gray-400">
            This is a basic card example with just a body and some content.
            Cards are used to group related content and actions.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

// Card with header, body, and footer
export const WithHeaderAndFooter: Story = {
  args: {
    elevation: 'sm',
    radius: 'md',
    variant: 'default',
  },
  render: (args: CardProps) => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900">
      <Card {...args} class="max-w-md">
        <CardHeader withBorder>
          <h3 class="text-lg font-medium">Card Title</h3>
        </CardHeader>
        <CardBody>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This card has a header with a bottom border, a body with content,
            and a footer with actions.
          </p>
        </CardBody>
        <CardFooter withBorder alignRight>
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md mr-2">
            Cancel
          </button>
          <button class="px-4 py-2 bg-primary-500 text-white rounded-md">
            Submit
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Card with media
export const WithMedia: Story = {
  args: {
    elevation: 'sm',
    radius: 'md',
    variant: 'default',
  },
  render: (args: CardProps) => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900">
      <Card {...args} class="max-w-sm">
        <CardMedia 
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9" 
          alt="Portrait of a person"
          height="200px"
        />
        <CardBody>
          <h3 class="text-lg font-medium mb-2">Card with Media</h3>
          <p class="text-gray-600 dark:text-gray-400">
            This card includes an image at the top. Media can be used to enhance the visual appeal
            of cards and provide context.
          </p>
        </CardBody>
        <CardFooter withBorder>
          <button class="px-4 py-2 text-primary-600 dark:text-primary-400">
            Learn More
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Card with media overlay
export const WithMediaOverlay: Story = {
  args: {
    elevation: 'sm',
    radius: 'md',
    variant: 'default',
  },
  render: (args: CardProps) => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900">
      <Card {...args} class="max-w-sm">
        <CardMedia 
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9" 
          alt="Portrait of a person"
          height="200px"
          overlay={
            <div class="text-center">
              <h3 class="text-xl font-bold mb-2">John Doe</h3>
              <p>Software Developer</p>
            </div>
          }
        />
        <CardBody>
          <p class="text-gray-600 dark:text-gray-400">
            This card uses an overlay on the media component to display text over the image.
            This is useful for captions, titles, or call-to-action elements.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

// Elevation variants
export const ElevationVariants: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-4">
      {['none', 'xs', 'sm', 'md', 'lg', 'xl'].map((elevation) => (
        <Card 
          key={elevation} 
          elevation={elevation as any}
          class="p-4"
        >
          <h3 class="font-medium mb-2">Elevation: {elevation}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            This card demonstrates the {elevation} elevation level.
          </p>
        </Card>
      ))}
    </div>
  )),
};

// Radius variants
export const RadiusVariants: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-4">
      {['none', 'xs', 'sm', 'md', 'lg', 'xl'].map((radius) => (
        <Card 
          key={radius} 
          radius={radius as any}
          class="p-4"
        >
          <h3 class="font-medium mb-2">Radius: {radius}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            This card demonstrates the {radius} border radius.
          </p>
        </Card>
      ))}
    </div>
  )),
};

// Variant examples
export const VariantExamples: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="default" class="p-4">
        <h3 class="font-medium mb-2">Default Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          The default card style with a white background and subtle shadow.
        </p>
      </Card>
      
      <Card variant="outlined" class="p-4">
        <h3 class="font-medium mb-2">Outlined Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Card with a border instead of a shadow. Useful for lower emphasis.
        </p>
      </Card>
      
      <Card variant="filled" class="p-4">
        <h3 class="font-medium mb-2">Filled Variant</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Card with a subtle background color to stand out slightly from the page.
        </p>
      </Card>
    </div>
  )),
};

// Hover effects
export const HoverEffects: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card interactive hoverEffect="none" class="p-4">
        <h3 class="font-medium mb-2">No Hover Effect</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Interactive card without any hover effect. Only shows a pointer cursor.
        </p>
      </Card>
      
      <Card interactive hoverEffect="raise" class="p-4">
        <h3 class="font-medium mb-2">Raise on Hover</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Card raises slightly when hovered to create a "lifting" effect.
        </p>
      </Card>
      
      <Card interactive hoverEffect="border" variant="outlined" class="p-4">
        <h3 class="font-medium mb-2">Border on Hover</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Card's border changes color on hover. Works best with the outlined variant.
        </p>
      </Card>
      
      <Card interactive hoverEffect="shadow" class="p-4">
        <h3 class="font-medium mb-2">Shadow on Hover</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Card's shadow increases when hovered to create more emphasis.
        </p>
      </Card>
    </div>
  )),
};

// Interactive card
export const InteractiveCard: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card 
          interactive 
          hoverEffect="raise" 
          href="https://qwik.builder.io/" 
          target="_blank"
        >
          <CardMedia 
            src="https://qwik.builder.io/logos/social.png" 
            alt="Qwik Logo"
            height="140px"
          />
          <CardBody>
            <h3 class="text-lg font-medium mb-2">Link Card</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This entire card is a link. Click it to navigate to the Qwik website.
            </p>
          </CardBody>
          <CardFooter withBorder>
            <div class="flex items-center text-primary-600 dark:text-primary-400">
              <span>Learn more about Qwik</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </CardFooter>
        </Card>
        
        <Card interactive hoverEffect="border" variant="outlined">
          <CardHeader>
            <h3 class="text-lg font-medium">Button Card</h3>
          </CardHeader>
          <CardBody>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This card acts like a button. It's not a link, but it's still interactive.
              This can be useful for opening modals or triggering other UI actions.
            </p>
          </CardBody>
          <CardFooter alignRight>
            <span class="text-primary-600 dark:text-primary-400 text-sm">Click to interact</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )),
};

// Custom styles
export const CustomStyles: Story = {
  render: component$(() => (
    <div class="p-4 bg-gray-100 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        bgColor="#f8f0fc" 
        class="p-4"
      >
        <h3 class="font-medium mb-2 text-purple-800">Custom Background</h3>
        <p class="text-sm text-purple-700">
          This card has a custom background color set via the bgColor prop.
        </p>
      </Card>
      
      <Card 
        variant="outlined" 
        borderColor="#9c36b5" 
        class="p-4"
      >
        <h3 class="font-medium mb-2 text-purple-800">Custom Border</h3>
        <p class="text-sm text-purple-700">
          This outlined card has a custom border color set via the borderColor prop.
        </p>
      </Card>
      
      <Card 
        class="p-0 overflow-hidden"
        radius="lg"
      >
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
          <h3 class="font-medium mb-2">Gradient Header</h3>
          <p class="text-sm opacity-90">
            Cards can be customized with gradients and other creative styling.
          </p>
        </div>
        <CardBody>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            The body content appears below the gradient header.
          </p>
        </CardBody>
      </Card>
      
      <Card 
        class="relative overflow-hidden"
        elevation="lg"
        radius="lg"
      >
        <div class="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
          <div class="w-full h-full bg-primary-500 opacity-20 rounded-full"></div>
        </div>
        <div class="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-8 translate-y-8">
          <div class="w-full h-full bg-secondary-500 opacity-20 rounded-full"></div>
        </div>
        <CardBody>
          <h3 class="font-medium mb-2 relative z-10">Decorative Elements</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 relative z-10">
            Cards can include decorative elements like these circles to create visual interest.
          </p>
        </CardBody>
      </Card>
    </div>
  )),
};

// Card in context (user profile)
export const CardInContext: Story = {
  render: component$(() => (
    <div class="p-6 bg-gray-100 dark:bg-gray-900">
      <div class="max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User profile card */}
          <Card class="md:col-span-1" elevation="md">
            <div class="text-center p-4">
              <div class="w-24 h-24 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-semibold text-primary-700">JD</span>
              </div>
              <h2 class="text-xl font-semibold mb-1">John Doe</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Product Designer</p>
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div class="font-semibold">142</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Posts</div>
                  </div>
                  <div>
                    <div class="font-semibold">2.8k</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div>
                    <div class="font-semibold">268</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Following</div>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <button class="w-full py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                  Follow
                </button>
              </div>
            </div>
          </Card>
          
          {/* Content area */}
          <div class="md:col-span-2 space-y-6">
            {/* Stats cards */}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Projects', value: '18', color: 'bg-blue-500' },
                { title: 'Completed', value: '12', color: 'bg-green-500' },
                { title: 'In Progress', value: '6', color: 'bg-yellow-500' },
              ].map((stat) => (
                <Card key={stat.title} class="p-4" elevation="sm">
                  <div class="flex items-center">
                    <div class={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center text-white mr-3`}>
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-2xl font-semibold">{stat.value}</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Recent activity */}
            <Card elevation="sm">
              <CardHeader withBorder>
                <h3 class="text-lg font-medium">Recent Activity</h3>
              </CardHeader>
              <div class="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { action: 'Completed task', project: 'Website Redesign', time: '2 hours ago' },
                  { action: 'Added new comment', project: 'Mobile App', time: '4 hours ago' },
                  { action: 'Submitted report', project: 'Q2 Analytics', time: '1 day ago' },
                  { action: 'Created new task', project: 'Marketing Campaign', time: '2 days ago' },
                ].map((activity, i) => (
                  <div key={i} class="flex items-start py-3 px-4">
                    <div class="w-2 h-2 mt-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    <div class="ml-3">
                      <p class="text-sm text-gray-800 dark:text-gray-200">
                        <span class="font-medium">{activity.action}</span> on <span class="font-medium">{activity.project}</span>
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <CardFooter withBorder alignRight>
                <button class="text-sm text-primary-600 dark:text-primary-400">
                  View All Activity
                </button>
              </CardFooter>
            </Card>
            
            {/* Project card */}
            <Card interactive hoverEffect="raise" elevation="sm">
              <CardMedia 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692" 
                alt="Project dashboard on laptop"
                height="160px"
              />
              <CardBody>
                <h3 class="text-lg font-medium mb-2">Latest Project: Dashboard Redesign</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Revamping the analytics dashboard with improved visualizations and user experience.
                  Currently in the final testing phase before deployment.
                </p>
                <div class="flex items-center space-x-4">
                  <div class="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} class={`w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-${i*100} flex-shrink-0`}></div>
                    ))}
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">+2 more</span>
                </div>
              </CardBody>
              <CardFooter withBorder>
                <div class="flex justify-between items-center w-full">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Deadline:</span> June, 30
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Progress:</span> 75%
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )),
};
