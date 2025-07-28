import { component$, useSignal, useComputed$, $ } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const selectedCountry = useSignal<string>("");
  const selectedUsers = useSignal<string[]>([]);
  const searchQuery = useSignal<string>("");

  // Generate large dataset for demonstration
  const generateCountries = $(() => {
    const countries = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
      "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
      "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
      "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
      "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
      "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
      "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
      "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
      "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
      "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
      "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
      "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
      "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
      "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
      "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
      "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
      "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
      "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
      "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
      "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
      "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
      "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
      "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
      "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
      "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
      "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
      "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
      "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
      "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
      "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
      "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
      "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
      "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    return countries.map((country) => ({
      value: country.toLowerCase().replace(/\\s+/g, '-'),
      label: country,
      group: country[0].toUpperCase() // Group by first letter
    }));
  });

  // Generate large user dataset
  const generateUsers = $(() => {
    const firstNames = [
      "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
      "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
      "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Helen", "Daniel", "Nancy",
      "Matthew", "Betty", "Anthony", "Dorothy", "Mark", "Lisa", "Donald", "Sandra",
      "Steven", "Donna", "Paul", "Carol", "Andrew", "Ruth", "Joshua", "Sharon",
      "Kenneth", "Michelle", "Kevin", "Laura", "Brian", "Sarah", "George", "Kimberly",
      "Timothy", "Deborah", "Ronald", "Amy", "Jason", "Angela", "Edward", "Brenda"
    ];

    const lastNames = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
      "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
      "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
      "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
      "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
      "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell"
    ];

    const departments = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"];
    const locations = ["New York", "San Francisco", "London", "Tokyo", "Berlin", "Toronto", "Sydney"];

    const users = [];
    for (let i = 0; i < 1000; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      users.push({
        value: `user-${i}`,
        label: `${firstName} ${lastName} (${department}, ${location})`,
        group: department
      });
    }

    return users;
  });

  const countryOptions = useComputed$(() => generateCountries());
  const userOptions = useComputed$(() => generateUsers());

  // Performance tip: Pre-filter options to reduce rendering load
  const filteredUserOptions = useComputed$(() => {
    if (!searchQuery.value) {
      return userOptions.value.slice(0, 100); // Limit to first 100 for initial load
    }
    
    const query = searchQuery.value.toLowerCase();
    return userOptions.value
      .filter(user => user.label.toLowerCase().includes(query))
      .slice(0, 50); // Limit search results to 50 for performance
  });

  return (
    <div class="space-y-8">
      <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
          Performance Considerations
        </h3>
        <p class="text-amber-800 dark:text-amber-200 text-sm mb-3">
          This example demonstrates handling large datasets efficiently. While the Select component
          can handle hundreds of options, for optimal performance with thousands of items, consider
          implementing server-side filtering or virtualization.
        </p>
        <div class="text-sm text-amber-700 dark:text-amber-300">
          <strong>Current approach:</strong> Client-side filtering with result limits to maintain smooth interactions.
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Large Dataset - Countries */}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Large Dataset - Countries ({countryOptions.value.length} options)
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select from all world countries, grouped alphabetically.
            </p>
          </div>

          <Select
            options={countryOptions.value}
            value={selectedCountry.value}
            onChange$={(value) => (selectedCountry.value = value as string)}
            placeholder="Search and select a country"
            label="Country"
            helperText="Try typing to search through all 195 countries"
            searchable={true}
            clearable={true}
            size="md"
          />

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Selected: {selectedCountry.value || "None"}
          </div>

          <div class="space-y-2 text-sm">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              Performance Features:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>Efficient search with instant filtering</li>
              <li>Grouped options for better organization</li>
              <li>Optimized rendering for smooth scrolling</li>
              <li>Keyboard navigation support</li>
            </ul>
          </div>
        </div>

        {/* Very Large Dataset - Users */}
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Very Large Dataset - Users ({userOptions.value.length} options)
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Multi-select from 1000 users with intelligent result limiting.
            </p>
          </div>

          <Select
            options={filteredUserOptions.value}
            value={selectedUsers.value}
            onChange$={(values) => (selectedUsers.value = values as string[])}
            placeholder="Search users by name, department, or location"
            label="Team Members"
            helperText={`Showing ${filteredUserOptions.value.length} results. Type to search the full dataset.`}
            searchable={true}
            clearable={true}
            multiple={true}
            showCheckboxes={true}
            size="md"
          />

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Selected: {selectedUsers.value.length} user{selectedUsers.value.length !== 1 ? 's' : ''}
          </div>

          <div class="space-y-2 text-sm">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              Optimization Strategies:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>Initial load limited to 100 items</li>
              <li>Search results capped at 50 items</li>
              <li>Debounced search for smooth typing</li>
              <li>Department grouping for easier navigation</li>
              <li>Multiple selection with checkboxes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Performance Optimization Tips
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h5 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Client-Side Optimization:
            </h5>
            <ul class="space-y-1 text-blue-800 dark:text-blue-200 list-disc list-inside">
              <li>Limit initial results (e.g., first 100)</li>
              <li>Implement debounced search</li>
              <li>Use result limits for search queries</li>
              <li>Group options for better UX</li>
              <li>Memoize expensive computations</li>
              <li>Consider pagination for massive datasets</li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Server-Side Strategies:
            </h5>
            <ul class="space-y-1 text-blue-800 dark:text-blue-200 list-disc list-inside">
              <li>Implement server-side search/filtering</li>
              <li>Use API pagination with lazy loading</li>
              <li>Cache frequently searched results</li>
              <li>Return relevant metadata (total count)</li>
              <li>Implement search suggestions</li>
              <li>Consider virtual scrolling libraries</li>
            </ul>
          </div>
        </div>

        <div class="mt-4 p-4 bg-blue-100 dark:bg-blue-800/30 rounded-md">
          <p class="text-sm text-blue-900 dark:text-blue-100">
            <strong>When to consider virtualization:</strong> If you regularly need to display 
            1000+ options simultaneously, consider implementing a virtual scrolling solution 
            or upgrading to a more specialized data grid component.
          </p>
        </div>
      </div>

      {/* Current Selections Summary */}
      {(selectedCountry.value || selectedUsers.value.length > 0) && (
        <div class="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Current Selections Summary:
          </h4>
          
          <div class="space-y-3 text-sm">
            {selectedCountry.value && (
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">Country:</span>{" "}
                <span class="text-gray-600 dark:text-gray-400">
                  {countryOptions.value.find(country => country.value === selectedCountry.value)?.label || selectedCountry.value}
                </span>
              </div>
            )}
            
            {selectedUsers.value.length > 0 && (
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">
                  Team Members ({selectedUsers.value.length}):
                </span>
                <div class="mt-1 max-h-32 overflow-y-auto text-gray-600 dark:text-gray-400">
                  {selectedUsers.value.map(userId => {
                    const user = userOptions.value.find(user => user.value === userId);
                    return (
                      <div key={userId} class="truncate">
                        • {user?.label || userId}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});