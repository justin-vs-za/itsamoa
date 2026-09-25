import { appParams } from "@/lib/app-params";
import { base44AppBaseUrl, oauthFromUrl } from "@/lib/authHost";

/**
 * Start Google (or other social) OAuth without sending the Netlify page as
 * Referer. Base44 copies Referer into OAuth state.domain; when that is
 * itsamoa.goldentide.cloud it later fails with "Domain is not valid".
 * rel=noreferrer keeps domain on an allowlisted Base44 host.
 */
export function startSocialLogin(provider = "google", returnPath = "/") {
  const appId = appParams.appId;
  const fromUrl = oauthFromUrl(returnPath);
  const providerPath = provider === "google" ? "" : `/${provider}`;
  const loginUrl =
    `${base44AppBaseUrl()}/api/apps/auth${providerPath}/login` +
    `?app_id=${encodeURIComponent(appId)}` +
    `&from_url=${encodeURIComponent(fromUrl)}`;

  const a = document.createElement("a");
  a.href = loginUrl;
  a.rel = "noreferrer";
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
