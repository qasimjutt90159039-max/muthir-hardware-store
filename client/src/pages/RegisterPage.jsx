import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, loading } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toastError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      toastError('Password must be at least 6 characters.');
      return;
    }

    const result = await register(name, email, phone, password);
    if (result.success) {
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-brand-border rounded p-8 shadow-industrial">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded bg-orange-500 text-zinc-950 mx-auto flex items-center justify-center font-bold mb-3 shadow-orange-glow">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-black text-brand-black uppercase">
            Create Customer Account
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            Register to track orders, save delivery addresses, and leave verified reviews
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Asif Mehmood"
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Active Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +92 300 1234567"
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. asif@example.com"
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Password (Min. 6 chars) <span className="text-red-500">*</span>
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

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase tracking-wider rounded transition-all shadow-orange-glow disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Registering Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-200 text-center text-xs font-mono text-zinc-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:underline font-bold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
