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
} from "./lib/stripeClient.mjs";

const DAYS_UNTIL_DUE = 14;

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
    const memo = String(body.memo || "").trim();
    const send = body.send !== false;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: "A valid email is required." });
    }
    if (!name) {
      return json(400, { error: "Name is required." });
    }

    const lines = resolveLineItems(body.items);
    const stripe = getStripe();
    const customer = await findOrCreateCustomer(stripe, { email, name, company });

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: DAYS_UNTIL_DUE,
      currency: CURRENCY,
      description: memo || "Golden Tide IT Professional Services",
      footer: `${LIST_CURRENCY_NOTE} Alternative WST settlement: BSP Samoa Apia · 2001176615 · Justin Van Staden. Quote the invoice number as reference.`,
      metadata: {
        company,
        business: "golden-tide-itsamoa",
        skus: lines.map((l) => `${l.product.sku}x${l.quantity}`).join(","),
      },
      custom_fields: company
        ? [{ name: "Company", value: company.slice(0, 30) }]
        : undefined,
    });

    for (const { product, quantity } of lines) {
      // API 2026-09-30.endive: invoice items take amount (or unit_amount_decimal), not unit_amount.
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,
        currency: CURRENCY,
        amount: product.unit_amount * quantity,
        description: `${product.name} × ${quantity} (${product.unit.replace(/_/g, " ")})`,
        metadata: {
          sku: product.sku,
          unit: product.unit,
          list_currency: "WST",
          quantity: String(quantity),
        },
      });
    }

    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
    const result = send
      ? await stripe.invoices.sendInvoice(finalized.id)
      : finalized;

    return json(200, {
      id: result.id,
      number: result.number,
      status: result.status,
      hosted_invoice_url: result.hosted_invoice_url,
      invoice_pdf: result.invoice_pdf,
      due_date: result.due_date,
      amount_due: result.amount_due,
      currency: result.currency,
    });
  } catch (err) {
    console.error("create-invoice", err);
    return json(400, { error: err.message || "Unable to create invoice." });
  }
}
