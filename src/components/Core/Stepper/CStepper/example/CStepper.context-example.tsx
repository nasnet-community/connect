import { component$, useSignal, $ } from "@builder.io/qwik";
import  { 
    type CStepMeta, 
    CStepper, 
    createStepperContext, 
    useStepperContext 
} from "../index";

// 1. Define data interface for our stepper context
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    theme: string;
    language: string;
  };
}

// 2. Create a context ID for our stepper
const userRegistrationContext = createStepperContext<UserRegistrationData>("user-registration");

// 3. Create step components that use context directly
const PersonalInfoStep = component$(() => {
  // Access context data directly in the step component
  const context = useStepperContext<UserRegistrationData>(userRegistrationContext);
  const { data } = context;
  
  // Create local signals for form state
  const firstName = useSignal(data.firstName || "");
  const lastName = useSignal(data.lastName || "");
  
  // Update context data when form changes - wrapped with $() for serializability
  const updateData$ = $(() => {
    data.firstName = firstName.value;
    data.lastName = lastName.value;
    
    // Mark step as complete if both fields have values
    if (firstName.value && lastName.value) {
      context.updateStepCompletion$(context.steps.value[0].id, true);
    } else {
      context.updateStepCompletion$(context.steps.value[0].id, false);
    }
  });
  
  return (
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name
          </label>
          <input 
            type="text" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={firstName.value}
            onInput$={(e, el) => {
              firstName.value = el.value;
              updateData$();
            }}
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name
          </label>
          <input 
            type="text" 
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={lastName.value}
            onInput$={(e, el) => {
              lastName.value = el.value;
              updateData$();
            }}
          />
        </div>
      </div>
      
      {/* Navigation Buttons (Alternative approach) */}
      <div class="mt-6 flex justify-end">
        <button
          onClick$={() => context.nextStep$()}
          disabled={!context.steps.value[0].isComplete}
          class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${context.steps.value[0].isComplete 
                  ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
        >
          <span>Next Step</span>
        </button>
      </div>
    </div>
  );
});

const ContactDetailsStep = component$(() => {
  // Access context data directly in the step component
  const context = useStepperContext<UserRegistrationData>(userRegistrationContext);
  const { data } = context;
  
  // Create local signals for form state
  const email = useSignal(data.email || "");
  const phone = useSignal(data.phone || "");
  
  // Update context data when form changes - wrapped with $() for serializability
  const updateData$ = $(() => {
    data.email = email.value;
    data.phone = phone.value;
    
    // Mark step as complete if email has a value (simple validation)
    if (email.value && email.value.includes('@')) {
      context.updateStepCompletion$(context.steps.value[1].id, true);
    } else {
      context.updateStepCompletion$(context.steps.value[1].id, false);
    }
  });
  
  return (
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <input 
          type="email" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={email.value}
          onInput$={(e, el) => {
            email.value = el.value;
            updateData$();
          }}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number
        </label>
        <input 
          type="tel" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={phone.value}
          onInput$={(e, el) => {
            phone.value = el.value;
            updateData$();
          }}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      {/* Navigation Buttons */}
      <div class="mt-6 flex justify-between">
        <button
          onClick$={() => context.prevStep$()}
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 
                focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 
                dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <span>Back</span>
        </button>
        
        <button
          onClick$={() => context.nextStep$()}
          disabled={!context.steps.value[1].isComplete}
          class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${context.steps.value[1].isComplete 
                  ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
        >
          <span>Next Step</span>
        </button>
      </div>
    </div>
  );
});

const PreferencesStep = component$(() => {
  // Access context data directly in the step component
  const context = useStepperContext<UserRegistrationData>(userRegistrationContext);
  const { data } = context;
  
  // Initialize preferences if not set
  if (!data.preferences) {
    data.preferences = {
      emailNotifications: true,
      smsNotifications: false,
      theme: 'system',
      language: 'en'
    };
  }
  
  // Create local signals for form state
  const emailNotifications = useSignal(data.preferences.emailNotifications);
  const smsNotifications = useSignal(data.preferences.smsNotifications);
  const theme = useSignal(data.preferences.theme);
  const language = useSignal(data.preferences.language);
  
  // Update context data when form changes - wrapped with $() for serializability
  const updateData$ = $(() => {
    data.preferences = {
      emailNotifications: emailNotifications.value,
      smsNotifications: smsNotifications.value,
      theme: theme.value,
      language: language.value
    };
    
    // This step is always complete once viewed
    context.updateStepCompletion$(context.steps.value[2].id, true);
  });
  
  // Mark step as complete on first render (use $ to ensure this runs after render)
  updateData$();
  
  return (
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Communication Preferences
        </label>
        <div class="space-y-2">
          <div class="flex items-center">
            <input 
              id="email-notifications" 
              type="checkbox" 
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              checked={emailNotifications.value}
              onChange$={(e, el) => {
                emailNotifications.value = el.checked;
                updateData$();
              }}
            />
            <label for="email-notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Email Notifications
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="sms-notifications" 
              type="checkbox" 
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              checked={smsNotifications.value}
              onChange$={(e, el) => {
                smsNotifications.value = el.checked;
                updateData$();
              }}
            />
            <label for="sms-notifications" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              SMS Notifications
            </label>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Theme Preference
        </label>
        <select 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={theme.value}
          onChange$={(e, el) => {
            theme.value = el.value;
            updateData$();
          }}
        >
          <option value="system">System Default</option>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <select 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={language.value}
          onChange$={(e, el) => {
            language.value = el.value;
            updateData$();
          }}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      
      {/* Navigation Buttons */}
      <div class="mt-6 flex justify-between">
        <button
          onClick$={() => context.prevStep$()}
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 
                focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 
                dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <span>Back</span>
        </button>
        
        <button
          onClick$={() => console.log("Completed registration:", data)}
          class="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          <span>Save & Complete</span>
        </button>
      </div>
    </div>
  );
});

export const CStepperContextExample = component$(() => {
  // Define initial data for context
  const initialData: UserRegistrationData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      theme: "system",
      language: "en"
    }
  };

  // Define steps with direct component references
  const steps: CStepMeta[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Enter your basic personal information",
      component: <PersonalInfoStep />,
      isComplete: false
    },
    {
      id: 2,
      title: "Contact Details",
      description: "Provide your contact information",
      component: <ContactDetailsStep />,
      isComplete: false
    },
    {
      id: 3,
      title: "Preferences",
      description: "Set your account preferences",
      component: <PreferencesStep />,
      isComplete: false
    }
  ];

  return (
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        User Registration (with Context)
      </h1>

      <CStepper 
        steps={steps}
        contextId={userRegistrationContext}
        contextValue={initialData}
        onComplete$={() => console.log("Registration completed with data:", initialData)}
      />
    </div>
  );
}); 