
import React, { useState } from 'react';

interface ProfileViewProps {
  onLogout?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    storeName: 'Rivera Style Collective',
    email: 'alex@riverastyle.com',
    bio: 'Curating the finest minimalist apparel and home decor since 2018.',
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-700 pb-12">
      <div className="relative">
        <div className="h-64 w-full bg-slate-900 rounded-[48px] overflow-hidden relative shadow-2xl">
          <img src="https://picsum.photos/seed/storecover/1200/400" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <button className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          </button>
        </div>
        <div className="absolute -bottom-16 left-12 flex flex-col md:flex-row items-end gap-8 w-full pr-24">
          <div className="relative flex-shrink-0 group">
            <div className="w-40 h-40 bg-white rounded-[40px] p-2 shadow-2xl relative">
              <img src="https://picsum.photos/seed/seller/200/200" className="w-full h-full rounded-[34px] object-cover" />
              <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a48.324 48.324 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /></svg>
              </button>
            </div>
          </div>
          <div className="pb-8 flex-1">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{formData.storeName}</h1>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{formData.name} • Master Seller Tier</p>
          </div>
          <div className="pb-8 mr-24 hidden md:block">
            <button 
              onClick={onLogout}
              className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              Logout Account
            </button>
          </div>
        </div>
      </div>

      <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Public Store Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Store Name</label>
                <input 
                  type="text" 
                  value={formData.storeName}
                  onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Tagline</label>
                <input 
                  type="text" 
                  placeholder="e.g. Minimalist Home Decor"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Biography</label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all">Discard Changes</button>
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Save Store Profile</button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Business Verification</h3>
               <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Fully Verified</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                  </div>
                  <div>
                    <p className="font-black text-emerald-900">Compliance Check Status</p>
                    <p className="text-emerald-700/70 text-xs font-bold">Updated on Oct 12, 2024</p>
                  </div>
                </div>
                <button className="text-emerald-700 font-black text-xs uppercase hover:underline">View Badge</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Tax ID / GST</p>
                  <p className="text-sm font-black text-slate-800">22AAAAA0000A1Z5</p>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Company PAN</p>
                  <p className="text-sm font-black text-slate-800">ABCDE1234F</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 tracking-tight">Security & Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 13.5h13.5c1.243 0 2.25-1.007 2.25-2.25V12.75c0-1.243-1.007-2.25-2.25-2.25h-13.5c-1.243 0-2.25 1.007-2.25 2.25v8.25c0 1.243 1.007 2.25 2.25 2.25Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">2FA Security</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">Active</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-slate-600"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">API Integration</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">2 Active Keys</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300 group-hover:text-slate-600"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 space-y-4">
            <h4 className="text-red-700 font-black text-sm uppercase tracking-widest">Account Closure</h4>
            <p className="text-red-600/70 text-xs leading-relaxed">Closing your store will permanently remove all product listings, customer history, and pending payouts.</p>
            <button className="w-full py-3 bg-white border-2 border-red-200 text-red-600 rounded-2xl text-[10px] font-black uppercase hover:bg-red-50 transition-all">Permanently Close Store</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
