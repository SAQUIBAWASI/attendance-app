import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your financial services. Please provide more information.");
    window.open(`https://wa.me/919014424455?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-semibold mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to get started? Contact us today for a free consultation and let us help you achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <a 
                        href="tel:9014424455"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                      >
                        9014424455
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <a 
                        href="mailto:info@timelycapital.com"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                      >
                        info@timelycapital.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Timely Capital, Flat No: 301, 3rd Floor, Sri Sai Balaji Avenue, Arunodaya Colony, Madhapur, Hyderabad, Telangana 500081
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-600 text-sm">Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Button */}
              <Button 
                onClick={openWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                    Book Your Free Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="border-2 border-gray-200 focus:border-emerald-600 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="border-2 border-gray-200 focus:border-emerald-600 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-emerald-600 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Interested In *
                      </label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                        <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-600 rounded-lg">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-loan">Home Loan</SelectItem>
                          <SelectItem value="personal-loan">Personal Loan</SelectItem>
                          <SelectItem value="business-loan">Business Loan</SelectItem>
                          <SelectItem value="sme-loan">SME Loan</SelectItem>
                          <SelectItem value="tax-filing">Tax Filing</SelectItem>
                          <SelectItem value="gst-services">GST Services</SelectItem>
                          <SelectItem value="company-registration">Company Registration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="border-2 border-gray-200 focus:border-emerald-600 rounded-lg"
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Quick Response Guarantee</span>
                    </div>
                    <p className="text-emerald-700 text-sm mt-1">
                      We'll respond to your inquiry within 2 hours during business hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}