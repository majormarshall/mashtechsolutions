'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Enrollment } from '@/types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Check, 
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';

export default function AdminEnrollmentsPage() {
  const { 
    enrollments, 
    courses, 
    users, 
    createEnrollment, 
    updateEnrollment, 
    deleteEnrollment 
  } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Enrollment['status']>('all');
  
  // Create Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [newStatus, setNewStatus] = useState<Enrollment['status']>('active');
  const [newProgress, setNewProgress] = useState(0);
  const [newEnrollmentType, setNewEnrollmentType] = useState<'regular' | 'scholarship'>('regular');
  const [newScholarshipFeePaid, setNewScholarshipFeePaid] = useState(true);

  // Edit Modal
  const [editingEnr, setEditingEnr] = useState<Enrollment | null>(null);
  const [editCourseId, setEditCourseId] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editStatus, setEditStatus] = useState<Enrollment['status']>('active');
  const [editProgress, setEditProgress] = useState(0);
  const [editEnrollmentType, setEditEnrollmentType] = useState<'regular' | 'scholarship'>('regular');
  const [editScholarshipFeePaid, setEditScholarshipFeePaid] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Open Edit Modal
  const handleOpenEdit = (enr: Enrollment) => {
    setEditingEnr(enr);
    setEditCourseId(enr.course_id);
    setEditStudentId(enr.student_id);
    setEditStatus(enr.status);
    setEditProgress(enr.progress_percentage);
    setEditEnrollmentType(enr.enrollment_type || 'regular');
    setEditScholarshipFeePaid(enr.scholarship_fee_paid ?? true);
    setSaveSuccess(false);
  };

  // Save Edit Enrollment
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEnr) return;

    updateEnrollment(editingEnr.id, {
      course_id: editCourseId,
      student_id: editStudentId,
      status: editStatus,
      progress_percentage: Number(editProgress),
      enrollment_type: editEnrollmentType,
      scholarship_fee_paid: editEnrollmentType === 'scholarship' ? editScholarshipFeePaid : false,
      application_fee: editEnrollmentType === 'scholarship' ? 40000 : undefined,
      completed_at: editStatus === 'completed' || editProgress === 100 ? new Date().toISOString() : undefined
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingEnr(null);
    }, 1000);
  };

  // Create Enrollment
  const handleCreateEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentId || !newCourseId) return;

    createEnrollment({
      student_id: newStudentId,
      course_id: newCourseId,
      status: newStatus,
      progress_percentage: Number(newProgress),
      enrollment_type: newEnrollmentType,
      scholarship_fee_paid: newEnrollmentType === 'scholarship' ? newScholarshipFeePaid : false
    });

    setShowCreateModal(false);
    setNewStudentId('');
    setNewCourseId('');
    setNewProgress(0);
    setNewEnrollmentType('regular');
  };

  // Helper to find student name & email
  const getStudentInfo = (studentId: string) => {
    const found = users.find(u => u.id === studentId);
    if (found) {
      return { name: found.full_name, email: found.email };
    }
    return { name: 'Enrolled Student', email: 'student@mashtech.ng' };
  };

  const filteredEnrollments = enrollments.filter(enr => {
    const student = getStudentInfo(enr.student_id);
    const courseTitle = enr.course?.title || '';
    const matchesSearch = 
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      courseTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || enr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = enrollments.filter(e => e.status === 'active').length;
  const completedCount = enrollments.filter(e => e.status === 'completed').length;
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress_percentage, 0) / enrollments.length)
    : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Academic Admissions & Progress</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Course Registrations & Enrollments</h1>
          <p className="text-sm text-slate-400 mt-1">
            Supervise student admissions, adjust curriculum progress percentages, change statuses, or manually enroll students.
          </p>
        </div>

        <button
          onClick={() => {
            setNewStudentId(users[0]?.id || '');
            setNewCourseId(courses[0]?.id || '');
            setShowCreateModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Student Enrollment</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Total Enrollments</div>
          <div className="text-2xl font-black text-white">{enrollments.length}</div>
          <div className="text-[11px] text-slate-500">Across all tracks</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Active in Class</div>
          <div className="text-2xl font-black text-cyan-400">{activeCount}</div>
          <div className="text-[11px] text-slate-500">Currently attending modules</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Graduated / Complete</div>
          <div className="text-2xl font-black text-emerald-400">{completedCount}</div>
          <div className="text-[11px] text-slate-500">Certified graduates</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Cohort Avg Completion</div>
          <div className="text-2xl font-black text-purple-400">{avgProgress}%</div>
          <div className="text-[11px] text-slate-500">Overall syllabus progress</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, email, course..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(['all', 'active', 'completed', 'cancelled', 'dropped'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {st} ({
                st === 'all' 
                  ? enrollments.length 
                  : enrollments.filter(e => e.status === st).length
              })
            </button>
          ))}
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        {filteredEnrollments.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <div className="text-sm font-bold text-white">No enrollments match this search</div>
            <div className="text-xs text-slate-500 mt-1">Try resetting the filter or click Register New Student Enrollment.</div>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-2">Student Learner</th>
                <th className="pb-3">Enrolled Course</th>
                <th className="pb-3">Curriculum Progress</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Enrollment Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-950/60 text-slate-300">
              {filteredEnrollments.map((enr) => {
                const student = getStudentInfo(enr.student_id);
                const isComplete = enr.status === 'completed' || enr.progress_percentage === 100;

                return (
                  <tr key={enr.id} className="hover:bg-blue-900/20 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="font-bold text-white text-sm">{student.name}</div>
                      <div className="text-[11px] text-slate-400">{student.email}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="text-cyan-300 font-semibold">{enr.course?.title || 'MashTech Course'}</div>
                      <div className="text-[10px] text-slate-500">{enr.course?.category || 'Technology'}</div>
                      {enr.enrollment_type === 'scholarship' ? (
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                          <GraduationCap className="w-3 h-3 text-amber-400" />
                          <span>Scholarship (₦40k {enr.scholarship_fee_paid !== false ? 'Paid' : 'Unpaid'})</span>
                        </div>
                      ) : (
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-800">
                          <span>Standard Tuition</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-28 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isComplete ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                            }`}
                            style={{ width: `${enr.progress_percentage}%` }}
                          />
                        </div>
                        <span className={`font-bold text-xs ${isComplete ? 'text-emerald-400' : 'text-white'}`}>
                          {enr.progress_percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enr.status === 'completed'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : enr.status === 'active'
                          ? 'bg-blue-950/80 text-cyan-400 border border-cyan-800'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                      }`}>
                        {enr.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">
                      {new Date(enr.enrolled_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(enr)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-950 text-cyan-300 hover:bg-cyan-900 hover:text-white border border-cyan-800/80 transition-all inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Progress</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove enrollment for ${student.name} in "${enr.course?.title}"?`)) {
                            deleteEnrollment(enr.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Remove Enrollment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT ENROLLMENT MODAL */}
      {editingEnr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/50 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>Edit Student Enrollment</span>
                </h3>
                <p className="text-xs text-slate-400">Update progress, change assigned course, or mark complete.</p>
              </div>
              <button 
                onClick={() => setEditingEnr(null)} 
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Enrollment and progress updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enrolled Student</label>
                <select
                  value={editStudentId}
                  onChange={(e) => setEditStudentId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Program</label>
                <select
                  value={editCourseId}
                  onChange={(e) => setEditCourseId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (₦{c.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="active">Active (Currently Learning)</option>
                  <option value="completed">Completed (Graduated)</option>
                  <option value="dropped">Dropped / Suspended</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admission Track</label>
                  <select
                    value={editEnrollmentType}
                    onChange={(e) => setEditEnrollmentType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="regular">Standard Tuition</option>
                    <option value="scholarship">Scholarship Track (₦40k)</option>
                  </select>
                </div>

                {editEnrollmentType === 'scholarship' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scholarship Form Fee</label>
                    <select
                      value={editScholarshipFeePaid ? 'paid' : 'unpaid'}
                      onChange={(e) => setEditScholarshipFeePaid(e.target.value === 'paid')}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="paid">₦40,000 Verified & Paid</option>
                      <option value="unpaid">Pending / Unpaid</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Progress Slider & Input */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200">Syllabus Progress Completion</label>
                  <span className="font-black text-cyan-400 text-sm">{editProgress}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editProgress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setEditProgress(val);
                    if (val === 100) setEditStatus('completed');
                  }}
                  className="w-full accent-cyan-400 cursor-pointer"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  {[0, 25, 50, 75, 100].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        setEditProgress(pct);
                        if (pct === 100) setEditStatus('completed');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        editProgress === pct
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEnr(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Enrollment Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ENROLLMENT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Register Student in Course</span>
                </h3>
                <p className="text-xs text-slate-400">Add an enrollment record and assign starting progress.</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEnrollment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Student *</label>
                <select
                  required
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="">Select a student...</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Course Track *</label>
                <select
                  required
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="">Select a course...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — ₦{c.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Starting Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Starting Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admission Track</label>
                  <select
                    value={newEnrollmentType}
                    onChange={(e) => setNewEnrollmentType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="regular">Standard Tuition</option>
                    <option value="scholarship">Scholarship Track (₦40k Form Fee)</option>
                  </select>
                </div>

                {newEnrollmentType === 'scholarship' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Application Form Fee</label>
                    <select
                      value={newScholarshipFeePaid ? 'paid' : 'unpaid'}
                      onChange={(e) => setNewScholarshipFeePaid(e.target.value === 'paid')}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="paid">₦40,000 Verified & Paid</option>
                      <option value="unpaid">Pending / Unpaid</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Confirm Enrollment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
