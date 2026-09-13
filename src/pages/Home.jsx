import Navbar from "@/components/goldentide/Navbar";
import Hero from "@/components/goldentide/Hero";
import Ticker from "@/components/goldentide/Ticker";
import ServicesMatrix from "@/components/goldentide/ServicesMatrix";
import SecurityPerimeter from "@/components/goldentide/SecurityPerimeter";
import Legacy from "@/components/goldentide/Legacy";
import Commitment from "@/components/goldentide/Commitment";
import Contact from "@/components/goldentide/Contact";
import Footer from "@/components/goldentide/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-clarity">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <ServicesMatrix />
        <SecurityPerimeter />
        <Legacy />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}