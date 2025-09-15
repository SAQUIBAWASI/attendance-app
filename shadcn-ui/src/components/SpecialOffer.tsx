import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SpecialOfferCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Auto Scroll Function
  const startScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

   
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    let scrollAmount = scrollContainer.scrollLeft; 
    const scrollStep = 1; // speed

    scrollIntervalRef.current = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, 20); // speed control
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // ✅ Stop & Restart After Delay (background click)
  const pauseAndRestart = () => {
    stopScroll();

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    restartTimeoutRef.current = setTimeout(() => {
      startScroll();
    }, 3000); // 3 sec delay
  };

  useEffect(() => {
    startScroll();
    return () => {
      stopScroll();
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, []);

  const offers = [
    {
      price: "₹799",
      oldPrice: "₹1999",
      title: "Tax Filing Starts From",
      desc: "CA-Backed. Zero Hassle.",
    },
    {
      price: "₹2999",
      oldPrice: "₹4999",
      title: "Register your business today",
      desc: "GST, MSME registrations, Labour license",
    },
    {
      price: "₹14999",
      oldPrice: "₹24999",
      title: "Register your private limited company",
      desc: "Trusted by 100+ Businesses",
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-r from-emerald-500 to-teal-500 relative overflow-hidden"
      onClick={pauseAndRestart} // ✅ background click → pause + restart
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-white mb-10">
          Our Special Offers
        </h2>

        {/* Auto Scroll Wrapper */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap"
          onMouseEnter={() => stopScroll()}   // ✅ Container hover → stop
          onMouseLeave={() => startScroll()}  // ✅ Container leave → start
        >
          {[...offers, ...offers].map((offer, index) => (
            <Card
              key={index}
              className="min-w-[280px] max-w-sm border-0 shadow-xl bg-white p-6 flex-shrink-0 cursor-pointer transform transition-transform duration-300 hover:scale-110" 
              // ✅ Card hover → pop effect
              onClick={(e) => {
                e.stopPropagation(); 
                stopScroll();
                setIsModalOpen(true);
              }}
            >
              <CardContent className="flex flex-col items-center text-center">
                <Badge className="bg-red-500 text-white mb-4">Special Offer</Badge>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.desc}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-emerald-500">
                    {offer.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {offer.oldPrice}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ✅ Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                startScroll(); // Resume scrolling
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Connect to My Team
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Our experts are ready to assist you.
            </p>

            <a
              href="https://wa.me/919014424455?text=Hi!%20I'm%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full flex items-center justify-center">
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
