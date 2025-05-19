import { component$ } from '@builder.io/qwik';
import { DocExample } from '~/components/Docs/';
import { Card } from '../Card';
import { HiEllipsisHorizontalSolid, HiXMarkSolid } from '@qwikest/icons/heroicons';

export default component$(() => {
  return (
    <div class="space-y-12">
      <DocExample
        title="Basic Card"
        description="The default card provides a clean container with minimal styling."
        preview={
          <div class="w-full max-w-md mx-auto">
            <Card>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Card Title</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This is a basic card with default styling. It's perfect for presenting simple content 
                  with clean, minimal styling.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Card Title</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This is a basic card with default styling. It's perfect for presenting simple content
      with clean, minimal styling.
    </p>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Card Variants"
        description="Cards come in three visual variants: default, bordered, and elevated."
        preview={
          <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <h3 class="text-base font-medium mb-2">Default Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Standard styling with subtle border.
              </p>
            </Card>
            
            <Card variant="bordered">
              <h3 class="text-base font-medium mb-2">Bordered Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Thicker border for stronger visual presence.
              </p>
            </Card>
            
            <Card variant="elevated">
              <h3 class="text-base font-medium mb-2">Elevated Card</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Shadow effect creates a sense of elevation.
              </p>
            </Card>
          </div>
        }
        code={`
<Card>
  <h3 class="text-base font-medium mb-2">Default Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Standard styling with subtle border.
  </p>
</Card>

<Card variant="bordered">
  <h3 class="text-base font-medium mb-2">Bordered Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Thicker border for stronger visual presence.
  </p>
</Card>

<Card variant="elevated">
  <h3 class="text-base font-medium mb-2">Elevated Card</h3>
  <p class="text-sm text-gray-600 dark:text-gray-300">
    Shadow effect creates a sense of elevation.
  </p>
</Card>
        `}
      />

      <DocExample
        title="Card with Header and Footer"
        description="Cards can include a header and footer section for additional content organization."
        preview={
          <div class="w-full max-w-md mx-auto">
            <Card hasHeader hasFooter>
              <div q:slot="header" class="flex justify-between items-center">
                <h3 class="font-medium">Card with Header</h3>
                <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <HiEllipsisHorizontalSolid class="h-5 w-5" />
                </button>
              </div>
              
              <div class="py-2">
                <p class="text-gray-600 dark:text-gray-300">
                  This card demonstrates the use of header and footer sections.
                  The header typically contains the title and actions, while the
                  footer can include additional information or actions.
                </p>
              </div>
              
              <div q:slot="footer">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Last updated: May 18, 2025</span>
                  <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          </div>
        }
        code={`
<Card hasHeader hasFooter>
  <div q:slot="header" class="flex justify-between items-center">
    <h3 class="font-medium">Card with Header</h3>
    <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
      <HiEllipsisHorizontalSolid class="h-5 w-5" />
    </button>
  </div>
  
  <div class="py-2">
    <p class="text-gray-600 dark:text-gray-300">
      This card demonstrates the use of header and footer sections.
      The header typically contains the title and actions, while the
      footer can include additional information or actions.
    </p>
  </div>
  
  <div q:slot="footer">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Last updated: May 18, 2025</span>
      <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
        View Details
      </button>
    </div>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Card with Actions"
        description="Cards can display action buttons in the footer section."
        preview={
          <div class="w-full max-w-md mx-auto">
            <Card hasFooter hasActions>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive Card</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card includes action buttons placed in the footer area.
                  The actions slot provides a consistent way to add interactive elements.
                </p>
              </div>
              
              <div q:slot="footer">
                Card Footer Content
              </div>
              
              <div q:slot="actions">
                <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <HiXMarkSolid class="h-5 w-5" />
                </button>
                <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                  <HiEllipsisHorizontalSolid class="h-5 w-5" />
                </button>
              </div>
            </Card>
          </div>
        }
        code={`
<Card hasFooter hasActions>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive Card</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card includes action buttons placed in the footer area.
      The actions slot provides a consistent way to add interactive elements.
    </p>
  </div>
  
  <div q:slot="footer">
    Card Footer Content
  </div>
  
  <div q:slot="actions">
    <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
      <HiXMarkSolid class="h-5 w-5" />
    </button>
    <button class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
      <HiEllipsisHorizontalSolid class="h-5 w-5" />
    </button>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Loading Card"
        description="Cards can display a loading state while content is being fetched."
        preview={
          <div class="w-full max-w-md mx-auto">
            <Card loading>
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Loading Content</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card shows a loading spinner overlay while content is being loaded.
                  The content is visible but dimmed behind the loading indicator.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card loading>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Loading Content</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card shows a loading spinner overlay while content is being loaded.
      The content is visible but dimmed behind the loading indicator.
    </p>
  </div>
</Card>
        `}
      />

      <DocExample
        title="Card with No Padding"
        description="Cards can be rendered without internal padding for custom layouts or when displaying media content."
        preview={
          <div class="w-full max-w-md mx-auto">
            <Card noPadding>
              <img 
                src="https://source.unsplash.com/random/800x400/?nature" 
                alt="Nature" 
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Padding Card</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  This card has the noPadding prop set, allowing content like images
                  to extend to the edges while still adding padding to specific sections.
                </p>
              </div>
            </Card>
          </div>
        }
        code={`
<Card noPadding>
  <img 
    src="https://source.unsplash.com/random/800x400/?nature" 
    alt="Nature" 
    class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Padding Card</h3>
    <p class="text-gray-600 dark:text-gray-300">
      This card has the noPadding prop set, allowing content like images
      to extend to the edges while still adding padding to specific sections.
    </p>
  </div>
</Card>
        `}
      />
    </div>
  );
});
