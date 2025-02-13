import React from "react";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = ({ isAuthenticated = false, onNavigate }) => {
  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <footer className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600">JobHunt</h2>
          <p className="text-gray-600">
            Connecting talent with opportunities, powered by innovation and
            trust.
          </p>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Support</h4>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start space-x-2">
              <span>Saffron Square, Near Court, Gondal, Gujarat, India</span>
            </li>
            <li className="hover:text-blue-600 transition-colors">
              <a href="mailto:jobhunt@gmail.com">contact@jobhunt.com</a>
            </li>
            <li className="hover:text-blue-600 transition-colors">
              <a href="tel:+918154800000">+91-81548*****</a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <button
                onClick={() => handleNavigate("/")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate("/jobs")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Jobs
              </button>
            </li>
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => handleNavigate("/about-us")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate("/contact-us")}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Follow Us
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <button
                onClick={() => window.open("https://twitter.com", "_blank")}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter (X)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open("https://instagram.com", "_blank")}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open("https://youtube.com", "_blank")}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Youtube className="w-5 h-5" />
                <span>Youtube</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open("https://linkedin.com", "_blank")}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          &copy; Copyright 2025. All Rights Reserved By Vasu, Meet & Jay
        </div>
      </div>
    </div>
  );
};

export default Footer;
