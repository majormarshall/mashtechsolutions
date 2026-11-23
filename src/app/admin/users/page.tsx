'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { UserRole } from '@/types';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  UserPlus, 
  CheckCircle, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Key,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminUsersPage() {
  const { users, addAdminUser, updateUserRole } = useData();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [roleChangeSuccess, setRoleChangeSuccess] = useState<string | null>(null);

  // Add Admin Modal State
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('Alpha112');
  const [adminHeadline, setAdminHeadline] = useState('System Administrator');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!adminName.trim() || !adminEmail.trim() || !adminPassword.trim()) {
      setModalError('Full name, email address, and password are required.');
      return;
    }

    const result = addAdminUser({
      full_name: adminName.trim(),
      email: adminEmail.trim(),
      phone: adminPhone.trim() || '+2347058124966',
      password: adminPassword.trim(),
      headline: adminHeadline.trim() || 'System Administrator'
    });

    if (result.success) {
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
        setShowAddAdminModal(false);
        setAdminName('');
        setAdminEmail('');
        setAdminPhone('');
        setAdminPassword('Alpha112');
      }, 1200);
    } else {
      setModalError(result.error || 'Failed to add administrator.');
    }
  };

  const handleRoleChange = (userId: string, userName: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    setRoleChangeSuccess(`User role for ${userName} has been updated to ${newRole.toUpperCase()}. All access privileges have been synced.`);
    setTimeout(() => setRoleChangeSuccess(null), 4000);
  };

  const filtered = users.filter(u => {
    const matchesSearch = 
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const instructorCount = users.filter(u => u.role === 'instructor').length;
  const studentCount = users.filter(u => u.role === 'student').length;
  const clientCount = users.filter(u => u.role === 'client').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-400 border border-cyan-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Governance</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">User Access & Role Management</h1>
          <p className="text-sm text-slate-400 mt-1">
            Supervise platform accounts, grant instructor privileges, and appoint new administrators with full dashboard permissions.
          </p>
        </div>

        <button
          onClick={() => {
            setModalError('');
            setShowAddAdminModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Administrator</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Administrators</div>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>{adminCount}</span>
          </div>
          <div className="text-[11px] text-slate-500">Full system console access</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Faculty Instructors</div>
          <div className="text-2xl font-black text-cyan-400">{instructorCount}</div>
          <div className="text-[11px] text-slate-500">Teaching active cohorts</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Students & Learners</div>
          <div className="text-2xl font-black text-blue-400">{studentCount}</div>
          <div className="text-[11px] text-slate-500">Enrolled in courses</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#050f26] border border-blue-950/80 space-y-1">
          <div className="text-xs text-slate-400 uppercase font-bold">Client Businesses</div>
          <div className="text-2xl font-black text-purple-400">{clientCount}</div>
          <div className="text-[11px] text-slate-500">Commissioning projects</div>
        </div>
      </div>

      {/* Alert toast message */}
      {roleChangeSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{roleChangeSuccess}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(['all', 'admin', 'instructor', 'student', 'client'] as const).map(rf => (
            <button
              key={rf}
              onClick={() => setRoleFilter(rf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                roleFilter === rf
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {rf === 'all' ? 'All Users' : rf === 'admin' ? 'Admins' : `${rf}s`} ({
                rf === 'all' ? users.length : users.filter(u => u.role === rf).length
              })
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="pb-3 pl-2">User Profile</th>
              <th className="pb-3">Email Address</th>
              <th className="pb-3">Phone / Contact</th>
              <th className="pb-3">Current Role Badge</th>
              <th className="pb-3 text-right pr-2">Assign Privilege Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60 text-slate-300">
            {filtered.map((u) => {
              const isAdmin = u.role === 'admin';
              return (
                <tr key={u.id} className="hover:bg-blue-900/20 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-white flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isAdmin 
                        ? 'bg-gradient-to-tr from-amber-500 to-red-600 text-slate-950 shadow-md shadow-amber-500/20' 
                        : 'bg-slate-800 text-cyan-400'
                    }`}>
                      {u.full_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold">{u.full_name}</span>
                        {isAdmin && (
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {u.headline || (isAdmin ? 'Platform Administrator' : 'Member')}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-300 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 text-slate-400">{u.phone || '07058124966'}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                      u.role === 'admin' ? 'bg-amber-950/80 text-amber-400 border border-amber-800' :
                      u.role === 'instructor' ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800' :
                      u.role === 'client' ? 'bg-purple-950/80 text-purple-400 border border-purple-800' :
                      'bg-blue-950/80 text-blue-300 border border-blue-800'
                    }`}>
                      {u.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                      <span>{u.role}</span>
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, u.full_name, e.target.value as UserRole)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="client">Client</option>
                      <option value="admin">Administrator 🛡️</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADD ADMINISTRATOR MODAL */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#071330] border border-amber-500/50 p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-950">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Administrative Access Provisioning</span>
                </div>
                <h3 className="text-xl font-black text-white">Add New Administrator</h3>
                <p className="text-xs text-slate-400">
                  Provision full platform administrative privileges to a new team member.
                </p>
              </div>
              <button 
                onClick={() => setShowAddAdminModal(false)} 
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {modalSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Administrator account created! They can now sign in at /auth/login.</span>
              </div>
            )}

            {modalError && (
              <div className="p-3.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleAddAdmin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Kenneth Cole"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Administrator Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="admin.lead@mashtech.ng"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="08106071514"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Sign-in Password *</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Set password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Title / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Co-Director / Operations Head"
                  value={adminHeadline}
                  onChange={(e) => setAdminHeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/60 text-amber-200/80 leading-relaxed text-[11px]">
                🛡️ Added administrators have full unrestricted access to Courses, Tuition Pricing, Enrollments, Payments, Faculty Reviews, and Client Projects.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:brightness-110 text-white shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Authorize Administrator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
