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
    console.log("Fetching L2TP credentials from Supabase...");

    const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_BASE_URL
    const supabaseFunctionURL = import.meta.env.VITE_SUPABASE_FUNCTION_URL
    const supabaseURL = `${supabaseBaseUrl}${supabaseFunctionURL}`
    
    const url = supabaseURL;
    console.log("Function URL:", url);


    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY 
    console.log("Using authorization with token length:", supabaseAnonKey.length);

    const requestBody = {
      platform,
      referrer,
      sessionId
    };
    console.log("Request body:", requestBody);

    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(requestBody)
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries([...response.headers.entries()]));
    
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Failed to parse response: ${responseText}`);
    }
    
    console.log("Credentials received:", data);
    return data;
  } catch (error: unknown) {
    console.error("Error fetching L2TP credentials:", error);
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
  
  let sessionId = localStorage.getItem('vpn_session_id');
  
  if (!sessionId) {
    sessionId = `sess_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`;
    localStorage.setItem('vpn_session_id', sessionId);
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