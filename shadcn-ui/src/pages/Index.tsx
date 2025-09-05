import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LoanServices from '@/components/LoanServices';
import FinancialServices from '@/components/FinancialServices';
import SpecialOffer from '@/components/SpecialOffer';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LoanServices />
        <FinancialServices />
        <SpecialOffer />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}