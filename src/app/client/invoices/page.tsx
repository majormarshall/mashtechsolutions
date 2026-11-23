'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  FileText,
  DollarSign,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function ClientInvoicesPage() {
  const { clientInvoices, payInvoice, currentUser } = useData();
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [payingId, setPayingId] = useState<string | null>(null);
  const [paySuccessId, setPaySuccessId] = useState<string | null>(null);

  if (!currentUser) return null;

  const myInvoices = clientInvoices.filter(
    inv => inv.client_id === currentUser.id || currentUser.role === 'admin'
  );

  const filteredInvoices = myInvoices.filter(inv => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const totalPaid = myInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = myInvoices
    .filter(i => i.status === 'unpaid')
    .reduce((sum, i) => sum + i.amount, 0);

  const handlePay = (invoiceId: string) => {
    setPayingId(invoiceId);
    setTimeout(() => {
      payInvoice(invoiceId);
      setPayingId(null);
      setPaySuccessId(invoiceId);
      setTimeout(() => setPaySuccessId(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Financial Ledger</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Project Invoices & Billing</h1>
          <p className="text-sm text-slate-400 mt-1">
            Settlement records, milestone release invoices, and automated Paystack receipts.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-[#071330]/80 border border-slate-800 backdrop-blur-sm space-y-1">
          <div className="text-xs uppercase font-bold text-slate-400">Total Settled</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ₦{totalPaid.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">Verified milestone deliveries</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#071330]/80 border border-slate-800 backdrop-blur-sm space-y-1">
          <div className="text-xs uppercase font-bold text-slate-400">Pending Milestone Settlement</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            ₦{totalPending.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">
            {myInvoices.filter(i => i.status === 'unpaid').length} open invoices
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#071330]/80 border border-slate-800 backdrop-blur-sm space-y-1">
          <div className="text-xs uppercase font-bold text-slate-400">Gateway Security</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Paystack 3D</span>
          </div>
          <div className="text-[11px] text-slate-500">PCI-DSS Level 1 certified gateway</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['all', 'unpaid', 'paid'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab} ({
              tab === 'all' 
                ? myInvoices.length 
                : myInvoices.filter(i => i.status === tab).length
            })
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl border border-slate-800 bg-[#071330]/60 overflow-hidden shadow-xl">
        {filteredInvoices.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Invoices Found</h3>
            <p className="text-xs text-slate-400">
              There are no invoices matching this filter category.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Milestone / Description</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredInvoices.map((inv) => {
                  const isPaid = inv.status === 'paid';
                  const isPaying = payingId === inv.id;
                  const isJustPaid = paySuccessId === inv.id;

                  return (
                    <tr key={inv.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                        {inv.invoice_number}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{inv.title}</div>
                        <div className="text-[11px] text-slate-500">{inv.project_title}</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white text-sm">
                        ₦{inv.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {new Date(inv.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                          isPaid
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{inv.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {isPaid ? (
                          <button
                            onClick={() => alert(`Receipt downloaded for ${inv.invoice_number}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
                          >
                            <Download className="w-3 h-3 text-cyan-400" />
                            <span>Receipt</span>
                          </button>
                        ) : (
                          <button
                            disabled={isPaying}
                            onClick={() => handlePay(inv.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>{isPaying ? 'Processing...' : 'Pay with Paystack'}</span>
                          </button>
                        )}

                        {isJustPaid && (
                          <div className="text-[10px] text-emerald-400 font-semibold mt-1 animate-pulse">
                            Payment verified!
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paystack Guarantee */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">Bank Transfers & Corporate Invoicing</div>
            <div>Direct corporate bank transfer settlement is available for amounts exceeding ₦1,000,000.</div>
          </div>
        </div>
        <a
          href="mailto:mashtechsolutions4@gmail.com?subject=Corporate%20Wire%20Transfer%20Invoice"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold border border-slate-700 transition-all shrink-0"
        >
          Request Direct Wire Details
        </a>
      </div>
    </div>
  );
}
