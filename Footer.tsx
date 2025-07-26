import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} M.H Store Global. All rights reserved.</p>
        <p className="text-xs mt-2">Powered by AI & Smart Logistics | Built with ❤️ by M.H Team</p>
      </div>
    </footer>
  );
};
