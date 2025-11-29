'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Calendar, PlayCircle, Mail, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import CartModal from './CartModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#shows', label: 'Shows' },
    { href: '#shop', label: 'Shop' },
    { href: '#media', label: 'Media' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1C1612]/98 backdrop-blur-lg shadow-xl border-b border-[#F6B800]/20'
          : 'bg-[#1C1612]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex space-x-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F6B800]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F6B800] opacity-80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F6B800] opacity-60"></div>
            </div>
            <span className="text-lg font-black text-[#F6B800] group-hover:text-[#FFCA28] transition-colors uppercase tracking-wider">
              John Flanders
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors duration-200 font-semibold text-sm uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F6B800] text-[#1C1612] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F6B800] text-[#1C1612] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#2D241E]/98 backdrop-blur-lg rounded-lg mt-2 mb-4 p-6 space-y-4 border border-[#F6B800]/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#F5F0E8] hover:text-[#F6B800] transition-colors duration-200 text-base py-3 uppercase tracking-wider font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Cart Modal */}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </nav>
  );
}
