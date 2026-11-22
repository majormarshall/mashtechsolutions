'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { BookOpen, Plus, DollarSign, Clock, Users, CheckCircle } from 'lucide-react';

export default function AdminCoursesPage() {
  const { courses, createCourse, users } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [price, setPrice] = useState(45000);
  const [duration, setDuration] = useState('8 Weeks');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [description, setDescription] = useState('');

  const instructors = users.filter(u => u.role === 'instructor' || u.role === 'admin');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createCourse({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || 'Professional training program designed for immediate real-world impact.',
      thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      category,
      instructor_id: instructors[0]?.id || 'usr_inst_1',
      instructor_name: instructors[0]?.full_name || 'Dr. David Okon',
      duration,
      level,
      price: Number(price),
      is_free: false,
      status: 'published',
      requirements: ['Computer with internet', 'Eagerness to learn'],
      learning_outcomes: ['Build real-world production projects', 'Earn a verified MashTech diploma'],
      enrolled_count: 0
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Course Management & Pricing</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish official MashTech training tracks, configure tuition fees, and assign faculty.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-2 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-cyan-400">
                  {course.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {course.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-base font-bold text-white line-clamp-1">{course.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
              
              <div className="pt-2 text-xs text-slate-300 space-y-1">
                <div>Instructor: <strong className="text-white">{course.instructor_name || 'Dr. David Okon'}</strong></div>
                <div>Duration: <strong className="text-white">{course.duration}</strong> • Level: {course.level}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Tuition</span>
                <span className="text-base font-black text-white">₦{course.price.toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-400">{course.enrolled_count || 100}+ Enrolled</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Publish New Technology Program</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Programming">Programming</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Creative Design">Creative Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tuition Fee (NGN) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief synopsis of what students will accomplish..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
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
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md"
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
