'use client';

import { useEffect, useState } from 'react';
import { Mail, Calendar, User, Phone, MessageSquare, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  message: string;
  createdAt: string;
}

export default function MessagesManagement() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      // Sort by newest first
      const sorted = data.sort((a: Contact, b: Contact) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sorted);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading messages...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-rich-brown">
            Inbox ({messages.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <button
                key={message._id}
                onClick={() => setSelectedMessage(message)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedMessage?._id === message._id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900 truncate pr-2">
                    {message.name}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {format(new Date(message.createdAt), 'MMM d')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">{message.email}</p>
                {message.eventType && (
                  <span className="inline-block text-xs bg-canyon-red text-warm-cream px-2 py-0.5 rounded">
                    {message.eventType}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-rich-brown mb-2">
                  {selectedMessage.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Received {format(new Date(selectedMessage.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span className="text-sm">Delete</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-canyon-red hover:text-canyon-terracotta"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              {selectedMessage.phone && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-gray-900"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                </div>
              )}

              {selectedMessage.eventType && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Event Type</p>
                    <p className="text-gray-900">{selectedMessage.eventType}</p>
                  </div>
                </div>
              )}

              {selectedMessage.eventDate && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="text-gray-900">
                      {format(new Date(selectedMessage.eventDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Message</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry about ${selectedMessage.eventType || 'booking'}`}
                className="flex items-center space-x-2 bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream px-6 py-3 rounded-lg hover:from-canyon-terracotta hover:to-canyon-red transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>

              {selectedMessage.phone && (
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No message selected
            </h3>
            <p className="text-gray-600">
              Select a message from the inbox to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

