'use client';

import { useState, useCallback } from 'react';
import { Image as ImageIcon, Upload, X, Check, AlertCircle } from 'lucide-react';

interface UploadedImage {
  url: string;
  filename: string;
}

export default function ImagesManagement() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    setMessage(null);

    try {
      const uploadPromises = files.map(file => uploadFile(file));
      const results = await Promise.all(uploadPromises);

      const successful = results.filter(r => r.success);
      const failed = results.filter(r => r.error);

      if (successful.length > 0) {
        setUploadedImages(prev => [...prev, ...successful]);
        setMessage({
          type: 'success',
          text: `Successfully uploaded ${successful.length} image(s)`,
        });
      }

      if (failed.length > 0) {
        setMessage({
          type: 'error',
          text: `Failed to upload ${failed.length} image(s): ${failed[0].error}`,
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Upload failed. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setMessage({
      type: 'success',
      text: 'Image URL copied to clipboard!',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-rich-brown mb-2">Image Gallery</h2>
        <p className="text-lg text-gray-600">Upload and manage your site images</p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="flex-1">{message.text}</p>
          <button
            onClick={() => setMessage(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
        <h3 className="text-2xl font-bold text-rich-brown mb-6">Upload Images</h3>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? 'border-canyon-red bg-canyon-red/5'
              : 'border-gray-300 hover:border-canyon-red/50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-canyon-red to-canyon-terracotta rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {isDragging ? 'Drop images here' : 'Drag and drop images'}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse (JPEG, PNG, WebP, GIF - max 5MB each)
              </p>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleFileInput}
                className="hidden"
                disabled={uploading}
              />
              <span className="inline-block bg-canyon-red hover:bg-canyon-terracotta text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                {uploading ? 'Uploading...' : 'Select Images'}
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Uploaded images will be saved to{' '}
            <code className="bg-blue-100 px-2 py-1 rounded">/public/images/uploads/</code>
            {' '}and can be used in Shows, Products, and Media sections.
          </p>
        </div>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-rich-brown mb-6">
            Recently Uploaded ({uploadedImages.length})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 truncate mb-2">{image.filename}</p>
                  <button
                    onClick={() => copyToClipboard(image.url)}
                    className="w-full text-xs bg-gray-100 hover:bg-canyon-red hover:text-white px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Images */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
        <h3 className="text-2xl font-bold text-rich-brown mb-6">Existing Images</h3>
        <p className="text-gray-600 mb-6">
          These images are currently in your <code className="bg-gray-100 px-2 py-1 rounded text-sm">/public/images/</code> folder
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            // Performance Photos
            'john_flanders_goldner_hirsch_inn.jpg',
            'john_flanders_brick_sax.jpg',
            'John_Flanders_SB_Trio.jpg',
            'john-flanders-trio-by-windows.jpeg',
            'john_flanders_tux.jpeg',
            // Album Covers
            'double_helix_albumn_cover.jpg',
            // Background Images
            'sunset-red-rocks.webp',
            'blue-sky-canyon.webp',
            'pink-red-rocks.webp',
            // Icons
            'saxophone.png',
          ].map((image) => (
            <div
              key={image}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`/images/${image}`}
                  alt={image}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600 truncate mb-2">{image}</p>
                <button
                  onClick={() => copyToClipboard(`/images/${image}`)}
                  className="w-full text-xs bg-gray-100 hover:bg-canyon-red hover:text-white px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
