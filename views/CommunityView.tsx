
import React, { useState } from 'react';
// Fix: Removed non-existent Message type import from types.ts
import { Review } from '../types';
import { getSmartResponse } from '../services/geminiService';

type CommunityTab = 'messages' | 'reviews' | 'followers' | 'groups';

const MOCK_FOLLOWERS = [
  { id: 'f1', name: 'Jessica Miller', city: 'New York', tier: 'Platinum', spend: '$1,240', avatar: 'https://picsum.photos/seed/f1/80/80' },
  { id: 'f2', name: 'Marcus Chen', city: 'London', tier: 'Gold', spend: '$850', avatar: 'https://picsum.photos/seed/f2/80/80' },
  { id: 'f3', name: 'Sarah Lopez', city: 'Madrid', tier: 'Silver', spend: '$320', avatar: 'https://picsum.photos/seed/f3/80/80' },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', user: 'Jessica M.', rating: 5, comment: "Absolutely love the quality of the linen shirt! It's so breathable and fits perfectly.", date: '2 hours ago', status: 'published', productName: 'Linen Shirt' },
  { id: 'r2', user: 'Kevin Park', rating: 1, comment: "The courier threw the package over my fence and it got wet. Very unhappy.", date: '5 hours ago', status: 'flagged', productName: 'Vintage Satchel' },
  { id: 'r3', user: 'Sarah L.', rating: 3, comment: "The color is slightly different from the photos, but the build quality is good.", date: '1 day ago', status: 'pending', productName: 'Wall Clock' },
];

const CommunityView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CommunityTab>('messages');
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [loadingAi, setLoadingAi] = useState<string | null>(null);

  const handleAiReply = async (reviewId: string, comment: string) => {
    setLoadingAi(reviewId);
    const reply = await getSmartResponse(comment);
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, response: reply, status: 'published' } : r));
    setLoadingAi(null);
  };

  const renderMessages = () => (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-[650px] overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-black text-slate-800 tracking-tight">Direct Conversations</h3>
        <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-xl transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all relative group">
            <div className="relative">
              <img src={`https://picsum.photos/seed/user${i+10}/100/100`} className="w-12 h-12 rounded-2xl border border-slate-100 object-cover" />
              {i < 2 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-sm truncate">Buyer #{100 + i}</h4>
                <span className="text-[10px] text-slate-400 font-bold">12:45 PM</span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-1">Is this item still in stock?</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFollowers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Followers', value: '12,450', color: 'text-indigo-600' },
          { label: 'Growth Rate', value: '+12%', color: 'text-emerald-600' },
          { label: 'Avg. Order Value', value: '$84.20', color: 'text-amber-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className={`text-xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Follower</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Spend</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_FOLLOWERS.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4 flex items-center gap-4">
                  <img src={f.avatar} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{f.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{f.city}</p>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                    f.tier === 'Platinum' ? 'bg-indigo-50 text-indigo-600' : 
                    f.tier === 'Gold' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                  }`}>{f.tier}</span>
                </td>
                <td className="px-8 py-4 text-xs font-black text-slate-700">{f.spend}</td>
                <td className="px-8 py-4">
                  <button className="text-indigo-600 text-xs font-bold hover:underline">Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {(['messages', 'reviews', 'followers', 'groups'] as CommunityTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8">
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'followers' && renderFollowers()}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-4 overflow-x-auto">
                {['All', 'Pending', 'Flagged', 'Published'].map(s => (
                  <button key={s} className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 bg-white text-slate-400 hover:text-indigo-600 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
              {reviews.map((review) => (
                <div key={review.id} className={`bg-white p-8 rounded-[32px] border-2 shadow-sm animate-in slide-in-from-right duration-300 ${review.status === 'flagged' ? 'border-red-100' : 'border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-700 text-lg">
                        {review.user[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm tracking-tight">{review.user}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{review.date} • {review.productName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < review.rating ? 'currentColor' : 'none'} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                        review.status === 'flagged' ? 'bg-red-50 text-red-600' : 
                        review.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>{review.status}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{review.comment}"</p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAiReply(review.id, review.comment)}
                      disabled={loadingAi === review.id}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 transition-all"
                    >
                      {loadingAi === review.id ? 'Analyzing...' : 'AI Moderator Reply'}
                    </button>
                    {review.status === 'flagged' && (
                      <button className="px-6 py-3 bg-red-600 text-white rounded-2xl text-xs font-black hover:bg-red-700 shadow-lg shadow-red-100 transition-all">
                        Dispute Rating
                      </button>
                    )}
                    <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-200 transition-all">
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="xl:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-center border border-white/20">
                <span className="text-2xl font-black">4.9</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">Trust Score</h3>
              <p className="text-slate-400 text-xs mt-1">Certified Master Seller Hub</p>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Quality', score: '98%', color: 'bg-indigo-500' },
                { label: 'Shipping', score: '95%', color: 'bg-emerald-500' },
                { label: 'Response', score: '100%', color: 'bg-amber-500' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    <span>{s.label}</span>
                    <span className="text-white">{s.score}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: s.score }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-indigo-600/30 p-4 rounded-2xl border border-indigo-500/20">
              <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-1">Seller Badge</p>
              <p className="text-xs text-white font-medium">Top 1% of Sellers in Fashion Category this month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityView;
