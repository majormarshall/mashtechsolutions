'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { 
  GraduationCap, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Phone, 
  Mail, 
  Video, 
  ShieldCheck, 
  Sparkles,
  Terminal,
  Layers,
  Palette,
  Cloud,
  Building2,
  Code2,
  Laptop
} from 'lucide-react';

export default function HomePage() {
  const { courses, enrollInCourse, currentUser } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Web Development',
    'Cyber Security',
    'Programming',
    'Product Design',
    'Cloud Computing',
    'Creative Design'
  ];

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-700/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Empowering the Next Generation of Tech Innovators</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Tech Skills.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  Real Opportunities.
                </span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                At <strong>MashTech Solutions</strong>, we equip you with in-demand digital skills to build a successful career in technology and innovation. Combination of an online tech school, virtual classroom, and supportive student community.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Commission a Project</span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Talk with Us</span>
                </Link>
              </div>

              {/* Key Highlights from Flyer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-cyan-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>Beginner to Advanced</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-cyan-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Certificates Provided</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-cyan-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Supportive Community</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-800 text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span>Career Growth</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Flyer Card with Live LMS Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl p-3 bg-gradient-to-b from-cyan-500/30 via-blue-600/10 to-slate-900/60 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 backdrop-blur-sm group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <Image
                    src="/images/mashtech-flyer.jpg"
                    alt="MashTech Solutions Flyer"
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    priority
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-xs">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        Admissions Ongoing
                      </span>
                      <span className="text-slate-300">Hybrid & Online</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Call 07058124966 or 08106071514 to reserve your seat today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE MASHTECH SECTION */}
      <section className="py-16 bg-[#040e26] border-y border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Why Choose MashTech?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Practical Education Tailored for Immediate Industry Impact
            </h2>
            <p className="text-sm text-slate-400">
              Unlike theoretical platforms, MashTech combines direct instructor live classes, hands-on lab projects, and verifiable credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Expert Instructors',
                subtitle: 'Industry Professionals',
                desc: 'Learn directly from seasoned software engineers, cybersecurity specialists, and product designers with active commercial track records.',
                icon: Users
              },
              {
                title: 'Hands-On Practical Training',
                subtitle: 'Real Tools & Stacks',
                desc: 'Every lecture is paired with active terminal commands, Figma design files, and real Next.js & Supabase application repositories.',
                icon: Terminal
              },
              {
                title: 'Project-Based Learning',
                subtitle: 'Build Your Portfolio',
                desc: 'Graduate with 3+ production-ready projects hosted online to impress recruiters and freelance clients immediately.',
                icon: Layers
              },
              {
                title: 'Flexible Learning Modes',
                subtitle: 'Onsite & Virtual Classrooms',
                desc: 'Attend live Google Meet lectures, watch recorded classes anytime, and download offline PDF resources on your schedule.',
                icon: Video
              },
              {
                title: 'Affordable Fees & Payment Plans',
                subtitle: 'Accessible Tech Education',
                desc: 'Transparent tuition in Naira (NGN) with verified Paystack payment gateway integration and instant receipt generation.',
                icon: ShieldCheck
              },
              {
                title: 'Career Support & Guidance',
                subtitle: 'CV, Portfolios & Jobs',
                desc: 'Mentorship on technical interviews, open-source contributions, portfolio presentation, and client acquisition.',
                icon: Award
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-b from-[#081738] to-[#040e26] border border-blue-900/60 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400/90 mb-2">
                    {feature.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COURSES SHOWCASE SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Explore Our Programs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Featured Professional Courses
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Select your tech discipline and begin your journey from zero to job-ready.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-400/50'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.slice(0, 6).map((course) => (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                {/* Content */}
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
                      <span>{course.enrolled_count || 120}+ enrolled</span>
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
                        Details
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

        </div>
      </section>

      {/* DUAL-ENGINE: DIGITAL SERVICES STUDIO & CORPORATE EXPANSION */}
      <section className="py-20 bg-gradient-to-b from-[#020716] via-[#061230] to-[#020716] border-y border-cyan-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technology Training & Services Startup</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              We Don&apos;t Just Teach Tech.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                We Build & Deploy It.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              MashTech Solutions operates as a dual-engine technology powerhouse: an accredited modern academy cultivating top-tier developers, and a high-performance digital services studio engineering software for businesses across Nigeria and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Engine 1: Digital Studio */}
            <div className="p-8 rounded-3xl bg-[#071330]/90 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Digital Services Studio</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bespoke web applications, high-converting corporate sites, cross-platform mobile apps (React Native), brand identity systems, and cloud infrastructure on AWS/Vercel/Supabase.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Web & SaaS Engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>UI/UX & Brand Systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Cloud Architecture & DevOps</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Studio Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Engine 2: Corporate Training */}
            <div className="p-8 rounded-3xl bg-[#071330]/90 border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Corporate & School Upskilling</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tailored corporate technology training for corporate enterprises, educational institutions, government agencies, and SMEs. Upskill your workforce in cybersecurity, cloud, and programming.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Executive Cybersecurity Drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Modern Full-Stack Bootcamps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Customized Hybrid Curriculums</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/corporate-training"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs text-center hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Request Corporate Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Engine 3: Faculty Recruitment Campaign */}
            <div className="p-8 rounded-3xl bg-[#071330]/90 border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between space-y-6 shadow-xl relative group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    WE ARE HIRING
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Faculty & Instructors</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instructors wanted across all technology disciplines: Web Development, Mobile Apps, Cloud Engineering, Cyber Security, UI/UX, Data Science, and Graphic Design.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Competitive Compensation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Flexible Remote / Hybrid Sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Shape Africa&apos;s Tech Leaders</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/careers"
                className="w-full py-3 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-950/60 font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Apply as an Instructor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. VIRTUAL CLASSROOM & VERIFICATION PREVIEW */}
      <section className="py-20 bg-gradient-to-b from-[#030919] via-[#051336] to-[#030919] border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Seamless Digital Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Virtual Classroom, Live Lectures & Realtime Discussion
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly with your instructor over Google Meet or Zoom, access recorded videos for revision, submit programming assignments, and ask questions in course discussion rooms powered by Supabase.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Live Google Meet & Zoom integrated lectures with calendar reminders',
                  'Structured curriculum: Course → Module → Lesson → Materials',
                  'Direct homework submission, grading rubric, and instructor comments',
                  'Automated tamper-evident completion certificates with public verification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/verify-certificate"
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Test Certificate Verification Portal</span>
                </Link>
                <Link
                  href="/student/dashboard"
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-all"
                >
                  Explore Student Classroom
                </Link>
              </div>
            </div>

            {/* Visual Box */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[#08183d] to-[#040e28] border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Live Classroom Portal</h4>
                    <p className="text-[11px] text-cyan-400">Google Meet / Zoom Synchronized</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Live Sync
                </span>
              </div>

              {/* Sample scheduled lecture */}
              <div className="p-4 rounded-2xl bg-[#030b20] border border-blue-900 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Tomorrow at 6:00 PM WAT</span>
                  <span className="text-cyan-400 font-semibold">Web Development</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Building Supabase RLS Policies & Auth Integration
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px]">
                      DO
                    </div>
                    <span>Dr. David Okon</span>
                  </div>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    Join Lecture
                  </a>
                </div>
              </div>

              {/* Sample Certificate preview banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-cyan-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Tamper-Proof Certificates</div>
                    <div className="text-[11px] text-slate-400">Sample ID: MTS-2026-PY-8841</div>
                  </div>
                </div>
                <Link
                  href="/verify-certificate?id=MTS-2026-PY-8841"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white transition-colors"
                >
                  Verify
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION & DIRECT CONTACT */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-950 via-[#0a1e4c] to-blue-950 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Start Your Tech Career Today
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Ready to Master In-Demand Tech Skills?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of successful students learning Programming, Cyber Security, UI/UX, Cloud, and Web Engineering at MashTech Solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-400/30 hover:brightness-110 transition-all"
                >
                  Enroll in a Course Now
                </Link>
                <a
                  href="tel:07058124966"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 border border-cyan-500/50 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call 07058124966 / 08106071514</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
