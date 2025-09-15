import { useState } from "react";

export default function PrivacyPolicyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Footer Link */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 underline"
      >
        Privacy Policy
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Effective Date: [Insert Date]</p>

            <p className="text-gray-700 mb-6">
              At <span className="font-semibold">Timely Capital</span>, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your
              data when you use our website or services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Information We Collect</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Personal details (name, email, phone number) you provide via contact forms or loan applications.</li>
              <li>Financial information necessary to process loan requests (shared securely).</li>
              <li>Website usage data (cookies, analytics, browser type, IP address).</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>To provide and improve our financial services.</li>
              <li>To process loan applications and communicate with you.</li>
              <li>To send important updates, offers, or policy changes.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Sharing of Information</h2>
            <p className="text-gray-700 mb-4">
              We <span className="font-semibold">do not sell your data</span>. We may share your information only:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>With trusted service providers assisting in operations.</li>
              <li>When required by law, regulation, or court order.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard measures to protect your information from unauthorized access or misuse.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Your Rights</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>You may request access, correction, or deletion of your personal data.</li>
              <li>You can opt out of marketing emails anytime.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Cookies</h2>
            <p className="text-gray-700 mb-4">
              Our website uses cookies to enhance user experience. You can disable cookies in your browser settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related concerns, please contact us: <br />
              📧{" "}
              <a href="mailto:info@timelycapital.com" className="text-blue-600 underline">
                info@timelycapital.com
              </a>{" "}
              <br />
              📞{" "}
              <a href="tel:+919014424455" className="text-blue-600 underline">
                +919014424455
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
