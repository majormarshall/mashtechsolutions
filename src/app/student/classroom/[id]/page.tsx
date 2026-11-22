'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { 
  Play, 
  CheckCircle, 
  Download, 
  FileText, 
  MessageSquare, 
  ArrowLeft, 
  Video, 
  Send, 
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function ClassroomPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const { 
    courses, 
    completeLesson, 
    materials, 
    discussions, 
    addDiscussionMessage, 
    currentUser 
  } = useData();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const allModules = course.modules && course.modules.length > 0 ? course.modules : [
    {
      id: 'm1',
      course_id: course.id,
      title: 'Module 1: Foundations & Architecture',
      position: 1,
      lessons: [
        { id: 'l1', module_id: 'm1', title: 'Welcome & Environment Setup', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration_minutes: 25, completed: true, position: 1 },
        { id: 'l2', module_id: 'm1', title: 'Modern Principles & Best Practices', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration_minutes: 35, completed: false, position: 2 }
      ]
    }
  ];

  const firstLesson = allModules[0]?.lessons?.[0];
  const [activeLesson, setActiveLesson] = useState(firstLesson || {
    id: 'l1',
    module_id: 'm1',
    title: 'Orientation & Core Architecture',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration_minutes: 30,
    completed: false,
    content: 'Welcome to this comprehensive lesson. Watch the lecture above, review the attached PDF notes, and post your questions below.'
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'discussion'>('overview');
  const [commentText, setCommentText] = useState('');

  const courseMaterials = materials.filter(m => m.course_id === course.id);
  const courseDiscussions = discussions.filter(d => d.course_id === course.id);

  const handleComplete = () => {
    completeLesson(course.id, activeLesson.id);
    setActiveLesson(prev => ({ ...prev, completed: true }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDiscussionMessage(course.id, commentText);
    setCommentText('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Classroom Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-950">
        <div className="flex items-center gap-3">
          <Link
            href="/student/my-courses"
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">Interactive Classroom</span>
            <h1 className="text-xl font-bold text-white line-clamp-1">{course.title}</h1>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeLesson.completed
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{activeLesson.completed ? 'Lesson Completed ✓' : 'Mark as Complete'}</span>
        </button>
      </div>

      {/* Classroom Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Video Player & Tabbed Info */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video Player Box */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-blue-900/80 shadow-2xl">
            <iframe
              src={activeLesson.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
              title={activeLesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Title & Tabs */}
          <div className="p-6 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">{activeLesson.title}</h2>
                <p className="text-xs text-slate-400 mt-1">Duration: {activeLesson.duration_minutes || 30} minutes</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'overview' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'materials' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Materials ({courseMaterials.length})
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'discussion' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  Discussion ({courseDiscussions.length})
                </button>
              </div>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-3 pt-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  {activeLesson.content || 'Welcome to this lesson in MashTech Solutions curriculum. Complete the exercises and participate in the community discussion tab.'}
                </p>
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900">
                  <h4 className="font-bold text-white mb-1">Key Takeaways:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    <li>Hands-on code execution and repository architecture</li>
                    <li>Best practice patterns and security precautions</li>
                    <li>Submission criteria for the corresponding homework assignment</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Materials */}
            {activeTab === 'materials' && (
              <div className="space-y-3 pt-2">
                {courseMaterials.length === 0 ? (
                  <p className="text-xs text-slate-400">No additional downloads for this lesson.</p>
                ) : (
                  courseMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="font-bold text-white">{mat.title}</div>
                          <div className="text-[11px] text-slate-400">Size: {(mat.file_size_kb || 2000) / 1000} MB</div>
                        </div>
                      </div>
                      <a
                        href={mat.file_url}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold flex items-center gap-1.5 hover:bg-cyan-500 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Discussion */}
            {activeTab === 'discussion' && (
              <div className="space-y-4 pt-2">
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question about this lecture..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>

                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {courseDiscussions.map((msg) => (
                    <div key={msg.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{msg.user_name}</span>
                        <span className="text-[10px] text-cyan-400 uppercase">{msg.user_role}</span>
                      </div>
                      <p className="text-slate-300">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Curriculum & Lesson Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-[#061433] border border-blue-900/60 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Course Curriculum
            </h3>

            <div className="space-y-3">
              {allModules.map((mod) => (
                <div key={mod.id} className="rounded-xl border border-blue-900/60 overflow-hidden bg-[#030919]">
                  <div className="px-4 py-2.5 bg-blue-950/60 font-bold text-xs text-white">
                    {mod.title}
                  </div>
                  <div className="divide-y divide-blue-950/40">
                    {mod.lessons?.map((les) => {
                      const isSelected = activeLesson.id === les.id;
                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLesson(les)}
                          className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-cyan-950/70 text-cyan-300 font-bold border-l-2 border-cyan-400'
                              : 'text-slate-300 hover:bg-blue-900/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {les.completed ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                            {les.duration_minutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
