import { Image } from "@/components/ui/image";
import { useInView } from "@/hooks/useInView";

const COAST_IMG = "https://media.base44.com/images/public/6aa613ccd990b946b850fb36/5ba26639f_generated_a102a832.jpg";
const MACRO_IMG = "https://media.base44.com/images/public/6aa613ccd990b946b850fb36/601b5e2ca_generated_fb9aa8e9.jpg";

const TIMELINE = [
  { year: "1997", text: "Begins IT support career in South Africa — desktop, server, and network foundations." },
  { year: "2005", text: "Specialises in Microsoft server infrastructure and Hyper-V virtualisation at scale." },
  { year: "2014", text: "Cloud architecture practice — Azure, Office 365, and hybrid identity deployments." },
  { year: "2020", text: "Cybersecurity focus deepens — zero-trust, SIEM, and incident response." },
  { year: "2026", text: "Anchors Golden Tide in Samoa, extending 28 years of engineering mastery across the Pacific — Samoa, New Zealand, and Australia." },
];

export default function Legacy() {
  const { ref, inView } = useInView();
  return (
    <section id="legacy" ref={ref} className="relative bg-clarity">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />

      {/* Coastline banner */}
      <div className="relative h-[42vh] md:h-[52vh] overflow-hidden">
        <Image
          src={COAST_IMG}
          alt="Samoan coastline at sunrise — the golden tide"
          fittingType="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-clarity via-clarity/10 to-transparent" />
        <div className="absolute bottom-8 inset-x-0 px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-basalt/70">
            The Golden Tide — connecting Samoa, New Zealand & Australia
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className={`lg:col-span-5 fade-up ${inView ? "in-view" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                The Legacy
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-basalt tracking-tight text-balance">
              28 years of grit, now anchored in the Pacific.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              From South African enterprise server rooms to Samoan cloud architecture —
              Golden Tide brings a depth of hands-on engineering that cannot be
              shortcut. Every recommendation is backed by systems built, broken, and
              rebuilt across nearly three decades.
            </p>

            <div className="mt-10 relative aspect-[4/3] overflow-hidden rounded-sm border border-basalt/10">
              <Image
                src={MACRO_IMG}
                alt="Macro detail of high-end server hardware"
                fittingType="fill"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <ol className="relative border-l border-basalt/15 pl-8 space-y-10">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[2.55rem] top-1 flex h-4 w-4 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <span className="absolute h-4 w-4 rounded-full border border-gold/40" />
                  </span>
                  <div className="font-display text-2xl text-basalt">{t.year}</div>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}