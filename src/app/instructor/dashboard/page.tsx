'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { BookOpen, Users, Video, FileCheck, ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';

export default function InstructorDashboardPage() {
  const { courses, enrollments, liveClasses, assignments, submissions, currentUser } = useData();

  if (!currentUser) {
    return null;
  }

  const assignedCourses = courses.filter(c => c.instructor_id === currentUser.id || currentUser.role === 'admin');
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-[#091b42] to-[#040e26] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instructor Control Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {currentUser.full_name}! 👨‍🏫
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Manage your courses, schedule Google Meet live workshops, review student lab submissions, and publish grades.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            href="/instructor/live-classes"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md hover:brightness-110 transition-all flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Schedule Class</span>
          </Link>
          <Link
            href="/instructor/grading"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Pending Submissions ({pendingSubmissions.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Courses Teaching</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{assignedCourses.length}</div>
          <p className="text-[11px] text-cyan-400 font-medium">Published tracks</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Enrolled Students</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">450+</div>
          <p className="text-[11px] text-emerald-400 font-medium">Active learners</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Grading</span>
            <FileCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{pendingSubmissions.length}</div>
          <p className="text-[11px] text-amber-400 font-medium">Requires review</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Live Sessions</span>
            <Video className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{liveClasses.length}</div>
          <p className="text-[11px] text-blue-400 font-medium">Scheduled & past</p>
        </div>
      </div>

      {/* Assigned Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Assigned Courses
          </h3>
          <Link href="/instructor/courses" className="text-xs text-cyan-400 hover:underline">
            Manage All ({assignedCourses.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedCourses.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-cyan-400">{c.category}</span>
                <h4 className="text-base font-bold text-white line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{c.description}</p>
                <div className="text-xs text-slate-400 pt-1">
                  Tuition: <strong className="text-white">₦{c.price.toLocaleString()}</strong> • Level: {c.level}
                </div>
              </div>

              <div className="pt-3 border-t border-blue-950 flex gap-2">
                <Link
                  href={`/courses/${c.slug}`}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white text-center transition-colors"
                >
                  Public View
                </Link>
                <Link
                  href="/instructor/courses"
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white text-center transition-colors"
                >
                  Edit Curriculum
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Grading Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-cyan-400" />
          Submissions Awaiting Your Review
        </h3>

        {pendingSubmissions.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#061433] border border-blue-900/40 text-xs text-slate-400 text-center">
            All submitted student assignments have been graded! Great job! 🎉
          </div>
        ) : (
          <div className="space-y-3">
            {pendingSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 rounded-xl bg-[#061433] border border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-white">{sub.assignment_title}</h4>
                  <p className="text-slate-400">Student: {sub.student_name} • {sub.course_title}</p>
                </div>
                <Link
                  href="/instructor/grading"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                >
                  Review & Grade
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
