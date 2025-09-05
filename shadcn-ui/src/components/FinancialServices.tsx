import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Receipt, 
  Building, 
  ClipboardCheck,
  ArrowRight
} from 'lucide-react';

const financialServices = [
  {
    icon: FileText,
    title: 'Income Tax Filing',
    description: 'Professional tax return preparation and filing',
    features: ['Expert CA assistance', 'Maximum refunds', 'Error-free filing', 'ITR-1 to ITR-7'],
    price: '₹799/-'
  },
  {
    icon: Receipt,
    title: 'GST Registration & Filing',
    description: 'Complete GST compliance and return filing',
    features: ['GST registration', 'Monthly returns', 'Annual returns', 'Compliance support'],
    price: 'From ₹999/-'
  },
  {
    icon: Building,
    title: 'Company/Firm Registration',
    description: 'Business incorporation and registration services',
    features: ['Private Limited', 'LLP registration', 'Partnership firm', 'Sole proprietorship'],
    price: 'From ₹2999/-'
  },
  {
    icon: ClipboardCheck,
    title: 'Annual Audit & Compliance',
    description: 'Comprehensive audit and regulatory compliance',
    features: ['Statutory audit', 'Tax audit', 'ROC compliance', 'Annual filings'],
    price: 'From ₹5999/-'
  }
];

export default function FinancialServices() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional financial and compliance services to keep your business running smoothly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {financialServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 shadow-lg bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white px-3 py-1 text-sm font-semibold">
                  {service.price}
                </div>
                
                <CardHeader className="text-center pb-4 pt-8">
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-300"
                  >
                    Get Started
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