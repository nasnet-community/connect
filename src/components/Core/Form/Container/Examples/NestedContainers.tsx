import { component$ } from "@builder.io/qwik";
import { Container } from "../";

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
            class="rounded-md bg-gray-50 p-4 dark:bg-gray-800"
          >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  class="mb-1 block text-sm font-medium"
                  for="first-name-nested"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name-nested"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div>
                <label
                  class="mb-1 block text-sm font-medium"
                  for="last-name-nested"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name-nested"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium" for="dob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium" for="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
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
            class="rounded-md bg-gray-50 p-4 dark:bg-gray-800"
          >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  class="mb-1 block text-sm font-medium"
                  for="email-nested"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email-nested"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div>
                <label
                  class="mb-1 block text-sm font-medium"
                  for="phone-nested"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-nested"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div class="md:col-span-2">
                <label class="mb-1 block text-sm font-medium" for="address">
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                ></textarea>
              </div>
            </div>
          </Container>
        </div>

        <div
          q:slot="footer"
          class="flex justify-end gap-2 border-t border-gray-200 pt-4 dark:border-gray-700"
        >
          <button class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            Cancel
          </button>
          <button class="rounded-md bg-primary-600 px-4 py-2 text-white">
            Save Profile
          </button>
        </div>
      </Container>
    </div>
  );
});
