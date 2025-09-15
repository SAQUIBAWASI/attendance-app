import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
// import { TrendingUp } from 'lucide-react'; // ab nahi chahiye agar icon use nahi karna

const stats = [];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-500 px-4 py-2 text-sm font-bold mb-4">
              About Us
            </Badge>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Description */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>At Timely Capital,</strong> we're dedicated to making your financial journey smooth and stress-free.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>CA-Backed Trust:</strong> Our financial services are supported by expert CA audits, ensuring reliable accuracy and peace of mind.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Simplicity:</strong> We offer easy-to-understand processes and minimal documentation, cutting through the jargon.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Fast & Local:</strong> Get quick approvals and responsive support from our dedicated local experts right when you need them.
              </p>
            </div>

            {/* Right - About Image */}
            <div className="relative">
              <img
                src="/images/about1.jpg"
                alt="About Timely Capital"
                className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
