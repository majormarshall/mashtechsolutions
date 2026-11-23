'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  CreditCard, 
  LifeBuoy, 
  ChevronRight,
  LogOut,
  Building2,
  Lock,
  ArrowRight,
  Loader2,
  ShieldAlert
} from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isInitialized, logout } = useData();

  const menuItems = [
    { name: 'Client Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
    { name: 'Active Projects', href: '/client/projects', icon: FolderKanban },
    { name: 'Request Service / Quote', href: '/client/requests', icon: PlusCircle },
    { name: 'Invoices & Paystack', href: '/client/invoices', icon: CreditCard },
    { name: 'Project Support', href: '/client/support', icon: LifeBuoy },
  ];

  // 1. Loading state while checking localStorage session
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#020716] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
        <h3 className="text-white font-bold text-lg">Authenticating Session...</h3>
        <p className="text-slate-400 text-sm mt-1">Verifying client workspace access</p>
      </div>
    );
  }

  // 2. Unauthenticated Gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#020716] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#050f26] border border-blue-900/80 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Client Portal Sign-In Required</h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Sign in to track your commissioned digital projects, milestone deliverables, proposals, and Paystack invoices.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/register"
              className="block w-full py-2.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Commission a Project? Register as a Client
            </Link>
            <Link
              href="/"
              className="block w-full py-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Role check: Allow clients and admins
  if (currentUser.role !== 'client' && currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#020716] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#050f26] border border-blue-900/60 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Client Workspace Only</h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              You are signed in as <span className="text-white font-semibold">{currentUser.full_name}</span> with a <span className="text-cyan-400 capitalize">{currentUser.role}</span> account.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Link
              href={currentUser.role === 'instructor' ? '/instructor/dashboard' : '/student/dashboard'}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-cyan-600 text-white hover:bg-cyan-500 transition-all"
            >
              <span>Go to Your Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                logout();
                router.push('/auth/login?redirect=/client/dashboard');
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const initials = currentUser.full_name
    ? currentUser.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'CL';

  return (
    <div className="min-h-screen bg-[#020716] flex flex-col md:flex-row">
      
      {/* Client Sidebar */}
      <aside className="w-full md:w-64 bg-[#050f26] border-r border-blue-950/80 p-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Client Profile capsule */}
          <div className="p-3.5 rounded-2xl bg-[#09183d] border border-blue-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-black flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.full_name}</h4>
              <p className="text-[10px] text-cyan-400 font-medium capitalize flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {currentUser.role === 'admin' ? 'Admin / Client View' : 'Client Workspace'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Project Delivery
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/client/dashboard' && pathname.startsWith(item.href));
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

        {/* Sidebar Footer with Sign Out */}
        <div className="pt-6 border-t border-blue-950/80 space-y-2">
          <div className="px-3 py-2 text-[11px] text-slate-400 truncate">
            {currentUser.email}
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/auth/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-red-400 bg-red-950/30 border border-red-900/50 hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
