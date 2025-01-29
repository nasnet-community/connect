export async function generatePasswordFromAPI() {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/passwordgenerator?length=10",
    {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to generate password");
  const data = await response.json();
  return data.random_password;
}

export async function generateSSIDFromAPI() {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    headers: {
      "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY,
    },
  });

  if (!response.ok) throw new Error("Failed to generate SSID");
  const data = await response.json();
  return `${data.word}`;
}
