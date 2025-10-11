export const API_BASE_URL = "http://192.168.15.244:8006/api/v1/audit-reports";

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

  // Prepare headers - don't set Content-Type for FormData
  const defaultHeaders: Record<string, string> = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGU5ZjViOTBlMjI1OTE4MDI5ZTlhZDciLCJleHAiOjE5NDAxNjMyODJ9.HxMSBD7QNIXCrWRYekxQtP8bGBnRaqaVanQ9jqDDHBw",
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<TResponse>;
}
