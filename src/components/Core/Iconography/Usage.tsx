import { component$ } from "@builder.io/qwik";
import Icon from "./Icon";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  SearchIcon,
  BellIcon,
  HeartIcon,
  StarIcon,
  EmailIcon,
} from "./icons";

/**
 * Usage component for the Icon system.
 * 
 * This component provides practical implementation examples showing how to use
 * the Icon component in real-world scenarios with code examples and best practices.
 */
export const Usage = component$(() => {
  return (
    <div class="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Icon Component Usage Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Practical examples and implementation patterns for using icons effectively 
          in your Qwik applications.
        </p>
      </div>

      {/* Quick Start */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Quick Start
        </h2>
        
        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              1. Import the Icon Component
            </h3>
            <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              <div class="space-y-1">
                <div>
                  <span class="text-blue-400">import</span> {`{ Icon, HomeIcon }`} <span class="text-blue-400">from</span> <span class="text-yellow-300">"~/components/Core/Iconography"</span>;
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              2. Use in Your Component
            </h3>
            <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              <div class="space-y-1">
                <div><span class="text-red-400">&lt;Icon</span> <span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{HomeIcon}`}</span> <span class="text-red-400">/&gt;</span></div>
              </div>
            </div>
            <div class="mt-4 flex items-center space-x-2">
              <span class="text-gray-600 dark:text-gray-400">Result:</span>
              <Icon icon={HomeIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section class="space-y-8">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Common Usage Patterns
        </h2>
        
        {/* Navigation */}
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            Navigation Menus
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Example</h4>
              <div class="bg-white dark:bg-gray-900 border rounded-lg p-4">
                <nav class="space-y-1">
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md">
                    <Icon icon={HomeIcon} size="sm" color="primary" fixedWidth />
                    <span>Dashboard</span>
                  </a>
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Icon icon={UserIcon} size="sm" color="on-surface-variant" fixedWidth />
                    <span>Profile</span>
                  </a>
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Icon icon={SettingsIcon} size="sm" color="on-surface-variant" fixedWidth />
                    <span>Settings</span>
                  </a>
                </nav>
              </div>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Code</h4>
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                <div class="space-y-1">
                  <div><span class="text-red-400">&lt;nav</span> <span class="text-blue-400">class</span>=<span class="text-yellow-300">"space-y-1"</span><span class="text-red-400">&gt;</span></div>
                  <div class="pl-2">
                    <div><span class="text-red-400">&lt;a</span> <span class="text-blue-400">class</span>=<span class="text-yellow-300">"flex items-center space-x-3..."</span><span class="text-red-400">&gt;</span></div>
                    <div class="pl-2">
                      <div><span class="text-red-400">&lt;Icon</span> <span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{HomeIcon}`}</span> <span class="text-blue-400">size</span>=<span class="text-yellow-300">"sm"</span> <span class="text-blue-400">fixedWidth</span> <span class="text-red-400">/&gt;</span></div>
                      <div><span class="text-red-400">&lt;span&gt;</span>Dashboard<span class="text-red-400">&lt;/span&gt;</span></div>
                    </div>
                    <div><span class="text-red-400">&lt;/a&gt;</span></div>
                  </div>
                  <div><span class="text-red-400">&lt;/nav&gt;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            Status Messages
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Example</h4>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
                  <Icon icon={CheckCircleIcon} size="sm" color="success" />
                  <span class="text-success-800 dark:text-success-200">Operation completed successfully</span>
                </div>
                <div class="flex items-center space-x-3 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
                  <Icon icon={XCircleIcon} size="sm" color="error" />
                  <span class="text-error-800 dark:text-error-200">An error occurred</span>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Code</h4>
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                <div class="space-y-1">
                  <div><span class="text-gray-500">// Success message</span></div>
                  <div><span class="text-red-400">&lt;div</span> <span class="text-blue-400">class</span>=<span class="text-yellow-300">"flex items-center space-x-3 p-4 bg-success-50..."</span><span class="text-red-400">&gt;</span></div>
                  <div class="pl-2">
                    <div><span class="text-red-400">&lt;Icon</span> <span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{CheckCircleIcon}`}</span> <span class="text-blue-400">color</span>=<span class="text-yellow-300">"success"</span> <span class="text-red-400">/&gt;</span></div>
                    <div><span class="text-red-400">&lt;span&gt;</span>Success message<span class="text-red-400">&lt;/span&gt;</span></div>
                  </div>
                  <div><span class="text-red-400">&lt;/div&gt;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            Form Fields
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Example</h4>
              <div class="space-y-3">
                <div class="relative">
                  <Icon 
                    icon={SearchIcon} 
                    size="sm" 
                    color="muted" 
                    class="absolute left-3 top-1/2 transform -translate-y-1/2" 
                  />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div class="relative">
                  <Icon 
                    icon={EmailIcon} 
                    size="sm" 
                    color="muted" 
                    class="absolute left-3 top-1/2 transform -translate-y-1/2" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Code</h4>
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                <div class="space-y-1">
                  <div><span class="text-red-400">&lt;div</span> <span class="text-blue-400">class</span>=<span class="text-yellow-300">"relative"</span><span class="text-red-400">&gt;</span></div>
                  <div class="pl-2">
                    <div><span class="text-red-400">&lt;Icon</span></div>
                    <div class="pl-2">
                      <div><span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{SearchIcon}`}</span></div>
                      <div><span class="text-blue-400">size</span>=<span class="text-yellow-300">"sm"</span></div>
                      <div><span class="text-blue-400">color</span>=<span class="text-yellow-300">"muted"</span></div>
                      <div><span class="text-blue-400">class</span>=<span class="text-yellow-300">"absolute left-3 top-1/2..."</span></div>
                    </div>
                    <div><span class="text-red-400">/&gt;</span></div>
                    <div><span class="text-red-400">&lt;input</span> <span class="text-blue-400">class</span>=<span class="text-yellow-300">"pl-10 pr-4..."</span> <span class="text-red-400">/&gt;</span></div>
                  </div>
                  <div><span class="text-red-400">&lt;/div&gt;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section class="space-y-8">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Advanced Usage
        </h2>

        {/* Interactive Icons */}
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            Interactive Icons
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Example</h4>
              <div class="p-4 bg-white dark:bg-gray-900 border rounded-lg">
                <div class="flex items-center space-x-2">
                  <Icon 
                    icon={HeartIcon} 
                    size="lg" 
                    color="error" 
                    interactive 
                    label="Like this item"
                  />
                  <Icon 
                    icon={StarIcon} 
                    size="lg" 
                    color="warning" 
                    interactive 
                    label="Add to favorites"
                  />
                  <Icon 
                    icon={BellIcon} 
                    size="lg" 
                    color="info" 
                    interactive 
                    label="Enable notifications"
                  />
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Code</h4>
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                <div class="space-y-1">
                  <div><span class="text-red-400">&lt;Icon</span></div>
                  <div class="pl-2">
                    <div><span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{HeartIcon}`}</span></div>
                    <div><span class="text-blue-400">size</span>=<span class="text-yellow-300">"lg"</span></div>
                    <div><span class="text-blue-400">color</span>=<span class="text-yellow-300">"error"</span></div>
                    <div><span class="text-blue-400">interactive</span></div>
                    <div><span class="text-blue-400">label</span>=<span class="text-yellow-300">"Like this item"</span></div>
                  </div>
                  <div><span class="text-red-400">/&gt;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Icons */}
        <div class="space-y-4">
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
            Responsive Icons
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Example</h4>
              <div class="p-4 bg-white dark:bg-gray-900 border rounded-lg">
                <div class="flex items-center space-x-4">
                  <Icon 
                    icon={UserIcon} 
                    size="md" 
                    responsive 
                    interactive 
                    label="User profile"
                  />
                  <span class="text-gray-900 dark:text-gray-100">
                    This icon adapts to screen size
                  </span>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Code</h4>
              <div class="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                <div class="space-y-1">
                  <div><span class="text-red-400">&lt;Icon</span></div>
                  <div class="pl-2">
                    <div><span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{UserIcon}`}</span></div>
                    <div><span class="text-blue-400">size</span>=<span class="text-yellow-300">"md"</span></div>
                    <div><span class="text-blue-400">responsive</span></div>
                    <div><span class="text-blue-400">interactive</span></div>
                    <div><span class="text-blue-400">label</span>=<span class="text-yellow-300">"User profile"</span></div>
                  </div>
                  <div><span class="text-red-400">/&gt;</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices Summary */}
      <section class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Best Practices Summary
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              ✅ Do
            </h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex items-start space-x-2">
                <Icon icon={CheckCircleIcon} size="sm" color="success" class="mt-0.5" />
                <span>Use semantic colors for meaningful icons</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={CheckCircleIcon} size="sm" color="success" class="mt-0.5" />
                <span>Provide labels for interactive icons</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={CheckCircleIcon} size="sm" color="success" class="mt-0.5" />
                <span>Use fixedWidth for aligned icon lists</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={CheckCircleIcon} size="sm" color="success" class="mt-0.5" />
                <span>Enable responsive for mobile interfaces</span>
              </li>
            </ul>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              ❌ Don't
            </h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex items-start space-x-2">
                <Icon icon={XCircleIcon} size="sm" color="error" class="mt-0.5" />
                <span>Mix different sizes in the same context</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={XCircleIcon} size="sm" color="error" class="mt-0.5" />
                <span>Use interactive icons without labels</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={XCircleIcon} size="sm" color="error" class="mt-0.5" />
                <span>Overuse large icons in dense layouts</span>
              </li>
              <li class="flex items-start space-x-2">
                <Icon icon={XCircleIcon} size="sm" color="error" class="mt-0.5" />
                <span>Forget accessibility considerations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Usage;