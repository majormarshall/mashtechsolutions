'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  Send, 
  Building2, 
  Layers, 
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function ClientRequestsPage() {
  const { serviceRequests, submitServiceRequest, services, currentUser } = useData();
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    service_id: services[0]?.id || '',
    service_title: services[0]?.title || '',
    company_name: currentUser?.full_name ? `${currentUser.full_name} Org` : '',
    project_scope: '',
    estimated_budget: '₦500,000 - ₦1,500,000',
    timeline_expectation: '2 - 4 weeks',
  });

  if (!currentUser) return null;

  const myRequests = serviceRequests.filter(
    r => r.user_id === currentUser.id || r.client_email === currentUser.email || currentUser.role === 'admin'
  );

  const handleOpenModal = (serviceId?: string) => {
    if (serviceId) {
      const match = services.find(s => s.id === serviceId);
      if (match) {
        setFormData(prev => ({
          ...prev,
          service_id: match.id,
          service_title: match.title,
        }));
      }
    }
    setShowModal(true);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitServiceRequest({
      user_id: currentUser.id,
      client_name: currentUser.full_name || 'Client User',
      client_email: currentUser.email || '',
      client_phone: '08106071514',
      company_name: formData.company_name,
      service_id: formData.service_id,
      service_title: formData.service_title,
      project_scope: formData.project_scope,
      estimated_budget: formData.estimated_budget,
      timeline_expectation: formData.timeline_expectation,
    });
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setFormData(prev => ({ ...prev, project_scope: '' }));
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Inquiries & Quotations</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Project Requests & Briefs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Submit scopes for custom software, web platforms, mobile apps, or enterprise staff training.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit New Project Brief</span>
        </button>
      </div>

      {/* Info Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-cyan-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Fast Turnaround Promise</div>
          <div className="text-base font-bold text-white">Every project brief receives an architecture proposal within 24 hours.</div>
          <div className="text-xs text-slate-400">Our engineering leads review your requirements and provide milestone breakdowns and milestone payment schedules.</div>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <a
            href="tel:07058124966"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold inline-flex items-center gap-2 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>07058124966</span>
          </a>
          <a
            href="mailto:mashtechsolutions4@gmail.com"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold inline-flex items-center gap-2 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email Studio</span>
          </a>
        </div>
      </div>

      {/* List of Requests */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Your Request History ({myRequests.length})</h2>

        {myRequests.length === 0 ? (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-12 text-center">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Project Briefs Submitted Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              Submit a brief outlining what you wish to build, and our solutions architects will assemble a delivery plan.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
            >
              Submit Your First Brief
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-[#071330]/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-bold text-white px-2.5 py-0.5 rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/20">
                      {req.service_title}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                      req.status === 'in_progress'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : req.status === 'proposal_sent'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        : req.status === 'under_review'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : req.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {req.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500">
                      Submitted on {new Date(req.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {req.project_scope}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <div>
                      <span className="text-slate-500">Budget Range: </span>
                      <span className="text-slate-200 font-semibold">{req.estimated_budget}</span>
                    </div>
                    <span>•</span>
                    <div>
                      <span className="text-slate-500">Timeline: </span>
                      <span className="text-slate-200 font-semibold">{req.timeline_expectation}</span>
                    </div>
                    {req.company_name && (
                      <>
                        <span>•</span>
                        <div>
                          <span className="text-slate-500">Org: </span>
                          <span className="text-slate-200 font-semibold">{req.company_name}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <a
                    href="mailto:mashtechsolutions4@gmail.com"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                  >
                    Discuss Scope
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for New Brief */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-white">Brief Submitted!</h3>
                <p className="text-sm text-slate-300">
                  Our solutions architect has received your project parameters and will reach out to schedule an alignment review.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MashTech Digital Studio</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Submit Project Brief</h3>
                  <p className="text-xs text-slate-400">
                    Tell us what you want to build and your expectations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Service Track</label>
                    <select
                      value={formData.service_id}
                      onChange={(e) => {
                        const s = services.find(srv => srv.id === e.target.value);
                        setFormData(prev => ({
                          ...prev,
                          service_id: e.target.value,
                          service_title: s?.title || ''
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company / Organization (Optional)</label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      placeholder="e.g. Apex Holdings Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Estimated Budget</label>
                      <select
                        value={formData.estimated_budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimated_budget: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="₦250,000 - ₦500,000">₦250k - ₦500k</option>
                        <option value="₦500,000 - ₦1,500,000">₦500k - ₦1.5M</option>
                        <option value="₦1,500,000 - ₦3,500,000">₦1.5M - ₦3.5M</option>
                        <option value="₦3,500,000+">₦3.5M+ (Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Expected Timeline</label>
                      <select
                        value={formData.timeline_expectation}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeline_expectation: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="1 - 2 weeks">1 - 2 weeks (Sprint)</option>
                        <option value="2 - 4 weeks">2 - 4 weeks</option>
                        <option value="1 - 2 months">1 - 2 months</option>
                        <option value="3+ months">3+ months (Long Term)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Scope & Key Features</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.project_scope}
                      onChange={(e) => setFormData(prev => ({ ...prev, project_scope: e.target.value }))}
                      placeholder="Describe the software solution, target audience, core features, and integrations..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Brief for Architecture Review</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
