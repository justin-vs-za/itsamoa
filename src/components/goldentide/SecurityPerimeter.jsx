import { ShieldCheck, Eye, LifeBuoy, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useInView } from "@/hooks/useInView";

const CYBER_IMG = "https://media.base44.com/images/public/6aa613ccd990b946b850fb36/499791824_generated_0d210811.jpg";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Shielding",
    desc: "Perimeter defence, endpoint hardening, and zero-trust identity boundaries engineered before an incident ever occurs.",
  },
  {
    icon: Eye,
    title: "Detection",
    desc: "Continuous monitoring, threat intelligence, and SIEM tuning that surfaces anomalies before they become breaches.",
  },
  {
    icon: LifeBuoy,
    title: "Recovery",
    desc: "Tested backup, disaster recovery, and incident response runbooks that get you back to operations — fast.",
  },
];

const RISKS = [
  "Legacy on-premise servers with no modern endpoint protection",
  "Shared credentials and no multi-factor enforcement",
  "Unsegmented networks exposing critical systems",
  "No tested backup or disaster recovery plan",
];

export default function SecurityPerimeter() {
  const { ref, inView } = useInView();
  return (
    <section id="security" ref={ref} className="relative bg-basalt text-clarity overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />
      <div className="absolute bottom-0 inset-x-0 h-px horizon-line" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src={CYBER_IMG}
          alt="Cybersecurity perimeter"
          fittingType="fill"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-basalt via-basalt/85 to-basalt" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className={`max-w-3xl fade-up ${inView ? "in-view" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold/70">
              The Security Perimeter
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-clarity tracking-tight text-balance">
            In the Pacific, isolation is not protection.
          </h2>
          <p className="mt-6 text-lg text-clarity/70 leading-relaxed">
            Distance from major data centres does not reduce risk — it amplifies the
            cost of recovery. Golden Tide builds defensible, resilient systems for
            organisations that cannot afford downtime.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-gold/15">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-basalt p-8 md:p-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60">
                  0{i + 1}
                </span>
                <div className="mt-6 h-12 w-12 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-clarity">{p.title}</h3>
                <p className="mt-3 text-sm text-clarity/60 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Risk register */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60">
              // common risk register
            </span>
            <ul className="mt-6 space-y-4">
              {RISKS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-clarity/80">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-dark border border-gold/20 rounded-sm p-8">
            <h3 className="font-display text-2xl text-clarity">
              Not sure where you stand?
            </h3>
            <p className="mt-3 text-sm text-clarity/60 leading-relaxed">
              A Golden Tide security audit maps your full attack surface and delivers a
              prioritised remediation roadmap — usually within two weeks.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
            >
              Request a Security Audit
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Sticky audit button */}
      <a
        href="#contact"
        className="hidden lg:flex fixed bottom-8 right-8 z-40 items-center gap-2 px-5 py-3 bg-gold text-basalt rounded-full font-medium shadow-lg shadow-basalt/40 hover:scale-105 transition-transform"
      >
        <ShieldCheck className="h-4 w-4" />
        Request Security Audit
      </a>
    </section>
  );
}