import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { Select, Spinner } from "../../index";
import type { SelectOption } from "../index";

// Simulated API responses
interface Country {
  code: string;
  name: string;
  region: string;
  population: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

// Mock data for demonstration
const MOCK_COUNTRIES: Country[] = [
  { code: "US", name: "United States", region: "North America", population: 331000000 },
  { code: "CA", name: "Canada", region: "North America", population: 38000000 },
  { code: "GB", name: "United Kingdom", region: "Europe", population: 67000000 },
  { code: "DE", name: "Germany", region: "Europe", population: 83000000 },
  { code: "FR", name: "France", region: "Europe", population: 67000000 },
  { code: "JP", name: "Japan", region: "Asia", population: 125000000 },
  { code: "AU", name: "Australia", region: "Oceania", population: 25000000 },
  { code: "BR", name: "Brazil", region: "South America", population: 215000000 },
  { code: "IN", name: "India", region: "Asia", population: 1380000000 },
  { code: "CN", name: "China", region: "Asia", population: 1440000000 },
];

const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", department: "Engineering" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", department: "Design" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", department: "Marketing" },
  { id: "4", name: "David Wilson", email: "david@example.com", department: "Engineering" },
  { id: "5", name: "Emma Brown", email: "emma@example.com", department: "Sales" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", department: "Engineering" },
  { id: "7", name: "Grace Lee", email: "grace@example.com", department: "Design" },
  { id: "8", name: "Henry Clark", email: "henry@example.com", department: "Marketing" },
];

// Simulated API functions
const fetchCountries = $(async (searchQuery?: string): Promise<Country[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  
  let result = MOCK_COUNTRIES;
  
  if (searchQuery && searchQuery.length > 0) {
    result = MOCK_COUNTRIES.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return result;
});

const fetchUsers = $(async (searchQuery?: string): Promise<User[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
  
  // Simulate occasional API failure
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch users. Please try again.");
  }
  
  let result = MOCK_USERS;
  
  if (searchQuery && searchQuery.length > 0) {
    result = MOCK_USERS.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return result;
});

export default component$(() => {
  // Country select state
  const countryOptions = useSignal<SelectOption[]>([]);
  const countryLoading = useSignal(false);
  const countryError = useSignal<string>("");
  const selectedCountry = useSignal<string>("");
  const countrySearchQuery = useSignal<string>("");

  // User select state
  const userOptions = useSignal<SelectOption[]>([]);
  const userLoading = useSignal(false);
  const userError = useSignal<string>("");
  const selectedUsers = useSignal<string[]>([]);
  const userSearchQuery = useSignal<string>("");

  // Load countries on component mount
  useTask$(async () => {
    countryLoading.value = true;
    countryError.value = "";
    
    try {
      const countries = await fetchCountries();
      countryOptions.value = countries.map(country => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
        group: country.region,
      }));
    } catch (error) {
      countryError.value = error instanceof Error ? error.message : "Failed to load countries";
    } finally {
      countryLoading.value = false;
    }
  });

  // Load users on component mount
  useTask$(async () => {
    userLoading.value = true;
    userError.value = "";
    
    try {
      const users = await fetchUsers();
      userOptions.value = users.map(user => ({
        value: user.id,
        label: `${user.name} (${user.email})`,
        group: user.department,
      }));
    } catch (error) {
      userError.value = error instanceof Error ? error.message : "Failed to load users";
    } finally {
      userLoading.value = false;
    }
  });

  // Search countries when search query changes
  useTask$(({ track }) => {
    const query = track(() => countrySearchQuery.value);
    
    if (query.length === 0) return; // Don't search on empty query for this example
    
    const searchCountries = async () => {
      countryLoading.value = true;
      countryError.value = "";
      
      try {
        const countries = await fetchCountries(query);
        countryOptions.value = countries.map(country => ({
          value: country.code,
          label: `${country.name} (${country.code})`,
          group: country.region,
        }));
      } catch (error) {
        countryError.value = error instanceof Error ? error.message : "Search failed";
      } finally {
        countryLoading.value = false;
      }
    };
    
    // Debounce search
    const timeoutId = setTimeout(searchCountries, 500);
    return () => clearTimeout(timeoutId);
  });

  // Search users when search query changes
  useTask$(({ track }) => {
    const query = track(() => userSearchQuery.value);
    
    if (query.length === 0) return; // Don't search on empty query for this example
    
    const searchUsers = async () => {
      userLoading.value = true;
      userError.value = "";
      
      try {
        const users = await fetchUsers(query);
        userOptions.value = users.map(user => ({
          value: user.id,
          label: `${user.name} (${user.email})`,
          group: user.department,
        }));
      } catch (error) {
        userError.value = error instanceof Error ? error.message : "Search failed";
      } finally {
        userLoading.value = false;
      }
    };
    
    // Debounce search
    const timeoutId = setTimeout(searchUsers, 500);
    return () => clearTimeout(timeoutId);
  });

  const handleRetryCountries = $(async () => {
    countryLoading.value = true;
    countryError.value = "";
    
    try {
      const countries = await fetchCountries();
      countryOptions.value = countries.map(country => ({
        value: country.code,
        label: `${country.name} (${country.code})`,
        group: country.region,
      }));
    } catch (error) {
      countryError.value = error instanceof Error ? error.message : "Failed to load countries";
    } finally {
      countryLoading.value = false;
    }
  });

  const handleRetryUsers = $(async () => {
    userLoading.value = true;
    userError.value = "";
    
    try {
      const users = await fetchUsers();
      userOptions.value = users.map(user => ({
        value: user.id,
        label: `${user.name} (${user.email})`,
        group: user.department,
      }));
    } catch (error) {
      userError.value = error instanceof Error ? error.message : "Failed to load users";
    } finally {
      userLoading.value = false;
    }
  });

  return (
    <div class="space-y-8">
      {/* Country Select - Single Selection with Search */}
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Country Selection (Single)
        </h3>
        
        <div class="relative">
          <Select
            options={countryOptions.value}
            value={selectedCountry.value}
            onChange$={(value) => (selectedCountry.value = value as string)}
            placeholder={countryLoading.value ? "Loading countries..." : "Select a country"}
            label="Country"
            helperText="Countries are grouped by region. Search by name or code."
            searchable={true}
            clearable={true}
            disabled={countryLoading.value}
            errorMessage={countryError.value}
          />
          
          {/* Loading indicator overlay */}
          {countryLoading.value && (
            <div class="absolute inset-y-0 right-10 flex items-center">
              <Spinner size="sm" />
            </div>
          )}
        </div>

        {/* Error state with retry */}
        {countryError.value && (
          <div class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-red-800 dark:text-red-200">{countryError.value}</p>
                <button
                  type="button"
                  onClick$={handleRetryCountries}
                  disabled={countryLoading.value}
                  class="mt-2 inline-flex items-center rounded-md bg-red-100 dark:bg-red-800 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700 disabled:opacity-50"
                >
                  {countryLoading.value ? (
                    <>
                      <Spinner size="xs" class="mr-1" />
                      Retrying...
                    </>
                  ) : (
                    "Retry"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selection display */}
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected country: {selectedCountry.value || "None"}
        </div>
      </div>

      {/* User Select - Multiple Selection with Async Search */}
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          User Selection (Multiple)
        </h3>
        
        <div class="relative">
          <Select
            options={userOptions.value}
            value={selectedUsers.value}
            onChange$={(values) => (selectedUsers.value = values as string[])}
            placeholder={userLoading.value ? "Loading users..." : "Select users"}
            label="Team Members"
            helperText="Users are grouped by department. Search by name, email, or department."
            multiple={true}
            searchable={true}
            clearable={true}
            disabled={userLoading.value}
            errorMessage={userError.value}
          />
          
          {/* Loading indicator overlay */}
          {userLoading.value && (
            <div class="absolute inset-y-0 right-10 flex items-center">
              <Spinner size="sm" />
            </div>
          )}
        </div>

        {/* Error state with retry */}
        {userError.value && (
          <div class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-red-800 dark:text-red-200">{userError.value}</p>
                <button
                  type="button"
                  onClick$={handleRetryUsers}
                  disabled={userLoading.value}
                  class="mt-2 inline-flex items-center rounded-md bg-red-100 dark:bg-red-800 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700 disabled:opacity-50"
                >
                  {userLoading.value ? (
                    <>
                      <Spinner size="xs" class="mr-1" />
                      Retrying...
                    </>
                  ) : (
                    "Retry"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selection display */}
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Selected users: {selectedUsers.value.length > 0 ? `${selectedUsers.value.length} selected` : "None"}
          {selectedUsers.value.length > 0 && (
            <div class="mt-1 text-xs">
              {selectedUsers.value.map(userId => {
                const user = userOptions.value.find(opt => opt.value === userId);
                return user ? user.label : userId;
              }).join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Information Panel */}
      <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-6">
        <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Async Loading Features Demonstrated
        </h4>
        
        <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Initial data loading:</strong> Both selects load data on component mount</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Loading states:</strong> Spinners and disabled states during API calls</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Search functionality:</strong> Type to search countries or users with debounced API calls</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Error handling:</strong> Displays error messages with retry functionality</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Grouped options:</strong> Countries grouped by region, users by department</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Single vs Multiple:</strong> Country select supports single selection, user select supports multiple</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2">•</span>
            <span><strong>Simulated failures:</strong> Users API has 10% failure rate to demonstrate error handling</span>
          </li>
        </ul>

        <div class="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-md">
          <p class="text-xs text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> This example uses mock data with simulated network delays and occasional failures to demonstrate real-world async behavior.
            In a production environment, replace the mock functions with actual API calls.
          </p>
        </div>
      </div>
    </div>
  );
});