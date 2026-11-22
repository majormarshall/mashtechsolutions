'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-cyan-400/40 shadow-lg">
              <Image src="/logos/mashtech-logo.jpg" alt="MashTech" fill className="object-cover" />
            </div>
            <h1 className="text-2xl font-black text-white">Reset Password</h1>
            <p className="text-xs text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Link Sent</h3>
              <p className="text-xs text-slate-300">
                If an account exists for <strong>{email}</strong>, you will receive a secure reset email shortly.
              </p>
              <Link
                href="/auth/login"
                className="mt-4 inline-block text-xs font-bold text-cyan-400 hover:underline"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all"
              >
                Send Reset Link
              </button>

              <div className="text-center pt-2">
                <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
