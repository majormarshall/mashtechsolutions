'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Award, 
  Bell, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, switchRole } = useData();

  const menuItems = [
    { name: 'Admin Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Courses & Pricing', href: '/admin/courses', icon: BookOpen },
    { name: 'Enrollments', href: '/admin/enrollments', icon: ShieldAlert },
    { name: 'Paystack Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Issue Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Announcements', href: '/admin/announcements', icon: Bell },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#020716] flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#050f26] border-r border-blue-950/80 p-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Admin Profile */}
          <div className="p-3.5 rounded-2xl bg-[#09183d] border border-blue-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-red-600 text-slate-950 font-black flex items-center justify-center shrink-0">
              EM
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.full_name}</h4>
              <p className="text-[10px] text-amber-400 font-bold uppercase">Executive Director</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Administration Center
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-900/80 to-cyan-900/60 text-cyan-300 border-l-2 border-cyan-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Portal switcher */}
        <div className="pt-6 border-t border-blue-950/80 space-y-2">
          <div className="p-3 rounded-xl bg-[#030a1c] border border-blue-900/60 text-center space-y-1.5">
            <div className="text-[10px] text-slate-400 font-semibold">Test Other Dashboards:</div>
            <div className="flex gap-1.5">
              <button
                onClick={() => switchRole('student')}
                className="flex-1 py-1 text-[10px] font-bold rounded-lg bg-blue-950 hover:bg-blue-900 text-cyan-300 border border-blue-800"
              >
                Student
              </button>
              <button
                onClick={() => switchRole('instructor')}
                className="flex-1 py-1 text-[10px] font-bold rounded-lg bg-blue-950 hover:bg-blue-900 text-cyan-300 border border-blue-800"
              >
                Instructor
              </button>
            </div>
          </div>
        </div>

      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
