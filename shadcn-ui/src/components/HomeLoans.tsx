// src/pages/HomeLoans.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Footer from "../components/Footer"; // ✅ import your footer
import Header from "../components/Header"; // ✅ import your header

export default function HomeLoans() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <section className="pt-24 pb-16 bg-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Home Loan Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Get affordable and hassle-free home loans with expert guidance.  
            Easy approvals, lowest interest rates, and complete support until disbursement.
          </p>
          <a
            href="https://wa.me/919014424455?text=Hi!%20I%20am%20interested%20in%20Home%20Loan%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full text-lg">
              Apply for Home Loan <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Why Choose Us */}
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 mb-20">
          {[
            "Lowest Interest Rates",
            "Quick Approval Process",
            "Expert Loan Advisory",
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
              "Submit Loan Application",
              "Document Verification",
              "Loan Approval",
              "Disbursement of Funds",
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <span className="text-3xl font-bold text-emerald-500 block mb-4">
                  {idx + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing / Loan Plans */}
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Popular Loan Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "First-Time Buyers",
                price: "Starting @ 8.5% p.a.",
                features: [
                  "Low EMI Options",
                  "Quick Disbursal",
                  "End-to-End Support",
                ],
              },
              {
                title: "Home Renovation Loans",
                price: "Starting @ 9.0% p.a.",
                features: [
                  "Flexible Repayment",
                  "Minimal Documentation",
                  "Fast Approvals",
                ],
              },
              {
                title: "Balance Transfer Loans",
                price: "Starting @ 7.9% p.a.",
                features: [
                  "Lower Interest",
                  "Easy Transfer",
                  "Dedicated Assistance",
                ],
              },
            ].map((plan, idx) => (
              <Card key={idx} className="shadow-lg border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-2xl font-bold text-emerald-500 mb-4">
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
                    href="https://wa.me/919014424455?text=Hi!%20I%20am%20interested%20in%20Home%20Loan%20services."
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
