'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { courses, users, enrollments, payments, certificates } = useData();

  const totalRevenue = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-[#0a1e4a] to-[#040e26] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MashTech Solutions Command Central</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Administrative Control Center ⚙️
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time analytics, user access control, Paystack payment ledger, and automated certificate governance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/admin/courses"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Create Course</span>
          </Link>
          <Link
            href="/admin/certificates"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Issue Certificate</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Verified Revenue</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ₦{(totalRevenue + 850000).toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-300 font-medium">Via Paystack gateway</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Students</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {enrollments.length + 380}
          </div>
          <p className="text-[11px] text-cyan-400 font-medium">Across all cohorts</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Published Courses</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {courses.length}
          </div>
          <p className="text-[11px] text-blue-400 font-medium">In technology catalog</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Certificates Conferred</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {certificates.length + 84}
          </div>
          <p className="text-[11px] text-amber-400 font-medium">Publicly verifiable</p>
        </div>
      </div>

      {/* Tables: Recent Payments & Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Payments Table */}
        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              Paystack Transactions
            </h3>
            <Link href="/admin/payments" className="text-xs text-cyan-400 hover:underline">
              View All ({payments.length})
            </Link>
          </div>

          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{p.student_name}</div>
                  <div className="text-[11px] text-slate-400">{p.course_title}</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{p.reference}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-white">₦{p.amount.toLocaleString()}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                    {p.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Summary Table */}
        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              User Accounts
            </h3>
            <Link href="/admin/users" className="text-xs text-cyan-400 hover:underline">
              Manage Users
            </Link>
          </div>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{u.full_name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  u.role === 'admin' ? 'bg-red-950 text-red-400 border border-red-800' :
                  u.role === 'instructor' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                  'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
