import { Download, FileText, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/goldentide/Navbar";
import Footer from "@/components/goldentide/Footer";

const DOWNLOADS = [
  {
    category: "Flyers",
    items: [
      {
        title: "IT Services Flyer",
        description:
          "One-page overview of Golden Tide services for small and medium businesses — cloud, cyber, infrastructure, and Microsoft platforms.",
        file: "/downloads/flyer-it-services.pdf",
        filename: "Golden-Tide-IT-Services-Flyer.pdf",
        meta: "A4 · PDF",
        action: "Download PDF",
      },
      {
        title: "Security Audit Flyer",
        description:
          "Practical security audit offer for SMBs — shielding, detection, recovery, and a prioritised remediation roadmap.",
        file: "/downloads/flyer-security-audit.pdf",
        filename: "Golden-Tide-Security-Audit-Flyer.pdf",
        meta: "A4 · PDF",
        action: "Download PDF",
      },
    ],
  },
  {
    category: "Business Cards",
    items: [
      {
        title: "Business Card — Front",
        description:
          "Justin Van Staden · IT Director · Founder. Contact details and SMB welcome line.",
        file: "/downloads/business-card-front.pdf",
        filename: "Golden-Tide-Business-Card-Front.pdf",
        meta: "90 × 50 mm · PDF",
        action: "Download PDF",
      },
      {
        title: "Business Card — Back",
        description:
          "Cloud · Cyber · Infrastructure for small & medium business, with service highlights.",
        file: "/downloads/business-card-back.pdf",
        filename: "Golden-Tide-Business-Card-Back.pdf",
        meta: "90 × 50 mm · PDF",
        action: "Download PDF",
      },
    ],
  },
  {
    category: "Invoices",
    items: [
      {
        title: "Invoice Template — Excel",
        description:
          "Editable client invoice with line-item formulas, tax field, and BSP Samoa payment details (Apia · 2001176615).",
        file: "/downloads/invoice-template.xlsx",
        filename: "Golden-Tide-Invoice-Template.xlsx",
        meta: "A4 · XLSX",
        action: "Download Excel",
      },
      {
        title: "Invoice Template — Word",
        description:
          "Editable Word invoice for clients — replace bill-to and line items, keep banking block as-is.",
        file: "/downloads/invoice-template.docx",
        filename: "Golden-Tide-Invoice-Template.docx",
        meta: "A4 · DOCX",
        action: "Download Word",
      },
      {
        title: "Invoice Template — PDF",
        description:
          "Print-ready invoice sample with Golden Tide branding and BSP Samoa bank details for client billing.",
        file: "/downloads/invoice-template.pdf",
        filename: "Golden-Tide-Invoice-Template.pdf",
        meta: "A4 · PDF",
        action: "Download PDF",
      },
    ],
  },
  {
    category: "Quotes",
    items: [
      {
        title: "Quote Template — Excel",
        description:
          "Editable client quotation with line-item formulas, 30-day validity, acceptance block, and BSP Samoa bank reference.",
        file: "/downloads/quote-template.xlsx",
        filename: "Golden-Tide-Quote-Template.xlsx",
        meta: "A4 · XLSX",
        action: "Download Excel",
      },
      {
        title: "Quote Template — Word",
        description:
          "Editable Word quote for proposals — fill prepared-for and scope lines, client signs to accept.",
        file: "/downloads/quote-template.docx",
        filename: "Golden-Tide-Quote-Template.docx",
        meta: "A4 · DOCX",
        action: "Download Word",
      },
      {
        title: "Quote Template — PDF",
        description:
          "Print-ready quote sample with Golden Tide branding, validity window, and acceptance signature lines.",
        file: "/downloads/quote-template.pdf",
        filename: "Golden-Tide-Quote-Template.pdf",
        meta: "A4 · PDF",
        action: "Download PDF",
      },
    ],
  },
  {
    category: "Email",
    items: [
      {
        title: "Outlook Email Signature",
        description:
          "HTML signature for Outlook — Justin Van Staden · Golden Tide · justin@goldentide.cloud. Open in a browser, copy, and paste into Outlook Signatures.",
        file: "/downloads/email-signature-outlook.html",
        filename: "Golden-Tide-Outlook-Signature.html",
        meta: "HTML · Outlook",
        action: "Download HTML",
      },
      {
        title: "Signature install notes",
        description:
          "Short steps for classic Outlook and Outlook on the web.",
        file: "/downloads/EMAIL-SIGNATURE-README.md",
        filename: "Golden-Tide-Signature-Install-Notes.md",
        meta: "Markdown",
        action: "Download notes",
      },
    ],
  },
];

export default function Downloads() {
  return (
    <div className="min-h-screen bg-clarity">
      <Navbar />
      <main>
        <section className="relative pt-28 md:pt-36 pb-20 md:pb-28">
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
                Resources
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl text-basalt tracking-tight max-w-3xl text-balance">
              Downloads
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Print-ready flyers, business cards, and client invoice &amp; quote templates for Golden Tide
              IT Professional Services — built for small and medium businesses across Samoa, New Zealand,
              and Australia.
            </p>

            <div className="mt-16 space-y-14">
              {DOWNLOADS.map((group) => (
                <div key={group.category}>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
                    {group.category}
                  </h2>
                  <ul className="divide-y divide-basalt/10 border-y border-basalt/10">
                    {group.items.map((item) => (
                      <li
                        key={item.file}
                        className="py-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/35 bg-white/60">
                          <FileText className="h-5 w-5 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="font-display text-2xl text-basalt tracking-tight">
                              {item.title}
                            </h3>
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                              {item.meta}
                            </span>
                          </div>
                          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                            {item.description}
                          </p>
                        </div>
                        <a
                          href={item.file}
                          download={item.filename}
                          className="inline-flex items-center gap-2 self-start md:self-center shrink-0 text-sm font-medium px-5 py-2.5 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          {item.action || "Download"}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4 border border-basalt/10 bg-white/50 px-6 py-5">
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                Need a custom version for an event or partner? Request a consult and we’ll tailor the
                copy.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-basalt hover:text-gold transition-colors"
              >
                Request a consult
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
