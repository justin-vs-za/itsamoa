const ITEMS = [
  "Microsoft Certified",
  "28 Years Experience",
  "Hyper-V Specialist",
  "Azure Architect",
  "Office 365",
  "Cyber Resilience",
  "Network Engineering",
  "Cloud Migration",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden bg-basalt text-clarity border-y border-gold/20">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />
      <div className="absolute bottom-0 inset-x-0 h-px horizon-line" />
      <div className="flex whitespace-nowrap ticker-track py-4">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center font-mono text-xs uppercase tracking-[0.3em] text-clarity/70">
            {item}
            <span className="mx-8 h-1 w-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}