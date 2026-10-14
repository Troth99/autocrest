import { setTimeout as delay } from "node:timers/promises";

// Share one deadline across all attempts so retries cannot extend the scan timeout.
export async function requestDocumentExtraction(
  url: string,
  options: RequestInit & { signal: AbortSignal },
  fallbackUrl?: string,
) {
  let currentUrl = url;
  for (let attempt = 0; ; attempt += 1) {
    options.signal.throwIfAborted();
    const response = await fetch(currentUrl, options);
    const canSwitchModel = fallbackUrl && currentUrl !== fallbackUrl;
    if (
      canSwitchModel &&
      [429, 500, 502, 503, 504].includes(response.status) &&
      attempt < 2
    ) {
      await response.body?.cancel();
      currentUrl = fallbackUrl;
      continue;
    }
    if (![500, 502, 503, 504].includes(response.status) || attempt === 2) {
      return response;
    }

    await response.body?.cancel();
    await delay(1000 * 2 ** attempt, undefined, { signal: options.signal });
  }
}


export async function handleExtract() {
  
}