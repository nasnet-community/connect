// Environment variables
const SUPABASE_BASE_URL = import.meta.env.VITE_SUPABASE_BASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const L2TP_FUNCTION_PATH = import.meta.env.VITE_L2TP_FUNCTION_PATH || "/functions/v1/l2tp-credentials";
const REQUEST_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "30000", 10);
const ENABLE_L2TP_LOGGING = import.meta.env.VITE_ENABLE_L2TP_LOGGING === "true";
const SESSION_STORAGE_KEY = import.meta.env.VITE_SESSION_STORAGE_KEY || "vpn_session_id";

export interface L2TPCredentials {
  id: string;
  username: string;
  password: string;
  server: string;
  created_at: string;
  expiry_date: string;
  platform: string;
  referrer: string;
  session_id?: string;
  is_assigned?: boolean;
}

export interface L2TPCredentialsResponse {
  success: boolean;
  credentials?: {
    username: string;
    password: string;
    server: string;
    expiry_date: string;
  };
  csv?: string;
  message?: string;
  isNewSession?: boolean;
  error?: string;
  error_detail?: string;
  request_id?: string;
}

export async function getL2TPCredentials(
  platform: string,
  referrer: string,
  sessionId?: string
): Promise<L2TPCredentialsResponse> {
  try {
    if (!SUPABASE_BASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase configuration not found");
    }

    if (ENABLE_L2TP_LOGGING) {
      console.log("Fetching L2TP credentials from Supabase...");
    }

    const url = `${SUPABASE_BASE_URL}${L2TP_FUNCTION_PATH}`;
    
    if (ENABLE_L2TP_LOGGING) {
      console.log("Function URL:", url);
      console.log("Using authorization with token length:", SUPABASE_ANON_KEY.length);
    }

    const requestBody = {
      platform,
      referrer,
      sessionId
    };
    
    if (ENABLE_L2TP_LOGGING) {
      console.log("Request body:", requestBody);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (ENABLE_L2TP_LOGGING) {
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries([...response.headers.entries()]));
    }
    
    const responseText = await response.text();
    
    if (ENABLE_L2TP_LOGGING) {
      console.log("Raw response:", responseText);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Failed to parse response: ${responseText}`);
    }
    
    if (ENABLE_L2TP_LOGGING) {
      console.log("Credentials received:", data);
    }
    return data;
  } catch (error: unknown) {
    if (ENABLE_L2TP_LOGGING) {
      console.error("Error fetching L2TP credentials:", error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch L2TP credentials",
      error_detail: "client_error"
    };
  }
}


export function getReferrerFromURL(): string {
  if (typeof window === 'undefined') return 'direct';
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref') || 'direct';
}


export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = `sess_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  
  return sessionId;
}


export function formatExpiryDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    return dateString;
  }
} 