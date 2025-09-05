import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: '500+',
    label: 'Loans Approved',
    description: 'Successfully processed loans'
  },
  {
    icon: Award,
    number: '1000+',
    label: 'Happy Clients',
    description: 'Satisfied customers'
  },
  {
    icon: Clock,
    number: '5+',
    label: 'Years Experience',
    description: 'In financial services'
  },
  {
    icon: TrendingUp,
    number: '98%',
    label: 'Success Rate',
    description: 'Loan approval rate'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold mb-4">
              About Us
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Timely Capital</h2>
            <p className="text-xl text-gray-600 italic mb-8">Right Capital for Right Growth</p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Description */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Timely Capital, we understand that every financial need is unique. With years of expertise in loans and financial services, we provide tailored solutions that help individuals and businesses achieve their goals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment to transparency, speed, and reliability has made us a trusted partner for thousands of clients across Hyderabad and beyond.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Quick loan approval process',
                    'Competitive interest rates',
                    'Transparent terms and conditions',
                    'Expert financial guidance',
                    'Personalized service approach',
                    'Strong track record of success'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90 mb-6">
                  To provide accessible, reliable, and transparent financial solutions that empower individuals and businesses to achieve their dreams and grow sustainably.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Growth Focused</p>
                    <p className="text-sm opacity-80">Your success is our priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}