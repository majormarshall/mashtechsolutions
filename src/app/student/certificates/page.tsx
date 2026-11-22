'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { Award, ShieldCheck, Printer, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

export default function StudentCertificatesPage() {
  const { certificates, currentUser } = useData();

  if (!currentUser) return null;

  const userCerts = certificates.filter(c => c.student_id === currentUser.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Earned Certificates</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Official credentials awarded by MashTech Solutions upon satisfying course curriculum requirements.
        </p>
      </div>

      {userCerts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#061433] border border-blue-900/60 space-y-3">
          <Award className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No certificates issued yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete 100% of your course lessons and assignments to automatically unlock your verified certificate.
          </p>
          <Link
            href="/student/my-courses"
            className="inline-block px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 text-white"
          >
            Continue Learning
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#081738] to-[#040e26] border border-cyan-500/40 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Verified Credential
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{cert.certificate_number}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{cert.course_title}</h3>
                
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Recipient: <strong className="text-white">{cert.student_name}</strong></div>
                  <div>Issued: <strong className="text-white">{new Date(cert.issue_date).toLocaleDateString()}</strong></div>
                  <div>Verification Code: <strong className="text-cyan-400 font-mono">{cert.verification_code}</strong></div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-950 flex gap-3">
                <Link
                  href={`/verify-certificate?id=${cert.certificate_number}`}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Public Verification</span>
                </Link>
                <Link
                  href={`/verify-certificate?id=${cert.certificate_number}`}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>View / Print</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
