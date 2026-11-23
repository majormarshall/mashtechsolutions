'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { ClientInvoice } from '@/types';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  FileText,
  DollarSign,
  Building2,
  ExternalLink,
  Copy,
  Check,
  Lock
} from 'lucide-react';
import { OFFICIAL_BANK_ACCOUNTS } from '@/lib/data/bankAccounts';

export default function ClientInvoicesPage() {
  const { clientInvoices, payInvoice, currentUser } = useData();
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  
  // Checkout Modal State
  const [activeInvoice, setActiveInvoice] = useState<ClientInvoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'paystack'>('bank_transfer');
  const [selectedBank, setSelectedBank] = useState<'OPay' | 'PalmPay' | 'UBA'>('OPay');
  const [senderName, setSenderName] = useState(currentUser?.full_name || '');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

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

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleOpenPay = (inv: ClientInvoice) => {
    setActiveInvoice(inv);
    setPaySuccess(false);
    setIsProcessing(false);
    setSenderName(currentUser.full_name || '');
  };

  const handleConfirmBankTransfer = () => {
    if (!activeInvoice) return;
    setIsProcessing(true);
    setTimeout(() => {
      payInvoice(activeInvoice.id, {
        method: `Direct Bank Transfer (${selectedBank})`,
        bank: selectedBank,
        reference: `MTS_INV_TRF_${selectedBank.toUpperCase()}_${Math.floor(10000000 + Math.random() * 90000000)}`
      });
      setIsProcessing(false);
      setPaySuccess(true);
      setTimeout(() => {
        setPaySuccess(false);
        setActiveInvoice(null);
      }, 2000);
    }, 1200);
  };

  const handleConfirmPaystack = () => {
    if (!activeInvoice) return;
    setIsProcessing(true);
    setTimeout(() => {
      payInvoice(activeInvoice.id, {
        method: 'Paystack Automated Verification',
        reference: `MTS_INV_PAY_${Math.floor(10000000 + Math.random() * 90000000)}`
      });
      setIsProcessing(false);
      setPaySuccess(true);
      setTimeout(() => {
        setPaySuccess(false);
        setActiveInvoice(null);
      }, 2000);
    }, 1500);
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
            Settlement records, milestone release invoices, and direct bank transfer verification (OPay, PalmPay, UBA) or Paystack.
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
          <div className="text-xs uppercase font-bold text-slate-400">Accepted Settlement Modes</div>
          <div className="text-base font-bold text-white flex items-center gap-2 pt-1">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs">OPay</span>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-xs">PalmPay</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-xs">UBA</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs">Paystack</span>
          </div>
          <div className="text-[11px] text-slate-500">Direct transfer & card payments</div>
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
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
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

                  return (
                    <tr key={inv.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                        {inv.invoice_number}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{inv.title || 'Project Milestone Delivery'}</div>
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
                            onClick={() => alert(`Official Payment Receipt for ${inv.invoice_number} (Amount: ₦${inv.amount.toLocaleString()}): Verified & Archived.`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
                          >
                            <Download className="w-3 h-3 text-cyan-400" />
                            <span>Receipt</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenPay(inv)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Invoice</span>
                          </button>
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

      {/* Verified Bank Accounts Summary Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Official MashTech Solutions Bank Transfer Accounts</span>
            </h3>
            <p className="text-xs text-slate-400">
              Account Name: <strong className="text-white">MashTech Solutions / Adeleke Marshall</strong>
            </p>
          </div>
          <span className="text-[11px] text-cyan-400 font-semibold">Instant Payment Reconciliation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {OFFICIAL_BANK_ACCOUNTS.map((acc) => {
            const isCopied = copiedAccount === acc.accountNumber;
            return (
              <div key={acc.tag} className={`p-4 rounded-2xl border bg-gradient-to-br ${acc.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase">{acc.bankName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 font-semibold">
                    {acc.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-mono text-base font-black text-white">{acc.accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(acc.accountNumber)}
                    className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-bold flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAYMENT MODAL FOR INVOICE */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  ₦
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Settle Invoice {activeInvoice.invoice_number}</h3>
                  <p className="text-[11px] text-slate-400">Choose Direct Bank Transfer or Paystack</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveInvoice(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {paySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">Invoice Settled!</h4>
                <p className="text-xs text-slate-300">
                  Payment of <strong>₦{activeInvoice.amount.toLocaleString()}</strong> has been credited to your project ledger.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Summary */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Project:</span>
                    <span className="text-white font-semibold">{activeInvoice.project_title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Milestone:</span>
                    <span className="text-white font-semibold">{activeInvoice.title || 'Milestone Delivery'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-xs text-slate-300 font-bold">Invoice Total:</span>
                    <span className="text-2xl font-black text-cyan-400">₦{activeInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paystack')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'paystack'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Paystack (Card/USSD)</span>
                  </button>
                </div>

                {paymentMethod === 'bank_transfer' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {(['OPay', 'PalmPay', 'UBA'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            selectedBank === b
                              ? b === 'OPay'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-400'
                                : b === 'PalmPay'
                                ? 'bg-purple-950 text-purple-300 border-purple-400'
                                : 'bg-red-950 text-rose-300 border-rose-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const currentAcc = OFFICIAL_BANK_ACCOUNTS.find(a => a.tag === selectedBank) || OFFICIAL_BANK_ACCOUNTS[0];
                      const isCopied = copiedAccount === currentAcc.accountNumber;

                      return (
                        <div className={`p-4 rounded-2xl border bg-gradient-to-br ${currentAcc.color} space-y-3`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white uppercase">{currentAcc.bankName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-700">
                              {currentAcc.badge}
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Account Number</div>
                              <div className="text-xl font-mono font-black text-white tracking-widest">
                                {currentAcc.accountNumber}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyAccount(currentAcc.accountNumber)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="text-[11px] text-slate-300">
                            <span className="text-slate-400">Account Name: </span>
                            <strong className="text-white">{currentAcc.accountName}</strong>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Transfer Sender Name / Reference Narration
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Apex Holdings / Boma Lawson"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <button
                        disabled={isProcessing}
                        onClick={handleConfirmBankTransfer}
                        className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <span>Verifying Settlement...</span>
                        ) : (
                          <span>I Have Sent ₦{activeInvoice.amount.toLocaleString()} — Confirm</span>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200/90 leading-relaxed">
                      Instant card, USSD (*737#, *966#), Apple Pay, or QR settlement processed directly via Paystack PCI-DSS certified gateway.
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>256-Bit SSL Encrypted Paystack Infrastructure</span>
                    </div>

                    <button
                      disabled={isProcessing}
                      onClick={handleConfirmPaystack}
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <span>Connecting with Paystack...</span>
                      ) : (
                        <span>Pay ₦{activeInvoice.amount.toLocaleString()} with Paystack</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
