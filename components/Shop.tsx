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
  isAvailable?: boolean;
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
      // Load from localStorage (managed by admin)
      const stored = localStorage.getItem('admin_products');
      
      if (stored) {
        const productsArray = JSON.parse(stored);
        // Filter for available products only
        const availableProducts = productsArray.filter((p: Product) => p.isAvailable);
        setProducts(availableProducts);
      } else {
        // Load from API as fallback
        const response = await fetch('/api/products');
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : (data?.data || []);
        setProducts(productsArray);
      }
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
    <section id="shop" className="py-20 sm:py-24 lg:py-32 bg-purple px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold mb-6 uppercase tracking-wide">
            Shop Music
          </h2>
          <p className="text-lg sm:text-xl text-cream max-w-3xl mx-auto leading-relaxed">
            Support the music - purchase singles and albums
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            <p className="mt-4 text-cream">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gold/50 mx-auto mb-4" />
            <p className="text-lg text-cream">No products available at this time.</p>
            <p className="text-sm text-text-muted-light mt-2">Check back soon for new releases!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-surface-dark rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gold/20 hover:border-gold/40 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-surface-dark to-background-dark flex items-center justify-center relative overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <Music className="w-16 h-16 text-gold/30" />
                  )}
                </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 text-center">
                <span className="inline-block bg-secondary text-background-dark px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                  {product.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-cream mb-3">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-text-muted-light text-sm mb-5 px-2">
                    {product.description}
                  </p>
                )}

                {/* Price and Action */}
                <div className="flex flex-col items-center gap-5 mt-6">
                  <span className="text-2xl sm:text-3xl font-black text-gold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-accent hover:bg-accent-hover text-background-dark px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
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
          <p className="text-text-muted-light mb-6 font-semibold uppercase tracking-wide text-sm">
            Secure Payment Options
          </p>
          <div className="flex justify-center gap-8 items-center">
            <span className="text-gold font-black text-xl">PayPal</span>
            <span className="text-gold font-black text-xl">Venmo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
