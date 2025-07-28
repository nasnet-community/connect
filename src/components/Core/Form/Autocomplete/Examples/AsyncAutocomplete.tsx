import { component$, useStore, $ } from "@builder.io/qwik";
import { Autocomplete } from "../Autocomplete";
import type { AutocompleteOption } from "../Autocomplete.types";

/**
 * Async Autocomplete Example
 * 
 * Demonstrates how to implement autocomplete with async data loading,
 * including debouncing, error handling, and loading states.
 */

// Mock API data
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Developer" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Designer" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
  { id: "4", name: "Alice Wilson", email: "alice@example.com", role: "Developer" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "QA Engineer" },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "Product Manager" },
  { id: "7", name: "Ethan Hunt", email: "ethan@example.com", role: "Security Analyst" },
  { id: "8", name: "Fiona Green", email: "fiona@example.com", role: "UX Researcher" },
];

const mockProducts = [
  { id: "p1", name: "Laptop Pro", category: "Electronics", price: "$1299" },
  { id: "p2", name: "Wireless Headphones", category: "Audio", price: "$199" },
  { id: "p3", name: "Smart Watch", category: "Wearables", price: "$399" },
  { id: "p4", name: "Gaming Mouse", category: "Gaming", price: "$79" },
  { id: "p5", name: "Mechanical Keyboard", category: "Gaming", price: "$149" },
  { id: "p6", name: "Webcam HD", category: "Electronics", price: "$89" },
];

export default component$(() => {
  // State for different async examples
  const userState = useStore({
    selectedUser: "",
    inputValue: "",
    options: [] as AutocompleteOption[],
    loading: false,
    error: "",
  });

  const productState = useStore({
    selectedProduct: "",
    options: [] as AutocompleteOption[],
    loading: false,
    error: "",
  });

  const locationState = useStore({
    selectedLocation: "",
    options: [] as AutocompleteOption[],
    loading: false,
  });

  // Simulate API call with debouncing for users
  const searchUsers = $(async (query: string) => {
    if (query.length < 2) {
      userState.options = [];
      return;
    }

    userState.loading = true;
    userState.error = "";

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate potential API error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch users");
      }

      // Filter users based on query
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
      );

      userState.options = filtered.map(user => ({
        value: user.id,
        label: `${user.name} (${user.email})`,
        group: user.role,
      }));

    } catch (error) {
      userState.error = "Failed to load users. Please try again.";
      userState.options = [];
    } finally {
      userState.loading = false;
    }
  });

  // Simulate instant product search (cached data)
  const searchProducts = $(async (query: string) => {
    if (query.length < 1) {
      productState.options = [];
      return;
    }

    productState.loading = true;

    // Simulate quick response for cached data
    await new Promise(resolve => setTimeout(resolve, 200));

    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    productState.options = filtered.map(product => ({
      value: product.id,
      label: `${product.name} - ${product.price}`,
      group: product.category,
    }));

    productState.loading = false;
  });

  // Simulate location API with pagination
  const searchLocations = $(async (query: string) => {
    if (query.length < 3) {
      locationState.options = [];
      return;
    }

    locationState.loading = true;

    try {
      // Simulate geocoding API
      await new Promise(resolve => setTimeout(resolve, 600));

      // Mock location data
      const mockLocations = [
        `${query}, New York, NY`,
        `${query}, Los Angeles, CA`,
        `${query}, Chicago, IL`,
        `${query}, Houston, TX`,
        `${query}, Phoenix, AZ`,
      ];

      locationState.options = mockLocations.map((location, index) => ({
        value: `loc_${index}`,
        label: location,
      }));

    } catch (error) {
      locationState.options = [];
    } finally {
      locationState.loading = false;
    }
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Async Autocomplete Examples
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Demonstrates various async patterns including debounced search, error handling, and loading states.
        </p>
      </div>

      {/* User Search with Error Handling */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            User Search (with Error Handling)
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Search for users with name, email, or role. Includes error simulation and retry functionality.
          </p>
        </div>
        
        <Autocomplete
          value={userState.selectedUser}
          inputValue={userState.inputValue}
          options={userState.options}
          loading={userState.loading}
          error={userState.error}
          label="Search Users"
          placeholder="Type to search users (min 2 chars)..."
          helperText="Search by name, email, or role"
          minCharsToSearch={2}
          loadingText="Searching users..."
          noOptionsText="No users found matching your search"
          onInputChange$={(value) => {
            userState.inputValue = value;
            searchUsers(value);
          }}
          onValueChange$={(value) => {
            userState.selectedUser = value;
          }}
          class="max-w-md"
        />

        {userState.selectedUser && (
          <div class="rounded-md bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 p-3">
            <p class="text-sm text-success-800 dark:text-success-200">
              Selected user: {userState.options.find(opt => opt.value === userState.selectedUser)?.label}
            </p>
          </div>
        )}
      </div>

      {/* Fast Product Search */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Product Search (Fast Response)
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Quick product search with cached data simulation.
          </p>
        </div>

        <Autocomplete
          value={productState.selectedProduct}
          options={productState.options}
          loading={productState.loading}
          label="Search Products"
          placeholder="Search products..."
          helperText="Search by product name or category"
          loadingText="Loading products..."
          highlightMatches={true}
          onInputChange$={(value) => {
            searchProducts(value);
          }}
          onValueChange$={(value) => {
            productState.selectedProduct = value;
          }}
          class="max-w-md"
        />

        {productState.selectedProduct && (
          <div class="rounded-md bg-info-50 dark:bg-info-950 border border-info-200 dark:border-info-800 p-3">
            <p class="text-sm text-info-800 dark:text-info-200">
              Selected product: {productState.options.find(opt => opt.value === productState.selectedProduct)?.label}
            </p>
          </div>
        )}
      </div>

      {/* Location Search */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Location Search (Geocoding API Simulation)
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Location autocomplete simulating a geocoding service.
          </p>
        </div>

        <Autocomplete
          value={locationState.selectedLocation}
          options={locationState.options}
          loading={locationState.loading}
          label="Search Locations"
          placeholder="Enter a location (min 3 chars)..."
          helperText="Type a city, state, or address"
          minCharsToSearch={3}
          loadingText="Finding locations..."
          noOptionsText="No locations found"
          allowCustomValue={true}
          onInputChange$={(value) => {
            searchLocations(value);
          }}
          onValueChange$={(value) => {
            locationState.selectedLocation = value;
          }}
          class="max-w-md"
        />

        {locationState.selectedLocation && (
          <div class="rounded-md bg-warning-50 dark:bg-warning-950 border border-warning-200 dark:border-warning-800 p-3">
            <p class="text-sm text-warning-800 dark:text-warning-200">
              Selected location: {locationState.options.find(opt => opt.value === locationState.selectedLocation)?.label || locationState.selectedLocation}
            </p>
          </div>
        )}
      </div>

      {/* Implementation Details */}
      <div class="mt-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Implementation Notes
        </h3>
        <div class="space-y-3 text-sm text-text-secondary dark:text-text-dark-secondary">
          <div class="flex items-start gap-2">
            <span class="text-primary-600 dark:text-primary-400">•</span>
            <div>
              <strong>Debouncing:</strong> User search waits 800ms after user stops typing to reduce API calls
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-600 dark:text-primary-400">•</span>
            <div>
              <strong>Error Handling:</strong> User search includes 10% error simulation with user-friendly messages
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-600 dark:text-primary-400">•</span>
            <div>
              <strong>Performance:</strong> Product search uses cached data pattern for faster responses
            </div>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-primary-600 dark:text-primary-400">•</span>
            <div>
              <strong>Minimum Characters:</strong> Different thresholds prevent unnecessary API calls
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});