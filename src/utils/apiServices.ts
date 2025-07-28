/**
 * External API Services
 *
 * Handles calls to external APIs for generating passwords and SSIDs
 */

// Environment variables
const API_NINJA_KEY = import.meta.env.VITE_API_NINJA_KEY;
const API_NINJA_BASE_URL =
  import.meta.env.VITE_API_NINJA_BASE_URL || "https://api.api-ninjas.com/v1";
const PASSWORD_LENGTH = import.meta.env.VITE_PASSWORD_LENGTH || "10";

export async function generatePasswordFromAPI() {
  if (!API_NINJA_KEY) {
    throw new Error("API Ninja key not configured");
  }

  const response = await fetch(
    `${API_NINJA_BASE_URL}/passwordgenerator?length=${PASSWORD_LENGTH}`,
    {
      headers: {
        "X-Api-Key": API_NINJA_KEY,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to generate password");
  const data = await response.json();
  return data.random_password;
}

export async function generateSSIDFromAPI() {
  if (!API_NINJA_KEY) {
    throw new Error("API Ninja key not configured");
  }

  const response = await fetch(`${API_NINJA_BASE_URL}/randomword`, {
    headers: {
      "X-Api-Key": API_NINJA_KEY,
    },
  });

  if (!response.ok) throw new Error("Failed to generate SSID");
  const data = await response.json();
  return `${data.word}`;
}
