
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type MarketingTab = 'campaigns' | 'create' | 'coupons' | 'analytics';
type CampaignStep = 1 | 2 | 3 | 4; // Objective, Budget, Creative, Review

interface AdCampaign {
  id: string;
  name: string;
  objective: 'Views' | 'Sales' | 'Live';
  status: 'Active' | 'Paused' | 'Review' | 'Draft';
  budget: number;
  spent: number;
  clicks: number;
  conversions: number;
  roas: number;
}

const MOCK_AD_CAMPAIGNS: AdCampaign[] = [
  { id: 'ad1', name: 'Summer Satchel Push', objective: 'Sales', status: 'Active', budget: 1000, spent: 450, clicks: 1240, conversions: 84, roas: 4.2 },
  { id: 'ad2', name: 'Brand Awareness Reel', objective: 'Views', status: 'Active', budget: 500, spent: 120, clicks: 5600, conversions: 0, roas: 0 },
  { id: 'ad3', name: 'Flash Sale Promo', objective: 'Sales', status: 'Paused', budget: 200, spent: 200, clicks: 890, conversions: 42, roas: 5.8 },
];

const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketingTab>('campaigns');
  const [step, setStep] = useState<CampaignStep>(1);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: 'Sales',
    budget: 50,
    audience: 'Broad',
    creativeId: ''
  });

  const renderCampaignList = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ads Manager</h1>
          <p className="text-slate-500 text-sm">Boost your listings and reels to reach millions of buyers.</p>
        </div>
        <button 
          onClick={() => { setActiveTab('create'); setStep(1); }}
          className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Ad Spend', value: '$770.00', color: 'text-slate-800' },
          { label: 'Avg. ROAS', value: '4.5x', color: 'text-emerald-600' },
          { label: 'Direct Conversions', value: '126', color: 'text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800">Your Campaigns</h3>
          <div className="flex gap-2">
            <button className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">All</button>
            <button className="text-[10px] font-black uppercase text-slate-400 px-3 py-1.5 hover:bg-slate-50 rounded-lg">Active</button>
            <button className="text-[10px] font-black uppercase text-slate-400 px-3 py-1.5 hover:bg-slate-50 rounded-lg">Completed</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objective</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spend / Budget</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ROAS</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_AD_CAMPAIGNS.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm">{ad.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {ad.id}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-slate-600">{ad.objective}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                      ad.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="w-32">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 mb-1">
                        <span>${ad.spent}</span>
                        <span>${ad.budget}</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(ad.spent / ad.budget) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs font-black text-emerald-600">{ad.roas > 0 ? `${ad.roas}x` : '—'}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m-9.75 0h9.75" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateFlow = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveTab('campaigns')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Ad Campaign</h1>
          <p className="text-slate-500 text-sm">Step {step} of 4: {step === 1 ? 'Objective' : step === 2 ? 'Budget & Audience' : step === 3 ? 'Creative' : 'Review'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {step === 1 && (
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">What's your primary goal?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'Sales', title: 'Product Sales', desc: 'Drive direct orders for specific catalog items.', icon: '🛍️', color: 'bg-indigo-50' },
                  { id: 'Views', title: 'Video Views', desc: 'Get more eyes on your Reels and brand stories.', icon: '📺', color: 'bg-emerald-50' },
                  { id: 'Live', title: 'Live Promo', desc: 'Boost viewership for your scheduled live streams.', icon: '🔴', color: 'bg-red-50' },
                  { id: 'Traffic', title: 'Store Traffic', desc: 'Encourage users to visit your profile and shop.', icon: '🚀', color: 'bg-amber-50' },
                ].map((obj) => (
                  <button 
                    key={obj.id}
                    onClick={() => { setNewCampaign({...newCampaign, objective: obj.id}); setStep(2); }}
                    className={`p-6 rounded-[32px] border-2 text-left transition-all hover:shadow-xl group ${
                      newCampaign.objective === obj.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-50 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 ${obj.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>{obj.icon}</div>
                    <h4 className="font-black text-slate-800">{obj.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{obj.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-right duration-500">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Budget & Audience</h3>
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Name</label>
                   <input 
                    type="text" 
                    placeholder="e.g. Winter Sale Boost" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Budget ($)</label>
                     <input 
                      type="number" 
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({...newCampaign, budget: parseInt(e.target.value)})}
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none" 
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audience Reach</label>
                     <select className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none">
                       <option>Broad (Platform Optimized)</option>
                       <option>Previous Buyers Only</option>
                       <option>Interest: Fashion & Style</option>
                       <option>Lookalike Audience</option>
                     </select>
                   </div>
                 </div>
               </div>
               <div className="flex justify-end gap-3 pt-4">
                 <button onClick={() => setStep(1)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all">Back</button>
                 <button onClick={() => setStep(3)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Continue to Creative</button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-right duration-500">
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-800 tracking-tight">Select Creative Content</h3>
                 <div className="flex bg-slate-50 p-1 rounded-xl">
                   <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm text-[10px] font-black uppercase">My Reels</button>
                   <button className="px-4 py-2 text-slate-400 rounded-lg text-[10px] font-black uppercase">Collaborations</button>
                 </div>
               </div>
               
               <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                 {[...Array(8)].map((_, i) => (
                   <div 
                    key={i} 
                    onClick={() => setNewCampaign({...newCampaign, creativeId: `c${i}`})}
                    className={`aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer relative border-4 transition-all ${
                      newCampaign.creativeId === `c${i}` ? 'border-indigo-600' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                   >
                     <img src={`https://picsum.photos/seed/ad${i+20}/300/500`} className="w-full h-full object-cover" />
                     {newCampaign.creativeId === `c${i}` && (
                       <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                         <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                         </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>

               <div className="flex justify-end gap-3 pt-4">
                 <button onClick={() => setStep(2)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all">Back</button>
                 <button onClick={() => setStep(4)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Review Campaign</button>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-right duration-500 text-center py-12">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
               </div>
               <h3 className="text-3xl font-black text-slate-800 tracking-tight">Ready to Launch?</h3>
               <p className="text-slate-500 max-w-sm mx-auto">Review your settings on the right. Once you click launch, our AI will begin optimizing your campaign immediately.</p>
               <div className="flex justify-center gap-3 pt-10">
                 <button onClick={() => setStep(3)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all">Back</button>
                 <button onClick={() => setActiveTab('campaigns')} className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Launch Campaign</button>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
           {/* Ad Preview Section */}
           <div className="bg-slate-900 p-8 rounded-[48px] text-white space-y-6 shadow-2xl sticky top-24">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-black tracking-tight">Ad Preview</h3>
               <span className="text-[10px] bg-white/10 px-2 py-1 rounded-lg font-black uppercase tracking-widest text-slate-400">Sponsored Feed</span>
             </div>
             
             <div className="aspect-[9/16] bg-slate-800 rounded-[32px] overflow-hidden relative shadow-inner">
               {newCampaign.creativeId ? (
                 <img src={`https://picsum.photos/seed/ad${parseInt(newCampaign.creativeId.slice(1))+20}/300/500`} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 opacity-20"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-50">Select creative to preview</p>
                 </div>
               )}
               <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="https://picsum.photos/seed/seller/40/40" className="w-8 h-8 rounded-full border border-white/20" />
                    <div>
                      <p className="text-[10px] font-black leading-none">Rivera Style</p>
                      <p className="text-[8px] text-slate-400 uppercase font-black">Sponsored</p>
                    </div>
                  </div>
                  <p className="text-[10px] line-clamp-2 text-slate-200">Shop our Summer Collection today! Limited stock available with 20% off using code SUMMER20.</p>
                  <button className="w-full py-3 bg-indigo-600 rounded-xl text-xs font-black uppercase mt-4 shadow-xl">Shop Now</button>
               </div>
             </div>

             <div className="pt-6 border-t border-white/10 space-y-4">
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Daily Reach</span>
                 <span className="font-black text-emerald-400">12k - 18k Users</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Daily Budget</span>
                 <span className="font-black">${newCampaign.budget}.00</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ad Performance Insights</h1>
          <p className="text-slate-500 text-sm">Real-time tracking of your advertising return.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
           <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black uppercase">7 Days</button>
           <button className="px-4 py-2 text-slate-400 rounded-lg text-xs font-black uppercase">30 Days</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
           <h3 className="font-black text-slate-800 mb-8">Daily ROI Conversion</h3>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_AD_CAMPAIGNS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}
                    cursor={{fill: '#f8fafc'}}
                  />
                  <Bar dataKey="conversions" name="Direct Sales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="clicks" name="Ad Clicks" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xl font-black tracking-tight">AI Optimization</h3>
              <p className="text-slate-400 text-sm mt-4">Our model suggests increasing your **Summer Satchel** daily budget by $20 to capture an extra 4.5% conversion during evening peak hours.</p>
              <div className="mt-12 space-y-6">
                {[
                  { label: 'CPC Trend', val: '-12%', color: 'text-emerald-400' },
                  { label: 'Impressions', val: '+24%', color: 'text-indigo-400' },
                  { label: 'Conv. Rate', val: '4.2%', color: 'text-amber-400' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                    <span className={`font-black ${s.color}`}>{s.val}</span>
                  </div>
                ))}
              </div>
           </div>
           <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {(['campaigns', 'analytics', 'coupons'] as MarketingTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setStep(1); }}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {tab === 'campaigns' ? 'Ad Campaigns' : tab === 'analytics' ? 'ROI Insights' : 'Coupons & Vouchers'}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-700">
        {activeTab === 'campaigns' && renderCampaignList()}
        {activeTab === 'create' && renderCreateFlow()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { code: 'WELCOME10', disc: '10%', used: 142, expiry: 'Dec 2024' },
              { code: 'VIP40', disc: '40%', used: 12, expiry: 'Oct 2024' },
            ].map((c, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border-2 border-dashed border-slate-100 relative group hover:border-indigo-200 transition-all cursor-pointer">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{c.disc} OFF</p>
                <h4 className="text-2xl font-black text-slate-800 mt-1">{c.code}</h4>
                <div className="mt-8 flex justify-between items-center">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Used {c.used} times</p>
                   <button className="text-indigo-600 font-black text-[10px] uppercase group-hover:underline">Edit</button>
                </div>
              </div>
            ))}
            <button className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[32px] p-8 flex flex-col items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 mb-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
               <span className="text-sm font-black uppercase">Create Voucher</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingView;
