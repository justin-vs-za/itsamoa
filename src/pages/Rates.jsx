import { Link } from "react-router-dom";
import { Download, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/goldentide/Navbar";
import Footer from "@/components/goldentide/Footer";

const RATES = [
  {
    service: "Emergency call-out",
    detail:
      "Priority response for outages, critical failures, and urgent after-hours incidents. Base call-out fee covers mobilisation; further work billed at the applicable hourly rate.",
    price: "$350",
    unit: "base fee",
  },
  {
    service: "Everyday IT support",
    detail:
      "Day-to-day support issues — email, printers, user accounts, workstations, connectivity troubleshooting, and routine break/fix.",
    price: "$100",
    unit: "per hour",
  },
  {
    service: "Consulting",
    detail: "Advice, assessments, planning, meetings, and general technical consulting.",
    price: "$150",
    unit: "per hour",
  },
  {
    service: "Specialised project work",
    detail:
      "Hands-on delivery — migrations, builds, integrations, TIMS work, complex infrastructure and security projects.",
    price: "$200",
    unit: "per hour",
  },
  {
    service: "Complete system audit",
    detail:
      "Full environment review with findings and a prioritised remediation roadmap. Scope sized to your systems; complex estates may be quoted separately.",
    price: "$500",
    unit: "flat fee",
  },
  {
    service: "IT training",
    detail: "Hands-on staff training. Booked in whole days; minimum engagement 2 days.",
    price: "$80",
    unit: "per hour · min. 2 days",
  },
];

const TERM_SECTIONS = [
  {
    title: "1. Rates & quotations",
    items: [
      "Standard rates are published on this page and the Golden Tide Rate Card (as updated from time to time).",
      "Current headline rates (WST unless otherwise agreed): Emergency call-out $350 base; Everyday IT support $100/hour; Consulting $150/hour; Specialised project work $200/hour; Complete system audit $500 flat; IT training $80/hour with a minimum of 2 days.",
      "These prices are far less than typical New Zealand and Australian IT company rates. Golden Tide keeps them accessible to help small and medium businesses across the South Pacific islands.",
      "Depending on the size and complexity of systems, and the length of engagement, rates may be negotiated. Agreed rates will appear on the quote or invoice.",
      "Quotes are valid for the period stated (default 30 days) and may be withdrawn if not accepted in writing.",
    ],
  },
  {
    title: "2. Time billing",
    items: [
      "The first hour is always billable, even if the work or meeting lasts only 30 minutes (or less).",
      "After the first hour, time is billed in the increments shown on the quote or invoice (typically hourly or part-hour as agreed).",
      "Travel time for on-site work may be charged at the consulting rate unless the quote says otherwise.",
      "Emergency call-outs attract the base call-out fee; additional labour after mobilisation is charged at the applicable hourly rate for the work performed.",
    ],
  },
  {
    title: "3. Training",
    items: [
      "IT training is charged at the published training rate with a minimum booking of two (2) days.",
      "Cancelled training with less than 48 hours’ notice may be charged at 50% of the booked minimum, at our discretion.",
    ],
  },
  {
    title: "4. Audits & fixed fees",
    items: [
      "A complete system audit at the flat fee covers a standard SMB environment as scoped in the quote.",
      "Larger, multi-site, or highly complex environments may require a custom quote before work starts.",
    ],
  },
  {
    title: "5. Invoices & payment",
    items: [
      "Invoices are payable within 14 days of the invoice date unless otherwise agreed in writing.",
      "Payment details (bank, branch, account name, account number) appear on each invoice. Account name for BSP Samoa payments: Justin Van Staden.",
      "Please quote the invoice number as your payment reference.",
      "Overdue amounts may pause further work until the account is brought current.",
      "Prices exclude tax / VAGST unless the invoice shows tax as a separate line.",
    ],
  },
  {
    title: "6. Client responsibilities",
    items: [
      "You will provide timely access, credentials, decision-makers, and accurate information needed to perform the work.",
      "You remain responsible for licences, third-party vendor fees, and hardware purchases unless we agree to procure them on your behalf (passthrough costs will be invoiced).",
      "You should maintain your own backups before major changes; we will advise when additional backup steps are recommended.",
    ],
  },
  {
    title: "7. Scope changes",
    items: [
      "Work outside the accepted quote is a change of scope and may adjust fees and timelines. We will confirm material changes before proceeding where practical.",
    ],
  },
  {
    title: "8. Confidentiality & data",
    items: [
      "We treat your business and technical information as confidential and use it only to deliver the engagement.",
      "You warrant that you have the right to grant us access to systems and data we need for the work.",
    ],
  },
  {
    title: "9. Limitation of liability",
    items: [
      "Services are provided with reasonable skill and care. We are not liable for indirect or consequential loss (including lost profits or data), except where liability cannot be excluded by law.",
      "Our aggregate liability arising from an engagement is limited to the fees paid for that engagement in the three months before the claim, except where the law requires otherwise.",
    ],
  },
  {
    title: "10. Acceptance",
    items: [
      "Accepting a quote, instructing us to proceed, or paying an invoice constitutes acceptance of these Terms & Conditions and the Rate Card in force at that time.",
      "Questions: +685 770 3733 · justin@goldentide.cloud · itsamoa.goldentide.cloud",
    ],
  },
];

export default function Rates() {
  return (
    <div className="min-h-screen bg-clarity">
      <Navbar />
      <main>
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="absolute top-0 inset-x-0 h-px horizon-line" />
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(700px 320px at 90% 0%, rgba(184,134,11,0.12), transparent 55%), radial-gradient(600px 280px at 0% 40%, rgba(26,107,122,0.08), transparent 50%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 md:px-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Pricing
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-basalt tracking-tight max-w-3xl text-balance">
              Rates &amp; terms
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Standard professional rates for everyday support, consulting, projects, emergency
              call-outs, audits, and training. Currency is <strong className="text-basalt">WST</strong>{" "}
              (Samoan Tala) unless a quote specifies NZD, AUD, or another currency. Final fees depend
              on system size and complexity and may be negotiated on the quote.
            </p>
            <p className="mt-4 text-base text-basalt/80 leading-relaxed max-w-2xl border-l-[3px] border-gold pl-4">
              These prices are far less than typical New Zealand and Australian IT company rates.
              Golden Tide keeps them accessible to help small and medium businesses across the{" "}
              <strong className="text-basalt">South Pacific islands</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/downloads/rate-card.pdf"
                download="Golden-Tide-Rate-Card.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors"
              >
                <Download className="h-4 w-4" />
                Download rate card PDF
              </a>
              <a
                href="/downloads/terms-and-conditions.pdf"
                download="Golden-Tide-Terms-and-Conditions.pdf"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 border border-basalt/20 text-basalt rounded-sm hover:border-gold hover:text-gold transition-colors"
              >
                <Download className="h-4 w-4" />
                Download terms PDF
              </a>
              <Link
                to="/downloads"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors px-2 py-2.5"
              >
                All downloads
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="rates" className="pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
              Rate card
            </h2>

            <div className="overflow-x-auto border border-basalt/10 rounded-sm bg-white/60">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-basalt text-clarity">
                    <th className="px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                      Service
                    </th>
                    <th className="px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] font-medium text-right">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-basalt/10">
                  {RATES.map((row, i) => (
                    <tr key={row.service} className={i % 2 === 1 ? "bg-clarity/80" : "bg-white"}>
                      <td className="px-5 py-5 align-top">
                        <div className="font-display text-lg text-basalt tracking-tight">
                          {row.service}
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                          {row.detail}
                        </p>
                      </td>
                      <td className="px-5 py-5 align-top text-right whitespace-nowrap">
                        <div className="font-display text-2xl text-azure tracking-tight">
                          {row.price}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {row.unit}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="border border-basalt/10 border-l-gold border-l-[3px] bg-white/70 px-5 py-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-azure mb-2">
                  First hour billable
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The <strong className="text-basalt">first hour is always billable</strong>, even if
                  the session lasts only 30 minutes (or less). After the first hour, time is billed in
                  agreed increments on the quote or invoice.
                </p>
              </div>
              <div className="border border-basalt/10 border-l-gold border-l-[3px] bg-white/70 px-5 py-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-azure mb-2">
                  Negotiable rates
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Depending on the <strong className="text-basalt">size and complexity</strong> of your
                  systems — and the length of engagement — rates may be negotiated. Fixed-price
                  packages available on request.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="terms" className="pb-24 md:pb-32 border-t border-basalt/10 pt-16 md:pt-20 bg-white/40">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-3">
              Terms &amp; conditions
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl mb-10 leading-relaxed">
              Effective September 2026. Applies to all quotes, invoices, and engagements unless a
              signed agreement states otherwise. “We / us” means Golden Tide IT Professional Services
              (Justin Van Staden). “You / Client” means the person or organisation receiving services.
            </p>

            <div className="space-y-8 max-w-3xl">
              {TERM_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display text-xl text-basalt tracking-tight mb-3">
                    {section.title}
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors"
              >
                Request a quote
              </a>
              <a
                href="/downloads/terms-and-conditions.pdf"
                download="Golden-Tide-Terms-and-Conditions.pdf"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors px-2 py-2.5"
              >
                <Download className="h-4 w-4" />
                Download terms PDF
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
