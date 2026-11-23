'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { CreditCard, CheckCircle, ExternalLink, ShieldCheck, Building2, Search, DollarSign } from 'lucide-react';
import { OFFICIAL_BANK_ACCOUNTS } from '@/lib/data/bankAccounts';

export default function AdminPaymentsPage() {
  const { payments } = useData();
  const [search, setSearch] = useState('');

  const filtered = payments.filter(p =>
    p.reference.toLowerCase().includes(search.toLowerCase()) ||
    (p.student_name && p.student_name.toLowerCase().includes(search.toLowerCase())) ||
    (p.course_title && p.course_title.toLowerCase().includes(search.toLowerCase())) ||
    p.payment_method.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Revenue Reconciliation</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Payments & Settlement Ledger</h1>
          <p className="text-sm text-slate-400 mt-1">
            Reconcile tuition settlements across Direct Bank Transfers (OPay, PalmPay, UBA) and Paystack.
          </p>
        </div>

        <div className="text-right p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Revenue Collected</div>
          <div className="text-2xl font-black text-emerald-400">₦{totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Official Receiving Accounts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {OFFICIAL_BANK_ACCOUNTS.map((acc) => (
          <div key={acc.tag} className={`p-4 rounded-2xl border bg-gradient-to-br ${acc.color} space-y-1`}>
            <div className="flex items-center justify-between text-xs font-bold text-white uppercase">
              <span>{acc.bankName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300">
                {acc.badge}
              </span>
            </div>
            <div className="font-mono text-lg font-black text-white">{acc.accountNumber}</div>
            <div className="text-[10px] text-slate-300">{acc.accountName}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ref, student, course, method..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Payments Table */}
      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="pb-3 pl-2">Transaction Ref</th>
              <th className="pb-3">Student</th>
              <th className="pb-3">Course Track</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Channel / Method</th>
              <th className="pb-3">Verification</th>
              <th className="pb-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60 text-slate-300">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-blue-900/20 transition-colors">
                <td className="py-3.5 pl-2 font-mono text-cyan-400 font-bold">
                  {p.reference}
                </td>
                <td className="py-3.5 font-bold text-white">
                  {p.student_name || 'Enrolled Student'}
                </td>
                <td className="py-3.5 text-slate-200 font-medium">
                  {p.course_title}
                </td>
                <td className="py-3.5 font-black text-emerald-400 text-sm">
                  ₦{p.amount.toLocaleString()}
                </td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    p.payment_method.includes('OPay')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : p.payment_method.includes('PalmPay')
                      ? 'bg-purple-950 text-purple-300 border border-purple-800'
                      : p.payment_method.includes('UBA')
                      ? 'bg-red-950 text-rose-300 border border-rose-800'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}>
                    {p.payment_method}
                  </span>
                </td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </td>
                <td className="py-3.5 text-slate-400">
                  {new Date(p.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
