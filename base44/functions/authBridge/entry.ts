/**
 * Auth bridge for Netlify-hosted frontends.
 * Base44 OAuth only allows redirects to itsamoa.base44.app. After Google login
 * the client lands on this function URL (allowlisted host) with
 * ?access_token=&next=https://itsamoa.goldentide.cloud/...
 * We 302 to next and preserve the access_token query param.
 */
const ALLOWED_ORIGINS = new Set([
  "https://itsamoa.goldentide.cloud",
  "https://itsamoa-goldentide.netlify.app",
  "https://itsamoa.base44.app",
]);

export default async function (req: Request): Promise<Response> {
  const url = new URL(req.url);
  const nextRaw = url.searchParams.get("next");
  const token =
    url.searchParams.get("access_token") ||
    url.searchParams.get("token");

  if (!nextRaw) {
    return Response.json({ error: "Missing next parameter" }, { status: 400 });
  }

  let next: URL;
  try {
    next = new URL(nextRaw);
  } catch {
    return Response.json({ error: "Invalid next URL" }, { status: 400 });
  }

  if (!ALLOWED_ORIGINS.has(next.origin)) {
    return Response.json({ error: "Domain is not valid" }, { status: 400 });
  }

  if (token) {
    next.searchParams.set("access_token", token);
  }

  return Response.redirect(next.href, 302);
}
