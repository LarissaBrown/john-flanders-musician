'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Calendar, PlayCircle, Mail, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';
import TipJarModal from './TipJarModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showTipJar, setShowTipJar] = useState(false);
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
    { href: '#discography', label: 'Discography' },
    { href: '#media', label: 'Media' },
    { href: '#photos', label: 'Photos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-wine/98 backdrop-blur-lg shadow-xl border-b border-[#6B9CC3]/20'
          : 'bg-wine/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Tip Jar */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="flex gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#6B9CC3] shadow-[0_0_8px_rgba(107,156,195,0.6)]"></div>
                <div className="w-4 h-4 rounded-full bg-[#6B9CC3] shadow-[0_0_8px_rgba(107,156,195,0.6)]"></div>
                <div className="w-4 h-4 rounded-full bg-[#6B9CC3] shadow-[0_0_8px_rgba(107,156,195,0.6)]"></div>
              </div>
              <span className="text-lg font-black text-[#F5EDD4] group-hover:text-[#E9756D] transition-colors uppercase tracking-wider">
                John Flanders
              </span>
            </Link>
            
            {/* Tip Jar Button */}
            <button
              onClick={() => setShowTipJar(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#E9756D] to-[#F6B800] text-[#1C1612] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide hover:shadow-lg hover:shadow-[#E9756D]/30 transition-all hover:scale-105"
              title="Support the music!"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="hidden sm:inline">Tip</span>
            </button>
          </div>

          {/* Desktop Navigation - Only visible on very large screens */}
          <div className="hidden xl:flex items-center">
            {navLinks.map((link, index) => (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors duration-200 font-semibold text-sm uppercase tracking-wider whitespace-nowrap px-3"
                >
                  {link.label}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="text-[#6B9CC3] text-lg font-light">|</span>
                )}
              </div>
            ))}
            
            {/* Pipe before Admin */}
            <span className="text-[#6B9CC3] text-lg font-light">|</span>
            
            {/* Admin Link */}
            <Link
              href="/admin/login"
              className="text-[#F5EDD4] hover:text-[#E9756D] transition-colors duration-200 font-semibold text-sm uppercase tracking-wider whitespace-nowrap px-3"
            >
              Admin
            </Link>
            
            {/* Pipe before Cart */}
            <span className="text-[#6B9CC3] text-lg font-light">|</span>
            
            {/* Cart Button with proper spacing */}
            <button
              onClick={() => setShowCart(true)}
              className="relative text-[#F5EDD4] hover:text-[#E9756D] transition-colors ml-3"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E9756D] text-[#2A2220] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Cart & Hamburger Menu - visible on medium and smaller screens */}
          <div className="xl:hidden flex items-center gap-4">
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
              className="text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Hamburger Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#3D3230]/98 backdrop-blur-lg rounded-xl my-4 p-6 space-y-2 border border-[#6B9CC3]/20 shadow-xl animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#F5EDD4] hover:text-[#6B9CC3] transition-colors duration-200 text-base py-3 px-4 uppercase tracking-wider font-semibold rounded-lg hover:bg-[#4A332F]/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Link in Menu */}
            <Link
              href="/admin/login"
              className="block text-[#F5EDD4] hover:text-[#E9756D] transition-colors duration-200 text-base py-3 px-4 uppercase tracking-wider font-semibold rounded-lg hover:bg-[#4A332F]/50 border-t border-[#6B9CC3]/20 mt-2 pt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
      
      {/* Cart Modal */}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
      
      {/* Tip Jar Modal */}
      <TipJarModal isOpen={showTipJar} onClose={() => setShowTipJar(false)} />
    </nav>
  );
}
