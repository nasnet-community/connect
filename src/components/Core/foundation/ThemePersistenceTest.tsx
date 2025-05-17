import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Theme } from './ThemeToggle';

/**
 * ThemePersistenceTest component
 * 
 * Tests and demonstrates theme persistence across page refreshes.
 * This component shows:
 * 1. Current theme from localStorage
 * 2. When the theme was last set
 * 3. Allows setting a new theme and simulating a page refresh
 */
export const ThemePersistenceTest = component$(() => {
  const activeTheme = useSignal<Theme>('system');
  const storedTimestamp = useSignal<string | null>(null);
  const isLoading = useSignal<boolean>(false);
  const refreshCount = useSignal<number>(0);
  
  // Get the theme from localStorage
  const getStoredTheme = $(() => {
    const theme = localStorage.getItem('theme') as Theme | null;
    const timestamp = localStorage.getItem('theme-timestamp');
    
    activeTheme.value = theme || 'system';
    storedTimestamp.value = timestamp;
  });
  
  // Set the theme and save to localStorage
  const setTheme = $((theme: Theme) => {
    // Store the theme in localStorage
    localStorage.setItem('theme', theme);
    
    // Save timestamp for demonstration purposes
    const timestamp = new Date().toISOString();
    localStorage.setItem('theme-timestamp', timestamp);
    storedTimestamp.value = timestamp;
    
    // Apply the theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Update the active theme
    activeTheme.value = theme;
  });
  
  // Simulate a page refresh
  const simulateRefresh = $(() => {
    isLoading.value = true;
    
    // Hide content briefly to simulate reload
    setTimeout(() => {
      // Re-read from localStorage to simulate page refresh
      getStoredTheme();
      isLoading.value = false;
      refreshCount.value++;
    }, 1000);
  });
  
  // Load theme on initial render
  useVisibleTask$(() => {
    getStoredTheme();
  });
  
  return (
    <div class="space-y-6 p-6 bg-white dark:bg-surface-dark rounded-lg border border-border dark:border-border-dark">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Theme Persistence Test</h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          This component tests theme persistence across page refreshes by storing theme preferences in localStorage.
        </p>
      </div>
      
      {/* Current Theme Status */}
      <div class={`transition-opacity duration-300 ${isLoading.value ? 'opacity-0' : 'opacity-100'}`}>
        <div class="mb-4 p-4 bg-surface-secondary dark:bg-surface-dark-secondary rounded-lg">
          <h3 class="font-medium mb-2">Current Theme Status</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 bg-white dark:bg-surface-dark rounded-md">
              <p class="text-sm text-text-muted dark:text-text-dark-muted">Active Theme</p>
              <p class="text-lg font-medium">{activeTheme.value}</p>
              <p class="text-xs text-text-muted dark:text-text-dark-muted">
                Applied class: {document.documentElement?.classList.contains('dark') ? 'dark' : 'light'}
              </p>
            </div>
            
            <div class="p-3 bg-white dark:bg-surface-dark rounded-md">
              <p class="text-sm text-text-muted dark:text-text-dark-muted">Storage Status</p>
              <p class="text-lg font-medium">{storedTimestamp.value ? 'Persisted' : 'Not Saved'}</p>
              {storedTimestamp.value && (
                <p class="text-xs text-text-muted dark:text-text-dark-muted">
                  Last saved: {new Date(storedTimestamp.value).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          
          {refreshCount.value > 0 && (
            <div class="mt-3 p-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
              Page simulated reload {refreshCount.value} {refreshCount.value === 1 ? 'time' : 'times'} and persisted theme was restored!
            </div>
          )}
        </div>
      </div>
      
      {/* Theme Controls */}
      <div class="p-4 border border-border dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark">
        <h3 class="font-medium mb-3">Theme Control Panel</h3>
        <div class="flex flex-wrap gap-3 mb-4">
          <button 
            onClick$={() => setTheme('light')}
            class={`px-4 py-2 rounded-md font-medium ${
              activeTheme.value === 'light' 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-text-default dark:text-text-dark-default'
            }`}
          >
            Light Mode
          </button>
          
          <button 
            onClick$={() => setTheme('dark')}
            class={`px-4 py-2 rounded-md font-medium ${
              activeTheme.value === 'dark' 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-text-default dark:text-text-dark-default'
            }`}
          >
            Dark Mode
          </button>
          
          <button 
            onClick$={() => setTheme('system')}
            class={`px-4 py-2 rounded-md font-medium ${
              activeTheme.value === 'system' 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-text-default dark:text-text-dark-default'
            }`}
          >
            System
          </button>
        </div>
        
        <div class="flex items-center justify-between border-t border-border dark:border-border-dark pt-4 mt-4">
          <p class="text-sm">
            After setting a theme, simulate a page refresh to test persistence:
          </p>
          
          <button 
            onClick$={simulateRefresh}
            disabled={isLoading.value}
            class={`px-4 py-2 rounded-md font-medium ${
              isLoading.value 
                ? 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed' 
                : 'bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-500 text-white'
            }`}
          >
            {isLoading.value ? 'Reloading...' : 'Simulate Refresh'}
          </button>
        </div>
      </div>
      
      {/* Persistence Mechanics */}
      <div class="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg text-sm">
        <h3 class="font-medium mb-2">How Theme Persistence Works</h3>
        <ol class="list-decimal pl-5 space-y-1">
          <li>Theme preference is stored in <code class="px-1 py-0.5 bg-white dark:bg-surface-dark rounded">localStorage.theme</code></li>
          <li>On page load, the theme is read from localStorage</li>
          <li>If a theme is found, it's applied by adding/removing the <code class="px-1 py-0.5 bg-white dark:bg-surface-dark rounded">dark</code> class</li>
          <li>If no theme is found, system preference is used as the default</li>
          <li>The ThemeToggle component maintains this state when manual changes are made</li>
        </ol>
        
        <div class="mt-4 p-3 border border-border dark:border-border-dark rounded-md bg-white dark:bg-surface-dark">
          <p class="font-medium mb-1">Implementation in ThemeToggle component:</p>
          <pre class="text-xs overflow-x-auto p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
{`// Initialize theme state
useVisibleTask$(() => {
  // Check for theme in localStorage
  const storedTheme = localStorage.getItem("theme");
  
  if (storedTheme) {
    // Apply stored theme
    applyTheme(storedTheme as Theme);
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }
});`}
          </pre>
        </div>
      </div>
    </div>
  );
});

export default ThemePersistenceTest;
