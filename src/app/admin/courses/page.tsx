'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Course } from '@/types';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function AdminCoursesPage() {
  const { courses, createCourse, updateCourse, deleteCourse, users } = useData();
  
  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createCategory, setCreateCategory] = useState('Web Development');
  const [createPrice, setCreatePrice] = useState(45000);
  const [createDuration, setCreateDuration] = useState('8 Weeks');
  const [createLevel, setCreateLevel] = useState<Course['level']>('Beginner');
  const [createDescription, setCreateDescription] = useState('');
  const [createInstructorId, setCreateInstructorId] = useState('');

  // Edit Modal State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDuration, setEditDuration] = useState('');
  const [editLevel, setEditLevel] = useState<Course['level']>('Beginner');
  const [editStatus, setEditStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [editDescription, setEditDescription] = useState('');
  const [editInstructorId, setEditInstructorId] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const instructors = users.filter(u => u.role === 'instructor' || u.role === 'admin');

  // Open Edit Modal
  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setEditTitle(course.title);
    setEditCategory(course.category);
    setEditPrice(course.price);
    setEditDuration(course.duration);
    setEditLevel(course.level);
    setEditStatus(course.status);
    setEditDescription(course.description);
    setEditInstructorId(course.instructor_id || instructors[0]?.id || 'usr_inst_1');
    setSaveSuccess(false);
  };

  // Submit Edit Course
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editTitle.trim()) return;

    const selectedInstructor = instructors.find(i => i.id === editInstructorId) || instructors[0];

    updateCourse(editingCourse.id, {
      title: editTitle.trim(),
      category: editCategory,
      price: Number(editPrice),
      duration: editDuration.trim(),
      level: editLevel,
      status: editStatus,
      description: editDescription.trim(),
      instructor_id: selectedInstructor?.id || editingCourse.instructor_id,
      instructor_name: selectedInstructor?.full_name || editingCourse.instructor_name
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingCourse(null);
    }, 1200);
  };

  // Submit Create Course
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim()) return;

    const selectedInstructor = instructors.find(i => i.id === createInstructorId) || instructors[0];

    createCourse({
      title: createTitle.trim(),
      slug: createTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: createDescription.trim() || 'Professional training program designed for immediate industry impact.',
      thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      category: createCategory,
      instructor_id: selectedInstructor?.id || 'usr_inst_1',
      instructor_name: selectedInstructor?.full_name || 'Dr. David Okon',
      duration: createDuration.trim(),
      level: createLevel,
      price: Number(createPrice),
      is_free: false,
      status: 'published',
      requirements: ['Computer with internet connection', 'Eagerness to learn and innovate'],
      learning_outcomes: ['Build real-world production projects', 'Earn a verified MashTech diploma'],
      enrolled_count: 0
    });

    setShowCreateModal(false);
    setCreateTitle('');
    setCreateDescription('');
  };

  const categories = [
    'Web Development',
    'Cyber Security',
    'Programming',
    'Product Design',
    'UI/UX Design',
    'Cloud Computing',
    'Graphics Design',
    'Data Science & Analytics',
    'Mobile App Development'
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Course Management & Pricing</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish official MashTech training tracks, edit course details, set tuition fees, and assign lead instructors.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white transition-all flex items-center gap-2 self-start shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                  {course.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  course.status === 'published' 
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                    : course.status === 'draft'
                    ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}>
                  {course.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {course.title}
              </h3>
              
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
              
              <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-blue-950">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Lead: <strong className="text-white">{course.instructor_name || 'Dr. David Okon'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Duration: <strong className="text-white">{course.duration}</strong> • Level: <span className="text-cyan-300">{course.level}</span></span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-950/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Tuition (NGN)</span>
                <span className="text-lg font-black text-cyan-400">₦{course.price.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-950 text-cyan-300 hover:bg-cyan-900 hover:text-white border border-cyan-800/80 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Edit Course & Pricing"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
                      deleteCourse(course.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-[#071330] border border-cyan-500/50 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>Edit Course & Pricing</span>
                </h3>
                <p className="text-xs text-slate-400">Update track details, adjust tuition, or assign lead faculty.</p>
              </div>
              <button 
                onClick={() => setEditingCourse(null)} 
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Course details updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Title *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tuition Fee (NGN ₦) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration</label>
                  <input
                    type="text"
                    required
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    placeholder="e.g. 8 Weeks"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Skill Level</label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lead Instructor</label>
                <select
                  value={editInstructorId}
                  onChange={(e) => setEditInstructorId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.full_name} ({inst.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description & Syllabus Overview</label>
                <textarea
                  rows={4}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div>
                <h3 className="text-base font-bold text-white">Publish New Technology Program</h3>
                <p className="text-xs text-slate-400">Introduce a new course track to the student catalog.</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile App Development with Flutter"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={createCategory}
                    onChange={(e) => setCreateCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tuition Fee (NGN ₦) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={createPrice}
                    onChange={(e) => setCreatePrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration</label>
                  <input
                    type="text"
                    required
                    value={createDuration}
                    onChange={(e) => setCreateDuration(e.target.value)}
                    placeholder="e.g. 8 Weeks"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Skill Level</label>
                  <select
                    value={createLevel}
                    onChange={(e) => setCreateLevel(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lead Instructor</label>
                <select
                  value={createInstructorId}
                  onChange={(e) => setCreateInstructorId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.full_name} ({inst.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief synopsis of what students will accomplish..."
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
