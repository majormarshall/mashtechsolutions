'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { ServiceOffering } from '@/types';
import { 
  Code2, 
  Palette, 
  Cloud, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  Send,
  Zap,
  PhoneCall
} from 'lucide-react';

export default function ServicesPage() {
  const { services, submitServiceRequest, currentUser } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quoteService, setQuoteService] = useState<ServiceOffering | null>(null);

  // Quote Form State
  const [clientName, setClientName] = useState(currentUser?.full_name || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [companyName, setCompanyName] = useState('');
  const [budgetRange, setBudgetRange] = useState('₦300,000 - ₦600,000');
  const [timeline, setTimeline] = useState('2–4 Weeks');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', 'Software Development', 'Design & Media', 'Cloud & Systems', 'Corporate Training'];

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const handleOpenQuote = (service: ServiceOffering) => {
    setQuoteService(service);
    if (currentUser) {
      setClientName(currentUser.full_name);
      setClientEmail(currentUser.email);
      setClientPhone(currentUser.phone || '');
    }
    setSubmitted(false);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !projectBrief.trim()) return;

    submitServiceRequest({
      client_id: currentUser?.id,
      client_name: clientName.trim(),
      client_email: clientEmail.trim(),
      client_phone: clientPhone.trim() || '07058124966',
      company_name: companyName.trim() || undefined,
      service_id: quoteService?.id,
      service_title: quoteService?.title || 'Custom Technology Consulting',
      budget_range: budgetRange,
      timeline,
      project_brief: projectBrief.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setQuoteService(null);
      setProjectBrief('');
      setCompanyName('');
    }, 2500);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MashTech Digital Services Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            We Build Solutions That <span className="text-cyan-400">Scale Your Business</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From modern responsive websites and custom web applications to enterprise UI/UX design, cloud infrastructure, and tailored corporate training.
          </p>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Full-Stack Engineering</h3>
            <p className="text-xs text-slate-400">Next.js, React, Node, and PostgreSQL production applications.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Intuitive UI/UX Design</h3>
            <p className="text-xs text-slate-400">Human-centered Figma design systems and clickable prototypes.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Cloud & DevOps</h3>
            <p className="text-xs text-slate-400">Supabase, Vercel, AWS infrastructure and automated CI/CD.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Corporate Upskilling</h3>
            <p className="text-xs text-slate-400">Custom technology curricula for companies, NGOs, and teams.</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-[#071330] border border-blue-900/60 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-7 bg-[#071330] border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${
                service.popular 
                  ? 'border-cyan-500/60 shadow-2xl shadow-cyan-950/40 relative' 
                  : 'border-blue-900/60 hover:border-blue-700 shadow-xl'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
                  Most Requested
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {service.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.delivery_time}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {service.short_desc}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-blue-950">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Included Scope:
                  </span>
                  {service.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-blue-950/80 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting From</span>
                    <span className="text-2xl font-black text-white">
                      ₦{service.starting_price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Milestone Based
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-center bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    View Scope
                  </Link>
                  <button
                    onClick={() => handleOpenQuote(service)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white transition-all shadow-md shadow-cyan-500/20"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instant Consultation Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950 via-[#0a1e4a] to-[#040e26] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Have a Custom or Multi-Stage Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our Lead Systems Architect and project delivery leads to discuss architecture, timeline, and custom milestones.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:07058124966"
              className="px-6 py-3.5 rounded-xl font-bold text-xs bg-slate-900 border border-slate-700 text-white hover:border-cyan-400 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Call 07058124966</span>
            </a>
            <button
              onClick={() => handleOpenQuote(services[0])}
              className="px-6 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all"
            >
              Submit Project Brief
            </button>
          </div>
        </div>

      </div>

      {/* REQUEST A QUOTE MODAL */}
      {quoteService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/50 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Request a Service Quotation</span>
                </h3>
                <p className="text-xs text-cyan-400 font-semibold">{quoteService.title}</p>
              </div>
              <button 
                onClick={() => setQuoteService(null)} 
                className="text-slate-400 hover:text-white text-base p-1"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white">Quotation Request Received!</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{clientName}</strong>. Our technical solutions team will review your project brief and follow up with a proposal or discovery consultation within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Boma Lawson"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 08023456789"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Budget Range</label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="₦100,000 - ₦300,000">₦100,000 - ₦300,000</option>
                      <option value="₦300,000 - ₦600,000">₦300,000 - ₦600,000</option>
                      <option value="₦600,000 - ₦1,200,000">₦600,000 - ₦1,200,000</option>
                      <option value="₦1,200,000+ (Enterprise)">₦1,200,000+ (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="1–2 Weeks (Urgent)">1–2 Weeks (Urgent)</option>
                      <option value="2–4 Weeks">2–4 Weeks</option>
                      <option value="1–2 Months">1–2 Months</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Brief & Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you want to build, existing systems or references, and target outcomes..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setQuoteService(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
