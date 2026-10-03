#!/usr/bin/env node
/**
 * Smoke-test Stripe Netlify function handlers against the configured sandbox/account.
 * Loads .env.local if present. Does not print secret keys.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i);
    const v = t.slice(i + 1);
    if (!process.env[k]) process.env[k] = v;
  }
}

loadEnvFile(resolve(root, ".env.local"));
process.env.SITE_URL = process.env.SITE_URL || "http://127.0.0.1:4173";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY missing — set it in .env.local");
  process.exit(1);
}

const { handler: checkout } = await import("../netlify/functions/create-checkout-session.mjs");
const { handler: invoice } = await import("../netlify/functions/create-invoice.mjs");

const customer = {
  name: "Stripe Smoke Test",
  email: `smoke+itsamoa-${Date.now()}@goldentide.cloud`,
  company: "Golden Tide QA",
  items: [{ sku: "audit", quantity: 1 }],
};

const checkoutRes = await checkout({
  httpMethod: "POST",
  body: JSON.stringify(customer),
});
const checkoutBody = JSON.parse(checkoutRes.body);
console.log("checkout status", checkoutRes.statusCode);
if (checkoutRes.statusCode !== 200 || !checkoutBody.url) {
  console.error(checkoutBody);
  process.exit(1);
}
console.log("checkout url host", new URL(checkoutBody.url).host);
console.log("checkout id", checkoutBody.id);

const invoiceRes = await invoice({
  httpMethod: "POST",
  body: JSON.stringify({
    ...customer,
    email: `invoice+itsamoa-${Date.now()}@goldentide.cloud`,
    memo: "Smoke test invoice — do not pay",
    send: false,
  }),
});
const invoiceBody = JSON.parse(invoiceRes.body);
console.log("invoice status", invoiceRes.statusCode);
if (invoiceRes.statusCode !== 200 || !invoiceBody.id) {
  console.error(invoiceBody);
  process.exit(1);
}
console.log("invoice", invoiceBody.number || invoiceBody.id, invoiceBody.status, invoiceBody.amount_due);

console.log("OK");
