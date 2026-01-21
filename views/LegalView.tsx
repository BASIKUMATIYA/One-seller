
import React, { useState } from 'react';

type LegalTab = 'kyc' | 'tax' | 'policies';

const LegalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LegalTab>('kyc');

  const renderKyc = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            <div className="absolute -bottom-2 bg-emerald-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">TRUSTED</div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">KYC Status: Verified</h3>
          <p className="text-slate-500 text-sm max-w-lg">Your identity has been fully verified by our automated security engine. You have full access to global payouts and large-volume transactions.</p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
               <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Aadhaar Verified</span>
             </div>
             <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
               <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Liveness Check OK</span>
             </div>
          </div>
        </div>
        <button className="px-6 py-3 bg-slate-100 text-slate-600 font-black rounded-2xl text-xs uppercase hover:bg-slate-200 transition-all">Re-Verify</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <h4 className="font-black text-slate-800 text-lg">Identity Vault</h4>
          <div className="space-y-4">
             {[
               { name: 'National ID (Front)', status: 'Approved', size: '1.2 MB', date: 'Oct 10, 2024' },
               { name: 'National ID (Back)', status: 'Approved', size: '0.9 MB', date: 'Oct 10, 2024' },
               { name: 'Utility Bill (Address Proof)', status: 'Approved', size: '2.4 MB', date: 'Oct 11, 2024' },
             ].map((doc, i) => (
               <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-indigo-200 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.size} • Uploaded {doc.date}</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-black uppercase text-emerald-600 px-2 py-1 bg-emerald-50 rounded-lg">{doc.status}</span>
               </div>
             ))}
          </div>
          <button className="w-full py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl text-xs uppercase hover:bg-indigo-100 transition-all border border-dashed border-indigo-200">Upload Additional ID</button>
        </div>

        <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-black text-xl tracking-tight">Compliance History</h4>
            <div className="mt-8 space-y-8">
               {[
                 { event: 'Seller Agreement Accepted', date: 'Oct 12, 2024', icon: '📝' },
                 { event: 'KYC Audit Completed', date: 'Oct 11, 2024', icon: '✅' },
                 { event: 'Account Opened', date: 'Oct 10, 2024', icon: '🏪' },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 relative">
                   {i < 2 && <div className="absolute left-5 top-10 w-0.5 h-6 bg-white/10"></div>}
                   <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg text-lg">
                     {item.icon}
                   </div>
                   <div className="pt-1">
                     <p className="font-bold text-sm text-white">{item.event}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date}</p>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-12 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <p className="text-xs text-slate-300 italic">"Everything looks great! Your account is in high standing. Keep up the good work."</p>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-2">— Platform Compliance AI</p>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );

  const renderTax = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Tax Identification</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Verified</span>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Registration Type</label>
                   <select className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none">
                      <option>GST (Goods and Services Tax)</option>
                      <option>VAT (Value Added Tax)</option>
                      <option>Standard Business ID</option>
                   </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GST Number</label>
                      <input type="text" defaultValue="22AAAAA0000A1Z5" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PAN Number</label>
                      <input type="text" defaultValue="ABCDE1234F" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none" />
                   </div>
                </div>
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl flex gap-4">
                   <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                   </div>
                   <div>
                      <p className="text-xs font-black text-indigo-900">Information Locked</p>
                      <p className="text-[10px] text-indigo-700 leading-relaxed italic">Tax details are locked once verified. To update your legal business name or tax IDs, please contact our support team with valid legal reasoning.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
             <h3 className="text-xl font-black text-slate-800 tracking-tight">Tax Certificates</h3>
             <div className="space-y-4">
                {[
                  { name: 'GST Registration Certificate', ext: 'PDF', date: 'Jan 2024' },
                  { name: 'Business Incorporation Letter', ext: 'PDF', date: 'Oct 2022' },
                ].map((doc, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl group cursor-pointer hover:bg-slate-100 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12h4.5m-4.5 3H12M9 11.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-6.75z" /></svg>
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-800">{doc.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.ext} • Verified {doc.date}</p>
                         </div>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-slate-600">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                      </button>
                   </div>
                ))}
             </div>
             <div className="pt-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Upcoming Deadlines</h4>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                   <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0V7.5" /></svg>
                   </div>
                   <p className="text-xs font-bold text-amber-900">Monthly GST Return (GSTR-1) due in 3 days.</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
             <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Platform Agreements</h3>
                <p className="text-slate-500 text-sm">Review and manage the legal frameworks that govern your store operations.</p>
             </div>
             <button className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase shadow-xl shadow-indigo-100">Download All Policies</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {[
               { name: 'Global Seller Terms', status: 'Accepted', date: 'Oct 12, 2024', version: 'v2.4', color: 'bg-indigo-50 text-indigo-600' },
               { name: 'Shipping & Fulfilment Policy', status: 'Accepted', date: 'Oct 12, 2024', version: 'v1.8', color: 'bg-emerald-50 text-emerald-600' },
               { name: 'Privacy & Data Handling', status: 'Action Required', date: 'N/A', version: 'v3.0 (New)', color: 'bg-amber-50 text-amber-600' },
             ].map((policy, i) => (
                <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] flex flex-col justify-between hover:bg-slate-100 transition-all cursor-pointer group">
                   <div>
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${policy.color}`}>{policy.status}</span>
                      <h4 className="text-lg font-black text-slate-800 mt-4 leading-tight">{policy.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Version {policy.version}</p>
                   </div>
                   <div className="mt-8 flex items-center justify-between">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{policy.date !== 'N/A' ? `Last Signed: ${policy.date}` : 'Not Signed'}</p>
                      <button className="text-indigo-600 font-black text-[10px] uppercase group-hover:underline">Review</button>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="bg-amber-50 border border-amber-200 p-8 rounded-[40px] flex gap-6 items-center">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-[24px] flex items-center justify-center shrink-0 shadow-lg animate-pulse">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" /></svg>
          </div>
          <div>
             <h4 className="text-lg font-black text-amber-900 tracking-tight">Policy Update Required</h4>
             <p className="text-amber-800/70 text-sm max-w-2xl leading-relaxed">Our Privacy & Data Handling policy has been updated to comply with the new Global Seller Directive. Please review and accept the new terms by October 31st to avoid payout holds.</p>
          </div>
          <button className="ml-auto px-8 py-3 bg-amber-600 text-white font-black rounded-2xl text-xs uppercase shadow-xl shadow-amber-900/20 whitespace-nowrap">Sign Now</button>
       </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {(['kyc', 'tax', 'policies'] as LegalTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {tab === 'kyc' ? 'KYC Status' : tab === 'tax' ? 'Tax Documentation' : 'Platform Policies'}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-700">
        {activeTab === 'kyc' && renderKyc()}
        {activeTab === 'tax' && renderTax()}
        {activeTab === 'policies' && renderPolicies()}
      </div>
    </div>
  );
};

export default LegalView;
