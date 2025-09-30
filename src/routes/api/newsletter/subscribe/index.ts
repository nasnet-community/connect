import type { RequestHandler } from "@builder.io/qwik-city";

/**
 * Twilio SendGrid Newsletter Subscription API Endpoint
 * 
 * This endpoint handles newsletter subscriptions by adding contacts to SendGrid.
 * 
 * Environment Variables Required:
 * - SENDGRID_API_KEY: Your SendGrid API key
 * - SENDGRID_LIST_IDS: (Optional) Comma-separated list of SendGrid list IDs
 * 
 * @see https://www.twilio.com/docs/sendgrid/api-reference/contacts/add-or-update-a-contact
 */

interface SendGridContact {
  email: string;
  first_name?: string;
  last_name?: string;
  custom_fields?: Record<string, string | number | boolean>;
}

interface SendGridRequest {
  contacts: SendGridContact[];
  list_ids?: string[];
}

interface SendGridResponse {
  job_id?: string;
}

interface SubscriptionRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}

export const onPost: RequestHandler = async ({ json, env, request }) => {
  try {
    // Get SendGrid API key from environment
    const apiKey = env.get("SENDGRID_API_KEY");
    
    if (!apiKey) {
      json(500, {
        success: false,
        error: "SendGrid API key not configured",
      });
      return;
    }

    // Parse request body
    const body = await request.json() as SubscriptionRequest;
    const { email, firstName, lastName, source } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      json(400, {
        success: false,
        error: "Invalid email address",
      });
      return;
    }

    // Prepare SendGrid contact data
    const contact: SendGridContact = {
      email: email.toLowerCase().trim(),
    };

    if (firstName) {
      contact.first_name = firstName;
    }

    if (lastName) {
      contact.last_name = lastName;
    }

    // Add custom fields
    // Get custom field ID from environment (e.g., "e1_T", "e2_T", etc.)
    const sourceFieldId = env.get("SENDGRID_SOURCE_FIELD_ID");
    
    if (sourceFieldId) {
      contact.custom_fields = {
        [sourceFieldId]: "NasNetConnect", // Set Source field to "NasNetConnect"
      };
      
      // Add additional source tracking if provided in request
      const additionalSourceFieldId = env.get("SENDGRID_ADDITIONAL_SOURCE_FIELD_ID");
      if (source && additionalSourceFieldId) {
        contact.custom_fields[additionalSourceFieldId] = source;
      }
    } else if (source) {
      // Fallback: if no custom field ID configured, just track in console
      console.log("Source tracking:", source, "- Configure SENDGRID_SOURCE_FIELD_ID to add to contacts");
    }

    // Prepare SendGrid request
    const sendGridRequest: SendGridRequest = {
      contacts: [contact],
    };

    // Add to lists if configured
    const listIds = env.get("SENDGRID_LIST_IDS");
    if (listIds) {
      const lists = listIds.split(",").map(id => id.trim()).filter(Boolean);
      if (lists.length > 0) {
        sendGridRequest.list_ids = lists;
      }
    }

    // Make request to SendGrid API
    const response = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendGridRequest),
    });

    // Handle SendGrid response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid API error:", errorText);
      
      json(response.status, {
        success: false,
        error: "Failed to subscribe",
        details: response.status === 401 
          ? "Invalid API key" 
          : response.status === 400 
          ? "Invalid request data"
          : "Service unavailable",
      });
      return;
    }

    const sendGridResponse = await response.json() as SendGridResponse;

    json(202, {
      success: true,
      message: "Successfully subscribed to newsletter",
      jobId: sendGridResponse.job_id,
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    
    json(500, {
      success: false,
      error: "Internal server error",
    });
  }
};

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
}
