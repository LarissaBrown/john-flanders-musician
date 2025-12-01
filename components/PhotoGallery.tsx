'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos: Photo[] = [
    {
      src: '/images/john_flanders_goldner_hirsch_inn.jpg',
      alt: 'John Flanders performing at Goldner Hirsch Inn',
      caption: 'Live performance',
    },
    {
      src: '/images/john_flanders_brick_sax.jpg',
      alt: 'John Flanders with saxophone',
      caption: 'Professional portrait',
    },
    {
      src: '/images/John_Flanders_SB_Trio.jpg',
      alt: 'John Flanders SB Trio',
      caption: 'SB Trio performance',
    },
    {
      src: '/images/john-flanders-trio-by-windows.jpeg',
      alt: 'John Flanders Trio',
      caption: 'Trio at venue',
    },
    {
      src: '/images/john_flanders_tux.jpeg',
      alt: 'John Flanders in formal attire',
      caption: 'Formal performance',
    },
  ];

  const pressReviews = [
    {
      quote: "All killer, no filler",
      source: "JazzTimes",
      rating: "★★★★ Four Stars",
      album: "In The Sky Tonight",
    },
    {
      quote: "Flanders is a passionate, blood-and-guts guy. His funk-based rhythm section is cooly professional.",
      source: "City Weekly",
      reviewer: "Bill Frost",
    },
    {
      quote: "61 minutes of no-bullshit, all instrumental and all-original bop, swing, latin, and other flavors of jazz, loaded with dazzling displays... goes down like a shot of Bushmills: sweet and stiff.",
      source: "City Weekly",
      reviewer: "John Paul Brophy",
    },
    {
      quote: "Double Helix roped in heavy jazzbo hitters Mike Miller (guitar: Yellowjackets) and Alex Acuna (percussion: Weather Report) to guest on their sophomore disc - this is important to note, as the homeboys are equal chops-wise on every cut alongside the visiting dignitaries.",
      source: "City Weekly",
      album: "Natural Selection",
    },
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="photos" className="py-20 sm:py-24 lg:py-32 bg-[#1C1612] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Photo Gallery
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Moments from performances and recordings
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border-2 border-[#F6B800]/10 hover:border-[#F6B800]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F6B800]/20 transform hover:-translate-y-2"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {photo.caption && (
                    <p className="text-white font-semibold">{photo.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Reviews */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#F6B800] mb-8 text-center">
            Press Reviews
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {pressReviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#2D241E] rounded-2xl p-8 border border-[#F6B800]/10 hover:border-[#F6B800]/30 transition-all"
              >
                <Quote className="w-10 h-10 text-[#F6B800]/30 mb-4" />
                <blockquote className="text-[#F5F0E8] text-base sm:text-lg leading-relaxed mb-6 italic">
                  "{review.quote}"
                </blockquote>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-[#F6B800] font-bold">{review.source}</span>
                  {review.reviewer && (
                    <>
                      <span className="text-[#B8AFA3]">•</span>
                      <span className="text-[#B8AFA3]">{review.reviewer}</span>
                    </>
                  )}
                  {review.album && (
                    <>
                      <span className="text-[#B8AFA3]">•</span>
                      <span className="text-[#B8AFA3] italic">{review.album}</span>
                    </>
                  )}
                  {review.rating && (
                    <>
                      <span className="text-[#B8AFA3]">•</span>
                      <span className="text-[#F6B800] font-semibold">{review.rating}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-[#F6B800] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white hover:text-[#F6B800] transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white hover:text-[#F6B800] transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={photos[selectedImage].src}
                  alt={photos[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              {photos[selectedImage].caption && (
                <p className="text-white text-center mt-4 text-lg">
                  {photos[selectedImage].caption}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

