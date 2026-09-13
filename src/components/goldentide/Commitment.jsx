import { Home, Building2, HeartHandshake, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const SCOPE = [
  {
    icon: Home,
    title: "Home Networks",
    desc: "From a single router that won't reach the back room to a full smart-home setup — no job is too small.",
  },
  {
    icon: Building2,
    title: "Corporate Migrations",
    desc: "Full enterprise system migrations, server overhauls, and multi-site cloud rollouts executed end to end.",
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    desc: "Helping Samoa and its community is the goal — every engagement is a chance to lift local capability.",
  },
];

export default function Commitment() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="relative bg-basalt text-clarity overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />
      <div className="absolute bottom-0 inset-x-0 h-px horizon-line" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className={`lg:col-span-6 fade-up ${inView ? "in-view" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold/70">
                On Island · Unmatched
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-clarity tracking-tight text-balance">
              Unbeatable IT experience, right here in Samoa.
            </h2>
            <p className="mt-6 text-lg text-clarity/70 leading-relaxed">
              The goal is simple: use 28 years of vast IT experience to help Samoa and
              its community. Whether it's a small home network or a full corporate
              system migration, small to medium-sized businesses are always welcome —
              and the depth of skill on this island is unmatched.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-sm">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-clarity/80">
                Serving Samoa · New Zealand · Australia
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 grid sm:grid-cols-1 gap-px bg-gold/15">
            {SCOPE.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-basalt p-8 flex items-start gap-5">
                  <div className="h-12 w-12 shrink-0 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-clarity">{s.title}</h3>
                    <p className="mt-2 text-sm text-clarity/60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}