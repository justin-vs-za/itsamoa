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
 * Uses static /auth-bridge.html (plus the index.html early-redirect script)
 * so a missing backend function never surfaces a raw JSON error page.
 * The authBridge function remains available as a faster 302 once published.
 */
export function oauthFromUrl(returnPath = "/") {
  const next = absoluteReturnUrl(returnPath);
  const bridge = new URL("/auth-bridge.html", base44AppBaseUrl());
  bridge.searchParams.set("next", next);
  return bridge.href;
}
