'use client';

import React from 'react';
import { useData } from '@/lib/context/data-context';
import { Video, Calendar, Clock, ExternalLink, Play, CheckCircle } from 'lucide-react';

export default function StudentLiveClassesPage() {
  const { liveClasses } = useData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Live Virtual Classroom</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Attend live interactive lectures hosted on Google Meet and Zoom with MashTech instructors.
        </p>
      </div>

      {/* Scheduled Live Classes */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          Scheduled Live Workshops
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveClasses.map((lc) => (
            <div
              key={lc.id}
              className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 hover:border-cyan-500/40 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {lc.platform}
                </span>
                <span className="text-xs text-slate-400">{lc.course_title}</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">{lc.title}</h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {lc.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-900 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Tomorrow at 6:00 PM WAT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>90 Mins</span>
                </div>
              </div>

              <a
                href={lc.meeting_url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Classroom Meeting</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Recorded Lectures Section */}
      <div className="space-y-4 pt-4 border-t border-blue-950">
        <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Play className="w-4 h-4 text-cyan-400" />
          Past Lecture Video Archives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Database Schema Design & Normalization for SaaS',
              date: 'Recorded 3 days ago',
              duration: '1h 24m',
              course: 'Web Development'
            },
            {
              title: 'Packet Analysis & Threat Detection with Wireshark',
              date: 'Recorded 5 days ago',
              duration: '1h 45m',
              course: 'Cyber Security'
            },
            {
              title: 'Building Design Tokens & Variants in Figma',
              date: 'Recorded 1 week ago',
              duration: '1h 10m',
              course: 'UI/UX Design'
            }
          ].map((rec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 space-y-3">
              <span className="text-[10px] font-bold uppercase text-cyan-400">{rec.course}</span>
              <h4 className="text-sm font-bold text-white">{rec.title}</h4>
              <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-blue-950">
                <span>{rec.date}</span>
                <span>{rec.duration}</span>
              </div>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-center block transition-colors"
              >
                Watch Recording
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
