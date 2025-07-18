import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { routeLoader$, Form, routeAction$ } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

// Load credentials data
export const useCredentialsList = routeLoader$(async () => {
  // Create Supabase client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Get available credentials
  const { data: availableCredentials } = await supabase
    .from('l2tp_credentials')
    .select('*')
    .eq('is_assigned', false)
    .order('created_at', { ascending: false })
    .limit(50);
  
  return {
    availableCredentials: availableCredentials || []
  };
});

// Action to assign a credential
export const useAssignCredentialAction = routeAction$(async (data) => {
  const { id, platform, referrer } = data as { id: string; platform: string; referrer: string };
  
  // Create Supabase client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Get the credential first
    const { data: credential, error: fetchError } = await supabase
      .from('l2tp_credentials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError || !credential) {
      return {
        success: false,
        message: 'Credential not found'
      };
    }
    
    // Update the credential to mark as assigned and add metadata
    const { error: updateError } = await supabase
      .from('l2tp_credentials')
      .update({
        is_assigned: true,
        platform: platform || 'admin-panel',
        referrer: referrer || 'admin-panel',
        session_id: `admin_${Date.now()}`
      })
      .eq('id', id);
    
    if (updateError) {
      return {
        success: false,
        message: 'Failed to assign credential'
      };
    }
    
    return {
      success: true,
      message: 'Credential assigned successfully',
      credential
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred'
    };
  }
});

// Action to create a new credential
export const useCreateCredentialAction = routeAction$(async (data) => {
  const { username, password, server } = data as { 
    username: string; 
    password: string; 
    server: string;
  };
  
  // Create Supabase client
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Generate expiry date (6 months from now)
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 6);

  try {
    // Create the new credential
    const { data: newCredential, error } = await supabase
      .from('l2tp_credentials')
      .insert({
        username,
        password,
        server,
        expiry_date: expiryDate.toISOString(),
        is_assigned: false
      })
      .select()
      .single();
    
    if (error) {
      return {
        success: false,
        message: 'Failed to create credential'
      };
    }
    
    return {
      success: true,
      message: 'Credential created successfully',
      credential: newCredential
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred'
    };
  }
});

// Action to import credentials in bulk
export const useBulkImportAction = routeAction$(async (data, { fail }) => {
  const { credentials } = data as { credentials: string };
  
  if (!credentials) {
    return fail(400, {
      message: 'No credentials provided'
    });
  }
  
  try {
    // Parse the CSV data
    const rows = credentials.trim().split('\n');
    
    // Skip header row if it exists
    const startIndex = rows[0].includes('Username,Password,Server') ? 1 : 0;
    
    // Create an array of credential objects
    const credentialsList = [];
    for (let i = startIndex; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row.length >= 3) {
        credentialsList.push({
          username: row[0].trim(),
          password: row[1].trim(),
          server: row[2].trim(),
          // Optional fields
          platform: row.length > 3 ? row[3].trim() : null,
          expiry_date: row.length > 4 ? new Date(row[4].trim()).toISOString() : null
        });
      }
    }
    
    if (credentialsList.length === 0) {
      return fail(400, {
        message: 'No valid credentials found in the provided data'
      });
    }
    
    // Create Supabase client
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Generate expiry date (6 months from now) for credentials without one
    const defaultExpiryDate = new Date();
    defaultExpiryDate.setMonth(defaultExpiryDate.getMonth() + 6);
    
    // Add default values to credentials
    const credentialsWithDefaults = credentialsList.map(cred => ({
      ...cred,
      expiry_date: cred.expiry_date || defaultExpiryDate.toISOString(),
      is_assigned: false
    }));
    
    // Insert credentials in batches of 100 to avoid potential limitations
    const batchSize = 100;
    let insertedCount = 0;
    for (let i = 0; i < credentialsWithDefaults.length; i += batchSize) {
      const batch = credentialsWithDefaults.slice(i, i + batchSize);
      const { error } = await supabase.from('l2tp_credentials').insert(batch);
      
      if (error) {
        return fail(500, {
          message: `Error inserting batch starting at ${i}: ${error.message}`
        });
      }
      
      insertedCount += batch.length;
    }
    
    return {
      success: true,
      message: `Successfully imported ${insertedCount} credentials`
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return fail(500, {
      message: `An error occurred: ${errorMessage}`
    });
  }
});

export default component$(() => {
  const credentialsList = useCredentialsList();
  const assignAction = useAssignCredentialAction();
  const createAction = useCreateCredentialAction();
  
  const selectedCredential = useSignal<any>(null);
  const showCreateForm = useSignal(false);
  
  const newCredential = useStore({
    username: '',
    password: '',
    server: ''
  });
  
  const handleCredentialSelect = $((credential: any) => {
    selectedCredential.value = credential;
  });
  
  const toggleCreateForm = $(() => {
    showCreateForm.value = !showCreateForm.value;
  });
  
  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">VPN Credential Management</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Credentials List */}
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Available Credentials</h2>
              <button 
                onClick$={toggleCreateForm}
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                {showCreateForm.value ? 'Cancel' : 'Add New Credential'}
              </button>
            </div>
            
            {showCreateForm.value ? (
              <div class="mb-6 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 class="text-lg font-medium mb-4">Create New Credential</h3>
                <Form action={createAction}>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                      <input 
                        type="text" 
                        name="username" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                        onInput$={(e: any) => { newCredential.username = e.target.value; }}
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                      <input 
                        type="text" 
                        name="password" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                        onInput$={(e: any) => { newCredential.password = e.target.value; }}
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Server</label>
                      <input 
                        type="text" 
                        name="server" 
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                        onInput$={(e: any) => { newCredential.server = e.target.value; }}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                  >
                    Create Credential
                  </button>
                </Form>
                
                {createAction.value?.success === true && (
                  <div class="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                    {createAction.value.message}
                  </div>
                )}
                
                {createAction.value?.success === false && (
                  <div class="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    {createAction.value.message}
                  </div>
                )}
              </div>
            ) : (
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Server</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {credentialsList.value.availableCredentials.map((cred) => (
                      <tr key={cred.id}>
                        <td class="px-6 py-4 whitespace-nowrap">{cred.username}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{cred.server}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{new Date(cred.created_at).toLocaleString()}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick$={() => handleCredentialSelect(cred)}
                            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {credentialsList.value.availableCredentials.length === 0 && (
                      <tr>
                        <td colSpan={4} class="px-6 py-4 whitespace-nowrap text-center">No available credentials</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Credential Details Panel */}
        <div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-4">Credential Details</h2>
            
            {selectedCredential.value ? (
              <div>
                <div class="mb-4 space-y-2">
                  <div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Username:</span>
                    <p class="text-gray-900 dark:text-gray-100 font-medium">{selectedCredential.value.username}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Password:</span>
                    <p class="text-gray-900 dark:text-gray-100 font-medium">{selectedCredential.value.password}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Server:</span>
                    <p class="text-gray-900 dark:text-gray-100 font-medium">{selectedCredential.value.server}</p>
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Expiry Date:</span>
                    <p class="text-gray-900 dark:text-gray-100 font-medium">
                      {selectedCredential.value.expiry_date 
                        ? new Date(selectedCredential.value.expiry_date).toLocaleString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h3 class="text-lg font-medium mb-4">Assign Credential</h3>
                  <Form action={assignAction}>
                    <input type="hidden" name="id" value={selectedCredential.value.id} />
                    
                    <div class="mb-3">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
                      <input 
                        type="text" 
                        name="platform" 
                        placeholder="e.g., android, ios, windows" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                      />
                    </div>
                    
                    <div class="mb-4">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Referrer</label>
                      <input 
                        type="text" 
                        name="referrer" 
                        placeholder="e.g., admin-panel, website" 
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      Assign Credential
                    </button>
                  </Form>
                  
                  {assignAction.value?.success === true && (
                    <div class="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                      {assignAction.value.message}
                    </div>
                  )}
                  
                  {assignAction.value?.success === false && (
                    <div class="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                      {assignAction.value.message}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p class="text-gray-500 dark:text-gray-400 italic">Select a credential to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}); 