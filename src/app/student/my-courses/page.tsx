'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { BookOpen, Clock, Users, ArrowRight, Play, CheckCircle } from 'lucide-react';

export default function MyCoursesPage() {
  const { enrollments, currentUser } = useData();
  const userEnrollments = enrollments.filter(e => e.student_id === currentUser.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">My Enrolled Courses</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your ongoing programs, watch lecture recordings, and complete lesson milestones.
          </p>
        </div>
        <Link
          href="/courses"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-2 self-start"
        >
          <span>Browse More Courses</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {userEnrollments.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#061433] border border-blue-900/60 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No enrolled courses yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Browse our technology catalog and enroll in Web Development, Cybersecurity, Python, or UI/UX Design.
          </p>
          <Link
            href="/courses"
            className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            Explore Courses Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEnrollments.map((enr) => {
            const course = enr.course;
            if (!course) return null;
            return (
              <div
                key={enr.id}
                className="rounded-2xl overflow-hidden bg-[#071433] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-900">
                    <Image src={course.thumbnail_url} alt={course.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-950/80 text-cyan-400 border border-cyan-500/30">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Progress bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Course Completion</span>
                        <span className="font-bold text-cyan-400">{enr.progress_percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${enr.progress_percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/student/classroom/${course.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Open Classroom</span>
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
