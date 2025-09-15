import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 👇 Handle scroll when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollOrNavigate = (sectionId: string) => {
    if (location.pathname === "/") {
      // ✅ Already on home → just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // ✅ Navigate to home with hash → useEffect will scroll
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    window.location.href = "tel:9014424455";
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919014424455?text=Hi! I'm interested in your services.",
      "_blank"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm border-b border-transparent z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo3.jpg"
              alt="Timely Capital Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <button
                onClick={() => scrollOrNavigate("home")}
                className="font-bold text-blue-500 hover:text-emerald-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollOrNavigate("about")}
                className="font-bold text-blue-500 hover:text-emerald-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollOrNavigate("services")}
                className="font-bold text-blue-500 hover:text-emerald-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollOrNavigate("footer")}
                className="font-bold text-blue-500 hover:text-emerald-500 transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Call & WhatsApp Buttons */}
            <div className="flex flex-row gap-3">
              <button
                onClick={handleCall}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full shadow hover:shadow-md"
              >
                <Phone size={18} className="text-blue-600" />
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full shadow hover:shadow-md"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollOrNavigate("home")}
                className="font-semibold text-left text-gray-700 hover:text-emerald-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollOrNavigate("about")}
                className="font-semibold text-left text-gray-700 hover:text-emerald-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollOrNavigate("services")}
                className="font-semibold text-left text-gray-700 hover:text-emerald-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollOrNavigate("footer")}
                className="font-semibold text-left text-gray-700 hover:text-emerald-500 transition-colors"
              >
                Contact
              </button>

              {/* Call & WhatsApp (Mobile) */}
              <div className="flex flex-row gap-3 pt-2">
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full shadow hover:shadow-md"
                >
                  <Phone size={18} className="text-blue-600" />
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full shadow hover:shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
