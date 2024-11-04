"use client";
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <h1 className="text-green-500 text-3xl font-bold animate-text">&lt;Next Pass&gt;</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:underline px-3 py-2 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:underline px-3 py-2 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:underline px-3 py-2 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
