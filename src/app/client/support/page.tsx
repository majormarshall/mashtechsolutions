'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  LifeBuoy, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function ClientSupportPage() {
  const { currentUser, clientProjects } = useData();
  const [ticketSubject, setTicketSubject] = useState('');
  const [projectId, setProjectId] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const myProjects = clientProjects.filter(
    p => p.client_id === currentUser.id || p.client_email === currentUser.email || currentUser.role === 'admin'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setDetails('');
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Dedicated Studio Concierge</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Client Support & Revisions</h1>
          <p className="text-sm text-slate-400 mt-1">
            Submit scope change requests, report deployment anomalies, or schedule an engineering consultation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Support Request Form */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-[#071330]/80 p-6 sm:p-8 backdrop-blur-sm space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Submit Engineering Ticket</span>
            </h2>
            <p className="text-xs text-slate-400">
              Your ticket is automatically routed to your assigned MashTech project lead.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-white">Ticket Dispatched</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Ticket reference <span className="font-mono text-cyan-400">#TK-{Math.floor(1000 + Math.random() * 9000)}</span> has been filed. Our lead architect will respond within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Associated Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">General Studio Inquiry (No specific project)</option>
                  {myProjects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.project_code} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject / Feature Focus</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Authentication bug or Design feedback"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="low">Low (General suggestion)</option>
                    <option value="medium">Medium (Standard revision)</option>
                    <option value="high">High (Urgent milestone adjustment)</option>
                    <option value="critical">Critical (Production outage / Blocker)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Explanation & Reproduction Steps</label>
                <textarea
                  required
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide precise details, URLs, affected components, or requested alterations..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Priority Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Hotline & SLA Cards */}
        <div className="space-y-6">
          {/* Direct Hotlines */}
          <div className="rounded-3xl border border-slate-800 bg-[#071330]/80 p-6 backdrop-blur-sm space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Direct Phone Support</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For live consultations or urgent escalation, call our technology leads directly:
            </p>
            <div className="space-y-2">
              <a
                href="tel:07058124966"
                className="block p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-[11px] text-slate-500">Primary Support Line</div>
                <div className="text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
                  07058124966
                </div>
              </a>
              <a
                href="tel:08106071514"
                className="block p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all group"
              >
                <div className="text-[11px] text-slate-500">Executive Technical Direct Line</div>
                <div className="text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
                  08106071514
                </div>
              </a>
            </div>
          </div>

          {/* Email Support */}
          <div className="rounded-3xl border border-slate-800 bg-[#071330]/80 p-6 backdrop-blur-sm space-y-3 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Official Studio Mail</span>
            </h3>
            <p className="text-xs text-slate-400">
              Send documents, PRDs, architectural diagrams, or legal NDAs directly to:
            </p>
            <a
              href="mailto:mashtechsolutions4@gmail.com"
              className="text-xs font-mono font-bold text-cyan-400 hover:underline block break-all"
            >
              mashtechsolutions4@gmail.com
            </a>
          </div>

          {/* SLA Card */}
          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-slate-900/60 p-6 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Service Level Agreement (SLA)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Critical bugs: &lt; 2 hour initial response</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Feature revisions: &lt; 24 hour turnaround</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Weekly sprint demos every Friday</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
