'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, DollarSign, Package } from 'lucide-react';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  type: 'single' | 'album';
  price: number;
  description?: string;
  imageUrl: string;
  trackList?: string[];
  releaseDate?: string;
  available?: boolean;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    type: 'album',
    price: 0,
    description: '',
    imageUrl: '',
    trackList: [''],
    releaseDate: '',
    available: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty track entries
    const cleanedData = {
      ...formData,
      trackList: formData.trackList?.filter(track => track.trim() !== ''),
    };

    try {
      const url = editingProduct ? `/api/products?id=${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        await fetchProducts();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        trackList: product.trackList || [''],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        type: 'album',
        price: 0,
        description: '',
        imageUrl: '',
        trackList: [''],
        releaseDate: '',
        available: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const addTrack = () => {
    setFormData({
      ...formData,
      trackList: [...(formData.trackList || []), ''],
    });
  };

  const removeTrack = (index: number) => {
    const newTrackList = formData.trackList?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, trackList: newTrackList });
  };

  const updateTrack = (index: number, value: string) => {
    const newTrackList = [...(formData.trackList || [])];
    newTrackList[index] = value;
    setFormData({ ...formData, trackList: newTrackList });
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-rich-brown mb-2">Shop Products</h2>
          <p className="text-lg text-gray-600">Manage your music catalog</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 sm:p-16 text-center border border-gray-200">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first album or single to start selling music
          </p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {!product.available && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    UNAVAILABLE
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-gold text-rich-brown text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {product.type}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-rich-brown mb-2">{product.name}</h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {product.trackList && product.trackList.length > 0 && (
                  <p className="text-xs text-gray-500 mb-4">
                    {product.trackList.length} track{product.trackList.length !== 1 ? 's' : ''}
                  </p>
                )}

                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-rich-brown">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="e.g., Midnight Jazz Sessions"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'single' | 'album' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  >
                    <option value="single">Single</option>
                    <option value="album">Album</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                    placeholder="9.99"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="/images/album-cover.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload image to /public/images/ folder first
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="Tell fans about this release..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Track List
                </label>
                <div className="space-y-2">
                  {formData.trackList?.map((track, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={track}
                        onChange={(e) => updateTrack(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                        placeholder={`Track ${index + 1}`}
                      />
                      {formData.trackList!.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTrack(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTrack}
                    className="text-canyon-red hover:text-canyon-terracotta text-sm font-medium"
                  >
                    + Add Track
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-4 h-4 text-canyon-red border-gray-300 rounded focus:ring-canyon-red"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">
                  Available for purchase
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

