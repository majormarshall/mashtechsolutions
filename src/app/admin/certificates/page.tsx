'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { Award, Plus, CheckCircle, ExternalLink, ShieldCheck, Printer } from 'lucide-react';

export default function AdminCertificatesPage() {
  const { certificates, issueCertificate, users, courses } = useData();
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(users[3]?.id || 'usr_student');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course_web_dev');
  const [issuedCert, setIssuedCert] = useState<any>(null);

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = issueCertificate(selectedStudentId, selectedCourseId);
    setIssuedCert(cert);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Certificate Issuing & Governance</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate verifiable tamper-proof certificates with unique IDs and public verification URLs.
          </p>
        </div>

        <button
          onClick={() => { setShowModal(true); setIssuedCert(null); }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Certificate</span>
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3 pl-2">Certificate ID</th>
              <th className="pb-3">Student Name</th>
              <th className="pb-3">Course Conferred</th>
              <th className="pb-3">Verification Code</th>
              <th className="pb-3">Issue Date</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-blue-900/20 transition-colors">
                <td className="py-3.5 pl-2 font-mono font-bold text-cyan-400">
                  {cert.certificate_number}
                </td>
                <td className="py-3.5 font-bold text-white">
                  {cert.student_name}
                </td>
                <td className="py-3.5 text-slate-300">
                  {cert.course_title}
                </td>
                <td className="py-3.5 font-mono text-cyan-300">
                  {cert.verification_code}
                </td>
                <td className="py-3.5 text-slate-400">
                  {new Date(cert.issue_date).toLocaleDateString()}
                </td>
                <td className="py-3.5">
                  <Link
                    href={`/verify-certificate?id=${cert.certificate_number}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950 hover:bg-cyan-900/80 text-cyan-300 border border-blue-800 text-[11px] font-semibold transition-colors"
                  >
                    <span>Verify Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Confer Technical Certificate</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {issuedCert ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Certificate Successfully Issued!</h4>
                <p className="text-xs text-slate-300">
                  Certificate ID: <strong className="text-cyan-400 font-mono">{issuedCert.certificate_number}</strong>
                </p>
                <div className="pt-2 flex gap-3">
                  <Link
                    href={`/verify-certificate?id=${issuedCert.certificate_number}`}
                    target="_blank"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white text-center shadow-md"
                  >
                    View & Print Certificate
                  </Link>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleIssue} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Recipient Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Conferred Course Track</label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
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
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md"
                  >
                    Issue Certificate
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
