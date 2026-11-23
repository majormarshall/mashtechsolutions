'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { UserRole } from '@/types';
import { User, Mail, Lock, Phone, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useData();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'student' as UserRole
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await registerUser({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role
    });

    setLoading(false);

    if (result.success) {
      if (formData.role === 'instructor') {
        router.push('/instructor/dashboard');
      } else if (formData.role === 'client') {
        router.push('/client/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      setErrorMsg(result.error || 'Failed to register. Please verify your details.');
    }
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-2xl space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-cyan-400/40 shadow-lg">
              <Image src="/logos/mashtech-logo.jpg" alt="MashTech" fill sizes="56px" className="object-cover" />
            </div>
            <h1 className="text-2xl font-black text-white">Create Your Account</h1>
            <p className="text-xs text-slate-400">
              Register as a student or instructor to access classrooms and courses.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Emmanuel Adeleke"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-colors ${
                    formData.role === 'student'
                      ? 'bg-cyan-600 text-white border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'instructor' })}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-colors ${
                    formData.role === 'instructor'
                      ? 'bg-cyan-600 text-white border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  👨‍🏫 Instructor
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'client' })}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-colors ${
                    formData.role === 'client'
                      ? 'bg-cyan-600 text-white border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  💼 Client
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone / WhatsApp *</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="08106071514"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Registering...' : `Register as ${formData.role === 'instructor' ? 'Instructor' : formData.role === 'client' ? 'Client' : 'Student'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-blue-950">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-cyan-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
