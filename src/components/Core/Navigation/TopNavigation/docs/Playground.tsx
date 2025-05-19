import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { TopNavigation, TopNavItem } from '../../TopNavigation';

export default component$(() => {
  const propControls = {
    TopNavigation: [
      {
        name: 'variant',
        type: 'select',
        options: ['default', 'filled', 'bordered'],
        defaultValue: 'default'
      },
      {
        name: 'position',
        type: 'select',
        options: ['static', 'fixed', 'sticky'],
        defaultValue: 'static'
      },
      {
        name: 'responsive',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'containerWidth',
        type: 'select',
        options: ['full', 'contained'],
        defaultValue: 'contained'
      },
      {
        name: 'ariaLabel',
        type: 'text',
        defaultValue: 'Main navigation'
      }
    ],
    NavItems: [
      {
        name: 'numberOfItems',
        type: 'range',
        min: 2,
        max: 6,
        defaultValue: 4,
        description: 'Number of navigation items'
      },
      {
        name: 'showIcons',
        type: 'boolean',
        defaultValue: false,
        description: 'Show icons in navigation items'
      },
      {
        name: 'activeItemIndex',
        type: 'range',
        min: 0,
        max: 5,
        defaultValue: 0,
        description: 'Index of the active item'
      },
      {
        name: 'includeDropdown',
        type: 'boolean',
        defaultValue: false,
        description: 'Include a dropdown menu'
      }
    ]
  };

  // This is a simplified representation - in a real implementation,
  // the playground would render a dynamic component based on the selected props
  const renderComponent = (props) => {
    return (
      <div class="p-4 border rounded-md">
        <TopNavigation
          variant={props.TopNavigation.variant}
          position={props.TopNavigation.position}
          responsive={props.TopNavigation.responsive}
          containerWidth={props.TopNavigation.containerWidth}
          ariaLabel={props.TopNavigation.ariaLabel}
        >
          <TopNavItem 
            href="#" 
            label="Home" 
            isActive={props.NavItems.activeItemIndex === 0} 
          />
          <TopNavItem 
            href="#" 
            label="Products" 
            isActive={props.NavItems.activeItemIndex === 1}
          />
          {props.NavItems.numberOfItems > 2 && (
            <TopNavItem 
              href="#" 
              label="Services" 
              isActive={props.NavItems.activeItemIndex === 2}
            />
          )}
          {props.NavItems.numberOfItems > 3 && (
            <TopNavItem 
              href="#" 
              label="About" 
              isActive={props.NavItems.activeItemIndex === 3}
            />
          )}
          {props.NavItems.numberOfItems > 4 && (
            <TopNavItem 
              href="#" 
              label="Blog" 
              isActive={props.NavItems.activeItemIndex === 4}
            />
          )}
          {props.NavItems.numberOfItems > 5 && (
            <TopNavItem 
              href="#" 
              label="Contact" 
              isActive={props.NavItems.activeItemIndex === 5}
            />
          )}
        </TopNavigation>
      </div>
    );
  };

  return (
    <PlaygroundTemplate
      propControls={propControls}
      renderComponent={renderComponent}
      initialProps={{
        TopNavigation: {
          variant: 'default',
          position: 'static',
          responsive: false,
          containerWidth: 'contained',
          ariaLabel: 'Main navigation'
        },
        NavItems: {
          numberOfItems: 4,
          showIcons: false,
          activeItemIndex: 0,
          includeDropdown: false
        }
      }}
    >
      <p>
        Use this playground to experiment with the TopNavigation component. 
        Adjust the properties to see how different configurations affect the 
        appearance and behavior of the navigation bar.
      </p>
    </PlaygroundTemplate>
  );
});
