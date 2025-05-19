import { component$ } from '@builder.io/qwik';
import { DocsLayout } from '../../../../components/Docs/Navigation';
import CodeExample from '../../../../components/Docs/CodeExample';

export default component$(() => {
  return (
    <DocsLayout>
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h1>
        
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          This guide will help you get started with the Connect Design System in your Qwik application.
        </p>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Installation</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The Connect Design System is available as part of your Qwik project. If you're starting from scratch, you'll need to set up a Qwik project first:
          </p>
          
          <CodeExample
            code={`npm create qwik@latest`}
            language="bash"
            title="Creating a new Qwik project"
          />
          
          <p class="text-gray-700 dark:text-gray-300 mt-4 mb-4">
            Once your Qwik project is set up, you can install the Connect Design System:
          </p>
          
          <CodeExample
            code={`npm install`}
            language="bash"
            title="Install dependencies"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Basic Setup</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The first step is to set up the Connect theme provider in your application's root component:
          </p>
          
          <CodeExample
            code={`import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { ThemeProvider } from 'connect/components/Core/Theme';

import './global.css';

export default component$(() => {
  return (
    <QwikCityProvider>
      <ThemeProvider defaultTheme="light">
        <RouterOutlet />
      </ThemeProvider>
    </QwikCityProvider>
  );
});`}
            language="tsx"
            title="src/root.tsx"
          />
          
          <p class="text-gray-700 dark:text-gray-300 mt-4 mb-4">
            Make sure to include the Connect styles by updating your global CSS file:
          </p>
          
          <CodeExample
            code={`/* Import Tailwind CSS */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Import Connect Design System styles */
@import 'connect/styles/index.css';`}
            language="css"
            title="src/global.css"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Using Components</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Now you can start using Connect components in your application:
          </p>
          
          <CodeExample
            code={`import { component$ } from '@builder.io/qwik';
import { Button } from 'connect/components/Core/Input/Button';
import { TextField } from 'connect/components/Core/Input/TextField';
import { Container } from 'connect/components/Core/Layout/Container';
import { Heading } from 'connect/components/Core/Typography/Heading';

export default component$(() => {
  return (
    <Container maxWidth="md" class="py-8">
      <Heading level={1} class="mb-6">Welcome to My App</Heading>
      
      <div class="mb-4">
        <TextField 
          label="Email" 
          type="email" 
          placeholder="Enter your email"
        />
      </div>
      
      <Button variant="primary">Get Started</Button>
    </Container>
  );
});`}
            language="tsx"
            title="Example Component"
          />
          
          <p class="text-gray-700 dark:text-gray-300 mt-4 mb-4">
            Remember that with Qwik, all event handlers need to use the $ suffix:
          </p>
          
          <CodeExample
            code={`import { component$, $ } from '@builder.io/qwik';
import { Button } from 'connect/components/Core/Input/Button';

export default component$(() => {
  const handleClick$ = $(() => {
    console.log('Button clicked!');
  });

  return (
    <Button onClick$={handleClick$}>
      Click Me
    </Button>
  );
});`}
            language="tsx"
            title="Event Handling"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Managing State</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            For components that require state, use Qwik's reactive primitives:
          </p>
          
          <CodeExample
            code={`import { component$, useSignal } from '@builder.io/qwik';
import { Button } from 'connect/components/Core/Input/Button';
import { TextField } from 'connect/components/Core/Input/TextField';

export default component$(() => {
  const name = useSignal('');
  
  return (
    <div class="space-y-4">
      <TextField 
        label="Name" 
        value={name.value}
        onInput$={(e) => name.value = e.target.value}
      />
      
      <div>
        {name.value ? (
          <p>Hello, {name.value}!</p>
        ) : (
          <p>Please enter your name</p>
        )}
      </div>
      
      <Button
        onClick$={() => name.value = ''}
        disabled={!name.value}
      >
        Clear
      </Button>
    </div>
  );
});`}
            language="tsx"
            title="Using Reactive State"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Working with Forms</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Connect provides components for building forms:
          </p>
          
          <CodeExample
            code={`import { component$, useSignal, $ } from '@builder.io/qwik';
import { Button } from 'connect/components/Core/Input/Button';
import { TextField } from 'connect/components/Core/Input/TextField';
import { FormControl } from 'connect/components/Core/Input/FormControl';
import { Checkbox } from 'connect/components/Core/Input/Checkbox';

export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const rememberMe = useSignal(false);
  
  const handleSubmit$ = $((event: Event) => {
    event.preventDefault();
    console.log({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });
    // Handle form submission logic
  });
  
  return (
    <form preventdefault:submit onSubmit$={handleSubmit$} class="space-y-4">
      <FormControl>
        <TextField 
          label="Email" 
          type="email" 
          required
          value={email.value}
          onInput$={(e) => email.value = e.target.value}
        />
      </FormControl>
      
      <FormControl>
        <TextField 
          label="Password" 
          type="password" 
          required
          value={password.value}
          onInput$={(e) => password.value = e.target.value}
        />
      </FormControl>
      
      <Checkbox
        label="Remember me"
        checked={rememberMe.value}
        onChange$={(e) => rememberMe.value = e.target.checked}
      />
      
      <Button type="submit" variant="primary">
        Sign In
      </Button>
    </form>
  );
});`}
            language="tsx"
            title="Form Example"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Using Layouts</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Connect provides layout components for building responsive interfaces:
          </p>
          
          <CodeExample
            code={`import { component$ } from '@builder.io/qwik';
import { Container } from 'connect/components/Core/Layout/Container';
import { Grid } from 'connect/components/Core/Layout/Grid';
import { Card } from 'connect/components/Core/Layout/Card';

export default component$(() => {
  return (
    <Container maxWidth="lg" class="py-8">
      <Grid
        cols={{
          base: 1,  // 1 column on mobile
          md: 2,    // 2 columns on medium screens
          lg: 3     // 3 columns on large screens
        }}
        gap="4"
      >
        <Card>
          <h3>Card 1</h3>
          <p>Card content goes here</p>
        </Card>
        
        <Card>
          <h3>Card 2</h3>
          <p>Card content goes here</p>
        </Card>
        
        <Card>
          <h3>Card 3</h3>
          <p>Card content goes here</p>
        </Card>
      </Grid>
    </Container>
  );
});`}
            language="tsx"
            title="Responsive Layout"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Theme Customization</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            You can customize the theme by using the ThemeProvider and accessing theme values:
          </p>
          
          <CodeExample
            code={`import { component$, useContext } from '@builder.io/qwik';
import { ThemeContext, ThemeProvider } from 'connect/components/Core/Theme';
import { Button } from 'connect/components/Core/Input/Button';

// Theme toggle component
export const ThemeToggle = component$(() => {
  const theme = useContext(ThemeContext);
  
  return (
    <Button
      variant="ghost"
      onClick$={() => {
        theme.mode.value = theme.mode.value === 'light' ? 'dark' : 'light';
      }}
    >
      {theme.mode.value === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
});

// Usage in app
export default component$(() => {
  return (
    <ThemeProvider defaultTheme="light">
      <header class="p-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main class="p-6">
        <h1>My App with Theme Toggle</h1>
        {/* Your app content */}
      </main>
    </ThemeProvider>
  );
});`}
            language="tsx"
            title="Theme Customization"
          />
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Best Practices</h2>
          
          <div class="space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Follow Qwik Patterns</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Remember to use the $ suffix for event handlers and create lazy-loaded functions with $(). This is crucial for Qwik's resumability model.
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Composition Over Configuration</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Use the composite components like Card with CardHeader, CardBody, etc. instead of configuring a single component with many props.
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Responsive Design</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Use the responsive object syntax for props that support it, like cols in Grid.
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Accessibility</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Always provide proper labels, aria attributes, and ensure keyboard navigation works. Connect components have built-in accessibility, but you need to use them correctly.
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Theme Awareness</h3>
              <p class="text-gray-700 dark:text-gray-300">
                Test your application in both light and dark modes to ensure good contrast and readability.
              </p>
            </div>
          </div>
        </section>
        
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Next Steps</h2>
          
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Now that you're familiar with the basics, explore these resources to learn more:
          </p>
          
          <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <a href="/docs/tokens/colors" class="text-primary-600 dark:text-primary-400 hover:underline">
                Design Tokens Documentation
              </a> - Learn about the design tokens that power the Connect system
            </li>
            <li>
              <a href="/docs/guidelines/accessibility" class="text-primary-600 dark:text-primary-400 hover:underline">
                Accessibility Guidelines
              </a> - Ensure your application is accessible to all users
            </li>
            <li>
              <a href="/docs/components/layout/container" class="text-primary-600 dark:text-primary-400 hover:underline">
                Component Documentation
              </a> - Detailed API documentation for all Connect components
            </li>
            <li>
              <a href="/docs/guidelines/anatomy" class="text-primary-600 dark:text-primary-400 hover:underline">
                Component Anatomy
              </a> - Learn about the patterns and structure of Connect components
            </li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
});
