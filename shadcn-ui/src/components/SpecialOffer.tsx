import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';

export default function SpecialOffer() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Offer Details */}
                <div className="lg:w-2/3 p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                      Special Offer
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Tax Filing Starts From
                  </h2>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-blue-600">₹799</span>
                    <span className="text-xl text-gray-500 line-through">₹1999</span>
                    <Badge className="bg-green-500 text-white">60% OFF</Badge>
                  </div>
                  
                  <p className="text-xl text-gray-700 mb-6 font-semibold">
                    CA-Backed. Zero Hassle.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {[
                      'Expert CA assistance',
                      'Maximum tax refunds',
                      'Error-free filing guaranteed',
                      'All ITR forms supported',
                      'Quick turnaround time',
                      'Free consultation included'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={scrollToContact}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                
                {/* Right Side - Visual Element */}
                <div className="lg:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <FileText className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Limited Time</h3>
                    <p className="text-lg opacity-90">Offer Valid Till</p>
                    <p className="text-xl font-semibold">31st March 2025</p>
                    
                    <div className="mt-6 p-4 bg-white/10 rounded-lg">
                      <p className="text-sm">Already helped</p>
                      <p className="text-2xl font-bold">1000+</p>
                      <p className="text-sm">clients save taxes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);