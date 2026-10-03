import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/goldentide/Navbar";
import Footer from "@/components/goldentide/Footer";

export default function PaySuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-clarity text-foreground">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
          <h1 className="mt-6 font-display text-4xl text-basalt tracking-tight">
            Payment received
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Thank you. Stripe is confirming your payment. A receipt will be emailed when
            settlement completes. For project kickoff, reply to your confirmation or contact{" "}
            <a href="mailto:justin@goldentide.cloud" className="text-azure underline underline-offset-4">
              justin@goldentide.cloud
            </a>
            .
          </p>
          {sessionId && (
            <p className="mt-6 font-mono text-[11px] text-muted-foreground break-all">
              Reference: {sessionId}
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex px-5 py-2.5 bg-basalt text-clarity text-sm font-medium rounded-sm hover:bg-gold hover:text-basalt transition-colors"
            >
              Back to home
            </Link>
            <Link
              to="/rates"
              className="inline-flex px-5 py-2.5 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              View rates
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
