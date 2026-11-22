'use client';

import React from 'react';
import { useData } from '@/lib/context/data-context';
import { ShieldCheck, CheckCircle, Clock } from 'lucide-react';

export default function AdminEnrollmentsPage() {
  const { enrollments } = useData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Course Registrations & Enrollments</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor student active admissions, curriculum progress, and completion states.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3 pl-2">Student</th>
              <th className="pb-3">Course Program</th>
              <th className="pb-3">Progress</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Enrolled Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60">
            {enrollments.map((enr) => (
              <tr key={enr.id} className="hover:bg-blue-900/20 transition-colors">
                <td className="py-3.5 pl-2">
                  <div className="font-bold text-white">Alex Marshall</div>
                  <div className="text-[10px] text-slate-400">student@mashtech.ng</div>
                </td>
                <td className="py-3.5 text-cyan-300 font-medium">
                  {enr.course?.title || 'MashTech Course'}
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${enr.progress_percentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{enr.progress_percentage}%</span>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {enr.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3.5 text-slate-400">
                  {new Date(enr.enrolled_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
