import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/goldentide/BrandLogo";

const NAV_LINKS = [
  { label: "Infrastructure", href: "/#services", group: "Core Infrastructure" },
  { label: "Cloud & Azure", href: "/#services", group: "Cloud Services" },
  { label: "Cybersecurity", href: "/#security", group: "Security" },
  { label: "Legacy", href: "/#legacy", group: "Core Infrastructure" },
  { label: "Downloads", href: "/downloads", group: "Cloud Services", route: true },
  { label: "Contact", href: "/#contact", group: "Cloud Services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-gold/20 py-3" : "py-5"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <BrandLogo size={40} className="ring-1 ring-gold/25" />
            <span className="font-display text-lg tracking-tight text-foreground">
              Golden Tide
              <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body">
                IT Professional Services
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) =>
              l.route ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`text-sm transition-colors relative group ${
                    location.pathname === l.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                      location.pathname === l.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
            <a
              href="/#contact"
              className="text-sm font-medium px-5 py-2.5 bg-basalt text-clarity rounded-sm hover:bg-gold hover:text-basalt transition-colors"
            >
              Request Audit
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Full-screen terminal nav */}
      <div
        className={`fixed inset-0 z-[60] bg-basalt text-clarity transition-all duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px horizon-line pulse-line" />
          <div className="absolute bottom-0 inset-x-0 h-px horizon-line pulse-line" />
        </div>
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold/70">
              // system navigation
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-clarity">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 grid md:grid-cols-3 gap-px bg-gold/20 px-6 md:px-12 pb-12">
            {["Core Infrastructure", "Cloud Services", "Security"].map((group, gi) => (
              <div key={group} className="bg-basalt p-8 flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60 mb-8">
                  0{gi + 1} / {group}
                </span>
                <div className="space-y-1">
                  {NAV_LINKS.filter((l) => l.group === group).map((l, i) =>
                    l.route ? (
                      <Link
                        key={l.label + i}
                        to={l.href}
                        onClick={() => setOpen(false)}
                        className="block font-display text-3xl md:text-4xl text-clarity/80 hover:text-gold transition-colors py-2"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        key={l.label + i}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block font-display text-3xl md:text-4xl text-clarity/80 hover:text-gold transition-colors py-2"
                      >
                        {l.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 md:px-12 py-6 border-t border-gold/15 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <span className="font-mono text-xs text-clarity/50">goldentide.cloud · Samoa · NZ · Australia</span>
            <span className="font-mono text-xs text-clarity/50">28 years · South Africa → Pacific</span>
          </div>
        </div>
      </div>
    </>
  );
}
