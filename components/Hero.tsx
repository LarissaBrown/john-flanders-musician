'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{paddingTop: '120px'}}
    >
      {/* Warm Dark Spots Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sunset-red-rocks.webp"
          alt="Warm ambient background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content - Positioned to the left */}
      <div className="relative z-20 w-full max-w-5xl px-6 sm:px-8 lg:px-12 text-center py-32" style={{marginRight: 'auto', marginLeft: '5%'}}>
        
        {/* Saxophone Illustration - Grouped with text container */}
        <div className="absolute z-30 w-[187px] h-[245px] md:w-[230px] md:h-[307px] lg:w-[274px] lg:h-[337px]" style={{top: '40px', left: '78%', opacity: '0.8'}}>
          <Image
            src="/images/saxophone.png"
            alt="Saxophone illustration"
            fill
            className="object-contain object-center"
            style={{transform: 'scaleX(-1) scale(1.33)', transformOrigin: 'center'}}
            sizes="(max-width: 768px) 187px, (max-width: 1024px) 230px, 274px"
          />
        </div>

        <div className="animate-fade-in-up space-y-12">
          {/* Warm backdrop for text readability - with top margin for navbar spacing */}
          <div className="relative" style={{marginTop: '40px', marginBottom: '48px'}}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B2E3E]/40 via-[#5B4260]/30 to-[#8B2E3E]/40 backdrop-blur-sm rounded-3xl"></div>
            
            <div className="relative z-10 px-6" style={{paddingTop: '70px', paddingBottom: '48px', paddingRight: '120px'}}>
              {/* Brand Name */}
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-[#FFD700] mb-8" style={{
                letterSpacing: '0.02em',
                textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 30px rgba(255, 215, 0, 0.5)'
              }}>
                JOHN FLANDERS
              </h1>

              {/* Tagline - Original state */}
              <div className="space-y-6 mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFE4B5] uppercase tracking-wide leading-tight" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                }}>
                  Live music from the heart of Utah.
                </h2>
                
                <p className="text-xl sm:text-2xl text-[#FFFAF0] font-light leading-relaxed" style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  Multi-instrumentalist. Performer. Available for all occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available for bookings - Bottom right corner, clickable */}
      <Link 
        href="#contact"
        className="absolute z-30 text-[#F5DEB3] text-sm uppercase tracking-widest hover:text-[#E9756D] transition-colors cursor-pointer bg-[#2D241E]/80 px-4 py-3 rounded-lg backdrop-blur-md"
        style={{
          bottom: '40px',
          right: '16px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Available for bookings →
      </Link>

      {/* Scroll Indicator - Bottom center */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-7 h-12 border-2 border-[#F19456] rounded-full flex items-start justify-center p-2" style={{
          boxShadow: '0 0 15px rgba(241, 148, 86, 0.6)'
        }}>
          <div className="w-1.5 h-4 bg-[#F19456] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
