'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/data-context';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Send, 
  Sparkles, 
  Clock, 
  PhoneCall,
  Laptop,
  Briefcase
} from 'lucide-react';

export default function CorporateTrainingPage() {
  const { submitServiceRequest, currentUser } = useData();

  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState(currentUser?.full_name || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [teamSize, setTeamSize] = useState('10 - 25 Learners');
  const [trainingTrack, setTrainingTrack] = useState('Cybersecurity & Defensive IT');
  const [format, setFormat] = useState('Hybrid (Online + Weekend Onsite)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactName.trim() || !contactEmail.trim()) return;

    submitServiceRequest({
      client_id: currentUser?.id,
      client_name: contactName.trim(),
      client_email: contactEmail.trim(),
      client_phone: contactPhone.trim() || '07058124966',
      company_name: orgName.trim(),
      service_title: `Corporate Training: ${trainingTrack} (${teamSize})`,
      budget_range: 'Corporate Contract',
      timeline: format,
      project_brief: `Organization: ${orgName}. Cohort size: ${teamSize}. Mode: ${format}. Training Track: ${trainingTrack}. Special Requirements: ${notes}`
    });

    setSubmitted(true);
  };

  const tracks = [
    {
      title: 'Defensive Cybersecurity & Digital Safety',
      desc: 'Employee phishing defense, password governance, network security hygiene, and incident reporting protocols.',
      duration: '2–4 Weeks',
      icon: ShieldCheck
    },
    {
      title: 'Full-Stack Software & Web Systems',
      desc: 'Upskilling in-house engineering and IT teams in Next.js, APIs, Supabase PostgreSQL, and modern cloud deployment.',
      duration: '4–8 Weeks',
      icon: Laptop
    },
    {
      title: 'Data Analysis, Automation & Business Intelligence',
      desc: 'Practical data cleaning, Excel power tools, Google Workspace automation, and executive dashboard reporting.',
      duration: '3–6 Weeks',
      icon: Briefcase
    },
    {
      title: 'UI/UX Product Design & Figma Mastery',
      desc: 'Design thinking, user journey mapping, and collaborative Figma prototyping for product and marketing teams.',
      duration: '3–5 Weeks',
      icon: Users
    }
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>MashTech Corporate Training & Workforce Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Tailored Technology Training for <span className="text-cyan-400">Schools & Enterprises</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Upskill your staff, university departments, and institutional teams with measurable, project-based digital skills delivered onsite, online, or in hybrid cohorts.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Custom Curricula</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We design our training modules specifically around your company&apos;s tech stack, security policies, and productivity objectives.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dedicated Private Cohorts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Private virtual classroom or onsite workshops with flexible weekend or weekday scheduling that doesn&apos;t disrupt business hours.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Executive Progress Reporting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Management progress dashboards, attendance tracking, lab assessments, and official verifiable MashTech diplomas.
            </p>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Institutional Training Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              High-impact programs taught by seasoned industry practitioners and certified trainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track, idx) => {
              const Icon = track.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-[#071330] border border-blue-900/60 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{track.duration}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{track.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{track.desc}</p>
                  </div>
                  
                  <div className="pt-2 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Includes Practical Lab Simulations & Certificate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Inquiry Form */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#071330] border border-cyan-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-white">Request a Corporate Proposal</h3>
            <p className="text-xs text-slate-400">
              Tell us about your organization and our training director will reach out within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Proposal Request Dispatched!</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thank you! We have received your inquiry for <strong>{orgName}</strong>. Our enterprise team will prepare a structured curriculum proposal and follow up via {contactEmail}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Apex Holdings Ltd or Lead British International School"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. HR Manager / Director"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. hr@company.ng"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. 07058124966"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Est. Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="5 - 10 Learners">5 - 10 Learners</option>
                    <option value="10 - 25 Learners">10 - 25 Learners</option>
                    <option value="25 - 50 Learners">25 - 50 Learners</option>
                    <option value="50+ Learners (Enterprise)">50+ Learners (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Discipline</label>
                  <select
                    value={trainingTrack}
                    onChange={(e) => setTrainingTrack(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Cybersecurity & Defensive IT">Cybersecurity & Defensive IT</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="UI/UX Product Design">UI/UX Product Design</option>
                    <option value="Data Analysis & Automation">Data Analysis & Automation</option>
                    <option value="Custom Mixed Curriculum">Custom Mixed Curriculum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Delivery Mode</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Hybrid (Online + Weekend Onsite)">Hybrid (Online + Onsite)</option>
                    <option value="100% Virtual Interactive">100% Virtual Interactive</option>
                    <option value="100% Onsite at Client Premises">100% Onsite at Client</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Needs & Desired Outcomes</label>
                <textarea
                  rows={3}
                  placeholder="Outline any specific software tools, employee skill levels, or particular project goals..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Corporate Training Request</span>
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Admissions Direct: 07058124966</span>
            </span>
            <span>•</span>
            <span>mashtechsolutions4@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}
