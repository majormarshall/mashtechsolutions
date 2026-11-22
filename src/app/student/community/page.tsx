'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { MessageSquare, Send, Users, Sparkles } from 'lucide-react';

export default function StudentCommunityPage() {
  const { discussions, addDiscussionMessage, courses, currentUser } = useData();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course_web_dev');
  const [msgInput, setMsgInput] = useState('');

  const filteredDiscussions = discussions.filter(d => d.course_id === selectedCourseId);
  const activeCourse = courses.find(c => c.id === selectedCourseId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    addDiscussionMessage(selectedCourseId, msgInput);
    setMsgInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Student Community & Discussions</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Collaborate with peers, ask questions, share project ideas, and get instant answers from instructors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Channels / Course Rooms */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-blue-950">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Discussion Rooms</span>
          </div>
          <div className="space-y-1.5">
            {courses.slice(0, 5).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCourseId(c.id)}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedCourseId === c.id
                    ? 'bg-gradient-to-r from-blue-900/90 to-cyan-900/60 text-cyan-300 border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <div className="font-bold text-white line-clamp-1">{c.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{c.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Message Stream */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl flex flex-col h-[550px] justify-between">
          
          <div className="pb-3 border-b border-blue-950 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">{activeCourse?.title}</h3>
              <p className="text-[11px] text-cyan-400">Live Community Forum • Supabase Realtime</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              Active Channel
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {filteredDiscussions.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                No messages posted yet in this channel. Be the first to start the discussion!
              </div>
            ) : (
              filteredDiscussions.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-slate-950 shrink-0 text-[10px]">
                    {msg.user_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <strong className="text-white">{msg.user_name}</strong>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950 text-cyan-300 uppercase font-bold">
                          {msg.user_role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSend} className="pt-3 border-t border-blue-950 flex gap-2">
            <input
              type="text"
              placeholder="Type your message to instructors and students..."
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
