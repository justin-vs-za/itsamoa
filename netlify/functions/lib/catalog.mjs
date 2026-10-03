/** Server-side allowlist — never trust client amounts. */
export const CATALOG = {
  "everyday-it": {
    sku: "everyday-it",
    name: "Everyday IT support",
    unit_amount: 10000,
    unit: "per_hour",
    description:
      "Day-to-day support — email, printers, accounts, workstations, connectivity.",
  },
  consulting: {
    sku: "consulting",
    name: "Consulting",
    unit_amount: 15000,
    unit: "per_hour",
    description:
      "Advice, assessments, planning, meetings, and general technical consulting.",
  },
  specialised: {
    sku: "specialised",
    name: "Specialised project work",
    unit_amount: 20000,
    unit: "per_hour",
    description:
      "Migrations, builds, integrations, TIMS, complex infrastructure and security projects.",
  },
  audit: {
    sku: "audit",
    name: "Complete system audit",
    unit_amount: 50000,
    unit: "flat",
    description:
      "Full environment review with findings and a prioritised remediation roadmap.",
  },
  emergency: {
    sku: "emergency",
    name: "Emergency call-out",
    unit_amount: 35000,
    unit: "base_fee",
    description:
      "Priority mobilisation for outages and critical after-hours incidents (base fee).",
  },
  training: {
    sku: "training",
    name: "IT training",
    unit_amount: 8000,
    unit: "per_hour",
    description: "Hands-on staff training (minimum 2 days when booked as training).",
  },
};

export const CURRENCY = "usd";

export const LIST_CURRENCY_NOTE =
  "Published Golden Tide rates are in WST. Stripe card/invoice settlement uses USD at the same numeric amounts.";

export function resolveLineItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("At least one line item is required.");
  }
  return rawItems.map((item) => {
    const sku = String(item?.sku || "").trim();
    const product = CATALOG[sku];
    if (!product) {
      throw new Error(`Unknown or disallowed SKU: ${sku || "(empty)"}`);
    }
    const quantity = Math.min(Math.max(parseInt(item?.quantity, 10) || 1, 1), 200);
    return { product, quantity };
  });
}
