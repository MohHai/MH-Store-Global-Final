"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="M.H Store Logo" width={120} height={40} priority />
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
