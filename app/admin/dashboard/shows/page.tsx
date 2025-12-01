'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface Show {
  _id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  ticketUrl?: string;
  featured?: boolean;
}

export default function ShowsManagement() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [formData, setFormData] = useState<Partial<Show>>({
    title: '',
    venue: '',
    location: '',
    date: '',
    time: '',
    description: '',
    ticketUrl: '',
    featured: false,
  });

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingShow ? `/api/events?id=${editingShow._id}` : '/api/events';
      const method = editingShow ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchShows();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving show:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this show?')) return;

    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchShows();
      }
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };

  const openModal = (show?: Show) => {
    if (show) {
      setEditingShow(show);
      setFormData(show);
    } else {
      setEditingShow(null);
      setFormData({
        title: '',
        venue: '',
        location: '',
        date: '',
        time: '',
        description: '',
        ticketUrl: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingShow(null);
    setFormData({
      title: '',
      venue: '',
      location: '',
      date: '',
      time: '',
      description: '',
      ticketUrl: '',
      featured: false,
    });
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading shows...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-rich-brown mb-2">Shows & Events</h2>
          <p className="text-lg text-gray-600">Manage your performance schedule</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Show</span>
        </button>
      </div>

      {/* Shows List */}
      {shows.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 sm:p-16 text-center border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No shows yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first show to start building your performance schedule
          </p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
          >
            Add Your First Show
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {shows.map((show) => (
            <div
              key={show._id}
              className={`bg-white rounded-xl shadow-sm border-2 p-8 transition-all hover:shadow-md ${
                show.featured ? 'border-gold' : 'border-gray-200'
              }`}
            >
              {show.featured && (
                <span className="inline-block bg-gold text-rich-brown text-xs font-bold px-3 py-1 rounded-full mb-3">
                  FEATURED
                </span>
              )}
              
              <h3 className="text-xl font-bold text-rich-brown mb-3">{show.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-canyon-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{show.venue}</p>
                    <p className="text-sm text-gray-600">{show.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-canyon-red" />
                  <span>
                    {format(new Date(show.date), 'MMMM d, yyyy')} at {show.time}
                  </span>
                </div>
              </div>

              {show.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {show.description}
                </p>
              )}

              {show.ticketUrl && (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-canyon-red hover:text-canyon-terracotta text-sm mb-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Tickets</span>
                </a>
              )}

              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => openModal(show)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(show._id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6">
              <h3 className="text-2xl font-bold text-rich-brown">
                {editingShow ? 'Edit Show' : 'Add New Show'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="e.g., Jazz Night at Blue Note"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                    placeholder="e.g., Blue Note Jazz Club"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                    placeholder="e.g., 8:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="Tell fans about this performance..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket URL
                </label>
                <input
                  type="url"
                  value={formData.ticketUrl}
                  onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-canyon-red focus:border-transparent"
                  placeholder="https://tickets.example.com"
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
                  Feature this show (displays prominently on homepage)
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
                  {editingShow ? 'Update Show' : 'Add Show'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

