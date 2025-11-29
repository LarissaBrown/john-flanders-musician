'use client';

import { Music, Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2419] text-[#E6B8A5] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="w-8 h-8 text-[#D97D54]" />
              <span className="text-2xl font-bold">John Flanders</span>
            </div>
            <p className="text-[#C4A574] text-sm leading-relaxed">
              Multi-instrumentalist musician bringing the spirit of the Southwest
              to every performance. Available for bookings and private events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D97D54]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-[#D97D54] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#shows" className="hover:text-[#D97D54] transition-colors">
                  Upcoming Shows
                </Link>
              </li>
              <li>
                <Link href="#media" className="hover:text-[#D97D54] transition-colors">
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#D97D54] transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#D97D54]">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C67B5C] hover:bg-[#D97D54] p-2 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C67B5C] hover:bg-[#D97D54] p-2 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C67B5C] hover:bg-[#D97D54] p-2 rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@johnflanders.com"
                className="bg-[#C67B5C] hover:bg-[#D97D54] p-2 rounded-full transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-[#C4A574]">
              Email: info@johnflanders.com
            </p>
          </div>
        </div>

        <div className="border-t border-[#C67B5C] pt-6 text-center">
          <p className="text-[#A85F44] text-sm">
            © {currentYear} John Flanders. All rights reserved. | Website designed with passion for music.
          </p>
        </div>
      </div>
    </footer>
  );
}

