'use client';

import { Music, Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1612] text-[#F5F0E8] pt-20 pb-8 border-t border-[#F6B800]/20">
      <div className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#F6B800]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F6B800] opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-[#F6B800] opacity-60"></div>
              </div>
              <span className="text-xl font-black text-[#F6B800] uppercase tracking-wide">John Flanders</span>
            </div>
            <p className="text-[#B8AFA3] text-sm leading-relaxed">
              Multi-instrumentalist musician bringing the spirit of the Southwest
              to every performance. Available for bookings and private events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold mb-6 text-[#F6B800] uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#shows" className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm">
                  Upcoming Shows
                </Link>
              </li>
              <li>
                <Link href="#shop" className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm">
                  Music Shop
                </Link>
              </li>
              <li>
                <Link href="#media" className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold mb-6 text-[#F6B800] uppercase tracking-widest">Connect</h3>
            <div className="flex space-x-4 mb-6 justify-center md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F6B800] hover:bg-[#FFCA28] p-3 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5 text-[#1C1612]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F6B800] hover:bg-[#FFCA28] p-3 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5 text-[#1C1612]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F6B800] hover:bg-[#FFCA28] p-3 rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5 text-[#1C1612]" />
              </a>
              <a
                href="mailto:info@johnflanders.com"
                className="bg-[#F6B800] hover:bg-[#FFCA28] p-3 rounded-full transition-colors"
              >
                <Mail className="w-5 h-5 text-[#1C1612]" />
              </a>
            </div>
            <p className="text-sm text-[#B8AFA3]">
              Email: info@johnflanders.com
            </p>
          </div>
        </div>

        <div className="border-t border-[#F6B800]/20 pt-8 text-center">
          <p className="text-[#8A8078] text-sm">
            © {currentYear} John Flanders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
