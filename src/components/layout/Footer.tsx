'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020612] border-t border-blue-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-cyan-500/30">
                <Image 
                  src="/logos/mashtech-logo.jpg" 
                  alt="MashTech Solutions Logo" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white">
                  MashTech <span className="text-cyan-400">Solutions</span>
                </span>
                <span className="text-[10px] tracking-widest text-cyan-300 uppercase font-medium">
                  ...Learn • Build • Innovate
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Equipping aspiring tech leaders and professionals with in-demand, real-world skills in Software Engineering, Cybersecurity, UI/UX, Cloud, and Data.
            </p>
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>07058124966 / 08106071514</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>mashtechsolutions4@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Virtual Campus & Hands-On Hybrid Centers, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Training Tracks
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses?cat=Web+Development" className="hover:text-cyan-400 transition-colors">Web Development</Link></li>
              <li><Link href="/courses?cat=Cyber+Security" className="hover:text-cyan-400 transition-colors">Ethical Hacking & Security</Link></li>
              <li><Link href="/courses?cat=Programming" className="hover:text-cyan-400 transition-colors">Python Programming</Link></li>
              <li><Link href="/courses?cat=Product+Design" className="hover:text-cyan-400 transition-colors">UI/UX Product Design</Link></li>
              <li><Link href="/courses?cat=Cloud+Computing" className="hover:text-cyan-400 transition-colors">Cloud Computing (AWS/Supabase)</Link></li>
              <li><Link href="/courses?cat=Creative+Design" className="hover:text-cyan-400 transition-colors">Graphics Design</Link></li>
            </ul>
          </div>

          {/* Quick Portals */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              LMS Portals
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/student/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Student Portal <ArrowUpRight className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link href="/instructor/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Instructor Hub <ArrowUpRight className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-1">Admin Control Center <ArrowUpRight className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link href="/verify-certificate" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300 font-medium">Verify Certificate <ShieldCheck className="w-3 h-3 text-cyan-400" /></Link></li>
              <li><Link href="/auth/login" className="hover:text-cyan-400 transition-colors">Sign In</Link></li>
              <li><Link href="/auth/register" className="hover:text-cyan-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Trust & Accreditations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Our Promise
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every course at MashTech Solutions comes with practical project portfolio milestones, verifiable tamper-proof certificates, and live mentorship sessions.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-blue-950/80 to-[#040e28] border border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verifiable Diplomas</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Employer-recognized certificates with verifiable QR codes & IDs.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} MashTech Solutions LMS. All rights reserved. Empowering the Next Generation of Tech Innovators.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About MashTech</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support & Contact</Link>
            <Link href="/verify-certificate" className="hover:text-white transition-colors">Verify Certificate</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
