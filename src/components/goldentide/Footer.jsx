import { ArrowUpRight } from "lucide-react";

const COLS = [
  {
    title: "Core Infrastructure",
    links: ["Physical-to-Virtual", "Networking & Connectivity", "Hyper-V Clustering", "Server Builds"],
  },
  {
    title: "Cloud Services",
    links: ["Azure Architecture", "Office 365", "Microsoft 365", "Cloud Migration"],
  },
  {
    title: "Security",
    links: ["Cyber Resilience", "Security Audits", "Zero Trust", "Backup & DR"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-basalt text-clarity overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />

      {/* Bridge graphic */}
      <div className="border-b border-gold/15">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-clarity/50">South Africa</span>
            <span className="h-px w-16 md:w-32 horizon-line" />
            <ArrowUpRight className="h-4 w-4 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Samoa · NZ · Australia</span>
          </div>
          <span className="font-mono text-xs text-clarity/40">28 years of engineering, one horizon</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Seal */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-gold/40" />
                <span className="absolute inset-1.5 rounded-full border border-gold/60" />
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <div>
                <div className="font-display text-2xl text-clarity">Golden Tide</div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-gold/70 font-mono">
                  IT Professional Services
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-clarity/50 leading-relaxed max-w-xs">
              Premier IT infrastructure, cloud architecture, and cybersecurity
              consultancy for the South Pacific — Samoa, New Zealand & Australia.
            </p>
            <a
              href="https://goldentide.cloud"
              className="mt-6 inline-block font-mono text-sm text-gold hover:underline underline-offset-4"
            >
              goldentide.cloud
            </a>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#services"
                      className="text-sm text-clarity/60 hover:text-gold transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60 mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-sm text-clarity/60 hover:text-gold transition-colors">
                  Request Audit
                </a>
              </li>
              <li>
                <a href="#legacy" className="text-sm text-clarity/60 hover:text-gold transition-colors">
                  Our Legacy
                </a>
              </li>
              <li>
                <a href="#security" className="text-sm text-clarity/60 hover:text-gold transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-clarity/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-clarity/40">
            © {new Date().getFullYear()} Golden Tide IT Professional Services. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-clarity/40 hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="font-mono text-xs text-clarity/40 hover:text-gold transition-colors">Terms</a>
            <span className="font-mono text-xs text-clarity/40">Samoa · NZ · Australia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}