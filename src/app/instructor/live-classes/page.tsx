'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Video, Calendar, Plus, ExternalLink, CheckCircle } from 'lucide-react';

export default function InstructorLiveClassesPage() {
  const { liveClasses, scheduleLiveClass, courses, currentUser } = useData();
  const [showModal, setShowModal] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom' | 'LiveKit'>('Google Meet');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !meetingUrl.trim()) return;

    const course = courses.find(c => c.id === courseId);
    scheduleLiveClass({
      course_id: courseId,
      course_title: course?.title || 'MashTech Course',
      instructor_id: currentUser?.id || 'usr_inst',
      instructor_name: currentUser?.full_name || 'MashTech Faculty',
      title,
      description,
      start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      meeting_url: meetingUrl,
      platform,
      status: 'scheduled'
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
    setMeetingUrl('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Live Class Scheduler</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Broadcast Google Meet or Zoom lecture links to enrolled students.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 transition-all flex items-center gap-2 self-start shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Live Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {liveClasses.map((lc) => (
          <div
            key={lc.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                {lc.platform}
              </span>
              <span className="text-xs text-slate-400">{lc.course_title}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{lc.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{lc.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Scheduled for Tomorrow 6:00 PM WAT</span>
              </span>
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>

            <a
              href={lc.meeting_url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Video className="w-4 h-4" />
              <span>Launch Classroom Meeting</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Schedule Live Virtual Class</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Class Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Live Code Review: Next.js + Supabase"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meeting Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                  <option value="LiveKit">LiveKit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meeting URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Class Agenda / Description</label>
                <textarea
                  rows={3}
                  placeholder="Topics to cover during the lecture..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
