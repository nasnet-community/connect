import { component$ } from '@builder.io/qwik';
import { FormLabel } from '../index';

export default component$(() => {
  return (
    <div class="space-y-4">
      <div>
        <FormLabel for="username">Username</FormLabel>
        <input 
          id="username" 
          type="text" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="Enter username"
        />
      </div>
      
      <div>
        <FormLabel for="email">Email Address</FormLabel>
        <input 
          id="email" 
          type="email" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <FormLabel for="password" required>Password</FormLabel>
        <input 
          id="password" 
          type="password" 
          class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md" 
          placeholder="********"
          required
        />
        <small class="block mt-1 text-sm text-gray-500 dark:text-gray-400">
          Must be at least 8 characters
        </small>
      </div>
    </div>
  );
});
