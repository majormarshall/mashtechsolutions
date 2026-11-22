'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>About MashTech Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Bridging the African Tech Talent Gap
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            MashTech Solutions is a premier technology training school and virtual academy founded with a single mission: to equip individuals with practical, industry-proven digital skills that unlock global opportunities.
          </p>
        </div>

        {/* Brand Philosophy: Learn • Build • Innovate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#081738] to-[#040e26] border border-blue-900/60 shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xl">
              01
            </div>
            <h3 className="text-xl font-extrabold text-white">Learn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Master fundamental to advanced concepts through live interactive lectures, structured course modules, and direct mentorship from experienced practitioners.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#081738] to-[#040e26] border border-blue-900/60 shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xl">
              02
            </div>
            <h3 className="text-xl font-extrabold text-white">Build</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Theory without practical application is futile. At MashTech, students develop end-to-end commercial applications, cybersecurity lab defenses, and design systems.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#081738] to-[#040e26] border border-blue-900/60 shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-xl">
              03
            </div>
            <h3 className="text-xl font-extrabold text-white">Innovate</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Graduate with verifiable credentials, a rich GitHub and Figma portfolio, and the confidence to launch technology ventures or excel in international tech roles.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#071330] rounded-3xl p-8 sm:p-12 border border-blue-900/60">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Target className="w-4 h-4" />
              <span>Our Vision & Mission</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Democratizing High-Impact Digital Education
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We envision a future where every motivated youth has access to world-class software engineering, cybersecurity, and product design mentorship regardless of their starting point.
            </p>
            <div className="space-y-2 pt-2">
              {[
                'Practical curricula modeled after Silicon Valley and leading Nigerian tech standards',
                'Combination of flexible self-paced video lessons and interactive Google Meet live workshops',
                'Automated certificate verification system trusted by employers',
                'Affordable tuition with flexible payment plans via Paystack'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video border border-cyan-500/30 shadow-2xl">
            <Image
              src="/images/mashtech-flyer.jpg"
              alt="MashTech Community"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Leadership */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Meet The Team
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Guided by Industry Veterans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Engr. Marshall',
                role: 'Director & Lead Systems Architect',
                bio: 'Cloud infrastructure engineer, tech educator, and visionary behind MashTech Solutions.',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
              },
              {
                name: 'Dr. David Okon',
                role: 'Senior Software & Cybersecurity Specialist',
                bio: '10+ years architecting web applications, penetration testing, and mentoring junior engineers.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
              },
              {
                name: 'Sarah Adeleke',
                role: 'Principal UI/UX Designer',
                bio: 'Product designer focusing on accessible user interfaces, interaction psychology, and design tokens.',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
              }
            ].map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#061433] border border-blue-900/60 text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-lg">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">{member.role}</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
          >
            <span>Start Learning With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
