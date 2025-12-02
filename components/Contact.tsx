'use client';

import { useState } from 'react';
import { Send, Calendar, Mail, Phone, User } from 'lucide-react';

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
    <section id="contact" className="py-20 sm:py-24 lg:py-32 bg-purple px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 uppercase tracking-wide">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-cream max-w-3xl mx-auto leading-relaxed">
            Interested in booking for your event? Let's make it happen!
          </p>
        </div>

        <div>
          {/* Contact Form */}
          <div className="bg-surface-dark rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-8 sm:mb-10 uppercase tracking-wide">
              Book an Event
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" suppressHydrationWarning>
              <div suppressHydrationWarning>
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-cream placeholder:text-cream/50"
                  placeholder="Your full name"
                />
              </div>

              <div suppressHydrationWarning>
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-cream placeholder:text-cream/50"
                  placeholder="your@email.com"
                />
              </div>

              <div suppressHydrationWarning>
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-cream placeholder:text-cream/50"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-cream"
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
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors text-cream"
                />
              </div>

              <div>
                <label className="block text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-rich-brown border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none text-cream placeholder:text-cream/50"
                  placeholder="Tell me about your event..."
                ></textarea>
              </div>

              {submitMessage && (
                <div className="bg-green-600 text-white px-5 py-4 rounded-lg font-semibold">
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-hover text-white py-5 rounded-xl font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-10 sm:mt-12 text-center px-4">
            <p className="text-cream/70 text-sm mb-3">Direct Contact</p>
            <a
              href="mailto:larissa.johnson.brown@gmail.com"
              className="text-primary hover:text-secondary transition-colors text-lg font-semibold"
            >
              larissa.johnson.brown@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
