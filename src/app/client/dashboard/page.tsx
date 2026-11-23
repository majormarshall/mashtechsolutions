'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { 
  FolderKanban, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  FileText, 
  Sparkles,
  Layers,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { clientProjects, clientInvoices, payInvoice, currentUser } = useData();

  if (!currentUser) return null;

  const myProjects = clientProjects.filter(
    p => p.client_id === currentUser.id || p.client_email === currentUser.email || currentUser.role === 'admin'
  );

  const myInvoices = clientInvoices.filter(
    inv => inv.client_id === currentUser.id || currentUser.role === 'admin'
  );

  const activeProject = myProjects[0];
  const totalInvested = myInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const unpaidInvoices = myInvoices.filter(i => i.status === 'unpaid');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-[#0a1e4a] to-[#040e26] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>MashTech Client Project Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {currentUser.full_name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Track your commissioned technology deliverables, review milestone approvals, and settle Paystack invoices in real-time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/client/requests"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Request New Project</span>
          </Link>
          <Link
            href="/services"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-all"
          >
            Browse Services
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Commissioned Projects</span>
            <FolderKanban className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{myProjects.length}</div>
          <p className="text-[11px] text-cyan-400 font-medium">Under active management</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Delivery Progress</span>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {activeProject ? `${activeProject.progress_percentage}%` : '0%'}
          </div>
          <p className="text-[11px] text-slate-400">Across current milestones</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Settle via Paystack</span>
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">₦{totalInvested.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-400 font-medium">Verified deposits & balances</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Outstanding Invoices</span>
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{unpaidInvoices.length}</div>
          <p className="text-[11px] text-amber-400 font-medium">
            {unpaidInvoices.length > 0 ? 'Pending payment' : 'All accounts settled'}
          </p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Featured Project Milestones */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              <span>Active Project Delivery Status</span>
            </h2>
            <Link
              href="/client/projects"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View Full Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeProject ? (
            <div className="p-7 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-950">
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                    {activeProject.service_type}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{activeProject.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Technical Lead: <strong className="text-slate-200">{activeProject.lead_assigned}</strong>
                  </p>
                </div>
                
                <div className="text-right sm:shrink-0">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Total Budget</span>
                  <span className="text-lg font-black text-white">₦{activeProject.budget.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400 block">₦{(activeProject.paid_amount || 0).toLocaleString()} paid</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Overall Delivery Completion</span>
                  <span className="text-cyan-400 font-black">{activeProject.progress_percentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 transition-all duration-500"
                    style={{ width: `${activeProject.progress_percentage}%` }}
                  />
                </div>
              </div>

              {/* Milestones list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Project Milestones & Deliverables
                </h4>
                <div className="space-y-2.5">
                  {activeProject.milestones.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          m.status === 'completed' 
                            ? 'bg-emerald-500 text-slate-950' 
                            : m.status === 'in_progress'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {m.status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{m.title}</h5>
                          {m.deliverable_note && (
                            <p className="text-[11px] text-cyan-300/80 mt-0.5">{m.deliverable_note}</p>
                          )}
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase border shrink-0 ${
                        m.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : m.status === 'in_progress'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {m.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#071330] border border-blue-900/60 space-y-4">
              <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Active Commissioned Projects</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Ready to build? Request a quote for a website, web app, mobile application, or corporate training.
              </p>
              <Link
                href="/client/requests"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 text-white"
              >
                Request a Service Quotation
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Invoices & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>Project Invoices</span>
            </h2>
            <Link
              href="/client/invoices"
              className="text-xs font-semibold text-cyan-400 hover:underline"
            >
              All Invoices
            </Link>
          </div>

          <div className="space-y-4">
            {myInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-5 rounded-2xl bg-[#071330] border border-blue-900/60 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{inv.invoice_number}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    inv.status === 'paid'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}>
                    {inv.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{inv.project_title}</h4>
                  <div className="text-lg font-black text-white mt-1">₦{inv.amount.toLocaleString()}</div>
                </div>

                {inv.status === 'unpaid' ? (
                  <button
                    onClick={() => {
                      if (confirm(`Settle ₦${inv.amount.toLocaleString()} invoice via Paystack gateway?`)) {
                        payInvoice(inv.id);
                      }
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Pay with Paystack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Paid • Ref: {inv.reference}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dedicated Support Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0a1e4a] to-[#040e26] border border-cyan-500/30 text-center space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-white">Need Project Assistance?</h4>
            <p className="text-xs text-slate-300">
              Direct hotline to our systems leads for emergency fixes, milestone scope adjustments, or consultations.
            </p>
            <div className="space-y-1 text-xs">
              <a href="tel:07058124966" className="block text-cyan-400 font-bold hover:underline">
                Call: 07058124966 / 08106071514
              </a>
              <div className="text-slate-400 text-[11px]">mashtechsolutions4@gmail.com</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
