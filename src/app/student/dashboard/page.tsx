'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Clock, 
  Video, 
  FileText, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { enrollments, liveClasses, assignments, submissions, certificates, currentUser } = useData();

  if (!currentUser) {
    return null;
  }

  const userEnrollments = enrollments.filter(e => e.student_id === currentUser.id);
  const userSubmissions = submissions.filter(s => s.student_id === currentUser.id);
  const userCertificates = certificates.filter(c => c.student_id === currentUser.id);

  const nextLiveClass = liveClasses[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-[#0a1e4a] to-[#040e26] border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MashTech Virtual Student Campus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {currentUser.full_name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            You are making steady progress in your tech journey. Continue your lectures or prepare for your upcoming live Google Meet class.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/student/my-courses"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span>Continue Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview (Matching Module 8 Example) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{userEnrollments.length}</div>
          <p className="text-[11px] text-cyan-400 font-medium">Active tracks</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lessons Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">12</div>
          <p className="text-[11px] text-emerald-400 font-medium">85% attendance rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Certificates Earned</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{userCertificates.length}</div>
          <p className="text-[11px] text-amber-400 font-medium">Verifiable credential</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Live Class Hours</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">24h</div>
          <p className="text-[11px] text-blue-400 font-medium">Recorded & live</p>
        </div>
      </div>

      {/* Main Grid: My Courses & Live Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Courses & Progress */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              In-Progress Courses
            </h3>
            <Link href="/student/my-courses" className="text-xs text-cyan-400 hover:underline">
              View All ({userEnrollments.length})
            </Link>
          </div>

          <div className="space-y-4">
            {userEnrollments.map((enr) => {
              const course = enr.course;
              if (!course) return null;
              return (
                <div
                  key={enr.id}
                  className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-blue-800">
                      <Image src={course.thumbnail_url} alt={course.title} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                        {course.category}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Instructor: {course.instructor_name || 'Dr. David Okon'}</p>
                    </div>
                  </div>

                  <div className="w-full sm:w-48 space-y-1.5 shrink-0">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-bold text-cyan-400">{enr.progress_percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${enr.progress_percentage}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/student/classroom/${course.id}`}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white text-center shrink-0 transition-colors"
                  >
                    Continue Lesson
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Recent Submissions */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Recent Assignments & Grades
            </h3>

            <div className="space-y-3">
              {userSubmissions.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#061433] border border-blue-900/40 text-center text-xs text-slate-400">
                  No submissions yet. Check your course assignments tab.
                </div>
              ) : (
                userSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl bg-[#061433] border border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white">{sub.assignment_title}</h4>
                      <p className="text-slate-400 mt-0.5">{sub.course_title}</p>
                      {sub.feedback && (
                        <p className="text-cyan-300 mt-1.5 italic bg-blue-950/60 p-2 rounded-lg border border-blue-900">
                          &quot;{sub.feedback}&quot;
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="px-3 py-1 rounded-full font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Score: {sub.score}/100
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Live Class Alert & Community */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Live Class Widget */}
          {nextLiveClass && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#081738] to-[#040e26] border border-cyan-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Upcoming Live Lecture
                </span>
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  Live Sync
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">{nextLiveClass.title}</h4>
                <p className="text-xs text-slate-400">Platform: {nextLiveClass.platform}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {nextLiveClass.description}
              </p>

              <div className="p-3 rounded-xl bg-[#030919] border border-blue-950 text-xs space-y-1">
                <div className="text-slate-400">Date & Time:</div>
                <div className="font-bold text-white">Tomorrow at 6:00 PM WAT</div>
              </div>

              <a
                href={nextLiveClass.meeting_url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
              >
                <Video className="w-4 h-4" />
                <span>Join Live Classroom</span>
              </a>
            </div>
          )}

          {/* Certificate Quick Card */}
          {userCertificates.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#061433] border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Award className="w-4 h-4" />
                <span>Earned Credentials</span>
              </div>
              <div className="text-sm font-bold text-white">
                {userCertificates[0].course_title}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                ID: {userCertificates[0].certificate_number}
              </p>
              <Link
                href="/student/certificates"
                className="w-full py-2 rounded-xl text-xs font-bold bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-center block transition-colors"
              >
                View & Print Certificate
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
