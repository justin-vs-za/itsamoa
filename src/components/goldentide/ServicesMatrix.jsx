import { useRef } from "react";
import { Cloud, ShieldHalf, Server, Network, Compass, Layers, Code, CloudCog, ScanSearch, Router, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const SERVICES = [
  {
    icon: Cloud,
    title: "Cloud Migration & Architecture",
    group: "Cloud Services",
    desc: "Structured lift-and-shift and greenfield Azure architecture. Office 365 tenant design, identity, and hybrid readiness for Pacific businesses scaling beyond on-premise limits.",
    specs: ["Microsoft Azure", "Office 365", "Entra ID", "M365"],
  },
  {
    icon: ShieldHalf,
    title: "Cyber Resilience",
    group: "Security",
    desc: "Defence-in-depth strategies, endpoint protection, zero-trust posture, and incident recovery plans built to survive the realities of island connectivity.",
    specs: ["Zero Trust", "Defender", "SIEM", "Backup & DR"],
  },
  {
    icon: Server,
    title: "Physical-to-Virtual Infrastructure",
    group: "Core Infrastructure",
    desc: "Server builds, Hyper-V cluster design, and virtualisation strategy that extracts maximum value from existing hardware before — and after — cloud migration.",
    specs: ["Hyper-V", "Windows Server", "Storage Spaces", "Clustering"],
  },
  {
    icon: Network,
    title: "Networking & Connectivity",
    group: "Core Infrastructure",
    desc: "Network architecture, segmentation, and resilient WAN design tuned for the latency and redundancy demands of the South Pacific.",
    specs: ["Routing & Switching", "VLANs", "VPN / SD-WAN", "Firewalls"],
  },
  {
    icon: Cloud,
    title: "Microsoft 365 & Productivity",
    group: "Cloud Services",
    desc: "Exchange Online, Teams, SharePoint, and Intune deployment with governance and adoption strategy — so the tools actually get used.",
    specs: ["Exchange", "Teams", "Intune", "SharePoint"],
  },
  {
    icon: ShieldHalf,
    title: "Security Audits & Compliance",
    group: "Security",
    desc: "Comprehensive posture assessments, gap analysis, and remediation roadmaps aligned to your industry's regulatory expectations.",
    specs: ["Risk Assessment", "ISO 27001", "NIST", "Reporting"],
  },
  {
    icon: Compass,
    title: "IT Consulting",
    group: "Core Infrastructure",
    desc: "Strategic technology advisory grounded in 28 years of hands-on delivery — roadmap planning, vendor selection, and operational governance tailored to Pacific business realities.",
    specs: ["Strategy", "Roadmaps", "Vendor Selection", "Governance"],
  },
  {
    icon: Layers,
    title: "Systems Architecture",
    group: "Cloud Services",
    desc: "End-to-end design of resilient, scalable systems — from compute and storage topology to identity, automation, and disaster recovery, documented for long-term maintainability.",
    specs: ["Reference Designs", "IaC", "DR Design", "Documentation"],
  },
  {
    icon: Code,
    title: "App Development",
    group: "Cloud Services",
    desc: "Custom business applications and integrations built on the Microsoft stack and Azure — workflow automation, internal tooling, and API integrations that fill the gaps off-the-shelf can't.",
    specs: ["Power Platform", "Azure Functions", "APIs", "Automation"],
  },
  {
    icon: CloudCog,
    title: "Cloud Engineering",
    group: "Cloud Services",
    desc: "Hands-on build and operation of Azure and hybrid cloud environments — infrastructure as code, cost optimisation, monitoring, and platform engineering for production-grade reliability.",
    specs: ["Azure IaaS/PaaS", "Terraform", "Cost Optimisation", "Monitoring"],
  },
  {
    icon: ScanSearch,
    title: "Cybersecurity Analysis",
    group: "Security",
    desc: "Deep-dive threat and vulnerability analysis — penetration testing, attack surface mapping, and log forensics that translate raw findings into prioritised, actionable remediation.",
    specs: ["Pen Testing", "Vulnerability Mgmt", "Threat Hunting", "Forensics"],
  },
  {
    icon: Router,
    title: "Network Engineering",
    group: "Core Infrastructure",
    desc: "Design, implementation, and hardening of enterprise networks — routing, switching, segmentation, and secure remote access engineered for performance and resilience.",
    specs: ["Routing & Switching", "Segmentation", "VPN / SD-WAN", "Firewalls"],
  },
];

export default function ServicesMatrix() {
  const { ref, inView } = useInView();
  const scrollerRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-clarity">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className={`max-w-3xl fade-up ${inView ? "in-view" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The Infrastructure Matrix
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-basalt tracking-tight text-balance">
            Six pillars of mastery, deployed with precision.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Each service vertical is a complete discipline — scroll horizontally to
            inspect the spec sheet behind every capability.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={() => scroll(-1)}
            className="h-11 w-11 rounded-full border border-basalt/20 flex items-center justify-center hover:bg-basalt hover:text-clarity transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="h-11 w-11 rounded-full border border-basalt/20 flex items-center justify-center hover:bg-basalt hover:text-clarity transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-12 flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingLeft: "3rem" }}
      >
        <div className="flex gap-6 min-w-min">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
          <div className="min-w-[2rem] shrink-0" />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <article className="group relative snap-start w-[300px] md:w-[380px] shrink-0 bg-card border border-basalt/10 rounded-sm overflow-hidden hover:border-gold/50 transition-colors duration-500">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            0{index + 1} / {service.group}
          </span>
          <div className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-basalt transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <h3 className="font-display text-2xl text-basalt leading-tight mb-4">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[6rem]">
          {service.desc}
        </p>

        {/* Spec sheet preview */}
        <div className="border-t border-basalt/10 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-3 block">
            // spec sheet
          </span>
          <div className="flex flex-wrap gap-2">
            {service.specs.map((spec) => (
              <span
                key={spec}
                className="text-xs font-mono px-2.5 py-1 bg-basalt/5 text-basalt/70 rounded-sm border border-basalt/10 group-hover:border-gold/30 transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-basalt/5 group-hover:bg-gold transition-colors duration-500" />
    </article>
  );
}