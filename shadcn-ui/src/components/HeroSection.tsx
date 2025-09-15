import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
  id="home"
  className="pt-20 pb-16 relative min-h-screen flex items-center justify-center text-center"
  style={{
    backgroundImage: 'url("/images/home.png")',
    backgroundSize: "cover",
    backgroundPosition: "top center", // ✅ top se image align hogi
    backgroundRepeat: "no-repeat",
  }}
>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-6">

        {/* Heading */}
        <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">
          Your Partner for Simplified Financial Solutions
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-200">
          Loans & Financial Services made simple, fast, and reliable.
        </p>

        {/* CTA Button */}
       <Button
  onClick={() =>
    window.open(
      "https://wa.me/919014424455?text=Hi! I'm interested in your services.",
      "_blank"
    )
  }
  size="lg"
  className="bg-emerald-500 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
>
  Apply Now
</Button>

      </div>
    </section>
  );
}
