import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    content: 'Timely Capital made my home loan process incredibly smooth. Their team was professional and supportive throughout.',
    rating: 5,
    image: '👨‍💻'
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    content: 'Got my business loan approved in just 3 days! The interest rates were competitive and the service was excellent.',
    rating: 5,
    image: '👩‍💼'
  },
  {
    name: 'Amit Patel',
    role: 'Doctor',
    content: 'Their professional loan service helped me set up my clinic. The process was hassle-free and transparent.',
    rating: 5,
    image: '👨‍⚕️'
  },
  {
    name: 'Sunita Reddy',
    role: 'Entrepreneur',
    content: 'Excellent tax filing service! They helped me save a lot on taxes and the process was completely digital.',
    rating: 5,
    image: '👩‍💻'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          {/* Main Testimonial */}
          <Card className="border-0 shadow-2xl bg-white relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <Quote className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                    "{currentTestimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="text-4xl">{currentTestimonial.image}</div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{currentTestimonial.name}</div>
                      <div className="text-gray-600">{currentTestimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* All Testimonials Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === currentIndex ? 'ring-2 ring-blue-600 shadow-lg' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{testimonial.image}</div>
                  <div className="font-semibold text-sm text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}