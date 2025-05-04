import { component$, useContext, $ } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { convertStateToScript, StateConfigBuilder } from "~/utils/mikrotik";


export default component$(() => {
  const starContext = useContext(StarContext);
  const { state } = starContext;

  const generateScript = $(() => {
    const script = convertStateToScript(state);
    
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mikrotik-config.rsc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  const sendToRouter = $(async () => {
    const builder = new StateConfigBuilder(state);
    
    try {
      const endpoint = 'https://router.example.com/api/schema';
      const authToken = 'your-auth-token';
      
      const result = await builder.sendToRouter(endpoint, authToken);
      
      if (result.success) {
        alert('Configuration sent successfully!');
      } else {
        alert(`Error sending configuration: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  return (
    <div class="p-4 border rounded-lg bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        MikroTik Configuration
      </h2>
      
      <div class="flex flex-col gap-4">
        <button 
          onClick$={generateScript}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Download Configuration Script
        </button>
        
        <button 
          onClick$={sendToRouter}
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Send to Router
        </button>
      </div>
      
      <div class="mt-6 p-4 bg-gray-100 rounded-md dark:bg-gray-700">
        <h3 class="text-lg font-medium mb-2 text-gray-800 dark:text-white">
          How It Works
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          The MikroTik configuration library converts your router settings into a script 
          that can be applied to your MikroTik router. 
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          You can either download the script and manually apply it, or send it directly
          to your router via the API if your router is configured to accept API requests.
        </p>
      </div>
    </div>
  );
}); 