'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Plus, FileText, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function InstructorAssignmentsPage() {
  const { assignments, createAssignment, courses } = useData();
  const [showModal, setShowModal] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxScore, setMaxScore] = useState(100);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const course = courses.find(c => c.id === courseId);
    createAssignment({
      course_id: courseId,
      course_title: course?.title || 'MashTech Course',
      title,
      description,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      max_score: Number(maxScore)
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Assignment & Lab Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create practical coding tasks, quizzes, and project milestones for your cohort.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-2 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assgn) => (
          <div
            key={assgn.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                {assgn.course_title}
              </span>
              <span className="text-xs text-slate-400">Max Score: {assgn.max_score} pts</span>
            </div>

            <h3 className="text-base font-bold text-white">{assgn.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{assgn.description}</p>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Due in 7 Days</span>
              </span>
              <span className="text-emerald-400 font-semibold">Active Submission Window</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Create Course Assignment</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Assignment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build a Responsive Dashboard with Tailwind"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Instructions & Requirements *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the technical requirements, expected deliverables, and test criteria..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Maximum Score</label>
                <input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
