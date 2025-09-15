import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  Building2,
  Home,
  MapPin,
  Shield,
  User
} from 'lucide-react';
import { Link } from "react-router-dom";

const loanServices = [
  { icon: Building2, title: 'ITR Filing', description: 'Accurate, timely tax returns, hassle-free.', href: '/itr-filing' },
  { icon: Home, title: 'Home Loans', description: 'Competitive rates for your dream home purchase', href: '/home-loans' },
  { icon: User, title: 'Personal Loans', description: 'Quick approval for personal financial needs', href: '/personal-loans' },
  { icon: Shield, title: 'Company Formation', description: 'Streamlined startup registrations ideal.', href: '/company-foration' },
  { icon: Briefcase, title: 'Business Loans', description: 'Fuel your business growth with flexible terms', href: '/business-loans' },
  { icon: MapPin, title: 'Business Planning', description: 'Strategic advice for sustainable business growth.', href: '/business-planning' }
];

export default function LoanServices() {
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
              <Link key={index} to={service.href} className="block group">
                <Card className="group-hover:bg-gray-300 transition-colors duration-200 transform group-hover:-translate-y-2 border-0 shadow-lg bg-white cursor-pointer overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-2">{/* future features if any */}</ul>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
