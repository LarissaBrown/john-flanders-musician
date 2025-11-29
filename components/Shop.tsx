'use client';

import { useState } from 'react';
import { ShoppingBag, Music, Disc, Play, Plus, X, Minus, Check } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

interface Product {
  _id: string;
  title: string;
  type: 'song' | 'album';
  price: number;
  description?: string;
  coverImageUrl?: string;
  audioPreviewUrl?: string;
  trackListing?: string[];
  duration?: string;
  genre?: string;
  featured: boolean;
}

// Sample products - will be replaced with API data
const sampleProducts: Product[] = [
  {
    _id: '1',
    title: 'Desert Winds',
    type: 'album',
    price: 12.99,
    description: 'A journey through the Southwest landscapes in music',
    genre: 'Folk/Americana',
    featured: true,
    trackListing: [
      'Desert Winds',
      'Red Rock Sunrise',
      'Canyon Dreams',
      'Sage and Sand',
      'Horizon Call',
    ],
  },
  {
    _id: '2',
    title: 'Red Rock Blues',
    type: 'song',
    price: 1.99,
    description: 'A soulful blues tribute to the red rocks of Utah',
    duration: '4:32',
    genre: 'Blues',
    featured: true,
  },
  {
    _id: '3',
    title: 'Sunset Serenade',
    type: 'song',
    price: 1.99,
    description: 'An acoustic guitar piece perfect for evening reflection',
    duration: '3:45',
    genre: 'Acoustic',
  },
  {
    _id: '4',
    title: 'Canyon Echoes',
    type: 'album',
    price: 9.99,
    description: 'Instrumental pieces inspired by canyon acoustics',
    genre: 'Instrumental',
    trackListing: [
      'First Light',
      'Echo Chamber',
      'Stone Whispers',
      'Valley Song',
    ],
  },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState<'all' | 'song' | 'album'>('all');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = sampleProducts.filter((product) => {
    if (activeTab === 'all') return true;
    return product.type === activeTab;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product._id,
      title: product.title,
      type: product.type,
      price: product.price,
      quantity: 1,
      coverImageUrl: product.coverImageUrl,
    });
    
    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-[#FAF8F5] to-[#C9A55C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[#2C2419] mb-4">Music Shop</h2>
          <div className="w-24 h-1 bg-[#F6B800] mx-auto mb-6"></div>
          <p className="text-xl text-[#5A4A3A] max-w-3xl mx-auto">
            Purchase and download high-quality recordings to enjoy anywhere
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg inline-flex space-x-2">
            {['all', 'album', 'song'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-8 py-4 rounded-full font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#F6B800] text-white'
                    : 'text-[#5A4A3A] hover:bg-[#C9A55C]'
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                product.featured ? 'border-2 border-[#F6B800]' : ''
              }`}
            >
              {/* Product Image/Icon */}
              <div className="relative bg-gradient-to-br from-[#F6B800] to-[#F6B800] aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                {product.type === 'album' ? (
                  <Disc className="w-24 h-24 text-white/90 relative z-10" />
                ) : (
                  <Music className="w-24 h-24 text-white/90 relative z-10" />
                )}
                
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-[#2C2419] text-[#C9A55C] px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}

                {product.audioPreviewUrl && (
                  <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 transition-all z-10">
                    <Play className="w-5 h-5 text-[#F6B800] ml-0.5" />
                  </button>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2C2419] mb-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-[#5A4A3A]">
                      <span className="capitalize">{product.type}</span>
                      {product.genre && (
                        <>
                          <span>•</span>
                          <span>{product.genre}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#F6B800]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {product.description && (
                  <p className="text-[#5A4A3A] mb-4 text-sm">
                    {product.description}
                  </p>
                )}

                {product.trackListing && product.trackListing.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#2C2419] mb-2">
                      Track Listing ({product.trackListing.length} tracks):
                    </p>
                    <ul className="text-xs text-[#5A4A3A] space-y-1">
                      {product.trackListing.slice(0, 3).map((track, idx) => (
                        <li key={idx}>
                          {idx + 1}. {track}
                        </li>
                      ))}
                      {product.trackListing.length > 3 && (
                        <li className="italic">
                          + {product.trackListing.length - 3} more tracks
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {product.duration && (
                  <p className="text-sm text-[#5A4A3A] mb-4">
                    Duration: {product.duration}
                  </p>
                )}

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addedToCart === product._id}
                  className={`w-full py-3 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 ${
                    addedToCart === product._id
                      ? 'bg-green-500 text-white'
                      : 'bg-[#F6B800] text-white hover:bg-[#F6B800]'
                  }`}
                >
                  {addedToCart === product._id ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#F6B800] mx-auto mb-4 opacity-50" />
            <p className="text-xl text-[#5A4A3A]">
              No {activeTab !== 'all' ? activeTab + 's' : 'products'} available yet.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#2C2419] mb-4">
            About Digital Downloads
          </h3>
          <ul className="space-y-3 text-[#5A4A3A]">
            <li className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-[#F6B800] mt-0.5 flex-shrink-0" />
              <span>High-quality MP3 files (320kbps)</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-[#F6B800] mt-0.5 flex-shrink-0" />
              <span>Instant download after purchase</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-[#F6B800] mt-0.5 flex-shrink-0" />
              <span>No DRM - play on any device</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-[#F6B800] mt-0.5 flex-shrink-0" />
              <span>Secure payment via PayPal or Venmo</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

