'use client';

import { useState, useCallback, useEffect } from 'react';
import { Image as ImageIcon, Upload, X, Check, AlertCircle, Trash2, Edit2, Save } from 'lucide-react';

interface UploadedImage {
  url: string;
  filename: string;
  isFromUploads?: boolean; // Track if from uploads folder (can delete/rename)
}

export default function ImagesManagement() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [newFilename, setNewFilename] = useState('');
  const [loading, setLoading] = useState(true);

  // Load existing uploaded images on mount
  useEffect(() => {
    loadUploadedImages();
  }, []);

  const loadUploadedImages = async () => {
    try {
      const response = await fetch('/api/images/list');
      const data = await response.json();
      
      if (data.success && data.images) {
        // Mark uploaded images
        const uploadedImgs = data.images.map((img: UploadedImage) => ({
          ...img,
          isFromUploads: true,
        }));

        // Add existing static images
        const existingImages = [
          'john_flanders_goldner_hirsch_inn.jpg',
          'john_flanders_brick_sax.jpg',
          'John_Flanders_SB_Trio.jpg',
          'john-flanders-trio-by-windows.jpeg',
          'john_flanders_tux.jpeg',
          'double_helix_albumn_cover.jpg',
          'in-the-sky-tonight-cover.jpg',
          'sunset-red-rocks.webp',
          'blue-sky-canyon.webp',
          'pink-red-rocks.webp',
          'saxophone.png',
        ].map(filename => ({
          filename,
          url: `/images/${filename}`,
          isFromUploads: false,
        }));

        // Combine both lists (uploaded first, then existing)
        setUploadedImages([...uploadedImgs, ...existingImages]);
      }
    } catch (error) {
      console.error('Failed to load uploaded images:', error);
    } finally {
      setLoading(false);
    }
  };

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
        // Reload the full list to show newly uploaded images
        await loadUploadedImages();
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

  const handleDelete = async (filename: string, isFromUploads: boolean) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const response = await fetch('/api/images/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      const result = await response.json();

      if (result.success) {
        // Reload the full list to reflect deletion
        await loadUploadedImages();
        setMessage({
          type: 'success',
          text: `Successfully deleted ${filename}`,
        });
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to delete image',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to delete image. Please try again.',
      });
    }
  };

  const startRename = (filename: string, isFromUploads: boolean) => {
    setEditingImage(filename);
    setNewFilename(filename);
  };

  const cancelRename = () => {
    setEditingImage(null);
    setNewFilename('');
  };

  const handleRename = async (oldFilename: string) => {
    if (!newFilename || newFilename === oldFilename) {
      cancelRename();
      return;
    }

    try {
      const response = await fetch('/api/images/rename', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldFilename, newFilename }),
      });

      const result = await response.json();

      if (result.success) {
        // Reload the full list to reflect rename
        await loadUploadedImages();
        setMessage({
          type: 'success',
          text: `Successfully renamed to ${newFilename}`,
        });
        cancelRename();
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to rename image',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to rename image. Please try again.',
      });
    }
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

      {/* All Images Gallery */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
        <h3 className="text-2xl font-bold text-rich-brown mb-6">
          Available Images {uploadedImages.length > 0 && `(${uploadedImages.length})`}
        </h3>
        <p className="text-gray-600 mb-6">
          All images in your gallery. Click to copy URL, rename, or delete.
        </p>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-canyon-red"></div>
            <p className="mt-4 text-gray-600">Loading images...</p>
          </div>
        ) : uploadedImages.length > 0 ? (
          
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
                <div className="p-3 space-y-2">
                  {editingImage === image.filename ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newFilename}
                        onChange={(e) => setNewFilename(e.target.value)}
                        className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:border-canyon-red focus:ring-1 focus:ring-canyon-red"
                        placeholder="New filename"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRename(image.filename)}
                          className="flex-1 text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                        <button
                          onClick={cancelRename}
                          className="flex-1 text-xs bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1.5 rounded transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-gray-600 truncate" title={image.filename}>
                        {image.filename}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="flex-1 text-xs bg-gray-100 hover:bg-canyon-red hover:text-white px-3 py-2 rounded-lg transition-colors font-medium"
                        >
                          Copy URL
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startRename(image.filename, image.isFromUploads ?? false)}
                          className="flex-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1.5 rounded transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Rename
                        </button>
                        <button
                          onClick={() => handleDelete(image.filename, image.isFromUploads ?? false)}
                          className="flex-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1.5 rounded transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No images uploaded yet</p>
            <p className="text-sm text-gray-500 mt-2">Upload images using the form above</p>
          </div>
        )}
      </div>
    </div>
  );
}
