
import React, { useState } from 'react';
import { Creator } from '../types';
import { generateCollabPitch } from '../services/geminiService';

type CollabMode = 'explore' | 'deals' | 'requests' | 'create-deal';

interface Deal {
  id: string;
  title: string;
  creator: Creator;
  products: string[];
  feeType: 'fixed' | 'commission';
  feeValue: number;
  status: 'active' | 'pending' | 'completed' | 'requested';
  salesGenerated: number;
  earnings: number;
  dateCreated: string;
}

const MOCK_CREATORS: Creator[] = [
  { id: 'c1', name: 'Emma Style', niche: 'Fashion & Lifestyle', followers: '120k', avatar: 'https://picsum.photos/seed/c1/100/100', status: 'connected' },
  { id: 'c2', name: 'Tech Guru Sam', niche: 'Gadgets', followers: '450k', avatar: 'https://picsum.photos/seed/c2/100/100', status: 'collaborating' },
  { id: 'c3', name: 'Chef Mario', niche: 'Cooking & Home', followers: '89k', avatar: 'https://picsum.photos/seed/c3/100/100', status: 'invited' },
  { id: 'c4', name: 'Luna Wanders', niche: 'Travel & Decor', followers: '2.1M', avatar: 'https://picsum.photos/seed/c4/100/100', status: 'connected' },
];

const MOCK_DEALS: Deal[] = [
  { 
    id: 'd1', 
    title: 'Autumn Lookbook 2024', 
    creator: MOCK_CREATORS[0], 
    products: ['Vintage Satchel'], 
    feeType: 'commission', 
    feeValue: 15, 
    status: 'active', 
    salesGenerated: 4200, 
    earnings: 630,
    dateCreated: '2024-10-01'
  },
];

const CollaborationView: React.FC = () => {
  const [mode, setMode] = useState<CollabMode>('deals');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [dealBrief, setDealBrief] = useState('');
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  const handleMagicPitch = async () => {
    if (!selectedCreator) return;
    setIsGeneratingBrief(true);
    const pitch = await generateCollabPitch(selectedCreator.name, selectedCreator.niche, "our latest accessories collection");
    setDealBrief(pitch);
    setIsGeneratingBrief(false);
  };

  const renderExplore = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Discover Creators</h1>
          <p className="text-slate-500 text-sm">Find influencers that perfectly align with your product niche.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto">
          <input type="text" placeholder="Search by niche or handle..." className="px-5 py-2.5 text-sm focus:outline-none w-full md:w-80 font-medium" />
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Find</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_CREATORS.map((creator) => (
          <div key={creator.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2">
            <div className="relative mb-6 flex justify-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-indigo-100 transition-colors shadow-inner">
                <img src={creator.avatar} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 bg-indigo-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-xl">AI MATCH: 98%</div>
            </div>
            <div className="text-center mb-8">
              <h4 className="font-black text-slate-800 tracking-tight text-lg">{creator.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{creator.niche}</p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="text-center">
                  <p className="text-sm font-black text-slate-800">{creator.followers}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Reach</p>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="text-center">
                  <p className="text-sm font-black text-emerald-600">4.8%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ER</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setSelectedCreator(creator); setMode('create-deal'); }}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Collaborate
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeals = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Collaboration Hub</h1>
          <p className="text-slate-500 text-sm">Track active deals, content approvals, and creator payments.</p>
        </div>
        <button 
          onClick={() => setMode('explore')}
          className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all uppercase tracking-widest"
        >
          Partner Explore
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Revenue Generated', value: '$24,500', color: 'text-emerald-600' },
          { label: 'Active Partners', value: '12', color: 'text-indigo-600' },
          { label: 'Pending Payouts', value: '$1,240', color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800 tracking-tight">Active Partnerships</h3>
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl">
            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 px-4 py-2 rounded-xl bg-white shadow-sm">Current</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-2 hover:bg-slate-50 rounded-xl">Pending</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-2 hover:bg-slate-50 rounded-xl">History</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Flow</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DEALS.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <img src={deal.creator.avatar} className="w-12 h-12 rounded-2xl border border-slate-100 shadow-sm" />
                    <div>
                      <p className="font-black text-slate-800 text-sm tracking-tight">{deal.creator.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{deal.creator.followers} Fans</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-700 text-sm tracking-tight">{deal.title}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-indigo-600">${deal.salesGenerated.toLocaleString()}</p>
                    <p className="text-[9px] font-black text-emerald-500 uppercase">Comm: {deal.feeValue}%</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      deal.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateDeal = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setMode('explore')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 shadow-sm transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        </button>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Construct Partnership Offer</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="font-black text-slate-800 tracking-tight text-xl">Collaboration Fundamentals</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Name</label>
                <input type="text" placeholder="e.g. Winter Essentials 2024 Showcase" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
              </div>
              
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center px-1 mb-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Brief / Pitch</label>
                  <button 
                    onClick={handleMagicPitch}
                    disabled={isGeneratingBrief}
                    className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all"
                  >
                    {isGeneratingBrief ? (
                       <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.06l-1.061-1.06a.75.75 0 010-1.06zm9.193 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.06 0zM10 10a2 2 0 100-4 2 2 0 000 4zm-7.25-.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm13.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.343 14.596a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.06l-1.061-1.06a.75.75 0 010-1.06zm9.193 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.06 0zM10 15.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
                    )}
                    ✨ AI Pitch Draft
                  </button>
                </div>
                <textarea 
                  rows={6} 
                  value={dealBrief}
                  onChange={(e) => setDealBrief(e.target.value)}
                  placeholder="Invite the creator and explain the goals..." 
                  className={`w-full bg-slate-50 border-none rounded-[32px] px-6 py-5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none ${isGeneratingBrief ? 'animate-pulse' : ''}`}
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monetization Terms</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-indigo-50 border-2 border-indigo-200 rounded-[32px] cursor-pointer">
                    <p className="text-xs font-black text-indigo-700 uppercase tracking-widest">Revenue Share</p>
                    <div className="flex items-center gap-2 mt-2">
                       <input type="number" defaultValue="15" className="w-12 bg-transparent font-black text-2xl text-indigo-900 border-none focus:ring-0 p-0" />
                       <span className="text-2xl font-black text-indigo-900">%</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 border-2 border-transparent rounded-[32px] cursor-pointer hover:border-slate-200 transition-all">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fixed Budget</p>
                    <div className="flex items-center gap-1 mt-2">
                       <span className="text-2xl font-black text-slate-300">$</span>
                       <input type="number" placeholder="0.00" className="w-24 bg-transparent font-black text-2xl text-slate-800 border-none focus:ring-0 p-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-10 rounded-[56px] text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Target Partner</p>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img src={selectedCreator?.avatar} className="w-20 h-20 rounded-full border-4 border-white/10 shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-xl tracking-tight leading-none">{selectedCreator?.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">{selectedCreator?.niche}</p>
                </div>
              </div>
              
              <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Estimated Impact</span>
                  <span className="text-sm font-black text-indigo-400">High Growth</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Fulfillment Status</span>
                  <span className="text-sm font-black text-white">Stock Reserved</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setMode('deals')}
              className="w-full py-5 bg-indigo-600 text-white rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-900/60 hover:bg-indigo-500 transition-all mt-8"
            >
              SEND PARTNERSHIP OFFER
            </button>
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 p-8 rounded-[40px] space-y-3">
             <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Platform Escrow</h5>
             <p className="text-[11px] text-amber-800/70 font-medium leading-relaxed italic">By initiating this deal, you agree that campaign budgets are held in trust. Payouts are released only after content is verified by our AI safety layer.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-10">
      {mode === 'deals' && renderDeals()}
      {mode === 'explore' && renderExplore()}
      {mode === 'create-deal' && renderCreateDeal()}
    </div>
  );
};

export default CollaborationView;
