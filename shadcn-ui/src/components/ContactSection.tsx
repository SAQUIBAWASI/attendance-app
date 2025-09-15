import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative bg-blue-500 py-20 text-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Contact Us</h2>
        </div>

        {/* Contact Info */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
  {/* Call */}
  <div className="flex flex-col items-center space-y-4">
    <a
      href="tel:9014424455"
      className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:opacity-90 transition"
    >
      <Phone className="w-7 h-7 text-white" />
    </a>
    <h3 className="text-lg font-semibold">Call Us</h3>
    <a
      href="tel:9014424455"
      className="text-lg text-white hover:text-emerald-500 transition"
    >
      +919014424455
    </a>
  </div>

  {/* Visit */}
  <div className="flex flex-col items-center space-y-4">
    <a
      href="https://www.google.com/maps?q=Timely+Capital,+Flat+No:+301,+3rd+Floor,+Sri+Sai+Balaji+Avenue,+Arunodaya+Colony,+Madhapur,+Hyderabad,+Telangana+500081"
      target="_blank"
      rel="noopener noreferrer"
      className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:opacity-90 transition"
    >
      <MapPin className="w-7 h-7 text-white" />
    </a>
    <h3 className="text-lg font-semibold">Visit Us</h3>
    <p className="text-white max-w-xs text-sm leading-relaxed">
      Timely Capital, Flat No: 301, 3rd Floor, Sri Sai Balaji Avenue,
      Arunodaya Colony, Madhapur, Hyderabad, Telangana 500081
    </p>
  </div>

  {/* Email */}
  <div className="flex flex-col items-center space-y-4">
    <a
      href="mailto:info@timelycapital.com"
      className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:opacity-90 transition"
    >
      <Mail className="w-7 h-7 text-white" />
    </a>
    <h3 className="text-lg font-semibold">Email Us</h3>
    <a
      href="mailto:info@timelycapital.com"
      className="text-lg text-white hover:text-emerald-500 transition"
    >
      info@timelycapital.com
    </a>
  </div>
</div>


        {/* Book Button
        <div className="flex justify-center mt-12">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-3 rounded-full shadow-lg transition">
            Book Consultation
          </Button>
        </div> */}

        {/* WhatsApp Floating Button
        <button
          onClick={() =>
            window.open(
              "https://wa.me/919014424455?text=Hi! I'm interested in your services.",
              "_blank"
            )
          }
          className="fixed bottom-6 left-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition"
        >
          <svg
            className="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </button> */}
        
      </div>
      
    </section>
  );
}
