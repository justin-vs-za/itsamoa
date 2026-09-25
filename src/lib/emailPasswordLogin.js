import { base44 } from "@/api/base44Client";
import { appParams } from "@/lib/app-params";

/**
 * Email/password login without the SDK's 401→logout() redirect.
 * On a Netlify custom domain that logout sends users to itsamoa.base44.app
 * (and can surface domain errors); we only want an inline error message.
 */
export async function loginWithEmailPassword(email, password) {
  const appId = appParams.appId;
  const res = await fetch(`/api/apps/${appId}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      data?.message || data?.detail || (res.status === 401 ? "Invalid email or password" : "Login failed");
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  if (data?.access_token) {
    base44.auth.setToken(data.access_token);
  }
  return data;
}
