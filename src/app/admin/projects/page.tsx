'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  CircleDashed,
  ExternalLink, 
  PlusCircle, 
  Calendar, 
  UserCheck, 
  FileText,
  DollarSign,
  Building2,
  Edit2
} from 'lucide-react';
import { ClientProject } from '@/types';

export default function AdminProjectsPage() {
  const { clientProjects, updateProjectMilestone } = useData();
  const [filter, setFilter] = useState<'all' | ClientProject['status']>('all');
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);

  const filteredProjects = clientProjects.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const handleMilestoneStatus = (projectId: string, milestoneId: string, status: 'pending' | 'in_progress' | 'completed') => {
    updateProjectMilestone(projectId, milestoneId, { status });
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => {
        if (!prev) return null;
        return {
          ...prev,
          milestones: prev.milestones.map(m => m.id === milestoneId ? { ...m, status } : m)
        };
      });
    }
  };

  const handleMilestoneUrl = (projectId: string, milestoneId: string, deliverable_url: string) => {
    updateProjectMilestone(projectId, milestoneId, { deliverable_url });
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(prev => {
        if (!prev) return null;
        return {
          ...prev,
          milestones: prev.milestones.map(m => m.id === milestoneId ? { ...m, deliverable_url } : m)
        };
      });
    }
  };

  const totalContractVolume = clientProjects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Digital Studio Delivery Hub</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Client Engineering Projects</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage agile delivery sprints, track deliverables, update milestones, and push production handovers.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Total Portfolio Value</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ₦{totalContractVolume.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">Across {clientProjects.length} contracted projects</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Active Sprints</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            {clientProjects.filter(p => p.status === 'in_progress').length}
          </div>
          <div className="text-[11px] text-slate-500">Currently in active engineering</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Completed & Handed Over</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            {clientProjects.filter(p => p.status === 'completed').length}
          </div>
          <div className="text-[11px] text-slate-500">100% delivered to production</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['all', 'in_progress', 'review', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {tab.replace('_', ' ')} ({
              tab === 'all' 
                ? clientProjects.length 
                : clientProjects.filter(p => p.status === tab).length
            })
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {filteredProjects.map(project => {
          const completedCount = project.milestones.filter(m => m.status === 'completed').length;
          const progress = project.milestones.length > 0
            ? Math.round((completedCount / project.milestones.length) * 100)
            : 0;

          return (
            <div
              key={project.id}
              className="rounded-3xl border border-slate-800 bg-[#050f26] p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-700">
                      {project.project_code}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : project.status === 'in_progress'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      Client: <span className="text-white font-semibold">{project.client_name}</span> ({project.client_email})
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white pt-1">
                    {project.title}
                  </h2>
                  <p className="text-xs text-slate-300">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                  <div className="text-right">
                    <div className="text-slate-500">Contract Value</div>
                    <div className="text-base font-bold text-emerald-400">₦{project.budget.toLocaleString()}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-right">
                    <div className="text-slate-500">Lead Engineer</div>
                    <div className="text-xs font-bold text-white">{project.assigned_lead}</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Sprint Completion ({completedCount}/{project.milestones.length} milestones)</span>
                  <span className="font-bold text-cyan-400">{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones Control */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase font-bold text-slate-400">
                  Delivery Milestones & Status Management
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {project.milestones.map((m, idx) => (
                    <div
                      key={m.id}
                      className={`p-4 rounded-2xl border text-xs space-y-3 ${
                        m.status === 'completed'
                          ? 'bg-emerald-950/20 border-emerald-500/20'
                          : m.status === 'in_progress'
                          ? 'bg-cyan-950/20 border-cyan-500/30'
                          : 'bg-slate-900/40 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-white">
                          {idx + 1}. {m.title}
                        </div>
                        <select
                          value={m.status}
                          onChange={(e) => handleMilestoneStatus(project.id, m.id, e.target.value as any)}
                          className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
                        <div className="text-[10px] text-slate-500">
                          Due: {new Date(m.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Deliverable URL (e.g. Figma / GitHub)..."
                            defaultValue={m.deliverable_url || ''}
                            onBlur={(e) => handleMilestoneUrl(project.id, m.id, e.target.value)}
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                          />
                          {m.deliverable_url && (
                            <a
                              href={m.deliverable_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
