'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall,
  FileCheck,
  Layers,
  Code2
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { services, submitServiceRequest, currentUser } = useData();

  const service = services.find(s => s.slug === slug) || services[0];

  // Request Form
  const [clientName, setClientName] = useState(currentUser?.full_name || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [companyName, setCompanyName] = useState('');
  const [budgetRange, setBudgetRange] = useState('₦300,000 - ₦600,000');
  const [timeline, setTimeline] = useState('2–4 Weeks');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !projectBrief.trim()) return;

    submitServiceRequest({
      client_id: currentUser?.id,
      client_name: clientName.trim(),
      client_email: clientEmail.trim(),
      client_phone: clientPhone.trim() || '07058124966',
      company_name: companyName.trim() || undefined,
      service_id: service.id,
      service_title: service.title,
      budget_range: budgetRange,
      timeline,
      project_brief: projectBrief.trim()
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Digital Services</span>
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#071330] border border-blue-900/60 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Est. Delivery: <strong className="text-white">{service.delivery_time}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Guaranteed Milestones & Approvals</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#09183d] border border-cyan-500/30 text-center shrink-0 w-full lg:w-72 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Indicative Starting Investment
            </span>
            <div className="text-3xl font-black text-cyan-400">
              ₦{service.starting_price.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              Custom proposal prepared based on your exact project scope.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Scope & Deliverables */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Scope features */}
            <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>What is Included in This Service</span>
              </h3>
              <p className="text-xs text-slate-400">
                Every project is managed through our structured milestone delivery model, ensuring transparent updates and client approval at every stage.
              </p>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                <span>Client Handover Deliverables</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">Deliverable {idx + 1}</span>
                    <p className="font-semibold text-white">{deliv}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>How We Deliver (The 4-Step Journey)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold inline-flex items-center justify-center border border-cyan-500/40">1</span>
                  <h4 className="text-xs font-bold text-white">Discovery</h4>
                  <p className="text-[11px] text-slate-400">Brief review & consultation</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold inline-flex items-center justify-center border border-cyan-500/40">2</span>
                  <h4 className="text-xs font-bold text-white">Proposal</h4>
                  <p className="text-[11px] text-slate-400">Scope, quote & timeline</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold inline-flex items-center justify-center border border-cyan-500/40">3</span>
                  <h4 className="text-xs font-bold text-white">Milestones</h4>
                  <p className="text-[11px] text-slate-400">Build with live progress</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold inline-flex items-center justify-center border border-cyan-500/40">4</span>
                  <h4 className="text-xs font-bold text-white">Handover</h4>
                  <p className="text-[11px] text-slate-400">Launch & ongoing support</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quote Submission Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-3xl bg-[#071330] border border-cyan-500/50 shadow-2xl space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white">Request a Written Proposal</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your project goals and we will send you a tailored quotation and technical plan.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Proposal Request Received</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you! Our technical leads have received your brief for <strong>{service.title}</strong> and will follow up with you directly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Boma Lawson"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. client@company.ng"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g. 08023456789"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company (Optional)</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Ltd"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Budget Expectation</label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="₦150,000 - ₦300,000">₦150,000 - ₦300,000</option>
                        <option value="₦300,000 - ₦600,000">₦300,000 - ₦600,000</option>
                        <option value="₦600,000 - ₦1,500,000">₦600,000 - ₦1.5M</option>
                        <option value="₦1,500,000+ (Enterprise)">₦1.5M+ (Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Target Timeline</label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="1–2 Weeks (Fast-track)">1–2 Weeks</option>
                        <option value="2–4 Weeks">2–4 Weeks</option>
                        <option value="1–2 Months">1–2 Months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Brief & Details *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your target features, references, existing assets, or special requirements..."
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Request</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-slate-400">
                    Need instant clarification? Call admissions & client support at <strong className="text-cyan-400">07058124966</strong>.
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
