import { ArrowDown, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useInView } from "@/hooks/useInView";

const HERO_IMG = "https://media.base44.com/images/public/6aa613ccd990b946b850fb36/162a7757b_generated_206ece2c.jpg";

export default function Hero() {
  const { ref, inView } = useInView();
  return (
    <section id="top" ref={ref} className="relative min-h-screen flex flex-col">
      {/* Horizon grid lines */}
      <div className="pointer-events-none absolute inset-0">
        {[15, 30, 45, 60, 75, 90].map((p) => (
          <div
            key={p}
            className="absolute inset-x-0 h-px horizon-line opacity-30"
            style={{ top: `${p}%` }}
          />
        ))}
      </div>

      <div className="relative flex-1 grid lg:grid-cols-12 gap-0 pt-28 lg:pt-0">
        {/* Left: typographic statement */}
        <div className="lg:col-span-7 flex items-center px-6 md:px-12 lg:px-16 py-16">
          <div className={`max-w-2xl fade-up ${inView ? "in-view" : ""}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Serving Samoa · New Zealand · Australia
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-basalt text-balance">
              The bridge between
              <br />
              <span className="gold-text">physical infrastructure</span>
              <br />
              and the infinite cloud.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Golden Tide IT Professional Services delivers enterprise-grade IT
              architecture, cybersecurity, and cloud migration — engineered with
              28 years of South African systems mastery, now serving the South
              Pacific: Samoa, New Zealand, and Australia.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors font-medium"
              >
                <ShieldCheck className="h-4 w-4" />
                Request a Security Audit
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-basalt/30 rounded-sm hover:border-gold hover:text-basalt transition-colors font-medium"
              >
                Explore Services
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["28", "Years Mastery"],
                ["100%", "Uptime Focus"],
                ["3", "Continents Served"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-basalt">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="lg:col-span-5 relative min-h-[40vh] lg:min-h-screen overflow-hidden">
          <Image
            src={HERO_IMG}
            alt="Minimalist high-tech server room with golden cable management"
            fittingType="fill"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-basalt/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-basalt/30" />
          <div className="absolute bottom-6 right-6 glass-dark px-4 py-3 rounded-sm border border-gold/20">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Live Infrastructure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}