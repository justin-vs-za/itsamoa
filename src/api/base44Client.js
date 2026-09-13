import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Prefer same-origin /api (Netlify proxies to Base44). Fall back to the
// hosted Base44 app URL when appBaseUrl is set and we're not on Base44 itself.
const serverUrl =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith("base44.app")
    ? ""
    : appBaseUrl || "";

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl,
  appBaseUrl,
});
