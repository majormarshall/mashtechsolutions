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
  AlertCircle,
  Building2,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';
import { OFFICIAL_BANK_ACCOUNTS } from '@/lib/data/bankAccounts';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { courses, enrollInCourse, enrollments, currentUser } = useData();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [admissionTrack, setAdmissionTrack] = useState<'regular' | 'scholarship'>('regular');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'paystack'>('bank_transfer');
  const [selectedBank, setSelectedBank] = useState<'OPay' | 'PalmPay' | 'UBA'>('OPay');
  const [senderName, setSenderName] = useState(currentUser?.full_name || '');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const course = courses.find((c) => c.slug === slug) || courses[0];
  const isAlreadyEnrolled = currentUser 
    ? enrollments.some((e) => e.student_id === currentUser.id && e.course_id === course.id)
    : false;

  const currentAmount = admissionTrack === 'scholarship' ? 40000 : course.price;

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleBankTransferPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      enrollInCourse(course.id, {
        method: `Direct Bank Transfer (${selectedBank})`,
        bank: selectedBank,
        reference: `MTS_TRF_${selectedBank.toUpperCase()}_${Math.floor(10000000 + Math.random() * 90000000)}`,
        enrollment_type: admissionTrack,
        scholarship_fee_paid: admissionTrack === 'scholarship'
      });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        router.push(`/student/classroom/${course.id}`);
      }, 2500);
    }, 1200);
  };

  const handlePaystackPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      enrollInCourse(course.id, {
        method: 'Paystack Automated Gateway',
        reference: `MTS_PAY_${Math.floor(100000000 + Math.random() * 900000000)}`,
        enrollment_type: admissionTrack,
        scholarship_fee_paid: admissionTrack === 'scholarship'
      });
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
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block">One-time Tuition</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white">₦{course.price.toLocaleString()}</span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      Standard
                    </span>
                  </div>
                </div>

                {/* Scholarship Track Option Box */}
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Scholarship Admission Track</span>
                    </span>
                    <span className="text-amber-300 font-black">₦40,000</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80 leading-relaxed">
                    Apply for 100% tuition sponsorship. Screening examination & application form fee: ₦40,000.
                  </p>
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
                  <span>{currentUser ? 'Enroll Now / Apply for Scholarship' : 'Sign In to Enroll'}</span>
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

      {/* Checkout Modal (Direct Bank Transfer + Paystack) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  ₦
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Tuition Settlement</h3>
                  <p className="text-[11px] text-slate-400">Choose Direct Bank Transfer or Paystack</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">Payment Verified!</h4>
                <p className="text-xs text-slate-300">
                  Congratulations! You are officially enrolled in <strong>{course.title}</strong>. Redirecting to your virtual classroom...
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Admission Track Selector: Standard vs Scholarship */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Select Admission Track:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAdmissionTrack('regular')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        admissionTrack === 'regular'
                          ? 'bg-blue-950/80 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>Standard Tuition</span>
                        <span className="text-cyan-400">₦{course.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Full 12-week cohort access, live mentoring & diploma.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAdmissionTrack('scholarship')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        admissionTrack === 'scholarship'
                          ? 'bg-amber-950/70 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span className="flex items-center gap-1 text-amber-300">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Scholarship Track</span>
                        </span>
                        <span className="text-amber-400 font-black">₦40,000</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Application form & screening examination fee.</p>
                    </button>
                  </div>
                </div>

                {/* Tuition Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Selected Track:</span>
                    <span className="text-white font-semibold">
                      {course.title} {admissionTrack === 'scholarship' ? '(Scholarship Track)' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Student Applicant:</span>
                    <span className="text-white font-semibold">{currentUser?.full_name || 'Student'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-xs text-slate-300 font-bold">
                      {admissionTrack === 'scholarship' ? 'Scholarship Application Form Fee:' : 'Total Tuition Fee:'}
                    </span>
                    <span className={`text-2xl font-black ${admissionTrack === 'scholarship' ? 'text-amber-400' : 'text-cyan-400'}`}>
                      ₦{currentAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paystack')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'paystack'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Paystack (Card/USSD)</span>
                  </button>
                </div>

                {paymentMethod === 'bank_transfer' ? (
                  /* DIRECT BANK TRANSFER OPTION */
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>Select Bank to Transfer:</span>
                        <span className="text-[10px] text-cyan-400">Instant credit & admission</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Transfer <strong>₦{currentAmount.toLocaleString()}</strong> to any of our verified accounts:
                      </p>
                    </div>

                    {/* Bank Selection Tabs */}
                    <div className="grid grid-cols-3 gap-2">
                      {(['OPay', 'PalmPay', 'UBA'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            selectedBank === b
                              ? b === 'OPay'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-400'
                                : b === 'PalmPay'
                                ? 'bg-purple-950 text-purple-300 border-purple-400'
                                : 'bg-red-950 text-rose-300 border-rose-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {/* Selected Bank Details Card */}
                    {(() => {
                      const currentAcc = OFFICIAL_BANK_ACCOUNTS.find(a => a.tag === selectedBank) || OFFICIAL_BANK_ACCOUNTS[0];
                      const isCopied = copiedAccount === currentAcc.accountNumber;

                      return (
                        <div className={`p-4 rounded-2xl border bg-gradient-to-br ${currentAcc.color} space-y-3 relative`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{currentAcc.bankName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-700">
                              {currentAcc.badge}
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Account Number</div>
                              <div className="text-xl font-mono font-black text-white tracking-widest">
                                {currentAcc.accountNumber}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyAccount(currentAcc.accountNumber)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="text-[11px] text-slate-300">
                            <span className="text-slate-400">Account Name: </span>
                            <strong className="text-white">{currentAcc.accountName}</strong>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Sender Details Form */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Transfer Sender Name / Reference
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Emmanuel Adeleke (or transaction narration)"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <button
                        disabled={isProcessing}
                        onClick={handleBankTransferPayment}
                        className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:brightness-110 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <span>Confirming Bank Transfer...</span>
                        ) : (
                          <span>I Have Sent ₦{currentAmount.toLocaleString()} — Confirm & Enroll</span>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* PAYSTACK OPTION */
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200/90 leading-relaxed">
                      Instant card, USSD (*737#, *966#), Apple Pay, or QR settlement processed directly via Paystack PCI-DSS certified gateway.
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>256-Bit SSL Encrypted Paystack Infrastructure</span>
                    </div>

                    <button
                      disabled={isProcessing}
                      onClick={handlePaystackPayment}
                      className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <span>Processing with Paystack...</span>
                      ) : (
                        <span>Pay ₦{currentAmount.toLocaleString()} with Paystack</span>
                      )}
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/80 text-center">
                  <span className="text-[11px] text-slate-400">
                    Questions or payment assistance? Call <strong className="text-cyan-400">07058124966</strong> / <strong className="text-cyan-400">08106071514</strong>
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
