'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Music, Video, Play } from 'lucide-react';

interface Media {
  _id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  description?: string;
  duration?: string;
  featured?: boolean;
}

export default function MediaManagement() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [formData, setFormData] = useState<Partial<Media>>({
    title: '',
    type: 'audio',
    url: '',
    description: '',
    duration: '',
    featured: false,
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingMedia ? `/api/media?id=${editingMedia._id}` : '/api/media';
      const method = editingMedia ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchMedia();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMedia();
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const openModal = (mediaItem?: Media) => {
    if (mediaItem) {
      setEditingMedia(mediaItem);
      setFormData(mediaItem);
    } else {
      setEditingMedia(null);
      setFormData({
        title: '',
        type: 'audio',
        url: '',
        description: '',
        duration: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMedia(null);
  };

  const audioItems = media.filter(m => m.type === 'audio');
  const videoItems = media.filter(m => m.type === 'video');

  if (isLoading) {
    return <div className="text-center py-12">Loading media...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-rich-brown mb-2">Media Gallery</h2>
          <p className="text-lg text-gray-600">Manage your audio and video content</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Empty State */}
      {media.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 sm:p-16 text-center border border-gray-200">
          <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No media yet</h3>
          <p className="text-gray-600 mb-6">
            Upload your first audio or video to start showcasing your work
          </p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
          >
            Add Your First Media
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Audio Section */}
          {audioItems.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-rich-brown mb-4 flex items-center space-x-2">
                <Music className="w-6 h-6" />
                <span>Audio ({audioItems.length})</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {audioItems.map((item) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                      item.featured ? 'border-gold' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {item.featured && (
                            <span className="bg-gold text-rich-brown text-xs font-bold px-2 py-1 rounded">
                              FEATURED
                            </span>
                          )}
                          <h4 className="text-lg font-bold text-rich-brown">
                            {item.title}
                          </h4>
                          {item.duration && (
                            <span className="text-sm text-gray-500">{item.duration}</span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        )}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-canyon-red hover:text-canyon-terracotta text-sm"
                        >
                          <Play className="w-4 h-4" />
                          <span>Play Audio</span>
                        </a>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => openModal(item)}
                          className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Section */}
          {videoItems.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-rich-brown mb-4 flex items-center space-x-2">
                <Video className="w-6 h-6" />
                <span>Video ({videoItems.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoItems.map((item) => (
                  <div
                    key={item._id}
                    className={`bg-white rounded-lg shadow-sm border-2 overflow-hidden ${
                      item.featured ? 'border-gold' : 'border-gray-200'
                    }`}
                  >
                    {/* Video Thumbnail/Player */}
                    <div className="aspect-video bg-gray-100 relative">
                      {item.url.includes('youtube.com') || item.url.includes('youtu.be') ? (
                        <iframe
                          src={item.url.replace('watch?v=', 'embed/')}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full"
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {item.featured && (
                          <span className="bg-gold text-rich-brown text-xs font-bold px-2 py-1 rounded">
                            FEATURED
                          </span>
                        )}
                        <h4 className="text-lg font-bold text-rich-brown flex-1">
                          {item.title}
                        </h4>
                        {item.duration && (
                          <span className="text-sm text-gray-500">{item.duration}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(item)}
                          className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-bold text-rich-brown">
                {editingMedia ? 'Edit Media' : 'Add New Media'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="e.g., Autumn Serenade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'audio' | 'video' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="https://example.com/media.mp3 or YouTube URL"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For audio/video files: upload to /public/audio or /public/video folder first
                  <br />
                  For videos: YouTube/Vimeo URLs are also supported
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="e.g., 3:45"
                />
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
                  placeholder="Tell fans about this track or video..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-canyon-red border-gray-300 rounded focus:ring-canyon-red"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Feature this media (displays prominently on homepage)
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
                  {editingMedia ? 'Update Media' : 'Add Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

