'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  BookOpen, 
  Star, 
  ArrowRight,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export default function CoursesPage() {
  const { courses, enrollInCourse } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = [
    'All',
    'Web Development',
    'Cyber Security',
    'Programming',
    'Product Design',
    'Cloud Computing',
    'Creative Design',
    'Mobile App Development',
    'Data Science & Analytics'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            MashTech Curriculum
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Industry-Aligned Tech Courses
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            From zero foundation to high-impact career proficiency. Each program includes live lectures, hands-on assignments, and verifiable certificates.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses (e.g. Python, Next.js, Ethical Hacking, Figma)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Category Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>

            {/* Level Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l === 'All' ? 'All Skill Levels' : l}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-blue-950/80 scrollbar-none">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter:
            </span>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500 text-slate-950 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong>{filteredCourses.length}</strong> available courses</span>
          <span>Guaranteed Live Support & Verifiable Certificates</span>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-[#071330] rounded-3xl border border-blue-900/60 p-8">
            <GraduationCap className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No courses match your query</h3>
            <p className="text-xs text-slate-400 mt-1">Try searching for other keywords or reset your filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl overflow-hidden bg-[#071433] border border-blue-900/60 hover:border-cyan-500/60 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={course.thumbnail_url}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-950/80 backdrop-blur-md text-slate-200 border border-blue-700/40">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-blue-950 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{course.enrolled_count || 100}+ Enrolled</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Tuition Fee</span>
                      <span className="text-lg font-extrabold text-white">
                        ₦{course.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        Curriculum
                      </Link>
                      <button
                        onClick={() => enrollInCourse(course.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
