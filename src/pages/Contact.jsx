import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Page content */}
      <div className="flex-grow px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-300">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Message</label>
                <textarea
                  rows="4"
                  placeholder="Your message..."
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>

            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md hover:shadow-blue-500/50 transition">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">📧 Email</h4>
              <p className="text-gray-300">maniora.official@gmail.com</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md hover:shadow-green-500/50 transition">
              <h4 className="text-lg font-semibold text-green-400 mb-2">📞 Phone</h4>
              <p className="text-gray-300">+91 9640161711</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md hover:shadow-yellow-500/50 transition">
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">📍 Location</h4>
              <p className="text-gray-300">Hyderabad, Telangana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strictly Bottom Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
