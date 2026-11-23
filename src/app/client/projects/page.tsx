'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  CircleDashed,
  AlertCircle,
  ExternalLink, 
  PlusCircle, 
  Layers, 
  Calendar, 
  UserCheck, 
  FileText,
  DollarSign
} from 'lucide-react';

export default function ClientProjectsPage() {
  const { clientProjects, currentUser } = useData();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'in_review'>('all');

  if (!currentUser) return null;

  const myProjects = clientProjects.filter(
    p => p.client_id === currentUser.id || p.client_email === currentUser.email || currentUser.role === 'admin'
  );

  const filteredProjects = myProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'active') return p.status === 'in_progress';
    if (filter === 'completed') return p.status === 'completed';
    if (filter === 'in_review') return p.status === 'review';
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Digital Studio Deliveries</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Commissioned Projects</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track milestones, engineering sprints, sprint reviews, and live production deployments.
          </p>
        </div>
        <Link
          href="/client/requests"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Commission New Service</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['all', 'active', 'in_review', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab === 'in_review' ? 'In Review' : tab} ({
              tab === 'all' 
                ? myProjects.length 
                : myProjects.filter(p => tab === 'active' ? p.status === 'in_progress' : tab === 'in_review' ? p.status === 'review' : p.status === 'completed').length
            })
          </button>
        ))}
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-12 text-center">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            You don't have any projects in this view. Ready to build a high-performance web platform, app, or enterprise system?
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
          >
            Explore MashTech Services
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map(project => {
            const completedCount = project.milestones.filter(m => m.status === 'completed').length;
            const progress = project.milestones.length > 0
              ? Math.round((completedCount / project.milestones.length) * 100)
              : 0;

            return (
              <div
                key={project.id}
                className="rounded-3xl border border-slate-800 bg-[#071330]/80 p-6 sm:p-8 backdrop-blur-sm space-y-6 shadow-xl hover:border-cyan-500/30 transition-all"
              >
                {/* Project Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {project.project_code}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        project.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : project.status === 'in_progress'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white pt-1">
                      {project.title}
                    </h2>
                    <p className="text-sm text-slate-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 self-start lg:self-center">
                    <div className="text-right">
                      <div className="text-slate-500">Contract Value</div>
                      <div className="text-base font-bold text-white">
                        ₦{project.budget.toLocaleString()}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div className="text-right">
                      <div className="text-slate-500">Target Delivery</div>
                      <div className="text-base font-bold text-cyan-400">
                        {new Date(project.deadline || project.delivery_date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team & Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-slate-500 font-medium">MashTech Lead Engineer</div>
                      <div className="font-bold text-slate-200">{project.assigned_lead}</div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-slate-500 font-medium">Project Kickoff</div>
                      <div className="font-bold text-slate-200">
                        {new Date(project.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-slate-500 font-medium">Overall Progress</div>
                      <div className="font-bold text-cyan-400">{progress}% Completed</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Milestones Breakdown */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Project Sprint Milestones ({completedCount}/{project.milestones.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.milestones.map((milestone, idx) => {
                      const isComplete = milestone.status === 'completed';
                      const isInProgress = milestone.status === 'in_progress';

                      return (
                        <div
                          key={milestone.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isComplete
                              ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                              : isInProgress
                              ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-100 shadow-md shadow-cyan-950/30'
                              : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5">
                                {isComplete ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : isInProgress ? (
                                  <CircleDashed className="w-5 h-5 text-cyan-400 animate-spin" />
                                ) : (
                                  <Clock className="w-5 h-5 text-slate-600" />
                                )}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-white">
                                  {idx + 1}. {milestone.title}
                                </h4>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isComplete
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : isInProgress
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {milestone.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/40">
                            <span>Due: {new Date(milestone.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                            {milestone.deliverable_url && (
                              <a
                                href={milestone.deliverable_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                              >
                                <span>Artifact</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer action / Support link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">
                    Need technical changes or sprint review adjustments?
                  </span>
                  <Link
                    href="/client/support"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Contact Assigned Lead</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
