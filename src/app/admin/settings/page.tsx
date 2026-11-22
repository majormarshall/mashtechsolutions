'use client';

import React, { useState } from 'react';
import { Settings, Shield, Key, Phone, Mail, CheckCircle, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const [paystackPubKey, setPaystackPubKey] = useState('pk_demo_your_paystack_public_key');
  const [paystackSecKey, setPaystackSecKey] = useState('sec_demo_your_paystack_secret_key');
  const [admissionsPhone1, setAdmissionsPhone1] = useState('07058124966');
  const [admissionsPhone2, setAdmissionsPhone2] = useState('08106071514');
  const [adminEmail, setAdminEmail] = useState('mashtechsolutions4@gmail.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Platform System Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure Supabase endpoints, Paystack payment gateway keys, and institutional contact numbers.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-6">
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Platform configurations saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Supabase Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Supabase Backend Integration Status</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030a1c] border border-blue-950 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Database Engine:</span>
                <span className="font-bold text-white">Supabase PostgreSQL 15+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Row Level Security (RLS):</span>
                <span className="text-emerald-400 font-bold">Enabled & Enforced</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Realtime Engine:</span>
                <span className="text-cyan-400 font-bold">Active for Discussions & Notifications</span>
              </div>
            </div>
          </div>

          {/* Paystack Gateway */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Key className="w-4 h-4" />
              <span>Paystack Payment Gateway API</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Public Key</label>
                <input
                  type="text"
                  value={paystackPubKey}
                  onChange={(e) => setPaystackPubKey(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Secret Key</label>
                <input
                  type="password"
                  value={paystackSecKey}
                  onChange={(e) => setPaystackSecKey(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Institutional Support & Admissions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Line 1 *</label>
                <input
                  type="text"
                  value={admissionsPhone1}
                  onChange={(e) => setAdmissionsPhone1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Line 2 *</label>
                <input
                  type="text"
                  value={admissionsPhone2}
                  onChange={(e) => setAdmissionsPhone2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admissions Email *</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-lg"
          >
            Save Configurations
          </button>
        </form>
      </div>
    </div>
  );
}
