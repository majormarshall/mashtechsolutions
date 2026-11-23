'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useData, UserAccount } from '@/lib/context/data-context';
import { 
  Award, 
  ArrowRight, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Briefcase, 
  Mail, 
  Phone, 
  Sparkles,
  UserPlus,
  GraduationCap
} from 'lucide-react';

export default function InstructorsPage() {
  const { users, currentUser, addInstructorUser, updateUser, deleteUser } = useData();
  
  // Real active instructors strictly with role === 'instructor'
  const instructors = users.filter(u => u.role === 'instructor');
  const isAdmin = currentUser?.role === 'admin';

  // Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    headline: '',
    bio: '',
    avatar_url: '',
    password: ''
  });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  // Edit Modal State
  const [editingInstructor, setEditingInstructor] = useState<UserAccount | null>(null);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    headline: '',
    bio: '',
    avatar_url: ''
  });
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  const handleOpenEdit = (inst: UserAccount) => {
    setEditingInstructor(inst);
    setEditForm({
      full_name: inst.full_name,
      email: inst.email,
      phone: inst.phone || '',
      headline: inst.headline || '',
      bio: inst.bio || '',
      avatar_url: inst.avatar_url || ''
    });
    setEditError('');
    setEditSuccess('');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setAddSuccess('');

    if (!addForm.full_name || !addForm.email) {
      setAddError('Full name and email are required.');
      return;
    }

    const res = addInstructorUser({
      full_name: addForm.full_name,
      email: addForm.email,
      phone: addForm.phone,
      headline: addForm.headline || 'Technology Instructor',
      bio: addForm.bio || 'Faculty mentor at MashTech Solutions specializing in hands-on industry engineering.',
      avatar_url: addForm.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      password: addForm.password || 'password123'
    });

    if (!res.success) {
      setAddError(res.error || 'Failed to add instructor.');
      return;
    }

    setAddSuccess('Instructor successfully added to faculty!');
    setTimeout(() => {
      setShowAddModal(false);
      setAddForm({
        full_name: '',
        email: '',
        phone: '',
        headline: '',
        bio: '',
        avatar_url: '',
        password: ''
      });
      setAddSuccess('');
    }, 1000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstructor) return;
    setEditError('');
    setEditSuccess('');

    if (!editForm.full_name || !editForm.email) {
      setEditError('Full name and email are required.');
      return;
    }

    updateUser(editingInstructor.id, {
      full_name: editForm.full_name.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim(),
      headline: editForm.headline.trim(),
      bio: editForm.bio.trim(),
      avatar_url: editForm.avatar_url.trim() || editingInstructor.avatar_url
    });

    setEditSuccess('Instructor details updated successfully!');
    setTimeout(() => {
      setEditingInstructor(null);
      setEditSuccess('');
    }, 900);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the faculty list?`)) {
      deleteUser(id);
    }
  };

  return (
    <div className="py-12 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Admin Quick Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-blue-950">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Faculty & Mentors
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Learn from Seasoned Tech Leaders
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our faculty members build scalable cloud architectures, conduct cybersecurity audits, and design enterprise user interfaces daily.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/50 flex items-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Instructor</span>
              </button>
            )}
            <Link
              href="/careers"
              className="px-5 py-3 rounded-2xl bg-[#091b40] hover:bg-[#0d265a] border border-blue-900 text-cyan-400 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Faculty Recruitment</span>
            </Link>
          </div>
        </div>

        {/* Empty State when no instructors are hired yet */}
        {instructors.length === 0 ? (
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[#061433] to-[#030919] border border-blue-900/60 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Recruitment In Progress
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Faculty Recruitment & Onboarding Underway
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                MashTech Solutions is currently recruiting and screening expert industry instructors across Software Engineering, Cybersecurity, AI/Data, Cloud Computing, and UI/UX Design.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/careers"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2 transition-all"
              >
                <span>Apply as an Instructor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-950 hover:bg-blue-900 border border-blue-800 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Admin: Add Faculty Member</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Faculty Grid when instructors exist */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl relative"
              >
                {/* Admin Quick Control Badges */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <button
                      onClick={() => handleOpenEdit(inst)}
                      title="Edit Instructor"
                      className="p-2 rounded-xl bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 text-cyan-400 hover:border-cyan-500 transition-all shadow-md"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(inst.id, inst.full_name)}
                      title="Delete Instructor"
                      className="p-2 rounded-xl bg-slate-900/90 hover:bg-red-950 border border-slate-700 text-red-400 hover:border-red-500 transition-all shadow-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="relative w-28 h-28 mx-auto rounded-3xl overflow-hidden border-2 border-cyan-400/40 shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={inst.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                      alt={inst.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {inst.full_name}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-400">
                      {inst.headline || 'Technology Faculty'}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed text-center line-clamp-4">
                    {inst.bio || 'Dedicated technology educator training next-generation engineers at MashTech Solutions.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-blue-950 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400 font-medium">
                    <Award className="w-3.5 h-3.5" /> Verified Faculty
                  </span>
                  <Link
                    href="/courses"
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Instructor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#071330] border border-cyan-500/30 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Add Faculty Instructor</h3>
                  <p className="text-xs text-slate-400">Onboard a verified educator to the MashTech faculty roster</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold">
                {addError}
              </div>
            )}

            {addSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                {addSuccess}
              </div>
            )}

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Adeleke"
                  value={addForm.full_name}
                  onChange={e => setAddForm({ ...addForm, full_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="instructor@gmail.com"
                    value={addForm.email}
                    onChange={e => setAddForm({ ...addForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    placeholder="07058124966"
                    value={addForm.phone}
                    onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Headline / Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Cybersecurity Researcher & Penetration Tester"
                  value={addForm.headline}
                  onChange={e => setAddForm({ ...addForm, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Professional Bio</label>
                <textarea
                  rows={3}
                  placeholder="Brief background, certifications, and teaching focus..."
                  value={addForm.bio}
                  onChange={e => setAddForm({ ...addForm, bio: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Profile Picture / Avatar URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (optional)"
                  value={addForm.avatar_url}
                  onChange={e => setAddForm({ ...addForm, avatar_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Login Password (optional, defaults to password123)</label>
                <input
                  type="password"
                  placeholder="password123"
                  value={addForm.password}
                  onChange={e => setAddForm({ ...addForm, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-blue-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all"
                >
                  Save & Add to Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Instructor Modal */}
      {editingInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#071330] border border-cyan-500/30 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Edit Instructor Details</h3>
                  <p className="text-xs text-slate-400">{editingInstructor.full_name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingInstructor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold">
                {editError}
              </div>
            )}

            {editSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                {editSuccess}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.full_name}
                  onChange={e => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Headline / Specialization</label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={e => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Bio</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Profile Picture / Avatar URL</label>
                <input
                  type="url"
                  value={editForm.avatar_url}
                  onChange={e => setEditForm({ ...editForm, avatar_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-blue-900/60">
                <button
                  type="button"
                  onClick={() => setEditingInstructor(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
