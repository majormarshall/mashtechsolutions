'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/lib/context/data-context';
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  LogOut, 
  User, 
  ShieldCheck, 
  LogIn, 
  UserPlus,
  BookOpen
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated, logout, notifications, markNotificationAsRead } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.is_read);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Corporate Training', href: '/corporate-training' },
    { name: 'Careers', href: '/careers' },
    { name: 'Instructors', href: '/instructors' },
    { name: 'Verify Certificate', href: '/verify-certificate' },
    { name: 'Contact', href: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!currentUser) return '/auth/login';
    switch (currentUser.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'client':
        return '/client/dashboard';
      default:
        return '/student/dashboard';
    }
  };

  const handleSignOut = () => {
    logout();
    setShowUserDropdown(false);
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#030919]/90 backdrop-blur-md border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
              <Image 
                src="/logos/mashtech-logo.jpg" 
                alt="MashTech Solutions Logo" 
                fill 
                sizes="48px"
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                MashTech <span className="text-cyan-400">Solutions</span>
              </span>
              <span className="text-[10px] tracking-widest text-cyan-300/80 uppercase font-medium">
                ...Learn • Build • Innovate
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Authentication State & Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            
            {isAuthenticated && currentUser ? (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifs.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-[#030919]"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#091530] border border-blue-900/80 shadow-2xl p-3 z-50">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-950">
                        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Notifications</span>
                        <span className="text-[11px] text-cyan-400">{unreadNotifs.length} new</span>
                      </div>
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-4">No notifications yet</p>
                        ) : (
                          notifications.slice(0, 4).map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationAsRead(n.id)}
                              className={`p-2.5 rounded-xl cursor-pointer transition-colors text-xs ${
                                n.is_read ? 'bg-slate-900/40 text-slate-400' : 'bg-blue-950/60 text-slate-200 border-l-2 border-cyan-400'
                              }`}
                            >
                              <div className="font-semibold text-white">{n.title}</div>
                              <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{n.message}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logged in User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09183d] border border-blue-900/80 hover:border-cyan-500/50 transition-all text-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black flex items-center justify-center text-[11px]">
                      {currentUser.full_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white leading-tight line-clamp-1">{currentUser.full_name}</div>
                      <div className="text-[10px] text-cyan-400 capitalize">{currentUser.role}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#071330] border border-blue-900/90 shadow-2xl p-2 z-50 space-y-1 text-xs">
                      <div className="p-2 border-b border-blue-950 text-slate-400">
                        <div className="text-[11px] font-bold text-white truncate">{currentUser.email}</div>
                        <div className="text-[10px] text-cyan-400 uppercase font-semibold mt-0.5">Role: {currentUser.role}</div>
                      </div>

                      <Link
                        href={getDashboardPath()}
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-blue-950 transition-colors font-medium"
                      >
                        <GraduationCap className="w-4 h-4 text-cyan-400" />
                        <span>Go to Dashboard</span>
                      </Link>

                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Dashboard Direct Button */}
                <Link
                  href={getDashboardPath()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 transition-all"
                >
                  <span>Open {currentUser.role === 'admin' ? 'Admin Center' : currentUser.role === 'instructor' ? 'Instructor Hub' : 'Classroom'}</span>
                </Link>
              </>
            ) : (
              /* Public / Guest options: Sign in & Register */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}

          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07132e] border-b border-blue-900/60 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-blue-950 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-blue-950 flex flex-col gap-2">
            {isAuthenticated && currentUser ? (
              <>
                <div className="text-xs text-slate-300 font-semibold px-1">
                  Signed in as <strong>{currentUser.full_name}</strong> ({currentUser.role})
                </div>
                <Link
                  href={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="text-center py-2 text-xs font-semibold text-rose-400 bg-rose-950/20 rounded-xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-xs font-bold text-center bg-slate-900 text-white rounded-xl border border-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-xs font-bold text-center bg-cyan-600 text-white rounded-xl shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
