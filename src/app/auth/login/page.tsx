'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '';

  const { login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (redirectPath) {
        router.push(redirectPath);
      } else if (result.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (result.role === 'instructor') {
        router.push('/instructor/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      setErrorMessage(result.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const autofillAdmin = () => {
    setEmail('mashtechsolutions4@gmail.com');
    setPassword('Alpha112');
    setErrorMessage('');
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-2xl space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-cyan-400/40 shadow-lg">
              <Image src="/logos/mashtech-logo.jpg" alt="MashTech" fill className="object-cover" />
            </div>
            <h1 className="text-2xl font-black text-white">Sign In to MashTech</h1>
            <p className="text-xs text-slate-400">
              Authentication required for Student, Instructor, and Admin dashboards.
            </p>
          </div>

          {/* Admin Credentials Helper Card */}
          <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-cyan-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between text-cyan-300 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Admin Credentials</span>
              </span>
              <button
                type="button"
                onClick={autofillAdmin}
                className="text-[10px] text-cyan-400 hover:text-white underline font-semibold"
              >
                Auto-fill
              </button>
            </div>
            <div className="text-[11px] text-slate-300 space-y-0.5 font-mono">
              <div>Email: <strong>mashtechsolutions4@gmail.com</strong></div>
              <div>Pass: <strong>Alpha112</strong></div>
            </div>
            <p className="text-[10px] text-slate-400">
              Students & Instructors: Please register your own account below if not already registered.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link href="/auth/forgot-password" className="text-[11px] text-cyan-400 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer link to register */}
          <div className="text-center text-xs text-slate-400 pt-2 border-t border-blue-950">
            Don&apos;t have an account yet?{' '}
            <Link href="/auth/register" className="text-cyan-400 font-bold hover:underline">
              Register now
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
