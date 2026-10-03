import {
  CURRENCY,
  LIST_CURRENCY_NOTE,
  resolveLineItems,
} from "./lib/catalog.mjs";
import {
  corsPreflight,
  findOrCreateCustomer,
  getStripe,
  json,
  randomSuffix,
  siteUrl,
} from "./lib/stripeClient.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return corsPreflight();
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: "A valid email is required." });
    }
    if (!name) {
      return json(400, { error: "Name is required." });
    }

    const lines = resolveLineItems(body.items);
    const stripe = getStripe();
    const customer = await findOrCreateCustomer(stripe, { email, name, company });
    const base = siteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      client_reference_id: email,
      customer_update: { name: "auto", address: "auto" },
      line_items: lines.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: CURRENCY,
          unit_amount: product.unit_amount,
          product_data: {
            name: product.name,
            description: `${product.description} (${LIST_CURRENCY_NOTE})`,
            metadata: {
              sku: product.sku,
              unit: product.unit,
              list_currency: "WST",
            },
          },
        },
      })),
      success_url: `${base}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/pay?cancelled=1`,
      metadata: {
        company,
        skus: lines.map((l) => `${l.product.sku}x${l.quantity}`).join(","),
        business: "golden-tide-itsamoa",
      },
      // Tag checkout flow for Dashboard analytics (API 2026-03-25+)
      integration_identifier: `itsamoa-pay-${randomSuffix()}`,
      invoice_creation: { enabled: true },
    });

    return json(200, { url: session.url, id: session.id });
  } catch (err) {
    console.error("create-checkout-session", err);
    return json(400, { error: err.message || "Unable to create checkout session." });
  }
}
