import { component$, useSignal, $ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Core/Feedback/Popover';
import type { PopoverPlacement, PopoverSize } from '~/components/Core/Feedback/Popover';

export default component$(() => {
  // Configuration options
  const triggerType = useSignal<'click' | 'hover' | 'focus' | 'manual'>('click');
  const placement = useSignal<PopoverPlacement>('bottom');
  const size = useSignal<PopoverSize>('md');
  const hasArrow = useSignal(true);
  const isOpen = useSignal(false);
  
  // Content options
  const title = useSignal('Popover Title');
  const content = useSignal('This is customizable popover content. You can change various properties using the controls below.');
  const showImage = useSignal(false);
  
  const togglePopover = $(() => {
    if (triggerType.value === 'manual') {
      isOpen.value = !isOpen.value;
    }
  });
  
  // Available placements
  const placements: PopoverPlacement[] = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ];
  
  // Available sizes
  const sizes: PopoverSize[] = ['sm', 'md', 'lg'];
  
  // Available trigger types
  const triggerTypes = ['click', 'hover', 'focus', 'manual'];
  
  return (
    <div class="space-y-8">
      {/* Demo Area */}
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md flex justify-center items-center min-h-[200px]">
        <Popover 
          trigger={triggerType.value}
          placement={placement.value}
          size={size.value}
          hasArrow={hasArrow.value}
          isOpen={triggerType.value === 'manual' ? isOpen.value : undefined}
          onOpenChange$={(open) => {
            if (triggerType.value === 'manual') {
              isOpen.value = open;
            }
          }}
        >
          <PopoverTrigger>
            <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              {triggerType.value === 'click' ? 'Click me' : 
               triggerType.value === 'hover' ? 'Hover me' : 
               triggerType.value === 'focus' ? 'Focus me' : 
               isOpen.value ? 'Popover is open' : 'Popover is closed'}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-4">
              {title.value && <h4 class="font-semibold mb-2">{title.value}</h4>}
              
              {showImage.value && (
                <div class="mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=200&q=80" 
                    alt="Sample" 
                    class="w-full max-h-[120px] object-cover rounded-md"
                  />
                </div>
              )}
              
              <p class="text-sm text-gray-600 dark:text-gray-300">{content.value}</p>
            </div>
          </PopoverContent>
        </Popover>
        
        {triggerType.value === 'manual' && (
          <button 
            onClick$={togglePopover}
            class="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            {isOpen.value ? 'Close' : 'Open'} Popover
          </button>
        )}
      </div>
      
      {/* Controls */}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Popover Configuration</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Component Options */}
          <div class="space-y-4">
            <h3 class="font-medium text-lg">Component Options</h3>
            
            {/* Trigger Type */}
            <div>
              <label class="block text-sm font-medium mb-2">Trigger Type</label>
              <div class="flex flex-wrap gap-2">
                {triggerTypes.map((type) => (
                  <button
                    key={type}
                    onClick$={() => {
                      triggerType.value = type as any;
                    }}
                    class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                      triggerType.value === type
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Placement */}
            <div>
              <label class="block text-sm font-medium mb-2">Placement</label>
              <div class="grid grid-cols-3 gap-2">
                {placements.map((pos) => (
                  <button
                    key={pos}
                    onClick$={() => {
                      placement.value = pos;
                    }}
                    class={`px-2 py-1.5 border rounded-md text-xs transition-colors ${
                      placement.value === pos
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size */}
            <div>
              <label class="block text-sm font-medium mb-2">Size</label>
              <div class="flex gap-2">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick$={() => {
                      size.value = sizeOption;
                    }}
                    class={`px-3 py-1.5 border rounded-md text-sm transition-colors ${
                      size.value === sizeOption
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {sizeOption.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Show Arrow */}
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={hasArrow.value} 
                  onChange$={() => hasArrow.value = !hasArrow.value}
                />
                <span class="text-sm font-medium">Show Arrow</span>
              </label>
            </div>
          </div>
          
          {/* Right column - Content Options */}
          <div class="space-y-4">
            <h3 class="font-medium text-lg">Content Options</h3>
            
            {/* Title */}
            <div>
              <label class="block text-sm font-medium mb-1">Title</label>
              <input 
                type="text" 
                value={title.value}
                onInput$={(e) => title.value = (e.target as HTMLInputElement).value}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            {/* Content */}
            <div>
              <label class="block text-sm font-medium mb-1">Content</label>
              <textarea 
                value={content.value}
                onInput$={(e) => content.value = (e.target as HTMLTextAreaElement).value}
                rows={3}
                class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            
            {/* Show Image */}
            <div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showImage.value} 
                  onChange$={() => showImage.value = !showImage.value}
                />
                <span class="text-sm font-medium">Include Image</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 