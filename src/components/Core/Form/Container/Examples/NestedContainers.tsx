import { component$ } from '@builder.io/qwik';
import { Container } from '../';

/**
 * NestedContainers demonstrates how to effectively nest Container components
 * to create organized, hierarchical form layouts.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <Container 
        title="User Profile" 
        description="Create your user profile with the following information."
      >
        <div class="space-y-6">
          <Container 
            title="Personal Information" 
            bordered={false}
            class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="first-name-nested">First Name</label>
                <input
                  type="text"
                  id="first-name-nested"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="last-name-nested">Last Name</label>
                <input
                  type="text"
                  id="last-name-nested"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="gender">Gender</label>
                <select
                  id="gender"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
          </Container>
          
          <Container 
            title="Contact Details" 
            bordered={false}
            class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="email-nested">Email Address</label>
                <input
                  type="email"
                  id="email-nested"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="phone-nested">Phone Number</label>
                <input
                  type="tel"
                  id="phone-nested"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1" for="address">Address</label>
                <textarea
                  id="address"
                  rows={3}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                ></textarea>
              </div>
            </div>
          </Container>
        </div>
        
        <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
            Cancel
          </button>
          <button class="px-4 py-2 bg-primary-600 text-white rounded-md">
            Save Profile
          </button>
        </div>
      </Container>
    </div>
  );
}); 