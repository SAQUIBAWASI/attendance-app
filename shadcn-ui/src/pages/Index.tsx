import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LoanServices from '@/components/LoanServices';
import SpecialOffer from '@/components/SpecialOffer';
export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="about" className="scroll-mt-20">
          <AboutSection />
        </section>
        
        <section id="services" className="scroll-mt-20">
          <LoanServices />
          {/* <FinancialServices /> */}
        </section>
        <SpecialOffer />
        {/* <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>
         */}

        
        {/* <TestimonialsSection /> */}
      </main>

      <section id="footer" className="scroll-mt-20">
      <Footer />
      </section>
    </div>
  );
}
