'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { FileCheck, ExternalLink, Star, CheckCircle, MessageSquare } from 'lucide-react';

export default function InstructorGradingPage() {
  const { submissions, gradeSubmission } = useData();
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(90);
  const [feedback, setFeedback] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubId) return;

    gradeSubmission(selectedSubId, score, feedback);
    setSavedSuccess(true);
    setTimeout(() => {
      setSelectedSubId(null);
      setSavedSuccess(false);
      setFeedback('');
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Student Submission & Grading Hub</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review submitted code repositories, design prototypes, and award scores with qualitative feedback.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-cyan-400">
                  {sub.course_title}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-semibold">Student: {sub.student_name}</span>
              </div>

              <h3 className="text-base font-bold text-white">{sub.assignment_title}</h3>
              
              <div className="p-3.5 rounded-2xl bg-[#030a1c] border border-blue-950 text-xs text-slate-300 space-y-1.5">
                <div className="font-semibold text-slate-400">Student Solution Notes:</div>
                <p className="italic">{sub.text_content}</p>
                {sub.file_url && (
                  <a
                    href={sub.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:underline pt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Project Artifact: {sub.file_url}</span>
                  </a>
                )}
              </div>

              {sub.feedback && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Feedback on record: &quot;{sub.feedback}&quot;</span>
                </div>
              )}
            </div>

            <div className="shrink-0 flex flex-col items-end gap-3 w-full md:w-auto">
              {sub.status === 'graded' ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold text-center">
                  Graded: {sub.score}/100
                </div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 text-xs font-bold text-center">
                  Pending Review
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedSubId(sub.id);
                  setScore(sub.score || 90);
                  setFeedback(sub.feedback || '');
                }}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-md"
              >
                {sub.status === 'graded' ? 'Edit Grade' : 'Score & Review'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grading Modal */}
      {selectedSubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Grade Student Submission</h3>
              <button onClick={() => setSelectedSubId(null)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {savedSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Grade Published!</h4>
                <p className="text-xs text-slate-300">The student has been notified with your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleGrade} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Awarded Score (0 - 100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Instructor Feedback & Mentorship</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide constructive feedback, highlighting strong areas and architecture improvements..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSubId(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md"
                  >
                    Submit Grade
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
