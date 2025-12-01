'use client';

import { Image as ImageIcon, Upload, Folder } from 'lucide-react';

export default function ImagesManagement() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-rich-brown">Image Gallery</h2>
        <p className="text-gray-600">Manage your site images</p>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-8 h-8 text-blue-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-rich-brown mb-4">
            Image Management
          </h3>
          
          <p className="text-gray-600 mb-8">
            Currently, images are managed through the file system. Follow these steps to add images to your website:
          </p>

          {/* Steps */}
          <div className="text-left space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-canyon-red text-warm-cream rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Upload Images to Server</h4>
                <p className="text-gray-600 text-sm">
                  Place your images in the <code className="bg-gray-200 px-2 py-1 rounded text-xs">/public/images/</code> folder.
                  <br />
                  Example: <code className="bg-gray-200 px-2 py-1 rounded text-xs">/public/images/concert-photo.jpg</code>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-canyon-red text-warm-cream rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Reference in Admin</h4>
                <p className="text-gray-600 text-sm">
                  When adding products, shows, or media, use the image path:
                  <br />
                  <code className="bg-gray-200 px-2 py-1 rounded text-xs">/images/concert-photo.jpg</code>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-canyon-red text-warm-cream rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Optimize Your Images</h4>
                <p className="text-gray-600 text-sm">
                  • Use WebP format for better performance
                  <br />
                  • Compress images before uploading
                  <br />
                  • Recommended sizes: 1920x1080 for hero images, 800x800 for product covers
                </p>
              </div>
            </div>
          </div>

          {/* Current Images Location */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <Folder className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-2">
              Current Images Folder
            </p>
            <code className="text-sm bg-white px-4 py-2 rounded text-gray-700 inline-block">
              /public/images/
            </code>
          </div>

          {/* Future Enhancement Note */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Future Enhancement:</strong> A drag-and-drop image upload interface will be added in a future update.
            </p>
          </div>
        </div>
      </div>

      {/* Current Images */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-rich-brown mb-4">Current Images in /public/images/</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'saxophone.png',
            'sunset-red-rocks.webp',
            'blue-sky-canyon.webp',
            'pink-red-rocks.webp',
            'john_flanders_tux.jpeg',
            'John_Flanders_SB_Trio.jpg',
            'john-flanders-trio-by-windows.jpeg',
            'double_helix_albumn_cover.jpg',
          ].map((image) => (
            <div key={image} className="border border-gray-200 rounded-lg p-2">
              <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                <img
                  src={`/images/${image}`}
                  alt={image}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <ImageIcon className="w-8 h-8 text-gray-400 hidden" />
              </div>
              <p className="text-xs text-gray-600 truncate">{image}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

