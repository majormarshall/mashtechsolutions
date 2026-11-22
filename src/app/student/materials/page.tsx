'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/data-context';
import { Download, FileText, FolderArchive, Search } from 'lucide-react';

export default function StudentMaterialsPage() {
  const { materials } = useData();
  const [search, setSearch] = useState('');

  const filtered = materials.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    (m.course_title && m.course_title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Course Materials & Downloads</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Download lecture slide decks, cheat sheets, lab guides, and starter code repositories.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search downloads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="p-6 rounded-3xl bg-[#071330] border border-blue-900/60 flex flex-col justify-between space-y-4 shadow-xl hover:border-cyan-500/40 transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                {mat.file_type === 'zip' ? <FolderArchive className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                  {mat.course_title}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2">{mat.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Format: {mat.file_type.toUpperCase()} • {((mat.file_size_kb || 2048) / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>

            <a
              href={mat.file_url}
              download
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-cyan-600 hover:text-white text-cyan-300 border border-blue-900 flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resource</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
