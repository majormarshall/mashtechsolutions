'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/context/data-context';
import { 
  Briefcase, 
  CheckCircle2, 
  Send, 
  GraduationCap, 
  Code, 
  ShieldCheck, 
  Palette, 
  Sparkles, 
  PhoneCall, 
  Mail,
  UserCheck,
  Laptop
} from 'lucide-react';

export default function CareersPage() {
  const { submitInstructorApplication } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('Web Development (Frontend / Full Stack)');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [experienceSummary, setExperienceSummary] = useState('');
  const [availability, setAvailability] = useState<'online' | 'in-person' | 'hybrid'>('hybrid');
  const [submitted, setSubmitted] = useState(false);

  const disciplines = [
    { title: 'Programming & Software Development', desc: 'Python, JavaScript, TypeScript, APIs and clean architecture.' },
    { title: 'Web Development (Frontend & Backend)', desc: 'Next.js, React, Tailwind CSS, Node.js, and PostgreSQL/Supabase.' },
    { title: 'Cybersecurity & Ethical Hacking', desc: 'Defensive labs, network analysis, ethical penetration testing, and digital safety.' },
    { title: 'Graphics Design & Brand Identity', desc: 'Photoshop, Illustrator, CorelDraw, brand guidelines and marketing creatives.' },
    { title: 'UI/UX & Product Design', desc: 'Figma design systems, wireframing, user research, and interactive prototyping.' },
    { title: 'Mobile App Development', desc: 'Cross-platform native apps with Flutter or React Native.' },
    { title: 'Data Analysis & Cloud Systems', desc: 'SQL, Python data science, PowerBI, cloud databases, and DevOps.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !experienceSummary.trim()) return;

    submitInstructorApplication({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      specialization,
      portfolio_url: portfolioUrl.trim() || undefined,
      github_url: githubUrl.trim() || undefined,
      experience_summary: experienceSummary.trim(),
      availability
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MashTech Solutions is Hiring</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Instructors Wanted — <span className="text-cyan-400">All Technology Disciplines</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Share your knowledge. Build practical skills. Shape the next generation of tech innovators and lead project cohorts.
          </p>
        </div>

        {/* Disciplines Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">Open Instructor Disciplines</h2>
            <p className="text-xs text-slate-400">
              We welcome practitioners passionate about project-based mentoring across:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((d, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 hover:border-cyan-500/40 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-800">
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white">{d.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-10">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who Can Apply & Expectations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <span>Who Can Apply?</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Experienced professionals & practitioners</strong> actively working in the tech industry.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Graduates, career changers & self-taught experts</strong> with demonstrable projects and proven skills.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clear, patient communicators</strong> who genuinely enjoy mentoring and unlocking potential in students.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Able to deliver practical, lab-based lessons <strong>online, in-person, or in hybrid schedules</strong>.</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Why Teach at MashTech?</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Competitive Compensation:</strong> Transparent course revenue-sharing and project stipends.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Flexible Delivery:</strong> Teach evening and weekend cohorts via Google Meet or in-person workshops.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Digital Services Collaboration:</strong> Top instructors are invited to join client development projects.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Community Leadership:</strong> Direct interaction with motivated, ambitious students.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#071330] border border-cyan-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-white">Instructor Application Form</h3>
            <p className="text-xs text-slate-400">
              Complete the application below or email your CV directly to <span className="text-cyan-400 font-mono">mashtechsolutions4@gmail.com</span>
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Application Received!</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thank you for applying to join the MashTech faculty, <strong>{fullName}</strong>. Our academic team will review your credentials and reach out for a demo lecture interview.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Emeka Nwosu"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07058124966"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Area of Specialisation *</label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Programming & Software Development">Programming & Software Development</option>
                    <option value="Web Development (Frontend / Full Stack)">Web Development (Frontend / Full Stack)</option>
                    <option value="Cybersecurity & Ethical Hacking">Cybersecurity & Ethical Hacking</option>
                    <option value="Graphics Design & Brand Identity">Graphics Design & Brand Identity</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                    <option value="Mobile App Development (Flutter/React Native)">Mobile App Development</option>
                    <option value="Data Analysis & Cloud Systems">Data Analysis & Cloud Systems</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio or Website URL</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://behance.net/yourprofile or website"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Code Link (Optional)</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Availability Mode</label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      value="hybrid"
                      checked={availability === 'hybrid'}
                      onChange={() => setAvailability('hybrid')}
                      className="accent-cyan-400"
                    />
                    <span>Hybrid (Online + Onsite)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      value="online"
                      checked={availability === 'online'}
                      onChange={() => setAvailability('online')}
                      className="accent-cyan-400"
                    />
                    <span>100% Online</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      value="in-person"
                      checked={availability === 'in-person'}
                      onChange={() => setAvailability('in-person')}
                      className="accent-cyan-400"
                    />
                    <span>In-Person Onsite Only</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experience & Mentorship Summary *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your technical background, past teaching or mentorship experience, and why you want to teach at MashTech..."
                  value={experienceSummary}
                  onChange={(e) => setExperienceSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Instructor Application</span>
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-slate-400 space-y-1">
            <div>Prefer direct email application? Send your CV & portfolio to:</div>
            <div className="font-mono text-cyan-400 font-bold">mashtechsolutions4@gmail.com</div>
            <div className="text-[11px] text-slate-500 pt-1">Call / WhatsApp: 07058124966 | 08106071514</div>
          </div>
        </div>

      </div>
    </div>
  );
}
