'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Music } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  type: 'single' | 'album' | 'merch';
  imageUrl: string;
  description?: string;
  stock?: number;
}

export default function Shop() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      // Ensure we have an array
      const productsArray = Array.isArray(data) ? data : (data?.data || []);
      setProducts(productsArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <section id="shop" className="py-20 sm:py-24 lg:py-32 bg-[#1C1612] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Shop Music
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Support the music - purchase singles and albums
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6B800]"></div>
            <p className="mt-4 text-[#F5F0E8]">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-[#F6B800]/50 mx-auto mb-4" />
            <p className="text-lg text-[#F5F0E8]">No products available at this time.</p>
            <p className="text-sm text-[#B8AFA3] mt-2">Check back soon for new releases!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#2D241E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-[#3A2F28] to-[#1C1612] flex items-center justify-center relative overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <Music className="w-16 h-16 text-[#F6B800]/30" />
                  )}
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
        )}

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
