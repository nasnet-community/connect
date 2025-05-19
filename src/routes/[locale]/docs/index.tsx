import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  // Categories for our components
  const categories = [
    {
      id: "data-visualization",
      name: "Data Visualization",
      description: "Components for visualizing data, connections, and relationships",
      components: [
        {
          id: "graph",
          name: "Graph",
          description: "Interactive network graph visualization component",
          path: "/docs/components/graph"
        }
      ]
    },
    {
      id: "inputs",
      name: "Form Inputs",
      description: "Components for user input and form controls",
      components: []
    },
    {
      id: "feedback",
      name: "Feedback",
      description: "Components for user feedback and notifications",
      components: []
    },
    {
      id: "layout",
      name: "Layout",
      description: "Components for page layout and structure",
      components: []
    }
  ];

  return (
    <div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Component Documentation</h1>
        <p class="text-slate-600 dark:text-slate-300">
          Explore our library of reusable components with examples and usage guidelines
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <div 
            key={category.id}
            class="border border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-sm"
          >
            <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{category.name}</h2>
            <p class="text-slate-600 dark:text-slate-300 mb-4 text-sm">{category.description}</p>
            
            <div class="space-y-3">
              {category.components.length > 0 ? (
                category.components.map((component) => (
                  <Link 
                    key={component.id}
                    href={component.path}
                    class="flex items-center justify-between p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div>
                      <h3 class="font-medium text-slate-800 dark:text-white">{component.name}</h3>
                      <p class="text-sm text-slate-500 dark:text-slate-400">{component.description}</p>
                    </div>
                    <div class="text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))
              ) : (
                <div class="text-center py-6 text-slate-400 dark:text-slate-500 italic text-sm">
                  Components coming soon
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
