type RequestOptions = Omit<RequestInit, "body"> & {
  data?: Record<string, unknown>;
  method?: HttpMethod;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function requester<T>(
  url: string,
  method: HttpMethod,
  { data, ...options }: RequestOptions = {},
): Promise<T | undefined> {
  const headers = new Headers(options.headers);

  if (data !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : undefined;
}

export default requester;
