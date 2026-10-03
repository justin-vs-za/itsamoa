import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CreditCard, FileText, Loader2 } from "lucide-react";
import Navbar from "@/components/goldentide/Navbar";
import Footer from "@/components/goldentide/Footer";
import catalog from "@/lib/stripeCatalog.json";

const UNIT_LABEL = {
  per_hour: "per hour",
  flat: "flat fee",
  base_fee: "base fee",
};

function formatMoney(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function Pay() {
  const [params] = useSearchParams();
  const cancelled = params.get("cancelled") === "1";
  const [mode, setMode] = useState("checkout"); // checkout | invoice
  const [sku, setSku] = useState("audit");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [memo, setMemo] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [invoiceResult, setInvoiceResult] = useState(null);

  const product = useMemo(
    () => catalog.products.find((p) => p.sku === sku) || catalog.products[0],
    [sku]
  );
  const total = product.unit_amount * Math.max(1, quantity);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    setInvoiceResult(null);

    const endpoint =
      mode === "checkout"
        ? "/.netlify/functions/create-checkout-session"
        : "/.netlify/functions/create-invoice";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          memo,
          send: true,
          items: [{ sku: product.sku, quantity }],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      if (mode === "checkout") {
        if (!data.url) throw new Error("Checkout URL missing from response.");
        window.location.href = data.url;
        return;
      }

      setInvoiceResult(data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-clarity text-foreground">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Payments
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-basalt tracking-tight">
            Golden Tide
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Pay for a published service online, or request a Stripe invoice with 14-day terms.
          </p>

          {cancelled && (
            <p className="mt-6 text-sm border border-basalt/15 bg-white/70 px-4 py-3 text-muted-foreground">
              Checkout was cancelled. You can try again below, or{" "}
              <a href="/#contact" className="text-azure underline underline-offset-4">
                contact us
              </a>{" "}
              for a custom quote.
            </p>
          )}

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed border-l-[3px] border-gold pl-4">
            {catalog.list_currency_note}
          </p>

          <div className="mt-10 flex gap-2 border-b border-basalt/10 pb-1">
            <ModeTab active={mode === "checkout"} onClick={() => setMode("checkout")} icon={CreditCard}>
              Pay now
            </ModeTab>
            <ModeTab active={mode === "invoice"} onClick={() => setMode("invoice")} icon={FileText}>
              Send invoice
            </ModeTab>
          </div>

          {status === "success" && invoiceResult ? (
            <div className="mt-10 border border-gold/30 bg-white/80 p-8">
              <h2 className="font-display text-2xl text-basalt">Invoice sent</h2>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                Invoice {invoiceResult.number || invoiceResult.id} is{" "}
                <span className="text-basalt font-medium">{invoiceResult.status}</span>
                {invoiceResult.amount_due != null && (
                  <>
                    {" "}
                    for {formatMoney(invoiceResult.amount_due)}.
                  </>
                )}
              </p>
              {invoiceResult.hosted_invoice_url && (
                <a
                  href={invoiceResult.hosted_invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-basalt text-clarity text-sm font-medium rounded-sm hover:bg-gold hover:text-basalt transition-colors"
                >
                  Open hosted invoice
                </a>
              )}
              <button
                type="button"
                className="mt-4 block text-sm text-muted-foreground underline underline-offset-4"
                onClick={() => {
                  setStatus("idle");
                  setInvoiceResult(null);
                }}
              >
                Create another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-6 border border-basalt/10 bg-white/70 p-6 md:p-8">
              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Service
                </span>
                <select
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="gt-input appearance-none"
                >
                  {catalog.products.map((p) => (
                    <option key={p.sku} value={p.sku}>
                      {p.name} — {formatMoney(p.unit_amount)} ({UNIT_LABEL[p.unit] || p.unit})
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
              </label>

              {product.unit !== "flat" && (
                <label className="block max-w-[10rem]">
                  <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Quantity
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                    className="gt-input"
                  />
                </label>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Full name <span className="text-gold">*</span>
                  </span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="gt-input" />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Email <span className="text-gold">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="gt-input"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Company
                </span>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className="gt-input" />
              </label>

              {mode === "invoice" && (
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Memo (optional)
                  </span>
                  <input
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="gt-input"
                    placeholder="Project reference or PO number"
                  />
                </label>
              )}

              <div className="flex flex-wrap items-end justify-between gap-4 pt-2 border-t border-basalt/10">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Total (USD)
                  </div>
                  <div className="font-display text-3xl text-azure tracking-tight">{formatMoney(total)}</div>
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors font-medium disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Working…
                    </>
                  ) : mode === "checkout" ? (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Continue to Stripe
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Create &amp; send invoice
                    </>
                  )}
                </button>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <p className="text-xs text-muted-foreground leading-relaxed">
                By continuing you accept the{" "}
                <Link to="/rates#terms" className="underline underline-offset-2 hover:text-gold">
                  Rates &amp; Terms
                </Link>
                . Prefer bank transfer? Use the BSP details on our invoice templates in{" "}
                <Link to="/downloads" className="underline underline-offset-2 hover:text-gold">
                  Downloads
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        .gt-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: hsl(var(--clarity));
          border: 1px solid hsl(var(--border));
          border-radius: var(--radius);
          font-size: 1rem;
          color: hsl(var(--foreground));
        }
        .gt-input:focus {
          outline: none;
          border-color: hsl(var(--gold));
          box-shadow: 0 0 0 3px hsl(var(--gold) / 0.15);
        }
      `}</style>
    </div>
  );
}

function ModeTab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
        active
          ? "border-gold text-basalt"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
