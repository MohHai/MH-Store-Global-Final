import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} M.H Store Global. All rights reserved.</p>
        <p className="text-xs mt-2 mb-4">Powered by AI & Smart Logistics | Built with ❤️ by M.H Team</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-blue-400">Twitter</a>
          <a href="#" className="hover:text-blue-400">Instagram</a>
        </div>
        <div>
          <a href="/privacy" className="text-xs hover:underline mr-4">Privacy Policy</a>
          <a href="/terms" className="text-xs hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
