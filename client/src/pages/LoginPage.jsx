import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Wrench, Shield, ArrowRight, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from === '/login' ? '/account' : from);
      }
    }
  };

  const handleFillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@mutahirhardware.local');
      setPassword('Admin@123456');
    } else {
      setEmail('customer@mutahirhardware.local');
      setPassword('Customer@123456');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-brand-border rounded p-8 shadow-industrial">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded bg-orange-500 text-zinc-950 mx-auto flex items-center justify-center font-bold mb-3 shadow-orange-glow">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-black text-brand-black uppercase">
            Customer & Admin Portal
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            Sign in to access your order history or admin control console
          </p>
        </div>

        {/* Quick Demo Fillers */}
        <div className="mb-6 p-3 bg-zinc-100 rounded border border-zinc-200 text-xs font-mono">
          <div className="text-zinc-600 font-bold mb-1.5 uppercase text-[10px]">
            Development Quick Access:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('admin')}
              className="py-1.5 px-2 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold rounded text-[10px] transition-colors"
            >
              Fill Admin Account
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('customer')}
              className="py-1.5 px-2 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold rounded text-[10px] transition-colors"
            >
              Fill Demo Customer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. customer@mutahirhardware.local"
                className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase tracking-wider rounded transition-all shadow-orange-glow disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-200 text-center text-xs font-mono text-zinc-600">
          New craftsman or contractor?{' '}
          <Link to="/register" className="text-orange-600 hover:underline font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
