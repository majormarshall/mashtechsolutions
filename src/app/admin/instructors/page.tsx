'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  UserCheck, 
  Search, 
  ExternalLink, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { InstructorApplication } from '@/types';

export default function AdminInstructorsPage() {
  const { instructorApplications, updateInstructorApplicationStatus } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InstructorApplication['status']>('all');
  const [selectedApp, setSelectedApp] = useState<InstructorApplication | null>(null);

  const filteredApps = instructorApplications.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      (app.disciplines || []).some(d => d.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: InstructorApplication['status']) => {
    updateInstructorApplicationStatus(id, status);
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty Recruitment</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Instructor & Faculty Applications</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review submissions from the "INSTRUCTORS WANTED — ALL TECHNOLOGY DISCIPLINES" campaign.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Total Applicants</div>
          <div className="text-2xl font-black text-white">{instructorApplications.length}</div>
          <div className="text-[11px] text-slate-500">Across all tech disciplines</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Under Review</div>
          <div className="text-2xl font-black text-amber-400">
            {instructorApplications.filter(a => a.status === 'under_review').length}
          </div>
          <div className="text-[11px] text-slate-500">Awaiting screening</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Interviews</div>
          <div className="text-2xl font-black text-cyan-400">
            {instructorApplications.filter(a => a.status === 'interview_scheduled').length}
          </div>
          <div className="text-[11px] text-slate-500">Live mock test / stage</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Approved Faculty</div>
          <div className="text-2xl font-black text-emerald-400">
            {instructorApplications.filter(a => a.status === 'approved').length}
          </div>
          <div className="text-[11px] text-slate-500">Active cohort educators</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, discipline..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(['all', 'under_review', 'interview_scheduled', 'approved', 'rejected'] as const).map(st => (
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

      {/* Applications Table */}
      <div className="rounded-3xl border border-slate-800 bg-[#050f26] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Candidate</th>
                <th className="py-4 px-6">Disciplines</th>
                <th className="py-4 px-6">Experience & Location</th>
                <th className="py-4 px-6">Portfolio / CV</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{app.full_name}</div>
                    <div className="text-[11px] text-slate-400">{app.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{app.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(app.disciplines || [app.specialization || 'Technology']).map(d => (
                        <span key={d} className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 text-[10px] font-semibold border border-cyan-500/20">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{app.years_experience} years exp</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{app.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {app.portfolio_url ? (
                      <a
                        href={app.portfolio_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        <span>View Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-500">Not provided</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="under_review">Under Review</option>
                      <option value="interview_scheduled">Interview</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                    >
                      Review
                    </button>
                    <a
                      href={`mailto:${app.email}?subject=MashTech%20Faculty%20Interview%20Invitation`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition-all inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Email</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Candidate Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#071330] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Candidate Dossier</span>
              <h2 className="text-2xl font-black text-white">{selectedApp.full_name}</h2>
              <p className="text-xs text-slate-400">
                Applied on {new Date(selectedApp.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Email Address</div>
                <a href={`mailto:${selectedApp.email}`} className="text-cyan-400 font-bold hover:underline">
                  {selectedApp.email}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Phone Number</div>
                <a href={`tel:${selectedApp.phone}`} className="text-cyan-400 font-bold hover:underline">
                  {selectedApp.phone}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Years of Experience</div>
                <div className="text-white font-bold">{selectedApp.years_experience} Years</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Location</div>
                <div className="text-white font-bold">{selectedApp.location}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-slate-400">Teaching Disciplines</div>
              <div className="flex flex-wrap gap-1.5">
                {(selectedApp.disciplines || [selectedApp.specialization || 'Technology']).map(d => (
                  <span key={d} className="px-3 py-1 rounded-lg bg-blue-950 text-cyan-300 font-bold text-xs border border-blue-800">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {selectedApp.notes && (
              <div className="space-y-2">
                <div className="text-xs uppercase font-bold text-slate-400">Candidate Bio & Teaching Philosophy</div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedApp.notes}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Candidate</span>
                </a>
                <a
                  href={`mailto:${selectedApp.email}?subject=MashTech%20Faculty%20Recruitment`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Send Email</span>
                </a>
              </div>

              <button
                onClick={() => handleStatusChange(selectedApp.id, 'interview_scheduled')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Invite to Interview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
