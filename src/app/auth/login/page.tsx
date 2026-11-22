'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { UserRole } from '@/types';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole, currentUser } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (currentUser.role === 'admin') router.push('/admin/dashboard');
      else if (currentUser.role === 'instructor') router.push('/instructor/dashboard');
      else router.push('/student/dashboard');
    }, 600);
  };

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'instructor') router.push('/instructor/dashboard');
    else router.push('/student/dashboard');
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-2xl space-y-8">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-cyan-400/40 shadow-lg">
              <Image src="/logos/mashtech-logo.jpg" alt="MashTech" fill className="object-cover" />
            </div>
            <h1 className="text-2xl font-black text-white">Sign In to MashTech LMS</h1>
            <p className="text-xs text-slate-400">
              Access your classroom, live Google Meet sessions, and certificates.
            </p>
          </div>

          {/* Quick 1-Click Demo Login Switchers */}
          <div className="p-3.5 rounded-2xl bg-[#040c20] border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Demo Portals</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="py-2 px-1 text-xs font-semibold rounded-xl bg-blue-950 hover:bg-cyan-900/80 text-cyan-300 border border-blue-800 transition-colors"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('instructor')}
                className="py-2 px-1 text-xs font-semibold rounded-xl bg-blue-950 hover:bg-cyan-900/80 text-cyan-300 border border-blue-800 transition-colors"
              >
                👨‍🏫 Instructor
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2 px-1 text-xs font-semibold rounded-xl bg-blue-950 hover:bg-cyan-900/80 text-cyan-300 border border-blue-800 transition-colors"
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center text-xs text-slate-400 pt-2 border-t border-blue-950">
            Don&apos;t have an account yet?{' '}
            <Link href="/auth/register" className="text-cyan-400 font-bold hover:underline">
              Create an account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
