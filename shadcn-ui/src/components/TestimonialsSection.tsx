"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Software Engineer",
    content:
      "Timely Capital made my home loan process incredibly smooth. Their team was professional and supportive throughout.",
    rating: 5,
    image: "👨‍💻",
  },
  {
    name: "Priya Sharma",
    role: "Business Owner",
    content:
      "Got my business loan approved in just 3 days! The interest rates were competitive and the service was excellent.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Amit Patel",
    role: "Doctor",
    content:
      "Their professional loan service helped me set up my clinic. The process was hassle-free and transparent.",
    rating: 5,
    image: "👨‍⚕️",
  },
  {
    name: "Sunita Reddy",
    role: "Entrepreneur",
    content:
      "Excellent tax filing service! They helped me save a lot on taxes and the process was completely digital.",
    rating: 5,
    image: "👩‍💻",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 animate-gradient-x opacity-90"></div>
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 text-white drop-shadow-lg">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg opacity-90">
            Real stories from people who trusted us with their financial needs
          </p>
        </div>

        {/* Main Testimonial Card */}
        <Card className="border-0 bg-white/20 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-14 rounded-3xl transition-all duration-700">
          <CardContent className="p-10 lg:p-14 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Quote className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Stars */}
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current drop-shadow"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center lg:justify-start gap-5">
                  <div className="text-5xl">{currentTestimonial.image}</div>
                  <div>
                    <div className="font-bold text-lg">{currentTestimonial.name}</div>
                    <div className="opacity-90">{currentTestimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-8 mb-14">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border-0 text-white hover:bg-white hover:text-blue-600 shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 w-3 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border-0 text-white hover:bg-white hover:text-blue-600 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-xl ${
                index === currentIndex
                  ? "ring-2 ring-white shadow-lg scale-105"
                  : "bg-white/30 backdrop-blur-md"
              }`}
            >
              <CardContent className="p-6 text-center text-white">
                <div className="text-3xl mb-3">{testimonial.image}</div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm opacity-80">{testimonial.role}</div>
                <div className="flex justify-center mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
