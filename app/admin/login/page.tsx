'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rich-brown via-canyon-clay to-rich-brown flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4">
            <Music className="w-8 h-8 text-rich-brown" />
          </div>
          <h1 className="text-3xl font-bold text-warm-cream mb-2">
            John Flanders
          </h1>
          <p className="text-canyon-sand">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-warm-cream rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-rich-brown mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-rich-brown mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-canyon-sand rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                placeholder="admin@johnflanders.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-rich-brown mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-canyon-sand rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream py-3 px-6 rounded-lg font-semibold hover:from-canyon-terracotta hover:to-canyon-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-canyon-clay">
            <p>Admin access only</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-canyon-sand text-sm">
          <p>© {new Date().getFullYear()} John Flanders. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

