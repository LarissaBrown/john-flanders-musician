'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple authentication (replace with NextAuth.js in production)
    if (credentials.email === 'admin@johnflanders.com' && credentials.password === 'admin123') {
      // Set session (using localStorage for now - use secure session in production)
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1C1612] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-[#F6B800]"></div>
            <div className="w-4 h-4 rounded-full bg-[#F6B800] opacity-80"></div>
            <div className="w-4 h-4 rounded-full bg-[#F6B800] opacity-60"></div>
          </div>
          <h1 className="text-3xl font-black text-[#F6B800] uppercase tracking-wide">
            Admin Login
          </h1>
          <p className="text-[#B8AFA3] mt-2">John Flanders Music</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#2D241E] rounded-2xl shadow-2xl p-8 border border-[#F6B800]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#F5F0E8] font-semibold mb-2 text-sm uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1C1612] border-2 border-[#3A2F28] rounded-lg focus:border-[#F6B800] focus:outline-none transition-colors text-[#F5F0E8]"
                placeholder="admin@johnflanders.com"
              />
            </div>

            <div>
              <label className="block text-[#F5F0E8] font-semibold mb-2 text-sm uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1C1612] border-2 border-[#3A2F28] rounded-lg focus:border-[#F6B800] focus:outline-none transition-colors text-[#F5F0E8]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#8A8078] text-sm">
              Demo credentials: admin@johnflanders.com / TestPassword123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
