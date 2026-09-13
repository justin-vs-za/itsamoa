import { createClientFromRequest } from 'npm:@base44/sdk@0.44';

const NOTIFY_EMAIL = "justin.vanstaden.arco@gmail.com";

const SETUP_OPTIONS = [
  "On-premise servers",
  "Migrating to Cloud",
  "Fully Cloud-based",
  "Hybrid",
  "Not sure / Need assessment",
];

const SERVICE_OPTIONS = [
  "Cloud Migration & Architecture",
  "Cyber Resilience",
  "Physical to Virtual Infrastructure",
  "Networking & Connectivity",
  "Microsoft 365 & Productivity",
  "Security Audit & Compliance",
  "General Enquiry",
];

export default async function(req) {
  try {
    const data = await req.json();
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const company = (data.company || "").trim();
    const current_setup = data.current_setup;
    const service_interest = data.service_interest;
    const message = (data.message || "").trim();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (!/^[^\s]+@[^\s]+\.[^\s]+$/.test(email)) {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!SETUP_OPTIONS.includes(current_setup) || !SERVICE_OPTIONS.includes(service_interest)) {
      return Response.json({ error: "Invalid selection." }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    await base44.asServiceRole.entities.Lead.create({
      name,
      email,
      company,
      current_setup,
      service_interest,
      message,
    });

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#1a1a1a">
        <h2 style="color:#b88600;margin-bottom:4px">New Consultation Request</h2>
        <p style="color:#666;margin-top:0">A new lead has been submitted via golden tide.</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr><td style="padding:6px 0;color:#888;width:140px">Name</td><td style="padding:6px 0"><b>${name}</b></td></tr>
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#1a1a1a">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#888">Company</td><td style="padding:6px 0">${company || "—"}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Current Setup</td><td style="padding:6px 0">${current_setup}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Service Interest</td><td style="padding:6px 0">${service_interest}</td></tr>
        </table>
        <h3 style="margin-top:20px;color:#333">Message</h3>
        <p style="white-space:pre-wrap;line-height:1.6">${message || "—"}</p>
      </div>
    `;

    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: NOTIFY_EMAIL,
        subject: `New consultation request — ${name}`,
        html,
      });
    } catch (emailErr) {
      // Lead is saved; email send is best-effort.
      console.error("Email send failed:", emailErr.message);
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
