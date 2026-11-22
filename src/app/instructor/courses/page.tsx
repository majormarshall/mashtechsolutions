'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { BookOpen, Plus, Play, CheckCircle, FileText, Upload } from 'lucide-react';

export default function InstructorCoursesPage() {
  const { courses, currentUser } = useData();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVideo, setNewLessonVideo] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState(30);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    
    // In demo state, update modules
    if (selectedCourse.modules && selectedCourse.modules.length > 0) {
      selectedCourse.modules[0].lessons?.push({
        id: `les_${Date.now()}`,
        module_id: selectedCourse.modules[0].id,
        title: newLessonTitle,
        video_url: newLessonVideo || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration_minutes: Number(newLessonDuration),
        position: (selectedCourse.modules[0].lessons?.length || 0) + 1,
        completed: false
      });
    }

    setShowAddLessonModal(false);
    setNewLessonTitle('');
    setNewLessonVideo('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Course Curriculum Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Structure your course sections, add video lectures, and upload student materials.
          </p>
        </div>

        <button
          onClick={() => setShowAddLessonModal(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-2 self-start shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lesson</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Course Selector */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block pb-2 border-b border-blue-950">
            Select Course to Edit
          </span>
          <div className="space-y-2">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCourse.id === c.id
                    ? 'bg-blue-900/80 text-cyan-300 border-l-2 border-cyan-400 shadow-md'
                    : 'text-slate-300 hover:bg-slate-900/60'
                }`}
              >
                <div className="font-bold text-white line-clamp-1">{c.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{c.category} • {c.duration}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modules & Lessons tree */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-blue-950">
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">{selectedCourse.title}</h3>
              <p className="text-xs text-cyan-400 font-semibold">{selectedCourse.modules?.length || 3} Modules Published</p>
            </div>
            <span className="text-xs text-slate-400">
              Tuition: <strong>₦{selectedCourse.price.toLocaleString()}</strong>
            </span>
          </div>

          <div className="space-y-4">
            {(selectedCourse.modules && selectedCourse.modules.length > 0 ? selectedCourse.modules : [
              {
                id: 'm1',
                title: 'Module 1: Foundations & Architecture',
                lessons: [
                  { id: 'l1', title: 'Course Orientation & Tooling Setup', duration_minutes: 25 },
                  { id: 'l2', title: 'Core Concepts & Best Practices', duration_minutes: 35 }
                ]
              },
              {
                id: 'm2',
                title: 'Module 2: Practical Lab Implementations',
                lessons: [
                  { id: 'l3', title: 'Hands-on Real-world Project Build', duration_minutes: 45 }
                ]
              }
            ]).map((mod) => (
              <div key={mod.id} className="rounded-2xl border border-blue-900/80 bg-[#030919] overflow-hidden">
                <div className="p-4 bg-blue-950/60 flex items-center justify-between text-xs font-bold text-white">
                  <span>{mod.title}</span>
                  <span className="text-slate-400 font-normal">{mod.lessons?.length || 2} Lessons</span>
                </div>
                <div className="p-4 divide-y divide-blue-950/50">
                  {mod.lessons?.map((les) => (
                    <div key={les.id} className="py-2.5 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-2.5">
                        <Play className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{les.title}</span>
                      </div>
                      <span className="text-slate-400">{les.duration_minutes} mins</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Add Lesson Modal */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <h3 className="text-base font-bold text-white">Add New Lecture Lesson</h3>
              <button onClick={() => setShowAddLessonModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lesson Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js App Router Data Fetching"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Video Embed URL (YouTube/Vimeo/Supabase)</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={newLessonVideo}
                  onChange={(e) => setNewLessonVideo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration (Minutes)</label>
                <input
                  type="number"
                  value={newLessonDuration}
                  onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddLessonModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
