// src/pages/CompanyFormation.tsx
import Footer from "@/components/Footer"; // ✅ import your footer
import Header from "@/components/Header"; // ✅ import your header
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CompanyFormation() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <section className="pt-24 pb-16 bg-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Company Formation Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Start your business journey with expert company registration services. 
            From Pvt. Ltd. to LLP, we handle everything with compliance and care.
          </p>
          <a
            href="https://wa.me/919014424455?text=Hi!%20I%20am%20interested%20in%20Company%20Formation%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full text-lg">
              Register My Company <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 mb-20">
          {[
            "Expert Legal Guidance",
            "End-to-End Registration",
            "Quick & Hassle-Free Process",
          ].map((feature, idx) => (
            <Card key={idx} className="shadow-md border-0">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="container mx-auto px-6 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              "Choose Business Type",
              "Submit Required Documents",
              "Government Approval & Filing",
              "Get Certificate of Incorporation",
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <span className="text-3xl font-bold text-emerald-500 block mb-4">
                  {idx + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Plans */}
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Company Formation Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Private Limited Company",
                price: "₹7,999",
                features: [
                  "2 Director DIN + DSC",
                  "MOA & AOA Filing",
                  "PAN & TAN Registration",
                ],
              },
              {
                title: "Limited Liability Partnership (LLP)",
                price: "₹6,499",
                features: [
                  "2 Partner DSC + DIN",
                  "LLP Agreement Drafting",
                  "MCA Filing Support",
                ],
              },
              {
                title: "One Person Company (OPC)",
                price: "₹5,999",
                features: [
                  "Single Director Setup",
                  "Digital Signature",
                  "Certificate of Incorporation",
                ],
              },
            ].map((plan, idx) => (
              <Card key={idx} className="shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-3xl font-bold text-emerald-500 mb-4">
                    {plan.price}
                  </p>
                  <ul className="text-gray-600 mb-6 space-y-2">
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/919014424455?text=Hi!%20I%20am%20interested%20in%20Company%20Formation%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-full">
                      Get Started
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
