import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  // Form state
  const selectedCountry = useSignal<string>("");
  const selectedCities = useSignal<string[]>([]);
  const selectedSkills = useSignal<string[]>([]);
  const customSkill = useSignal<string>("");
  
  // Dynamic options based on country selection
  const cityOptions = useSignal<{ value: string; label: string }[]>([]);
  
  // Validation states
  const countryError = useSignal<string>("");
  const citiesError = useSignal<string>("");
  const skillsError = useSignal<string>("");

  // Loading state for dynamic city loading
  const citiesLoading = useSignal(false);

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
  ];

  const skillOptions = useSignal([
    { value: "javascript", label: "JavaScript", group: "Programming" },
    { value: "typescript", label: "TypeScript", group: "Programming" },
    { value: "python", label: "Python", group: "Programming" },
    { value: "rust", label: "Rust", group: "Programming" },
    { value: "react", label: "React", group: "Frontend" },
    { value: "vue", label: "Vue.js", group: "Frontend" },
    { value: "qwik", label: "Qwik", group: "Frontend" },
    { value: "node", label: "Node.js", group: "Backend" },
    { value: "docker", label: "Docker", group: "DevOps" },
    { value: "kubernetes", label: "Kubernetes", group: "DevOps" },
    { value: "aws", label: "AWS", group: "Cloud" },
    { value: "azure", label: "Azure", group: "Cloud" },
  ]);

  // Mock city data
  const cityDatabase: Record<string, { value: string; label: string }[]> = {
    us: [
      { value: "nyc", label: "New York City" },
      { value: "la", label: "Los Angeles" },
      { value: "chicago", label: "Chicago" },
      { value: "houston", label: "Houston" },
      { value: "phoenix", label: "Phoenix" },
    ],
    ca: [
      { value: "toronto", label: "Toronto" },
      { value: "vancouver", label: "Vancouver" },
      { value: "montreal", label: "Montreal" },
      { value: "calgary", label: "Calgary" },
    ],
    uk: [
      { value: "london", label: "London" },
      { value: "manchester", label: "Manchester" },
      { value: "birmingham", label: "Birmingham" },
      { value: "glasgow", label: "Glasgow" },
    ],
    de: [
      { value: "berlin", label: "Berlin" },
      { value: "munich", label: "Munich" },
      { value: "hamburg", label: "Hamburg" },
      { value: "cologne", label: "Cologne" },
    ],
    fr: [
      { value: "paris", label: "Paris" },
      { value: "marseille", label: "Marseille" },
      { value: "lyon", label: "Lyon" },
      { value: "toulouse", label: "Toulouse" },
    ],
    jp: [
      { value: "tokyo", label: "Tokyo" },
      { value: "osaka", label: "Osaka" },
      { value: "kyoto", label: "Kyoto" },
      { value: "yokohama", label: "Yokohama" },
    ],
    au: [
      { value: "sydney", label: "Sydney" },
      { value: "melbourne", label: "Melbourne" },
      { value: "brisbane", label: "Brisbane" },
      { value: "perth", label: "Perth" },
    ],
  };

  // Load cities when country changes
  useTask$(({ track }) => {
    const country = track(() => selectedCountry.value);
    
    if (!country) {
      cityOptions.value = [];
      selectedCities.value = [];
      return;
    }

    const loadCities = async () => {
      citiesLoading.value = true;
      citiesError.value = "";
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        const cities = cityDatabase[country] || [];
        cityOptions.value = cities;
        // Clear selected cities when country changes
        selectedCities.value = [];
      } catch (error) {
        citiesError.value = "Failed to load cities";
      } finally {
        citiesLoading.value = false;
      }
    };

    loadCities();
  });

  // Validation functions
  const validateCountry = $(() => {
    if (!selectedCountry.value) {
      countryError.value = "Please select a country";
      return false;
    }
    countryError.value = "";
    return true;
  });

  const validateCities = $(() => {
    if (selectedCities.value.length === 0) {
      citiesError.value = "Please select at least one city";
      return false;
    }
    if (selectedCities.value.length > 3) {
      citiesError.value = "Please select no more than 3 cities";
      return false;
    }
    citiesError.value = "";
    return true;
  });

  const validateSkills = $(() => {
    if (selectedSkills.value.length < 2) {
      skillsError.value = "Please select at least 2 skills";
      return false;
    }
    skillsError.value = "";
    return true;
  });

  const addCustomSkill = $(() => {
    if (customSkill.value.trim()) {
      const newSkill = {
        value: customSkill.value.toLowerCase().replace(/\\s+/g, '-'),
        label: customSkill.value.trim(),
        group: "Custom"
      };
      
      skillOptions.value = [...skillOptions.value, newSkill];
      selectedSkills.value = [...selectedSkills.value, newSkill.value];
      customSkill.value = "";
    }
  });

  const handleSubmit = $(async () => {
    const isCountryValid = await validateCountry();
    const areCitiesValid = await validateCities();
    const areSkillsValid = await validateSkills();

    if (isCountryValid && areCitiesValid && areSkillsValid) {
      alert("Form is valid! Check console for values.");
      console.log({
        country: selectedCountry.value,
        cities: selectedCities.value,
        skills: selectedSkills.value
      });
    }
  });

  return (
    <div class="space-y-8">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Advanced Features Demo
        </h3>
        <p class="text-blue-800 dark:text-blue-200 text-sm">
          This example demonstrates dynamic options loading, validation, custom options,
          and form integration with the Select component.
        </p>
      </div>

      <div class="space-y-6">
        {/* Country Selection */}
        <div>
          <Select
            options={countryOptions}
            value={selectedCountry.value}
            onChange$={async (value) => {
              selectedCountry.value = value as string;
              await validateCountry();
            }}
            placeholder="Select your country"
            label="Country *"
            helperText="Selecting a country will load available cities"
            required={true}
            errorMessage={countryError.value}
            validation={countryError.value ? "invalid" : "default"}
            size="md"
          />
        </div>

        {/* Dynamic City Selection */}
        <div>
          <Select
            options={cityOptions.value}
            value={selectedCities.value}
            onChange$={async (values) => {
              selectedCities.value = values as string[];
              await validateCities();
            }}
            placeholder={
              !selectedCountry.value
                ? "Please select a country first"
                : citiesLoading.value
                ? "Loading cities..."
                : "Select cities"
            }
            label="Cities *"
            helperText="Select 1-3 cities where you'd like to work"
            required={true}
            multiple={true}
            disabled={!selectedCountry.value || citiesLoading.value}
            loading={citiesLoading.value}
            loadingText="Loading cities..."
            errorMessage={citiesError.value || citiesError.value}
            validation={citiesError.value || citiesError.value ? "invalid" : "default"}
            searchable={true}
            clearable={true}
            size="md"
          />
        </div>

        {/* Skills with Custom Addition */}
        <div class="space-y-3">
          <Select
            options={skillOptions.value}
            value={selectedSkills.value}
            onChange$={async (values) => {
              selectedSkills.value = values as string[];
              await validateSkills();
            }}
            placeholder="Select your skills"
            label="Skills *"
            helperText="Select at least 2 skills. Skills are grouped by category."
            required={true}
            multiple={true}
            searchable={true}
            clearable={true}
            errorMessage={skillsError.value}
            validation={skillsError.value ? "invalid" : "default"}
            showCheckboxes={true}
            size="md"
          />

          {/* Custom skill addition */}
          <div class="flex gap-2">
            <input
              type="text"
              value={customSkill.value}
              onInput$={(e) => customSkill.value = (e.target as HTMLInputElement).value}
              placeholder="Add a custom skill..."
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              onKeyDown$={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomSkill();
                }
              }}
            />
            <button
              type="button"
              onClick$={addCustomSkill}
              disabled={!customSkill.value.trim()}
              class="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div class="pt-4">
          <button
            type="button"
            onClick$={handleSubmit}
            class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
          >
            Validate & Submit
          </button>
        </div>

        {/* Current Selections Display */}
        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3">
            Current Selections:
          </h4>
          
          <div class="space-y-2 text-sm">
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">Country:</span>{" "}
              <span class="text-gray-600 dark:text-gray-400">
                {selectedCountry.value || "None"}
              </span>
            </div>
            
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">Cities:</span>{" "}
              <span class="text-gray-600 dark:text-gray-400">
                {selectedCities.value.length > 0 
                  ? `${selectedCities.value.length} selected: ${selectedCities.value.map(id => 
                      cityOptions.value.find(city => city.value === id)?.label || id
                    ).join(", ")}`
                  : "None"
                }
              </span>
            </div>
            
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">Skills:</span>{" "}
              <span class="text-gray-600 dark:text-gray-400">
                {selectedSkills.value.length > 0 
                  ? `${selectedSkills.value.length} selected: ${selectedSkills.value.map(id => 
                      skillOptions.value.find(skill => skill.value === id)?.label || id
                    ).join(", ")}`
                  : "None"
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});