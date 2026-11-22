'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { UserRole } from '@/types';
import { Users, Search, Shield, UserPlus, CheckCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const { users } = useData();
  const [search, setSearch] = useState('');
  const [roleChangeSuccess, setRoleChangeSuccess] = useState<string | null>(null);

  const filtered = users.filter(u => 
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">User Access & Role Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervise all platform users, grant instructor privileges, and govern administrative access.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {roleChangeSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{roleChangeSuccess}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-blue-950 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3 pl-2">User</th>
              <th className="pb-3">Email Address</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Current Role</th>
              <th className="pb-3">Privilege Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/60">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-blue-900/20 transition-colors">
                <td className="py-3.5 pl-2 font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                    {u.full_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div>{u.full_name}</div>
                    <div className="text-[10px] text-slate-400">{u.headline || 'Member'}</div>
                  </div>
                </td>
                <td className="py-3.5 text-slate-300">{u.email}</td>
                <td className="py-3.5 text-slate-400">{u.phone || '07058124966'}</td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    u.role === 'admin' ? 'bg-red-950 text-red-400 border border-red-800' :
                    u.role === 'instructor' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5">
                  <select
                    value={u.role}
                    onChange={(e) => {
                      u.role = e.target.value as UserRole;
                      setRoleChangeSuccess(`Role for ${u.full_name} updated to ${e.target.value}.`);
                      setTimeout(() => setRoleChangeSuccess(null), 3000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
