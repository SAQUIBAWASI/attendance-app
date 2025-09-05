import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/images/Logo.jpg" 
              alt="Timely Capital Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Timely Capital</h1>
              <p className="text-xs text-gray-600">Right Capital for Right Growth</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('loans')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Loans
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Call Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:9014424455"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">9014424455</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('loans')}
                className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Loans
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Contact
              </button>
              <a 
                href="tel:9014424455"
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">9014424455</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}