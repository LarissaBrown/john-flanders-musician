'use client';

import { useState } from 'react';
import { Music, Calendar, Film, MessageSquare, Plus } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'media' | 'contacts'>('events');

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-[#2C2419] text-[#E6B8A5] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music className="w-8 h-8 text-[#D97D54]" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <a
              href="/"
              className="text-[#D97D54] hover:text-[#E6B8A5] transition-colors"
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
                  ? 'border-b-4 border-[#D97D54] text-[#C67B5C]'
                  : 'text-[#5A4A3A] hover:text-[#C67B5C]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Events</span>
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'media'
                  ? 'border-b-4 border-[#D97D54] text-[#C67B5C]'
                  : 'text-[#5A4A3A] hover:text-[#C67B5C]'
              }`}
            >
              <Film className="w-5 h-5" />
              <span>Media</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'border-b-4 border-[#D97D54] text-[#C67B5C]'
                  : 'text-[#5A4A3A] hover:text-[#C67B5C]'
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
                  <h2 className="text-2xl font-bold text-[#2C2419]">
                    Manage Events
                  </h2>
                  <button className="bg-[#C67B5C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97D54] transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Event</span>
                  </button>
                </div>
                <div className="text-center py-12 text-[#5A4A3A]">
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
                  <h2 className="text-2xl font-bold text-[#2C2419]">
                    Manage Media
                  </h2>
                  <button className="bg-[#C67B5C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97D54] transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Media</span>
                  </button>
                </div>
                <div className="text-center py-12 text-[#5A4A3A]">
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
                <h2 className="text-2xl font-bold text-[#2C2419] mb-6">
                  Contact Inquiries
                </h2>
                <div className="text-center py-12 text-[#5A4A3A]">
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
                <p className="text-[#5A4A3A] text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-[#2C2419] mt-2">0</p>
              </div>
              <Calendar className="w-12 h-12 text-[#D97D54] opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5A4A3A] text-sm font-medium">Media Items</p>
                <p className="text-3xl font-bold text-[#2C2419] mt-2">0</p>
              </div>
              <Film className="w-12 h-12 text-[#D97D54] opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5A4A3A] text-sm font-medium">New Contacts</p>
                <p className="text-3xl font-bold text-[#2C2419] mt-2">0</p>
              </div>
              <MessageSquare className="w-12 h-12 text-[#D97D54] opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

