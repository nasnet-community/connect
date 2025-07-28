import { component$ } from "@builder.io/qwik";
import Icon from "./Icon";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  SearchIcon,
  BellIcon,
  EmailIcon,
  HeartIcon,
  ShareIcon,
  DownloadIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ShieldIcon,
  LockIcon,
  EyeIcon,
  MenuIcon,
  ArrowRightIcon,
  CloudIcon,
  SunIcon,
  MoonIcon,
} from "./icons";

/**
 * Examples component for the Icon system.
 * 
 * This component showcases various real-world usage patterns, design patterns,
 * and best practices for the Icon component across different contexts and use cases.
 */
export const Examples = component$(() => {
  return (
    <div class="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Icon Component Examples
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Real-world usage patterns and design examples demonstrating the versatility 
          and features of the Icon component across different contexts.
        </p>
      </div>

      {/* Navigation Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Navigation & Menu Examples
        </h2>
        
        <div class="grid lg:grid-cols-2 gap-8">
          {/* Primary Navigation */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Primary Navigation
            </h3>
            <div class="bg-white dark:bg-gray-900 border rounded-lg p-6">
              <nav class="space-y-1">
                <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
                  <Icon icon={HomeIcon} size="sm" color="primary" fixedWidth />
                  <span>Dashboard</span>
                </a>
                <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Icon icon={UserIcon} size="sm" color="on-surface-variant" fixedWidth />
                  <span>Profile</span>
                </a>
                <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Icon icon={SettingsIcon} size="sm" color="on-surface-variant" fixedWidth />
                  <span>Settings</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Breadcrumb Navigation
            </h3>
            <div class="bg-white dark:bg-gray-900 border rounded-lg p-6">
              <nav class="flex items-center space-x-2 text-sm">
                <a href="#" class="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <Icon icon={HomeIcon} size="xs" class="mr-1" />
                  Home
                </a>
                <Icon icon={ChevronRightIcon} size="xs" color="muted" />
                <a href="#" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Components
                </a>
                <Icon icon={ChevronRightIcon} size="xs" color="muted" />
                <span class="text-gray-900 dark:text-gray-100 font-medium">
                  Icons
                </span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Status & Feedback Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Status & Feedback Examples
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          {/* Alert Messages */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Alert Messages
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
                <Icon icon={CheckCircleIcon} size="sm" color="success" />
                <span class="text-success-800 dark:text-success-200">
                  Operation completed successfully
                </span>
              </div>
              <div class="flex items-center space-x-3 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
                <Icon icon={XCircleIcon} size="sm" color="error" />
                <span class="text-error-800 dark:text-error-200">
                  An error occurred during processing
                </span>
              </div>
              <div class="flex items-center space-x-3 p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
                <Icon icon={ExclamationCircleIcon} size="sm" color="warning" />
                <span class="text-warning-800 dark:text-warning-200">
                  Please review your information
                </span>
              </div>
              <div class="flex items-center space-x-3 p-4 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg">
                <Icon icon={InfoIcon} size="sm" color="info" />
                <span class="text-info-800 dark:text-info-200">
                  Additional information available
                </span>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Progress Indicators
            </h3>
            <div class="bg-white dark:bg-gray-900 border rounded-lg p-6 space-y-4">
              <div class="flex items-center space-x-3">
                <Icon icon={CheckCircleIcon} size="sm" color="success" />
                <span class="text-gray-900 dark:text-gray-100">Account created</span>
              </div>
              <div class="flex items-center space-x-3">
                <Icon icon={CheckCircleIcon} size="sm" color="success" />
                <span class="text-gray-900 dark:text-gray-100">Email verified</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-gray-600 dark:text-gray-400">Setting up profile...</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 border-2 border-gray-200 dark:border-gray-700 rounded-full"></div>
                <span class="text-gray-400 dark:text-gray-600">Send welcome email</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Button & Action Examples
        </h2>
        
        <div class="grid lg:grid-cols-3 gap-6">
          {/* Primary Actions */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Primary Actions
            </h3>
            <div class="space-y-3">
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                <Icon icon={PlusIcon} size="sm" color="inherit" />
                <span>Create New</span>
              </button>
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-success-600 hover:bg-success-700 text-white rounded-lg">
                <Icon icon={CheckCircleIcon} size="sm" color="inherit" />
                <span>Save Changes</span>
              </button>
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-error-600 hover:bg-error-700 text-white rounded-lg">
                <Icon icon={TrashIcon} size="sm" color="inherit" />
                <span>Delete Item</span>
              </button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Secondary Actions
            </h3>
            <div class="space-y-3">
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
                <Icon icon={EditIcon} size="sm" color="on-surface-variant" />
                <span>Edit</span>
              </button>
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
                <Icon icon={ShareIcon} size="sm" color="on-surface-variant" />
                <span>Share</span>
              </button>
              <button class="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
                <Icon icon={DownloadIcon} size="sm" color="on-surface-variant" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Icon-Only Actions */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Icon-Only Actions
            </h3>
            <div class="flex flex-wrap gap-2">
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={EditIcon} size="sm" interactive label="Edit item" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={TrashIcon} size="sm" interactive label="Delete item" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={ShareIcon} size="sm" interactive label="Share item" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={HeartIcon} size="sm" interactive label="Like item" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={BellIcon} size="sm" interactive label="Notifications" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={SearchIcon} size="sm" interactive label="Search" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Form & Input Examples
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          {/* Input Fields with Icons */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Input Fields
            </h3>
            <div class="space-y-4">
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
                  placeholder="Enter your email" 
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div class="relative">
                <Icon 
                  icon={LockIcon} 
                  size="sm" 
                  color="muted" 
                  class="absolute left-3 top-1/2 transform -translate-y-1/2" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  class="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon icon={EyeIcon} size="sm" color="muted" interactive label="Show password" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Validation */}
          <div class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100">
              Form Validation
            </h3>
            <div class="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Valid input" 
                  class="w-full px-4 py-2 border border-success-300 dark:border-success-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div class="flex items-center space-x-2 mt-1 text-success-600 dark:text-success-400 text-sm">
                  <Icon icon={CheckCircleIcon} size="xs" color="success" />
                  <span>Looks good!</span>
                </div>
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Invalid input" 
                  class="w-full px-4 py-2 border border-error-300 dark:border-error-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div class="flex items-center space-x-2 mt-1 text-error-600 dark:text-error-400 text-sm">
                  <Icon icon={XCircleIcon} size="xs" color="error" />
                  <span>This field is required</span>
                </div>
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Warning input" 
                  class="w-full px-4 py-2 border border-warning-300 dark:border-warning-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div class="flex items-center space-x-2 mt-1 text-warning-600 dark:text-warning-400 text-sm">
                  <Icon icon={ExclamationCircleIcon} size="xs" color="warning" />
                  <span>Consider using a stronger password</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Card & Content Examples
        </h2>
        
        <div class="grid lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div class="bg-white dark:bg-gray-900 border rounded-xl p-6 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Icon icon={ShieldIcon} size="lg" color="primary" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Security
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Advanced security features to protect your data and privacy.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-900 border rounded-xl p-6 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
                <Icon icon={CheckCircleIcon} size="lg" color="success" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Reliability
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              99.9% uptime guarantee with robust infrastructure.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-900 border rounded-xl p-6 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-info-100 dark:bg-info-900/30 rounded-lg">
                <Icon icon={CloudIcon} size="lg" color="info" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Cloud Storage
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Scalable cloud storage with automatic backups.
            </p>
          </div>
        </div>
      </section>

      {/* Media Controls */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Media Control Examples
        </h2>
        
        <div class="bg-white dark:bg-gray-900 border rounded-xl p-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Icon icon={PlayIcon} size="lg" color="inherit" class="text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Sample Audio Track
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Artist Name • Album Name
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={PlayIcon} size="lg" interactive label="Play" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={PauseIcon} size="lg" interactive label="Pause" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Icon icon={StopIcon} size="lg" interactive label="Stop" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Examples */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Mobile-Optimized Examples
        </h2>
        
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
          <div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
            {/* Mobile Header */}
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <button class="p-2 -ml-2">
                <Icon icon={MenuIcon} size="lg" responsive interactive label="Open menu" />
              </button>
              <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Mobile App
              </h1>
              <button class="p-2 -mr-2">
                <Icon icon={BellIcon} size="lg" responsive interactive label="Notifications" />
              </button>
            </div>
            
            {/* Mobile Content */}
            <div class="p-4 space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-3">
                  <Icon icon={UserIcon} size="lg" responsive color="primary" />
                  <span class="text-gray-900 dark:text-gray-100">Profile</span>
                </div>
                <Icon icon={ArrowRightIcon} size="md" color="muted" />
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-3">
                  <Icon icon={SettingsIcon} size="lg" responsive color="on-surface-variant" />
                  <span class="text-gray-900 dark:text-gray-100">Settings</span>
                </div>
                <Icon icon={ArrowRightIcon} size="md" color="muted" />
              </div>
            </div>
            
            {/* Mobile Bottom Navigation */}
            <div class="flex items-center justify-around p-4 border-t border-gray-200 dark:border-gray-700">
              <button class="flex flex-col items-center space-y-1">
                <Icon icon={HomeIcon} size="lg" responsive color="primary" />
                <span class="text-xs text-primary-600 dark:text-primary-400">Home</span>
              </button>
              <button class="flex flex-col items-center space-y-1">
                <Icon icon={SearchIcon} size="lg" responsive color="muted" />
                <span class="text-xs text-gray-500 dark:text-gray-400">Search</span>
              </button>
              <button class="flex flex-col items-center space-y-1">
                <Icon icon={HeartIcon} size="lg" responsive color="muted" />
                <span class="text-xs text-gray-500 dark:text-gray-400">Favorites</span>
              </button>
              <button class="flex flex-col items-center space-y-1">
                <Icon icon={UserIcon} size="lg" responsive color="muted" />
                <span class="text-xs text-gray-500 dark:text-gray-400">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Mode Toggle Example */}
      <section class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Theme Controls
        </h2>
        
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 border rounded-xl">
            <button class="flex items-center space-x-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <Icon icon={SunIcon} size="sm" color="inherit" />
              <span>Light</span>
            </button>
            <button class="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg">
              <Icon icon={MoonIcon} size="sm" color="inherit" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Examples;