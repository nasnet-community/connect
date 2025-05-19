import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { 
  SideNavigation, 
  SideNavigationItem, 
  SideNavigationHeader 
} from '../SideNavigation';

export default component$(() => {
  const properties = [
    {
      type: 'select',
      name: 'position',
      label: 'Position',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
      ]
    },
    {
      type: 'text',
      name: 'width',
      label: 'Width',
      defaultValue: '250px'
    },
    {
      type: 'boolean',
      name: 'showHeader',
      label: 'Show Header',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'showIcons',
      label: 'Show Icons',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'expandableGroups',
      label: 'Expandable Groups',
      defaultValue: true
    },
    {
      type: 'select',
      name: 'activeItem',
      label: 'Active Item',
      defaultValue: 'analytics',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Analytics', value: 'analytics' },
        { label: 'Content', value: 'content' },
        { label: 'Users', value: 'users' },
        { label: 'Settings', value: 'settings' }
      ]
    }
  ];

  return (
    <PlaygroundTemplate
      component={(props: any) => {
        const position = props.position || 'left';
        const width = props.width || '250px';
        const showHeader = props.showHeader !== false;
        const showIcons = props.showIcons !== false;
        const expandableGroups = props.expandableGroups !== false;
        const activeItem = props.activeItem || 'analytics';
        
        return (
          <div class="h-96 border border-gray-200 dark:border-gray-700 rounded-md relative">
            <SideNavigation
              position={position}
              width={width}
              class="h-full"
            >
              {showHeader && (
                <SideNavigationHeader>
                  <div class="flex items-center gap-2 p-4">
                    <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <span class="font-medium">App Name</span>
                  </div>
                </SideNavigationHeader>
              )}
              
              <SideNavigationItem 
                href="#" 
                label="Dashboard" 
                isActive={activeItem === 'dashboard'}
                icon={showIcons ? <i class="fas fa-home"></i> : undefined}
              />
              
              <SideNavigationItem 
                href="#" 
                label="Analytics" 
                isActive={activeItem === 'analytics'}
                icon={showIcons ? <i class="fas fa-chart-bar"></i> : undefined}
              />
              
              {expandableGroups ? (
                <SideNavigationItem 
                  label="Content" 
                  expandable={true}
                  expanded={activeItem === 'content'}
                  icon={showIcons ? <i class="fas fa-file-alt"></i> : undefined}
                >
                  <SideNavigationItem 
                    href="#" 
                    label="Pages" 
                    indent={1} 
                  />
                  <SideNavigationItem 
                    href="#" 
                    label="Blog Posts" 
                    indent={1}
                    isActive={activeItem === 'content'}
                  />
                  <SideNavigationItem 
                    href="#" 
                    label="Media" 
                    indent={1} 
                  />
                </SideNavigationItem>
              ) : (
                <SideNavigationItem 
                  href="#" 
                  label="Content" 
                  isActive={activeItem === 'content'}
                  icon={showIcons ? <i class="fas fa-file-alt"></i> : undefined}
                />
              )}
              
              <SideNavigationItem 
                href="#" 
                label="Users" 
                isActive={activeItem === 'users'}
                icon={showIcons ? <i class="fas fa-users"></i> : undefined}
              />
              
              <SideNavigationItem 
                href="#" 
                label="Settings" 
                isActive={activeItem === 'settings'}
                icon={showIcons ? <i class="fas fa-cog"></i> : undefined}
              />
            </SideNavigation>
          </div>
        );
      }}
      properties={properties}
    />
  );
});
