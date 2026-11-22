'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Bell, Send, CheckCircle, Radio } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const { notifications } = useData();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setTitle('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Broadcast Platform Announcements</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Send real-time alerts to all students and instructors across all active courses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Compose Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider pb-2 border-b border-blue-950">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Compose Announcement</span>
          </div>

          {sentSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Broadcast dispatched to all registered active users!</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Announcement Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Scheduled Maintenance or New Masterclass Announcement"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Audience Target</label>
              <select className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400">
                <option value="all">All Students and Faculty</option>
                <option value="students">Students Only</option>
                <option value="instructors">Instructors Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Announcement Content *</label>
              <textarea
                rows={4}
                required
                placeholder="Detailed message text for the notification..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Announcement</span>
            </button>
          </form>
        </div>

        {/* Right: Notification Stream History */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-950">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Broadcast History</h3>
            <span className="text-xs text-cyan-400">Recent Notifications</span>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
