import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  const propControls = {
    TabNavigation: [
      {
        name: 'orientation',
        type: 'select',
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal'
      },
      {
        name: 'variant',
        type: 'select',
        options: ['default', 'filled', 'outlined', 'subtle'],
        defaultValue: 'default'
      },
      {
        name: 'size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md'
      },
      {
        name: 'align',
        type: 'select',
        options: ['start', 'center', 'end', 'stretch'],
        defaultValue: 'start'
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'isFitted',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'ariaLabel',
        type: 'text',
        defaultValue: 'Tab navigation'
      }
    ],
    TabItems: [
      {
        name: 'numberOfTabs',
        type: 'range',
        min: 2,
        max: 6,
        defaultValue: 3,
        description: 'Number of tabs to display'
      },
      {
        name: 'showIcons',
        type: 'boolean',
        defaultValue: false,
        description: 'Show icons in tabs'
      },
      {
        name: 'activeTab',
        type: 'range',
        min: 0,
        max: 5,
        defaultValue: 0,
        description: 'Index of the active tab'
      },
      {
        name: 'showCounts',
        type: 'boolean',
        defaultValue: false,
        description: 'Show count badges on tabs'
      }
    ]
  };

  // This is a simplified representation - in a real implementation,
  // the playground would render a dynamic component based on the selected props
  const renderComponent = (props) => {
    return (
      <div class="p-4 border rounded-md">
        <TabNavigation
          orientation={props.TabNavigation.orientation}
          variant={props.TabNavigation.variant}
          size={props.TabNavigation.size}
          align={props.TabNavigation.align}
          fullWidth={props.TabNavigation.fullWidth}
          isFitted={props.TabNavigation.isFitted}
          ariaLabel={props.TabNavigation.ariaLabel}
        >
          <TabItem 
            label="Tab 1" 
            isActive={props.TabItems.activeTab === 0} 
            count={props.TabItems.showCounts ? 5 : undefined}
          />
          <TabItem 
            label="Tab 2" 
            isActive={props.TabItems.activeTab === 1}
            count={props.TabItems.showCounts ? 12 : undefined}
          />
          <TabItem 
            label="Tab 3" 
            isActive={props.TabItems.activeTab === 2}
            count={props.TabItems.showCounts ? 3 : undefined}
          />
          {props.TabItems.numberOfTabs > 3 && (
            <TabItem 
              label="Tab 4" 
              isActive={props.TabItems.activeTab === 3}
              count={props.TabItems.showCounts ? 8 : undefined}
            />
          )}
          {props.TabItems.numberOfTabs > 4 && (
            <TabItem 
              label="Tab 5" 
              isActive={props.TabItems.activeTab === 4}
              count={props.TabItems.showCounts ? 2 : undefined}
            />
          )}
          {props.TabItems.numberOfTabs > 5 && (
            <TabItem 
              label="Tab 6" 
              isActive={props.TabItems.activeTab === 5}
              count={props.TabItems.showCounts ? 7 : undefined}
            />
          )}
        </TabNavigation>
      </div>
    );
  };

  return (
    <PlaygroundTemplate
      propControls={propControls}
      renderComponent={renderComponent}
      initialProps={{
        TabNavigation: {
          orientation: 'horizontal',
          variant: 'default',
          size: 'md',
          align: 'start',
          fullWidth: false,
          isFitted: false,
          ariaLabel: 'Tab navigation'
        },
        TabItems: {
          numberOfTabs: 3,
          showIcons: false,
          activeTab: 0,
          showCounts: false
        }
      }}
    >
      <p>
        Use this playground to experiment with the TabNavigation component. 
        Adjust the properties to see how different configurations affect the 
        appearance and behavior of the tabs.
      </p>
    </PlaygroundTemplate>
  );
});
