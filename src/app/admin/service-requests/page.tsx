'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  FolderKanban, 
  Phone, 
  Mail, 
  Building2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ServiceRequest } from '@/types';

export default function AdminServiceRequestsPage() {
  const { serviceRequests, updateServiceRequestStatus, createClientProject } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ServiceRequest['status']>('all');
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [convertModalOpen, setConvertModalOpen] = useState(false);

  // Conversion form state
  const [projectBudget, setProjectBudget] = useState(1500000);
  const [projectLead, setProjectLead] = useState('MashTech Engineering Team');
  const [deadline, setDeadline] = useState('2026-12-31');

  const filteredRequests = serviceRequests.filter(req => {
    const matchesSearch = 
      req.client_name.toLowerCase().includes(search.toLowerCase()) ||
      req.client_email.toLowerCase().includes(search.toLowerCase()) ||
      req.service_title.toLowerCase().includes(search.toLowerCase()) ||
      (req.company_name && req.company_name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: ServiceRequest['status']) => {
    updateServiceRequestStatus(id, newStatus);
    if (selectedReq && selectedReq.id === id) {
      setSelectedReq(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleConvertProject = (req: ServiceRequest) => {
    createClientProject({
      title: `${req.service_title} for ${req.company_name || req.client_name}`,
      client_id: req.user_id || req.client_id || 'usr_client',
      client_name: req.client_name,
      client_email: req.client_email,
      description: req.project_scope,
      service_id: req.service_id,
      service_title: req.service_title,
      status: 'in_progress',
      budget: projectBudget,
      start_date: new Date().toISOString(),
      deadline: deadline,
      assigned_lead: projectLead,
      milestones: [
        {
          id: `m_${Date.now()}_1`,
          title: 'Architecture Blueprint & Wireframes',
          description: 'Comprehensive system architecture, database schema, and Figma high-fidelity wireframes.',
          due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
          status: 'in_progress',
        },
        {
          id: `m_${Date.now()}_2`,
          title: 'Core Engine & Frontend Development',
          description: 'Next.js responsive web application, interactive client modules, and API integrations.',
          due_date: new Date(Date.now() + 21 * 86400000).toISOString(),
          status: 'pending',
        },
        {
          id: `m_${Date.now()}_3`,
          title: 'QA, Cloud Deployment & Handover',
          description: 'Security audit, performance testing, production domain DNS configuration, and documentation.',
          due_date: deadline,
          status: 'pending',
        }
      ]
    });

    updateServiceRequestStatus(req.id, 'in_progress');
    setConvertModalOpen(false);
    setSelectedReq(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Digital Studio Sales & Pipeline</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Client Service Requests</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review incoming project briefs, send architecture proposals, and convert into active client projects.
          </p>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Total Inquiries</div>
          <div className="text-2xl font-black text-white">{serviceRequests.length}</div>
          <div className="text-[11px] text-slate-500">All submitted scopes</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Under Review</div>
          <div className="text-2xl font-black text-amber-400">
            {serviceRequests.filter(r => r.status === 'under_review' || r.status === 'new').length}
          </div>
          <div className="text-[11px] text-slate-500">Requires architect review</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Proposals Sent</div>
          <div className="text-2xl font-black text-purple-400">
            {serviceRequests.filter(r => r.status === 'proposal_sent').length}
          </div>
          <div className="text-[11px] text-slate-500">Awaiting client signoff</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Active Projects</div>
          <div className="text-2xl font-black text-cyan-400">
            {serviceRequests.filter(r => r.status === 'in_progress').length}
          </div>
          <div className="text-[11px] text-slate-500">In sprint engineering</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client, email, track..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(['all', 'new', 'under_review', 'proposal_sent', 'in_progress', 'completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-3xl border border-slate-800 bg-[#050f26] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Client / Company</th>
                <th className="py-4 px-6">Service Track</th>
                <th className="py-4 px-6">Budget & Timeline</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{req.client_name}</div>
                    <div className="text-[11px] text-slate-400">{req.client_email}</div>
                    {req.company_name && (
                      <div className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-semibold mt-0.5">
                        <Building2 className="w-3 h-3" />
                        <span>{req.company_name}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-200">{req.service_title}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">{req.project_scope}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{req.estimated_budget}</div>
                    <div className="text-[11px] text-slate-400">{req.timeline_expectation}</div>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="new">New</option>
                      <option value="under_review">Under Review</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {new Date(req.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReq(req)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                    >
                      View Scope
                    </button>
                    {req.status !== 'in_progress' && (
                      <button
                        onClick={() => {
                          setSelectedReq(req);
                          setConvertModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-xs border border-cyan-500/40 transition-all inline-flex items-center gap-1"
                      >
                        <FolderKanban className="w-3 h-3" />
                        <span>Launch Project</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scope Details Modal */}
      {selectedReq && !convertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#071330] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReq(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Project Specification</span>
              <h2 className="text-2xl font-black text-white">{selectedReq.service_title}</h2>
              <p className="text-xs text-slate-400">
                Submitted by {selectedReq.client_name} ({selectedReq.company_name || 'Individual Client'})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Contact Email</div>
                <a href={`mailto:${selectedReq.client_email}`} className="text-cyan-400 font-bold hover:underline">
                  {selectedReq.client_email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Contact Phone</div>
                <a href={`tel:${selectedReq.client_phone}`} className="text-cyan-400 font-bold hover:underline">
                  {selectedReq.client_phone}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Budget Indication</div>
                <div className="text-white font-bold">{selectedReq.estimated_budget}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Target Timeline</div>
                <div className="text-white font-bold">{selectedReq.timeline_expectation}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-slate-400">Client Description & Scope</div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                {selectedReq.project_scope}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedReq.client_email}?subject=MashTech%20Solutions%20-%20Project%20Proposal%20for%20${encodeURIComponent(selectedReq.service_title)}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Send Proposal Email</span>
                </a>
              </div>

              <button
                onClick={() => setConvertModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Initialize Client Project</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert into Project Modal */}
      {selectedReq && convertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setConvertModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Client Onboarding</span>
              <h2 className="text-2xl font-black text-white">Initialize Project Delivery</h2>
              <p className="text-xs text-slate-400">
                This provisions a client project workspace and generates milestone tracks.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contract Value (NGN)</label>
                <input
                  type="number"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assigned Lead Engineer</label>
                <input
                  type="text"
                  value={projectLead}
                  onChange={(e) => setProjectLead(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Delivery Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Automated Setup Included:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  3 standard agile milestones will be seeded into the client portal. You can adjust milestone deadlines and deliverable URLs anytime in the Client Projects portal.
                </p>
              </div>

              <button
                onClick={() => handleConvertProject(selectedReq)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Launch Project Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
