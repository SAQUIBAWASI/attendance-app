import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from 'lucide-react';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Added

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const location = useLocation();   // ✅ current route
  const navigate = useNavigate();   // ✅ for navigation

  // ✅ Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // ✅ Header jaisa scrollOrNavigate
  const scrollOrNavigate = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your financial services. Please provide more information.");
    window.open(`https://wa.me/919014424455?text=${message}`, '_blank');
  };

  return (
    <footer 
      className="relative text-white"
      style={{
        backgroundImage: 'url(/images/home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo6.png" 
                alt="Timely Capital Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for loans and financial services in Hyderabad. We provide transparent, fast, and reliable financial solutions.
            </p>
            <div className="flex space-x-4">
              {/* Social links */}
              <a href="https://www.facebook.com/Timelycapital" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-500 w-10 h-10 rounded-full p-0">
                  <Facebook className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://x.com/capitalTimely" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-500 w-10 h-10 rounded-full p-0">
                  <Twitter className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.instagram.com/timelycapital/?hl=en" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-500 w-10 h-10 rounded-full p-0">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-500 w-10 h-10 rounded-full p-0">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* ✅ Quick Links (updated with scrollOrNavigate) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollOrNavigate('home')} className="text-gray-300 hover:text-white transition-colors text-sm">Home</button></li>
              <li><button onClick={() => scrollOrNavigate('about')} className="text-gray-300 hover:text-white transition-colors text-sm">About</button></li>
              <li><button onClick={() => scrollOrNavigate('services')} className="text-gray-300 hover:text-white transition-colors text-sm">Services</button></li>
              <li><button onClick={() => scrollOrNavigate('contact')} className="text-gray-300 hover:text-white transition-colors text-sm">Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Home Loans</li>
              <li className="text-gray-300 text-sm">Personal Loans</li>
              <li className="text-gray-300 text-sm">Business Loans</li>
              <li className="text-gray-300 text-sm">Tax Filing</li>
              <li className="text-gray-300 text-sm">Company Formation</li>
              <li className="text-gray-300 text-sm">Business Planning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+919014424455" className="text-gray-300 hover:text-white text-sm transition-colors">
                  +919014424455
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@timelycapital.com" className="text-gray-300 hover:text-white text-sm transition-colors">
                  info@timelycapital.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Flat No: 301, 3rd Floor, Sri Sai Balaji Avenue, Arunodaya Colony,
                  Madhapur, Hyderabad, Telangana 500081
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-600 relative z-10" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Timely Capital. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => setActiveModal("privacy")} className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal("terms")} className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</button>
            <button onClick={scrollToTop} className="text-gray-300 hover:text-white text-sm transition-colors">Back to Top</button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openWhatsApp}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl animate-bounce"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Privacy & Terms Modal */}
      {activeModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={() => setActiveModal(null)} // Background click = close modal
  >
    <div
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-y-auto max-h-[90vh] scrollbar-hide"
      onClick={(e) => e.stopPropagation()} // Modal click = prevent close
    >
      {/* ✖ Button Removed */}

      {activeModal === "privacy" && (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Effective Date: [Insert Date]</p>

            <p className="text-gray-700 mb-6">
              At <span className="font-semibold">Timely Capital</span>, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your
              data when you use our website or services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Information We Collect</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Personal details (name, email, phone number) you provide via contact forms or loan applications.</li>
              <li>Financial information necessary to process loan requests (shared securely).</li>
              <li>Website usage data (cookies, analytics, browser type, IP address).</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>To provide and improve our financial services.</li>
              <li>To process loan applications and communicate with you.</li>
              <li>To send important updates, offers, or policy changes.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Sharing of Information</h2>
            <p className="text-gray-700 mb-4">
              We <span className="font-semibold">do not sell your data</span>. We may share your information only:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>With trusted service providers assisting in operations.</li>
              <li>When required by law, regulation, or court order.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard measures to protect your information from unauthorized access or misuse.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Your Rights</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>You may request access, correction, or deletion of your personal data.</li>
              <li>You can opt out of marketing emails anytime.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Our website uses cookies to enhance user experience. You can disable cookies in your browser settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related concerns, please contact us: <br />
              📧{" "}
              <a href="mailto:info@timelycapital.com" className="text-blue-600 underline">
                info@timelycapital.com
              </a>{" "}
              <br />
              📞{" "}
              <a href="tel:+919014424455" className="text-blue-600 underline">
                +919014424455
              </a>
            </p>

          {/* --- baaki Terms points same rahenge --- */}
        </>
      )}

            {activeModal === "terms" && (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                <p className="text-gray-600 mb-4">Effective Date: [Insert Date]</p>

                <p className="text-gray-700 mb-6">
                  Welcome to <span className="font-semibold">Timely Capital</span>. By accessing or using our website and services,
                  you agree to comply with and be bound by these Terms of Service. Please read them carefully.
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                    By using our website or services, you acknowledge that you have read, understood, and agree to these Terms.
                    If you do not agree, please do not use our services.
                      </p>

                      <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Use of Services</h2>
                      <ul className="list-disc ml-6 text-gray-700 space-y-2">
                      <li>You must be at least 18 years old to access our services.</li>
                      <li>You agree to provide accurate and complete information when requested.</li>
                      <li>You will not misuse, disrupt, or attempt to gain unauthorized access to our services.</li>
                      </ul>
                      <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Loan Applications</h2>
                      <p className="text-gray-700 mb-4">
                        Submitting a loan application does not guarantee approval. Approval is subject to verification, eligibility,
                        and our internal policies. False or misleading information may result in rejection or termination of services.
                      </p>
                      <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Intellectual Property</h2>
                        <p className="text-gray-700 mb-4">
                          All content on this website, including text, graphics, logos, and software, is the property of
                        <span className="font-semibold"> Timely Capital</span> and is protected by intellectual property laws.
                        You may not copy, distribute, or modify our content without prior written consent.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Limitation of Liability</h2>
                        <p className="text-gray-700 mb-4">
                        We are not responsible for any direct, indirect, or incidental damages resulting from the use of our website
                        or services. Your use of our services is at your own risk.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Termination</h2>
                        <p className="text-gray-700 mb-4">
                        We may suspend or terminate your access to our services at any time, with or without notice, if you violate
                        these Terms or engage in fraudulent or unlawful activities.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Changes to Terms</h2>
                        <p className="text-gray-700 mb-4">
                        We reserve the right to update or modify these Terms at any time. Any changes will be effective immediately
                        upon posting on this website.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Governing Law</h2>
                        <p className="text-gray-700 mb-4">
                        These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts
                        in [Insert City/State].
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Contact Us</h2>
                        <p className="text-gray-700">
  If you have questions regarding these Terms of Service, please contact us: <br />
  📧{" "}
  <a href="mailto:info@timelycapital.com" className="text-blue-600 underline">
    info@timelycapital.com
  </a>{" "}
  <br />
  📞{" "}
  <a href="tel:+919014424455" className="text-blue-600 underline">
    +919014424455
  </a>
                      </p>
                {/* ...baaki Terms ka content same... */}
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
