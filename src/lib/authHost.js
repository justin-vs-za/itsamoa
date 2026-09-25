// Base44 only allowlists itsamoa.base44.app for OAuth/logout from_url redirects.
// The marketing site is on Netlify (itsamoa.goldentide.cloud), so Google login and
// post-auth redirects must bounce through the allowlisted host first.

export function base44AppBaseUrl() {
  return (import.meta.env.VITE_BASE44_APP_BASE_URL || "https://itsamoa.base44.app").replace(
    /\/$/,
    ""
  );
}

export function isBase44HostedOrigin(origin = window.location.origin) {
  try {
    return new URL(base44AppBaseUrl()).origin === new URL(origin).origin;
  } catch {
    return false;
  }
}

/** Absolute URL on this origin for a safe same-origin path (e.g. /downloads). */
export function absoluteReturnUrl(returnPath = "/") {
  return new URL(returnPath || "/", window.location.origin).href;
}

/**
 * from_url for Google / social OAuth. Always lands on an allowlisted
 * itsamoa.base44.app URL so Base44 accepts the domain, then forwards the
 * access_token back to the Netlify destination.
 *
 * Prefer the authBridge backend function (302 redirect). Fall back to the
 * static /auth-bridge.html page (also published with the Base44 site).
 */
export function oauthFromUrl(returnPath = "/") {
  const next = absoluteReturnUrl(returnPath);
  const appId = import.meta.env.VITE_BASE44_APP_ID || "6aa613ccd990b946b850fb36";
  const bridge = new URL(`/api/apps/${appId}/functions/authBridge`, base44AppBaseUrl());
  bridge.searchParams.set("next", next);
  return bridge.href;
}
