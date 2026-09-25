import { useEffect, useState } from "react";
import { getAccessToken } from "@base44/sdk";
import { base44AppBaseUrl, isBase44HostedOrigin } from "@/lib/authHost";

function safeNextUrl(raw) {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    // Only forward to our Netlify marketing host or the Base44 app host.
    const allowed = new Set([
      window.location.origin,
      new URL(base44AppBaseUrl()).origin,
      "https://itsamoa.goldentide.cloud",
      "https://itsamoa-goldentide.netlify.app",
    ]);
    if (!allowed.has(url.origin)) return null;
    return url;
  } catch {
    return null;
  }
}

/**
 * Landing page after Base44 Google/social OAuth.
 * Base44 redirects here (allowlisted itsamoa.base44.app) with ?access_token=.
 * We forward that token to the real destination on the Netlify site.
 */
export default function AuthBridge() {
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = safeNextUrl(params.get("next"));
    // getAccessToken reads ?access_token=, stores it, and strips it from the URL.
    const token = getAccessToken({ removeFromUrl: false }) || params.get("access_token");

    if (!next) {
      setMessage("Sign-in finished, but the return link was invalid.");
      return;
    }

    if (next.origin === window.location.origin) {
      if (token) {
        try {
          window.localStorage.setItem("base44_access_token", token);
          window.localStorage.setItem("token", token);
        } catch {
          /* ignore */
        }
        next.searchParams.set("access_token", token);
      }
      window.location.replace(next.pathname + next.search + next.hash);
      return;
    }

    // Cross-origin: send the token in the query so the destination origin can store it.
    if (token) {
      next.searchParams.set("access_token", token);
    } else if (isBase44HostedOrigin()) {
      setMessage("Sign-in did not return a session token. Try again from Downloads.");
      return;
    }
    window.location.replace(next.href);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700 px-6">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
