'use client';

import { useState } from 'react';
import { Send, Calendar, Music, Mail, Phone, User } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement API call to save contact form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been received. I\'ll get back to you soon!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
      });
      
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#F4E4C1] to-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#2C1810] mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[#E67E22] mx-auto mb-6"></div>
          <p className="text-xl text-[#9B4819] max-w-3xl mx-auto">
            Interested in booking for your event? Let's make it happen!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[#2C1810] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#E67E22] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C1810]">Email</p>
                    <a
                      href="mailto:info@johnflanders.com"
                      className="text-[#C1440E] hover:text-[#E67E22] transition-colors"
                    >
                      info@johnflanders.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#E67E22] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C1810]">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-[#C1440E] hover:text-[#E67E22] transition-colors"
                    >
                      (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Types */}
            <div className="bg-gradient-to-br from-[#C1440E] to-[#E67E22] rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Available For</h3>
              <ul className="space-y-3">
                {[
                  'Concerts & Festivals',
                  'Private Events',
                  'Weddings',
                  'Corporate Functions',
                  'Restaurant & Bar Gigs',
                  'Studio Sessions',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Music className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#2C1810] mb-6">
              Book an Event
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Name *
                </label>
                <div className="relative" suppressHydrationWarning>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9B4819]" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Email *
                </label>
                <div className="relative" suppressHydrationWarning>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9B4819]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Phone
                </label>
                <div className="relative" suppressHydrationWarning>
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9B4819]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors"
                >
                  <option value="">Select event type</option>
                  <option value="concert">Concert/Festival</option>
                  <option value="private">Private Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Function</option>
                  <option value="restaurant">Restaurant/Bar</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9B4819]" />
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C1810] font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-[#F4E4C1] rounded-lg focus:border-[#E67E22] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your event..."
                ></textarea>
              </div>

              {submitMessage && (
                <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C1440E] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#E67E22] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

