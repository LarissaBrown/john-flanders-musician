'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/red-rocks-background.jpg"
          alt="Sedona Red Rock Formation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        
        {/* Subtle dark overlay only for text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center space-x-2 bg-[#F4E4C1]/20 backdrop-blur-sm px-4 py-2 rounded-full text-[#F4E4C1] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Instrumentalist Musician</span>
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#FFF8F0] mb-6 tracking-tight">
            John Flanders
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-[#F4E4C1] mb-8 max-w-3xl mx-auto leading-relaxed">
            Bringing the soulful sounds of the Southwest to life through music
          </p>

          <p className="text-lg sm:text-xl text-[#F4E4C1]/90 mb-12 max-w-2xl mx-auto">
            Experience authentic performances that blend tradition with innovation.
            Available for concerts, private events, and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#shows"
              className="group bg-[#F4E4C1] text-[#2C1810] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#E67E22] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span>View Upcoming Shows</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#contact"
              className="group bg-transparent border-2 border-[#F4E4C1] text-[#F4E4C1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#F4E4C1] hover:text-[#2C1810] transition-all duration-300 flex items-center space-x-2 shadow-xl"
            >
              <span>Book Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-[#F4E4C1] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#F4E4C1] rounded-full"></div>
        </div>
      </div>
      
      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-[#F4E4C1]/70 bg-black/20 px-3 py-1 rounded backdrop-blur-sm z-20">
        Photo by{' '}
        <a
          href="https://unsplash.com/@anthony_melone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#F4E4C1] transition-colors"
        >
          Anthony Melone
        </a>
        {' '}on{' '}
        <a
          href="https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-YdzWGR7tvQk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#F4E4C1] transition-colors"
        >
          Unsplash
        </a>
      </div>
    </section>
  );
}

