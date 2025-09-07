import { component$, type Signal } from "@builder.io/qwik";
import { Input } from "~/components/Core";

export interface SearchBarProps {
  searchQuery: Signal<string>;
  placeholder?: string;
  class?: string;
}

export const SearchBar = component$<SearchBarProps>(
  ({ searchQuery, placeholder = "Search...", class: className = "" }) => {
    return (
      <div class={`relative ${className}`}>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery.value}
          onInput$={(event: Event, value: string) => searchQuery.value = value}
          class="pl-10 rounded-full"
        />
        <svg 
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    );
  }
);