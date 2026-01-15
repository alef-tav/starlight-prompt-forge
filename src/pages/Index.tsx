import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
