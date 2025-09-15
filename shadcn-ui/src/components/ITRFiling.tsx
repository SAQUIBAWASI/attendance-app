import Footer from "@/components/Footer"; // ✅ your footer
import Header from "@/components/Header"; // ✅ your header
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ItrFiling() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ITR Filing Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Hassle-free Income Tax Return filing with expert CA guidance.
            Affordable, quick, and compliant with the latest regulations.
          </p>
          <a
            href="https://wa.me/919014424455?text=Hi!%20I%20want%20help%20with%20ITR%20filing."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full text-lg">
              File My ITR Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container mx-auto px-6 grid md:grid-cols-3 gap-8 mb-20">
        {["CA-Backed Filing", "Quick & Hassle-Free", "100% Compliance"].map(
          (feature, idx) => (
            <Card key={idx} className="shadow-md border-0">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature}
                </h3>
              </CardContent>
            </Card>
          )
        )}
      </section>

      {/* PROCESS STEPS */}
      <section className="container mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Upload Your Documents",
            "Expert Review by CA",
            "Quick Filing Submission",
            "Get Acknowledgement",
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-3xl font-bold text-emerald-500 block mb-4">
                {idx + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="container mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Affordable Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Salaried Individuals",
              price: "₹799",
              features: ["Form 16 Filing", "Quick Submission", "CA Support"],
            },
            {
              title: "Self-Employed",
              price: "₹1499",
              features: [
                "Business/Profession ITR",
                "Expense Deduction",
                "Tax Planning",
              ],
            },
            {
              title: "Investors & Traders",
              price: "₹2499",
              features: [
                "Capital Gains",
                "Stock/Mutual Fund ITR",
                "Detailed Review",
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
                  href="https://wa.me/919014424455?text=Hi!%20I%20want%20help%20with%20ITR%20filing."
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
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
