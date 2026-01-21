
import React, { useState } from 'react';
import { Creator, Product } from '../types';

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
  { 
    id: 'd2', 
    title: 'Gadget Unboxing Series', 
    creator: MOCK_CREATORS[1], 
    products: ['Minimalist Vase'], 
    feeType: 'fixed', 
    feeValue: 500, 
    status: 'pending', 
    salesGenerated: 0, 
    earnings: 0,
    dateCreated: '2024-10-15'
  },
];

const CollaborationView: React.FC = () => {
  const [mode, setMode] = useState<CollabMode>('deals');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const renderExplore = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Find Creators</h1>
          <p className="text-slate-500 text-sm">Discover influencers that align with your brand values.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
          <input type="text" placeholder="Search by niche..." className="px-4 py-2 text-sm focus:outline-none w-64" />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CREATORS.map((creator) => (
          <div key={creator.id} className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-indigo-100 transition-colors">
                <img src={creator.avatar} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">98% Match</div>
            </div>
            <div className="text-center mb-6">
              <h4 className="font-black text-slate-800 tracking-tight">{creator.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{creator.niche}</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="text-center">
                  <p className="text-xs font-black text-slate-800">{creator.followers}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Followers</p>
                </div>
                <div className="w-px h-6 bg-slate-100"></div>
                <div className="text-center">
                  <p className="text-xs font-black text-emerald-600">4.8%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">ER</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setSelectedCreator(creator); setMode('create-deal'); }}
              className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-slate-800 transition-all shadow-lg"
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
          <p className="text-slate-500 text-sm">Track active deals, performance, and upcoming payouts.</p>
        </div>
        <button 
          onClick={() => setMode('explore')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          New Collaboration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue Generated', value: '$24,500', color: 'text-emerald-600' },
          { label: 'Active Creators', value: '12', color: 'text-indigo-600' },
          { label: 'Pending Payouts', value: '$1,240', color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800">Active Collaborations</h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-indigo-600 px-4 py-2 rounded-xl bg-indigo-50">Active</button>
            <button className="text-xs font-bold text-slate-400 px-4 py-2 hover:bg-slate-50 rounded-xl">Pending</button>
            <button className="text-xs font-bold text-slate-400 px-4 py-2 hover:bg-slate-50 rounded-xl">History</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Creator</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deal Title</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Terms</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DEALS.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 flex items-center gap-3">
                    <img src={deal.creator.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{deal.creator.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{deal.creator.followers}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-bold text-slate-700 text-sm">{deal.title}</td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-slate-600">{deal.feeType === 'commission' ? `${deal.feeValue}% Comm.` : `$${deal.feeValue} Fixed`}</span>
                  </td>
                  <td className="px-8 py-4 text-xs font-black text-indigo-600">${deal.salesGenerated.toLocaleString()}</td>
                  <td className="px-8 py-4 text-xs font-black text-emerald-600">${deal.earnings.toLocaleString()}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      deal.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all">Settle Payout</button>
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
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Collaboration Deal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 tracking-tight">Deal Fundamentals</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deal Title</label>
                <input type="text" placeholder="e.g. Winter Wardrobe Showcase 2024" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attached Products</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
                    <img src="https://picsum.photos/seed/p1/50/50" className="w-8 h-8 rounded-lg" />
                    <span className="text-xs font-bold text-indigo-700">Vintage Satchel</span>
                  </div>
                  <button className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-slate-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                    + Link More
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collaboration Brief</label>
                <textarea rows={4} placeholder="What should the creator do? (e.g., 1 Reel, 2 Stories, Link in bio...)" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800 tracking-tight">Financial Agreement</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fee Structure</label>
                <div className="flex bg-slate-50 p-1 rounded-xl">
                  <button className="flex-1 py-2 rounded-lg bg-white text-indigo-600 font-bold text-xs shadow-sm">Commission</button>
                  <button className="flex-1 py-2 rounded-lg text-slate-400 font-bold text-xs">Fixed Fee</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission Percentage (%)</label>
                <input type="number" placeholder="15" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
            <h3 className="font-black tracking-tight">Target Creator</h3>
            <div className="flex items-center gap-4">
              <img src={selectedCreator?.avatar} className="w-16 h-16 rounded-full border-2 border-white/20" />
              <div>
                <p className="font-black text-lg">{selectedCreator?.name}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">{selectedCreator?.followers} Followers</p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Est. Reach</span>
                <span className="font-bold">45k - 60k</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Platform</span>
                <span className="font-bold">Instagram Reels</span>
              </div>
            </div>
            <button 
              onClick={() => setMode('deals')}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all mt-6"
            >
              Send Offer
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] space-y-2">
            <h4 className="font-bold text-amber-900 text-sm">Legal & Compliance</h4>
            <p className="text-xs text-amber-800/70 leading-relaxed italic">By sending this offer, you agree to our Platform Standards for Creator Partnership. Payouts are held in escrow until deliverables are approved.</p>
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
