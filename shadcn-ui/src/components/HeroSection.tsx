import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="pt-20 pb-16 relative min-h-screen flex items-center"
      style={{
        backgroundImage: '/images/HeroBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-2/3 mb-12 lg:mb-0 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-600/20 backdrop-blur-sm text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted Financial Partner
              </div>
              
              <div className="mb-6">
                <div className="flex justify-center lg:justify-start mb-4">
                  <img 
                    src="/images/Logo.jpg" 
                    alt="Timely Capital Logo" 
                    className="h-16 w-auto"
                  />
                </div>
                <p className="text-lg text-gray-300 italic">Right Capital for Right Growth</p>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Right Capital for{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Right Growth
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 max-w-2xl">
                Loans & Financial Services made simple, fast, and reliable. Get the funding you need to achieve your dreams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm bg-white/10"
                >
                  Learn More
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 pt-8 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Loans Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}