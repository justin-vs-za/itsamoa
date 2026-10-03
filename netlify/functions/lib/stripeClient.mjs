import Stripe from "stripe";

let client;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  if (!client) {
    client = new Stripe(key, {
      apiVersion: "2026-09-30.endive",
      appInfo: {
        name: "Golden Tide itsamoa",
        version: "1.0.0",
        url: "https://itsamoa.goldentide.cloud",
      },
    });
  }
  return client;
}

export function siteUrl() {
  return (process.env.SITE_URL || "https://itsamoa.goldentide.cloud").replace(/\/$/, "");
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

export function corsPreflight() {
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: "",
  };
}

export async function findOrCreateCustomer(stripe, { email, name, company }) {
  const existing = await stripe.customers.list({ email, limit: 1 });
  if (existing.data[0]) {
    const updates = {};
    if (name && existing.data[0].name !== name) updates.name = name;
    if (company && existing.data[0].metadata?.company !== company) {
      updates.metadata = { ...existing.data[0].metadata, company };
    }
    if (Object.keys(updates).length) {
      return stripe.customers.update(existing.data[0].id, updates);
    }
    return existing.data[0];
  }
  return stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      company: company || "",
      source: "itsamoa.goldentide.cloud",
    },
  });
}

export function randomSuffix(len = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
