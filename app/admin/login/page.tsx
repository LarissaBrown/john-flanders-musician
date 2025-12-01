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
    <div className="min-h-screen bg-gradient-to-br from-canyon-terracotta via-canyon-clay to-canyon-red flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold rounded-full mb-4 shadow-lg">
            <Music className="w-10 h-10 text-rich-brown" />
          </div>
          <h1 className="text-4xl font-bold text-warm-cream mb-2 drop-shadow-lg">
            John Flanders
          </h1>
          <p className="text-warm-cream text-lg">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-warm-cream rounded-xl shadow-2xl p-8 border-4 border-gold">
          <h2 className="text-2xl font-bold text-canyon-red mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-800 px-4 py-3 rounded-lg mb-6 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-canyon-red mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white border-2 border-canyon-sand text-rich-brown text-base rounded-lg focus:ring-4 focus:ring-gold focus:border-canyon-red transition-all placeholder:text-gray-400"
                placeholder="admin@johnflanders.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-canyon-red mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white border-2 border-canyon-sand text-rich-brown text-base rounded-lg focus:ring-4 focus:ring-gold focus:border-canyon-red transition-all placeholder:text-gray-400"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-canyon-red to-canyon-terracotta text-warm-cream py-4 px-6 rounded-lg font-bold text-lg hover:from-canyon-terracotta hover:to-canyon-red hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-canyon-clay font-medium">
            <p>Admin access only</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-warm-cream text-sm drop-shadow">
          <p>© {new Date().getFullYear()} John Flanders. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

