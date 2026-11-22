'use client';

import React from 'react';
import { useData } from '@/lib/context/data-context';
import { CreditCard, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdminPaymentsPage() {
  const { payments } = useData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Paystack Payment Transactions</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time payment logs, server verification references, and revenue auditing.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3 pl-2">Transaction Ref</th>
              <th className="pb-3">Student</th>
              <th className="pb-3">Course</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Gateway</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-blue-900/20 transition-colors">
                <td className="py-3.5 pl-2 font-mono text-cyan-400 font-bold">
                  {p.reference}
                </td>
                <td className="py-3.5 font-bold text-white">
                  {p.student_name}
                </td>
                <td className="py-3.5 text-slate-300">
                  {p.course_title}
                </td>
                <td className="py-3.5 font-black text-white">
                  ₦{p.amount.toLocaleString()}
                </td>
                <td className="py-3.5 text-slate-400">
                  {p.payment_method}
                </td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1 w-max">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </td>
                <td className="py-3.5 text-slate-400">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
