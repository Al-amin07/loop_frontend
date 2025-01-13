import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  const features = [
    "Secure Payment Processing",
    "Document Verification System",
    "Real-time Payment Tracking",
    "User-friendly Dashboard",
    "Multi-level Authentication",
    "Automated Status Updates",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text">
              About Monitrix
            </h1>
            <p className="text-gray-600 text-lg">
              Your Trusted Partner in Payment Management and Document
              Verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Monitrix, we strive to simplify payment processes and
                document verification for businesses and individuals. Our
                platform provides secure, efficient, and user-friendly solutions
                for all your financial management needs.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where managing payments and documents is
                seamless and secure. Our goal is to become the leading platform
                that businesses trust for their financial operations.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
                >
                  <FaCheckCircle className="text-orange-500 text-xl" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <Link
              to="/register"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
