'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { Certificate } from '@/types';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  CheckCircle, 
  Calendar, 
  User, 
  BookOpen, 
  QrCode, 
  Printer, 
  Download,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function VerifyCertificatePage() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const { verifyCertificate, certificates } = useData();
  const [query, setQuery] = useState(initialId);
  const [result, setResult] = useState<Certificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      setQuery(initialId);
      const match = verifyCertificate(initialId);
      setResult(match || null);
      setHasSearched(true);
    }
  }, [initialId, verifyCertificate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const match = verifyCertificate(query.trim());
    setResult(match || null);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Public Credential Verification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Verify MashTech Solutions Certificate
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Employers, academic institutions, and partners can verify the validity of credentials issued by MashTech Solutions by entering the Certificate ID or Verification Code below.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="p-6 rounded-2xl bg-[#071330] border border-blue-900/60 shadow-xl max-w-2xl mx-auto no-print">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. MTS-2026-PY-8841 or VFY-8841-MTS)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all shrink-0"
            >
              Verify Credential
            </button>
          </form>

          {/* Quick test suggestion */}
          <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Demo sample certificate to test:</span>
            <button
              type="button"
              onClick={() => { setQuery('MTS-2026-PY-8841'); const match = verifyCertificate('MTS-2026-PY-8841'); setResult(match || null); setHasSearched(true); }}
              className="text-cyan-400 hover:underline font-mono"
            >
              MTS-2026-PY-8841
            </button>
          </div>
        </div>

        {/* Result Container */}
        {hasSearched && (
          <div>
            {result ? (
              <div className="space-y-6">
                
                {/* Verified Banner */}
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-between no-print">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-white">Certificate Authenticity Confirmed</div>
                      <div className="text-xs text-emerald-300/90">This official credential was conferred by MashTech Solutions Educational System.</div>
                    </div>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 flex items-center gap-2 hover:bg-emerald-400 transition-colors shrink-0"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                </div>

                {/* Printable Certificate Canvas */}
                <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0c1e48] via-[#081533] to-[#040e26] border-4 border-cyan-500/40 shadow-2xl space-y-8 text-center text-slate-200">
                  
                  {/* Watermark / Logo background */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <Award className="w-96 h-96 text-cyan-400" />
                  </div>

                  {/* Header */}
                  <div className="space-y-3 relative z-10">
                    <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-xl border border-cyan-400/50">
                      <Image src="/logos/mashtech-logo.jpg" alt="MashTech Solutions Logo" fill sizes="80px" className="object-cover" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
                        MashTech Solutions
                      </h2>
                      <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mt-0.5">
                        ...Learn • Build • Innovate
                      </p>
                    </div>
                  </div>

                  {/* Body text */}
                  <div className="space-y-4 max-w-2xl mx-auto relative z-10">
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">
                      Certificate of Technical Completion & Competence
                    </span>
                    <p className="text-xs text-slate-300">This is to proudly certify that</p>
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 py-1">
                      {result.student_name}
                    </div>
                    <p className="text-xs text-slate-300">
                      has successfully fulfilled all curriculum benchmarks, practical projects, laboratory exercises, and assessments in
                    </p>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {result.course_title}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-blue-900/80 text-xs text-left relative z-10">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Certificate ID</span>
                      <strong className="text-cyan-300 font-mono">{result.certificate_number}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Verification Code</span>
                      <strong className="text-cyan-300 font-mono">{result.verification_code}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Date Conferred</span>
                      <strong className="text-white">
                        {new Date(result.issue_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Authentic
                      </span>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-blue-950/60 max-w-3xl mx-auto relative z-10">
                    <div className="text-center sm:text-left space-y-1">
                      <div className="font-serif italic text-lg text-cyan-300">Engr. Marshall</div>
                      <div className="w-36 h-0.5 bg-slate-700 mx-auto sm:mx-0"></div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Director & Systems Architect</div>
                    </div>

                    {/* Official Seal */}
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/60 p-1 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-cyan-950/80 border border-cyan-400 flex flex-col items-center justify-center text-[8px] text-cyan-300 font-black uppercase text-center leading-tight">
                        <ShieldCheck className="w-4 h-4 text-cyan-400 mb-0.5" />
                        <span>Official Seal</span>
                        <span>MashTech</span>
                      </div>
                    </div>

                    <div className="text-center sm:text-right space-y-1">
                      <div className="font-serif italic text-lg text-cyan-300">Dr. David Okon</div>
                      <div className="w-36 h-0.5 bg-slate-700 mx-auto sm:ml-auto"></div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">Lead Academic Instructor</div>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-[#071330] border border-rose-900/60 text-center space-y-3 max-w-xl mx-auto">
                <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Certificate Not Found</h3>
                <p className="text-xs text-slate-400">
                  We could not find any active certificate matching &quot;{query}&quot;. Please confirm the Certificate ID or contact our admissions office at 07058124966.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
