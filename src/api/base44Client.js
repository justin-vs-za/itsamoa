import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Empty serverUrl → same-origin /api/* (Netlify proxies these to Base44).
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: "",
  appBaseUrl,
});
