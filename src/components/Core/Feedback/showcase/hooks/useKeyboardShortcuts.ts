import { useVisibleTask$, $ } from "@builder.io/qwik";
import type { KeyboardShortcut } from "../types";

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useVisibleTask$(() => {
    const handleKeyDown = $((event: KeyboardEvent) => {
      // Ignore shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement).contentEditable === "true"
      ) {
        return;
      }

      // Find matching shortcut
      const shortcut = shortcuts.find(s => 
        s.key.toLowerCase() === event.key.toLowerCase()
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action().then(() => {
          // Action completed
        });
      }
    });

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
};