'use client';

import { Music2, Award, Users, Guitar } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Music2,
      title: 'Multi-Instrumentalist',
      description: 'Proficient in guitar, piano, drums, and more',
    },
    {
      icon: Award,
      title: 'Professional Experience',
      description: '15+ years performing across the Southwest',
    },
    {
      icon: Users,
      title: 'Versatile Performer',
      description: 'Solo acts, bands, and collaborative projects',
    },
    {
      icon: Guitar,
      title: 'Diverse Repertoire',
      description: 'From folk to rock, blues to contemporary',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#2C2419] mb-4">About John</h2>
          <div className="w-24 h-1 bg-[#D97D54] mx-auto mb-6"></div>
          <p className="text-xl text-[#5A4A3A] max-w-3xl mx-auto">
            A passionate musician dedicated to creating unforgettable experiences through sound
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#D97D54] to-[#C67B5C] rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-[#E6B8A5]">
                <div className="text-center">
                  <Music2 className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Photo Coming Soon</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#5A4A3A] rounded-full -z-10 opacity-20"></div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-3xl font-bold text-[#2C2419] mb-6">
              Musician • Performer • Artist
            </h3>
            <div className="space-y-4 text-[#5A4A3A] text-lg leading-relaxed">
              <p>
                John Flanders is a seasoned multi-instrumentalist whose music captures
                the essence of the American Southwest. With over 15 years of professional
                experience, John has performed at venues ranging from intimate gatherings
                to large festival stages.
              </p>
              <p>
                His unique style blends traditional folk, contemporary rock, and blues,
                creating a sound that resonates with audiences of all ages. Whether
                performing solo or with a band, John brings energy, authenticity, and
                passion to every show.
              </p>
              <p>
                Available for concerts, private events, weddings, corporate functions,
                and more. Let's create something memorable together.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#D97D54]"
              >
                <Icon className="w-12 h-12 text-[#C67B5C] mb-4" />
                <h4 className="text-xl font-semibold text-[#2C2419] mb-2">
                  {item.title}
                </h4>
                <p className="text-[#5A4A3A]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

