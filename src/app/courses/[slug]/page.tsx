'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Play, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { courses, enrollInCourse, enrollments, currentUser } = useData();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const course = courses.find((c) => c.slug === slug) || courses[0];
  const isAlreadyEnrolled = currentUser 
    ? enrollments.some((e) => e.student_id === currentUser.id && e.course_id === course.id)
    : false;

  const handlePaystackPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      enrollInCourse(course.id);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        router.push(`/student/classroom/${course.id}`);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-white">Courses</Link>
          <span>/</span>
          <span className="text-cyan-400">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Students: <strong>{course.enrolled_count || 120}+ Enrolled</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Certificate: <strong>MashTech Verified Diploma</strong></span>
                </div>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="p-6 rounded-2xl bg-[#061433] border border-blue-900/60 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                What You Will Learn & Build
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learning_outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Course Curriculum</h3>
                <span className="text-xs text-slate-400">
                  {course.modules?.length || 4} Modules • Live Classes Included
                </span>
              </div>

              <div className="space-y-3">
                {(course.modules && course.modules.length > 0 ? course.modules : [
                  { id: 'm1', title: 'Module 1: Foundations & Architecture', lessons: [
                    { id: 'l1', title: 'Course Orientation & Environment Setup', duration_minutes: 25 },
                    { id: 'l2', title: 'Core Principles & Best Practices', duration_minutes: 35 }
                  ]},
                  { id: 'm2', title: 'Module 2: Practical Implementation & Lab Projects', lessons: [
                    { id: 'l3', title: 'Building the Solution Architecture', duration_minutes: 45 },
                    { id: 'l4', title: 'Database & Security Integration', duration_minutes: 50 }
                  ]},
                  { id: 'm3', title: 'Module 3: Capstone Deployment & Portfolio', lessons: [
                    { id: 'l5', title: 'Production Cloud Deployment & Verification', duration_minutes: 40 }
                  ]}
                ]).map((mod, idx) => (
                  <div key={mod.id || idx} className="rounded-xl border border-blue-900/60 bg-[#071330] overflow-hidden">
                    <div className="px-5 py-3.5 bg-blue-950/40 flex items-center justify-between text-sm font-bold text-white">
                      <span>{mod.title}</span>
                      <span className="text-xs text-cyan-400 font-normal">{mod.lessons?.length || 2} Lessons</span>
                    </div>
                    <div className="divide-y divide-blue-950/60">
                      {mod.lessons?.map((les, lIdx) => (
                        <div key={les.id || lIdx} className="px-5 py-3 flex items-center justify-between text-xs text-slate-300 hover:bg-blue-900/20 transition-colors">
                          <div className="flex items-center gap-3">
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

            {/* Course Requirements */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Requirements</h3>
              <ul className="space-y-2">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor Bio */}
            <div className="p-6 rounded-2xl bg-[#061433] border border-blue-900/60 flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-cyan-400/40">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt={course.instructor_name || 'Dr. David Okon'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Course Instructor</span>
                <h4 className="text-base font-bold text-white">{course.instructor_name || 'Dr. David Okon'}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Senior Software Engineer & Cybersecurity Specialist with over 10 years of commercial system architecture and active teaching experience.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Enrollment Box */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="rounded-3xl p-6 bg-gradient-to-b from-[#081738] to-[#040e26] border border-cyan-500/30 shadow-2xl space-y-6">
              
              {/* Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-blue-900/80">
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">One-time Tuition</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-white">₦{course.price.toLocaleString()}</span>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    All-Inclusive
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {isAlreadyEnrolled ? (
                <Link
                  href={`/student/classroom/${course.id}`}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-center block shadow-lg hover:brightness-110 transition-all"
                >
                  Go to Classroom (Already Enrolled)
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (!currentUser) {
                      router.push(`/auth/login?redirect=/courses/${course.slug}`);
                    } else {
                      setShowCheckoutModal(true);
                    }
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{currentUser ? 'Enroll with Paystack' : 'Sign In to Enroll'}</span>
                </button>
              )}

              {/* Guarantee points */}
              <div className="space-y-2 pt-2 border-t border-blue-950 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Secured Paystack checkout (Cards & Bank Transfer)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Instant access to live classes & recorded library</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Verifiable certificate upon completion</span>
                </div>
              </div>

              {/* Direct Admission Helpline */}
              <div className="p-3.5 rounded-xl bg-[#030919] border border-blue-900/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400">Need help or bank transfer verification?</p>
                <p className="text-xs font-bold text-cyan-300">Call 07058124966 / 08106071514</p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Paystack Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  ₦
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Paystack Checkout</h3>
                  <p className="text-[11px] text-slate-400">Secure Tuition Payment</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">Payment Verified!</h4>
                <p className="text-xs text-slate-300">
                  Congratulations! You are officially enrolled in <strong>{course.title}</strong>. Redirecting to your classroom...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Course:</span>
                    <span className="text-white font-semibold">{course.title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Student:</span>
                    <span className="text-white font-semibold">{currentUser?.full_name || 'Student'}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Email:</span>
                    <span className="text-white font-semibold">{currentUser?.email || ''}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-xs text-slate-300 font-bold">Total Tuition:</span>
                    <span className="text-xl font-black text-cyan-400">₦{course.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>256-Bit SSL Encrypted by Paystack Payment Infrastructure</span>
                </div>

                <button
                  disabled={isProcessing}
                  onClick={handlePaystackPayment}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Verifying with Paystack Gateway...</span>
                  ) : (
                    <span>Complete ₦{course.price.toLocaleString()} Payment</span>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
