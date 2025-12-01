'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  type: 'single' | 'album';
  imageUrl: string;
  description?: string;
}

// Sample products - will be replaced with API calls
const products: Product[] = [
  {
    id: '1',
    name: 'Desert Wind',
    price: 1.99,
    type: 'single',
    imageUrl: '/placeholder-album.jpg',
    description: 'Single track',
  },
  {
    id: '2',
    name: 'Canyon Echoes',
    price: 9.99,
    type: 'album',
    imageUrl: '/placeholder-album.jpg',
    description: 'Full album - 12 tracks',
  },
  {
    id: '3',
    name: 'Red Rock Blues',
    price: 1.99,
    type: 'single',
    imageUrl: '/placeholder-album.jpg',
    description: 'Single track',
  },
  {
    id: '4',
    name: 'Southwest Sessions',
    price: 12.99,
    type: 'album',
    imageUrl: '/placeholder-album.jpg',
    description: 'Full album - 15 tracks',
  },
];

export default function Shop() {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <section id="shop" className="py-20 sm:py-24 lg:py-32 bg-[#1C1612]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Shop Music
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Support the music - purchase singles and albums
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#2D241E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
            >
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-[#3A2F28] to-[#1C1612] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#F6B800] text-6xl mb-2">
                    {product.type === 'album' ? '💿' : '🎵'}
                  </div>
                  <p className="text-[#B8AFA3] text-xs uppercase tracking-wide">Album Cover</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 text-center">
                <span className="inline-block bg-[#F6B800] text-[#1C1612] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                  {product.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F0E8] mb-3">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-[#B8AFA3] text-sm mb-5 px-2">
                    {product.description}
                  </p>
                )}

                {/* Price and Action */}
                <div className="flex flex-col items-center gap-5 mt-6">
                  <span className="text-2xl sm:text-3xl font-black text-[#F6B800]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-20 text-center">
          <p className="text-[#B8AFA3] mb-6 font-semibold uppercase tracking-wide text-sm">
            Secure Payment Options
          </p>
          <div className="flex justify-center gap-8 items-center">
            <span className="text-[#F6B800] font-black text-xl">PayPal</span>
            <span className="text-[#F6B800] font-black text-xl">Venmo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
