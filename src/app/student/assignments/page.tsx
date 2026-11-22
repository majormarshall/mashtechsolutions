'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { FileText, CheckCircle, Clock, Upload, ArrowRight, Award } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const { assignments, submissions, submitAssignment, currentUser } = useData();
  const [selectedAssgnId, setSelectedAssgnId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssgnId) return;
    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(selectedAssgnId, submissionText, fileUrl);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setSelectedAssgnId(null);
        setShowSuccess(false);
        setSubmissionText('');
        setFileUrl('');
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Assignments & Assessments</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete practical lab tasks, submit project links or documents, and review instructor grades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assgn) => {
          const submission = submissions.find(
            (s) => s.assignment_id === assgn.id && s.student_id === currentUser.id
          );

          return (
            <div
              key={assgn.id}
              className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                    {assgn.course_title}
                  </span>
                  {submission ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      submission.status === 'graded' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {submission.status === 'graded' ? `Score: ${submission.score}/100` : 'Submitted (Awaiting Grading)'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                      Pending Submission
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{assgn.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{assgn.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Max Score: <strong>{assgn.max_score} Points</strong></span>
                </div>

                {submission?.feedback && (
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-cyan-400">Instructor Feedback</span>
                    <p className="text-xs text-slate-200 italic">&quot;{submission.feedback}&quot;</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setSelectedAssgnId(assgn.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{submission ? 'Update Submission' : 'Submit Assignment'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssgnId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Submit Assignment Work</h3>
              <button onClick={() => setSelectedAssgnId(null)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {showSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Assignment Submitted!</h4>
                <p className="text-xs text-slate-300">Your instructor has been notified and will review your work.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project / Demo URL or Live Deployment
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project or https://vercel.app"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Written Solution / Notes for Instructor
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how you solved the problem, libraries used, and any challenges encountered..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAssgnId(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
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
