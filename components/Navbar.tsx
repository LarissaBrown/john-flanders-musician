'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Calendar, PlayCircle, Mail, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { itemCount } = useCart();

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
          ? 'bg-[#4A332F]/98 backdrop-blur-lg shadow-xl border-b border-[#6B9CC3]/20'
          : 'bg-[#4A332F]/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo with proper spacing */}
          <Link href="/" className="flex items-center group" style={{marginLeft: '24px'}}>
            <div className="flex" style={{gap: '10px', marginRight: '16px'}}>
              <div 
                className="rounded-full bg-[#6B9CC3]"
                style={{width: '16px', height: '16px', boxShadow: '0 0 8px rgba(107, 156, 195, 0.6)'}}
              ></div>
              <div 
                className="rounded-full bg-[#6B9CC3]"
                style={{width: '16px', height: '16px', boxShadow: '0 0 8px rgba(107, 156, 195, 0.6)'}}
              ></div>
              <div 
                className="rounded-full bg-[#6B9CC3]"
                style={{width: '16px', height: '16px', boxShadow: '0 0 8px rgba(107, 156, 195, 0.6)'}}
              ></div>
            </div>
            <span className="text-lg font-black text-[#F5EDD4] group-hover:text-[#E9756D] transition-colors uppercase tracking-wider">
              John Flanders
            </span>
          </Link>

          {/* Desktop Navigation with proper spacing */}
          <div className="hidden md:flex items-center" style={{marginRight: '24px', gap: '32px'}}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors duration-200 font-semibold text-sm uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Button with extra margin */}
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#F5EDD4] hover:text-[#E9756D] transition-colors"
              style={{marginLeft: '16px'}}
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E9756D] text-[#2A2220] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu with proper spacing */}
          <div className="md:hidden flex items-center" style={{gap: '16px', marginRight: '24px'}}>
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#F5EDD4] hover:text-[#E9756D] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E9756D] text-[#2A2220] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button
              className="text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors"
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
          <div className="md:hidden bg-[#3D3230]/98 backdrop-blur-lg rounded-lg mt-2 mb-4 p-6 space-y-4 border border-[#6B9CC3]/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors duration-200 text-base py-3 uppercase tracking-wider font-semibold"
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
