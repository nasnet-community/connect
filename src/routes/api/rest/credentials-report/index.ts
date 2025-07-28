import type { RequestHandler } from "@builder.io/qwik-city";
import { getSupabaseClient, checkAuth } from "~/utils/auth";

export const onGet: RequestHandler = async (requestEvent) => {
  const { query, json, text, headers } = requestEvent;

  try {
    // Check authentication
    const supabase = getSupabaseClient();
    const { isAuthenticated } = await checkAuth(supabase);

    if (!isAuthenticated) {
      json(401, {
        error: "Unauthorized. Please log in to access this resource.",
      });
      return;
    }

    // Get query parameters from the request
    const action = query.get("action") || "";
    const filter = query.get("filter") || "";
    const format = query.get("format") || "json";

    // Get environment variables
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      json(500, { error: "Missing Supabase credentials" });
      return;
    }

    // Build the URL for the Supabase Edge Function
    const functionUrl = `${supabaseUrl}/functions/v1/credentials-report`;
    const queryParams = new URLSearchParams();
    if (action) queryParams.set("action", action);
    if (filter) queryParams.set("filter", filter);
    if (format) queryParams.set("format", format);

    const url = `${functionUrl}?${queryParams.toString()}`;

    // Make the request to the Supabase Edge Function
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from Supabase Edge Function:", errorText);
      json(response.status, { error: "Failed to fetch data from Supabase" });
      return;
    }

    // Set appropriate headers based on format
    if (format === "csv") {
      const csvContent = await response.text();

      // Get a new date string for filename
      const dateStr = new Date().toISOString().split("T")[0];

      // Set headers and return CSV content
      headers.set("Content-Type", "text/csv");
      headers.set(
        "Content-Disposition",
        `attachment; filename="vpn-credentials-${filter || "all"}-${dateStr}.csv"`,
      );

      text(200, csvContent);
      return;
    } else {
      // Return JSON data
      const data = await response.json();
      json(200, data);
      return;
    }
  } catch (error) {
    console.error("Error fetching credential report:", error);
    json(500, { error: "Failed to process request" });
    return;
  }
};
