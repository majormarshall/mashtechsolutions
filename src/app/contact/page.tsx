'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: 'Web Development',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Contact MashTech Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Have questions about course admissions, custom enterprise training, payment plans, or curriculum? Our advisors are ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Reach Us Directly</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide fast turnaround on WhatsApp and direct phone calls during business and lecture hours.
              </p>

              <div className="space-y-4">
                <a 
                  href="tel:07058124966"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-900/80 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Phone & WhatsApp Admissions</div>
                    <div className="text-sm font-bold text-white mt-0.5">07058124966 / 08106071514</div>
                    <div className="text-[11px] text-cyan-400 mt-1">Available Mon - Sat (8am - 8pm WAT)</div>
                  </div>
                </a>

                <a 
                  href="mailto:mashtechsolutions4@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-900/80 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Official Inquiries & Support</div>
                    <div className="text-sm font-bold text-white mt-0.5">mashtechsolutions4@gmail.com</div>
                    <div className="text-[11px] text-cyan-400 mt-1">Guaranteed response within 24 hours</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-900/80">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Headquarters & Virtual Academy</div>
                    <div className="text-sm font-bold text-white mt-0.5">Hybrid Centers, Nigeria</div>
                    <div className="text-[11px] text-slate-400 mt-1">Serving students worldwide through Google Meet & Zoom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. A MashTech advisor will contact you shortly via email or phone ({formData.phone || formData.email}).
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', courseInterest: 'Web Development', message: '' }); }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Marshall"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08106071514"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course of Interest</label>
                      <select
                        value={formData.courseInterest}
                        onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Web Development">Full Stack Web Development</option>
                        <option value="Cyber Security">Cyber Security (Ethical Hacking)</option>
                        <option value="Programming">Python Programming</option>
                        <option value="Product Design">UI/UX Product Design</option>
                        <option value="Cloud Computing">Cloud Computing (AWS/Supabase)</option>
                        <option value="Creative Design">Graphics Design</option>
                        <option value="Other">Other Custom Training</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Message / Questions</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your learning goals or what you'd like to ask our academic team..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
