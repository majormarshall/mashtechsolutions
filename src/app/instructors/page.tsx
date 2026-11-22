'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { Award, BookOpen, Star, Mail, ArrowRight } from 'lucide-react';

export default function InstructorsPage() {
  const { users } = useData();
  const instructors = users.filter(u => u.role === 'instructor' || u.role === 'admin');

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Faculty & Mentors
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Learn from Seasoned Tech Leaders
          </h1>
          <p className="text-sm text-slate-300">
            Our instructors do not teach from textbook theory alone. They build scalable cloud architectures, conduct cybersecurity audits, and design enterprise user interfaces daily.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
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
                    {inst.headline}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed text-center">
                  {inst.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-blue-950 mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-medium">
                  <Award className="w-3.5 h-3.5" /> Certified Expert
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

      </div>
    </div>
  );
}
