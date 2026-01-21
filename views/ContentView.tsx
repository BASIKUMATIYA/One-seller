
import React, { useState } from 'react';

const ContentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reels' | 'stories' | 'highlights'>('reels');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Content Studio</h1>
          <p className="text-slate-500 text-sm">Create and manage high-engagement videos.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            Post Story
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload Reel
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {['reels', 'stories', 'highlights'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="aspect-[9/16] bg-slate-200 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <img 
              src={`https://picsum.photos/seed/content${i + 20}/300/500`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Reel content"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 p-4 flex flex-col justify-between opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-end">
                <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <div>
                <p className="text-white text-xs font-medium line-clamp-2">How to style our latest summer collection...</p>
                <div className="flex items-center gap-3 mt-2 text-white/90">
                  <span className="flex items-center gap-1 text-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    2.4k
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path d="M21 6.5l-1.45-1.32C15.4 1.36 12 0 12 0s-3.4 1.36-7.55 5.18L3 6.5l.5.5h17l.5-.5z"/></svg>
                    145
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentView;
