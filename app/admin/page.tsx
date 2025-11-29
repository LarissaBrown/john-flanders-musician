'use client';

import { useState } from 'react';
import { Music, Calendar, Film, MessageSquare, Plus } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'media' | 'contacts'>('events');

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-[#2C1810] text-[#F4E4C1] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music className="w-8 h-8 text-[#E67E22]" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <a
              href="/"
              className="text-[#E67E22] hover:text-[#F4E4C1] transition-colors"
            >
              ← Back to Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'events'
                  ? 'border-b-4 border-[#E67E22] text-[#C1440E]'
                  : 'text-[#9B4819] hover:text-[#C1440E]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Events</span>
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'media'
                  ? 'border-b-4 border-[#E67E22] text-[#C1440E]'
                  : 'text-[#9B4819] hover:text-[#C1440E]'
              }`}
            >
              <Film className="w-5 h-5" />
              <span>Media</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'border-b-4 border-[#E67E22] text-[#C1440E]'
                  : 'text-[#9B4819] hover:text-[#C1440E]'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contacts</span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#2C1810]">
                    Manage Events
                  </h2>
                  <button className="bg-[#C1440E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E67E22] transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Event</span>
                  </button>
                </div>
                <div className="text-center py-12 text-[#9B4819]">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    Event management interface will be implemented here.
                  </p>
                  <p className="text-sm mt-2">
                    For now, use the API endpoints or database directly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#2C1810]">
                    Manage Media
                  </h2>
                  <button className="bg-[#C1440E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E67E22] transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Media</span>
                  </button>
                </div>
                <div className="text-center py-12 text-[#9B4819]">
                  <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    Media management interface will be implemented here.
                  </p>
                  <p className="text-sm mt-2">
                    For now, use the API endpoints or database directly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold text-[#2C1810] mb-6">
                  Contact Inquiries
                </h2>
                <div className="text-center py-12 text-[#9B4819]">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    Contact management interface will be implemented here.
                  </p>
                  <p className="text-sm mt-2">
                    For now, use the API endpoints or database directly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9B4819] text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-[#2C1810] mt-2">0</p>
              </div>
              <Calendar className="w-12 h-12 text-[#E67E22] opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9B4819] text-sm font-medium">Media Items</p>
                <p className="text-3xl font-bold text-[#2C1810] mt-2">0</p>
              </div>
              <Film className="w-12 h-12 text-[#E67E22] opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9B4819] text-sm font-medium">New Contacts</p>
                <p className="text-3xl font-bold text-[#2C1810] mt-2">0</p>
              </div>
              <MessageSquare className="w-12 h-12 text-[#E67E22] opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

