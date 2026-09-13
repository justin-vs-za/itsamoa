import { useState } from "react";
import { Send, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useInView } from "@/hooks/useInView";

const SETUPS = [
  "On-premise servers",
  "Migrating to Cloud",
  "Fully Cloud-based",
  "Hybrid",
  "Not sure / Need assessment",
];

const SERVICES = [
  "Cloud Migration & Architecture",
  "Cyber Resilience",
  "Physical to Virtual Infrastructure",
  "Networking & Connectivity",
  "Microsoft 365 & Productivity",
  "Security Audit & Compliance",
  "General Enquiry",
];

export default function Contact() {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    current_setup: "",
    service_interest: "",
    message: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await base44.functions.invoke("submitLead", {
        name: form.name,
        email: form.email,
        company: form.company,
        current_setup: form.current_setup,
        service_interest: form.service_interest,
        message: form.message,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="relative bg-clarity py-24 md:py-32">
      <div className="absolute top-0 inset-x-0 h-px horizon-line" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: context */}
          <div className={"lg:col-span-5 fade-up ${inView ? 'in-view' : ''}"}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                The Consultation
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-basalt tracking-tight text-balance">
              Let's scope your system.
            </h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Tell us where your infrastructure stands today. Every enquiry is reviewed
              personally — you'll hear back with a clear next step, not a sales script.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-basalt">Asia, Samoa</div>
                  <div className="text-sm text-muted-foreground">Serving Samoa • New Zealand • Australia</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-basalt">
                    <a href="mailto:justinvs@live.co.za" className="hover:text-gold transition-colors">justinvs@live.co.za</a>
                  </div>
                  <div className="text-sm text-muted-foreground">Response within 1 business day</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-basalt">
                    <a href="tel:+6857703733" className="hover:text-gold transition-colors">+685 770 3733</a>
                  </div>
                  <div className="text-sm text-muted-foreground">Remote & on-site engagement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center glass border border-gold/30 rounded-3xl p-8">
                <CheckCircle2 className="h-14 w-14 text-gold mb-4" />
                <h3 className="mt-6 font-display text-3xl text-basalt">Request received.</h3>
                <p className="mt-3 text-muted-foreground max-w-md">
                  Thank you, {form.name.split(" ")[0] || "there"}. Your consultation
                  request is in — we'll respond with a clear next step within one
                  business day.
                </p>
              </div>
            ) : (
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", company: "", current_setup: "", service_interest: "", message: "" });
                }}
                className="mt-8 text-sm font-medium text-basalt underline underline-offset-4 hover:text-gold transition-colors"
              >
                Submit another request
              </button>
            )}

            <form onSubmit={submit} className="glass border border-basalt/10 rounded-3xl p-6 md:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="gt-input"
                    placeholder="Jane Ierome"
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    className="gt-input"
                    placeholder="jane@company.ws"
                  />
                </Field>
              </div>

              <Field label="Company">
                <input
                  value={form.company}
                  onChange={update("company")}
                  className="gt-input"
                  placeholder="Organisation name"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Current system setup" required>
                  <div className="relative">
                    <select
                      required
                      value={form.current_setup}
                      onChange={update("current_setup")}
                      className="gt-input appearance-none pr-10"
                    >
                      <option value="" disabled>Select your setup.</option>
                      {SETUPS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ▾
                    </span>
                  </div>
                </Field>

                <Field label="Service of interest" required>
                  <div className="relative">
                    <select
                      required
                      value={form.service_interest}
                      onChange={update("service_interest")}
                      className="gt-input appearance-none pr-10"
                    >
                      <option value="" disabled>Select a service.</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ▾
                    </span>
                  </div>
                </Field>
              </div>

              <Field label="Project details">
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  className="gt-input resize-none"
                  placeholder="Tell us about your environment, timeline, and what you're trying to achieve."
                />
              </Field>

              {status === "error" && (
                <p className="text-sm text-destructive">
                  Something went wrong sending your request. Please try again or email hello@goldentide.cloud directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-basalt text-clarity rounded-xl font-medium transition-all hover:bg-basalt/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Consultation Request"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
