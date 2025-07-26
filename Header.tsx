"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="M.H Store Global" width={40} height={40} />
          <span className="text-xl font-bold text-gray-800">M.H Store Global</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`md:flex md:items-center md:space-x-6 ${isOpen ? "block" : "hidden"} mt-4 md:mt-0`}>
          <Link href="/" className="block py-2 text-gray-700 hover:text-primary transition">الرئيسية</Link>
          <Link href="/search" className="block py-2 text-gray-700 hover:text-primary transition">البحث</Link>
          <Link href="/checkout" className="block py-2 text-gray-700 hover:text-primary transition">الدفع</Link>
          <Link href="/ai-chat" className="block py-2 text-gray-700 hover:text-primary transition">دردشة AI</Link>
        </nav>
      </div>
    </header>
  );
};
