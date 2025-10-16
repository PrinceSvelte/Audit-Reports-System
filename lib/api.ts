export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Helper to safely read the token on the client only
function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions<TBody = unknown> {
  method?: ApiMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

/**
 * Common API handler for all requests.
 */
export async function apiHandler<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers } = options;
  const token = getAccessToken();

  // Prepare headers - don't set Content-Type for FormData
  const defaultHeaders: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  // Only set Content-Type for JSON, not for FormData
  if (!(body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: defaultHeaders,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("access_token");
      } catch {}
      window.location.href = "/login";
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<TResponse>;
}
