'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Music, Calendar, PlayCircle, Mail, ShoppingBag } from 'lucide-react';
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
    { href: '#home', label: 'Home', icon: Music },
    { href: '#about', label: 'About' },
    { href: '#shows', label: 'Shows', icon: Calendar },
    { href: '#shop', label: 'Shop', icon: ShoppingBag },
    { href: '#media', label: 'Media', icon: PlayCircle },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2C2419]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Music className="w-8 h-8 text-[#D97D54] group-hover:text-[#C67B5C] transition-colors" />
            <span className="text-2xl font-bold text-[#E6B8A5] group-hover:text-[#D97D54] transition-colors">
              John Flanders
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#E6B8A5] hover:text-[#D97D54] transition-colors duration-200 font-medium text-lg"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#E6B8A5] hover:text-[#D97D54] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D97D54] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#E6B8A5] hover:text-[#D97D54] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D97D54] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              className="text-[#E6B8A5] hover:text-[#D97D54] transition-colors"
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
          <div className="md:hidden bg-[#2C2419]/98 backdrop-blur-md rounded-lg mt-2 mb-4 p-4 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 text-[#E6B8A5] hover:text-[#D97D54] transition-colors duration-200 text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Cart Modal */}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
    </nav>
  );
}

