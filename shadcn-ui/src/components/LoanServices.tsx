import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Home, 
  User, 
  Shield, 
  Briefcase, 
  MapPin, 
  Award, 
  Globe,
  Stethoscope,
  ArrowRight
} from 'lucide-react';

const loanServices = [
  {
    icon: Building2,
    title: 'SME Loans',
    description: 'Tailored financing solutions for small and medium enterprises',
    features: ['Quick approval', 'Competitive rates', 'Flexible terms']
  },
  {
    icon: Home,
    title: 'Home Loans',
    description: 'Competitive rates for your dream home purchase',
    features: ['Low interest rates', 'Long tenure', 'Minimal documentation']
  },
  {
    icon: User,
    title: 'Personal Loans',
    description: 'Quick approval for personal financial needs',
    features: ['Instant approval', 'No collateral', 'Online process']
  },
  {
    icon: Shield,
    title: 'Unsecured Loans',
    description: 'No collateral required financing options',
    features: ['No security', 'Fast processing', 'Flexible repayment']
  },
  {
    icon: Briefcase,
    title: 'Business Loans',
    description: 'Fuel your business growth with flexible terms',
    features: ['Growth funding', 'Working capital', 'Equipment finance']
  },
  {
    icon: MapPin,
    title: 'Mortgage Loans',
    description: 'Leverage your property for financial needs',
    features: ['Property backed', 'Higher amounts', 'Lower rates']
  },
  {
    icon: Award,
    title: 'CGTMSE Loans',
    description: 'Government-backed loans for MSMEs',
    features: ['Government support', 'Collateral free', 'Subsidized rates']
  },
  {
    icon: Globe,
    title: 'PCFC Loans',
    description: 'Pre-shipment credit in foreign currency',
    features: ['Export finance', 'Foreign currency', 'Trade support']
  },
  {
    icon: Stethoscope,
    title: 'Professional Loans',
    description: 'Specialized loans for healthcare professionals',
    features: ['Doctor loans', 'Equipment finance', 'Practice setup']
  }
];

export default function LoanServices() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="loans" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Loan Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive loan solutions tailored to meet your personal and business financial needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={scrollToContact}
                    variant="outline" 
                    className="w-full group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}