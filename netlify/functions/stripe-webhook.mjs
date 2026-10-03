import { getStripe, json } from "./lib/stripeClient.mjs";

/**
 * Fulfillment belongs here — not on the success page.
 * Configure Dashboard endpoint → /.netlify/functions/stripe-webhook
 * Events: checkout.session.completed, checkout.session.async_payment_succeeded,
 * invoice.paid, invoice.payment_failed
 */
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  try {
    if (webhookSecret) {
      const signature = event.headers["stripe-signature"];
      stripeEvent = stripe.webhooks.constructEvent(
        event.isBase64Encoded
          ? Buffer.from(event.body, "base64").toString("utf8")
          : event.body,
        signature,
        webhookSecret
      );
    } else {
      // Local/dev only — always set STRIPE_WEBHOOK_SECRET in production.
      console.warn("STRIPE_WEBHOOK_SECRET missing; parsing unverified webhook body");
      stripeEvent = JSON.parse(event.body || "{}");
    }
  } catch (err) {
    console.error("webhook signature", err.message);
    return json(400, { error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (stripeEvent.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = stripeEvent.data.object;
        if (session.payment_status === "paid" || session.payment_status === "no_payment_required") {
          console.info("checkout paid", {
            id: session.id,
            customer: session.customer,
            amount_total: session.amount_total,
            metadata: session.metadata,
          });
          // Hook: notify Base44 / email / CRM here when ready.
        }
        break;
      }
      case "invoice.paid": {
        const invoice = stripeEvent.data.object;
        console.info("invoice paid", {
          id: invoice.id,
          number: invoice.number,
          customer: invoice.customer,
          amount_paid: invoice.amount_paid,
        });
        break;
      }
      case "invoice.payment_failed": {
        const invoice = stripeEvent.data.object;
        console.warn("invoice payment failed", {
          id: invoice.id,
          number: invoice.number,
          customer: invoice.customer,
        });
        break;
      }
      default:
        console.info("unhandled stripe event", stripeEvent.type);
    }

    return json(200, { received: true });
  } catch (err) {
    console.error("webhook handler", err);
    return json(500, { error: "Webhook handler failed" });
  }
}
