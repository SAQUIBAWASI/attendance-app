import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MessageSquare
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your financial services. Please provide more information.");
    window.open(`https://wa.me/919014424455?text=${message}`, '_blank');
  };

  return (
    <footer 
      className="relative text-white"
      style={{
        backgroundImage: '/images/footerbackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/Logo.jpg" 
                alt="Timely Capital Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">Timely Capital</h3>
                <p className="text-sm text-gray-300">Right Capital for Right Growth</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for loans and financial services in Hyderabad. We provide transparent, fast, and reliable financial solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-600 w-10 h-10 rounded-full p-0">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-600 w-10 h-10 rounded-full p-0">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-600 w-10 h-10 rounded-full p-0">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-emerald-600 w-10 h-10 rounded-full p-0">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('loans')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Loan Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Financial Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Home Loans</li>
              <li className="text-gray-300 text-sm">Personal Loans</li>
              <li className="text-gray-300 text-sm">Business Loans</li>
              <li className="text-gray-300 text-sm">SME Loans</li>
              <li className="text-gray-300 text-sm">Tax Filing</li>
              <li className="text-gray-300 text-sm">GST Services</li>
              <li className="text-gray-300 text-sm">Company Registration</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:9014424455" className="text-gray-300 hover:text-white text-sm transition-colors">
                  9014424455
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@timelycapital.com" className="text-gray-300 hover:text-white text-sm transition-colors">
                  info@timelycapital.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Flat No: 301, 3rd Floor, Sri Sai Balaji Avenue, Arunodaya Colony, Madhapur, Hyderabad, Telangana 500081
                </p>
              </div>
            </div>
            <Button 
              onClick={openWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4 rounded-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
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
            <button className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </button>
            <button 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openWhatsApp}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl animate-bounce"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </footer>
  );
}