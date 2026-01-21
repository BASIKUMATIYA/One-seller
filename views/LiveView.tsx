
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';

type LiveMode = 'management' | 'create' | 'active' | 'summary';

interface LiveSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  peakViewers: number;
  sales: string;
  status: 'completed' | 'scheduled';
  thumbnail: string;
}

const PAST_SESSIONS: LiveSession[] = [
  { id: 'l1', title: 'Summer Collection Launch', date: 'Oct 12, 2024', duration: '45m', peakViewers: 1240, sales: '$4,200', status: 'completed', thumbnail: 'https://picsum.photos/seed/live1/400/225' },
  { id: 'l2', title: 'Flash Sale: Home Decor', date: 'Oct 08, 2024', duration: '1h 12m', peakViewers: 850, sales: '$2,850', status: 'completed', thumbnail: 'https://picsum.photos/seed/live2/400/225' },
];

const PINNED_PRODUCTS_MOCK: Product[] = [
  { id: 'p1', name: 'Vintage Leather Satchel', category: 'Accessories', price: 120, stock: 45, image: 'https://picsum.photos/seed/p1/100/100', status: 'active', sku: 'ACC-01' },
  { id: 'p2', name: 'Linen Summer Shirt', category: 'Apparel', price: 45, stock: 12, image: 'https://picsum.photos/seed/p2/100/100', status: 'active', sku: 'APP-02' },
];

const LiveView: React.FC = () => {
  const [mode, setMode] = useState<LiveMode>('management');
  const [isLive, setIsLive] = useState(false);
  const [pinnedProducts, setPinnedProducts] = useState<Product[]>(PINNED_PRODUCTS_MOCK);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [gifts, setGifts] = useState<{ user: string; amount: string; type: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated gift stream
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const newGift = {
          user: `User${Math.floor(Math.random() * 1000)}`,
          amount: `$${(Math.random() * 10).toFixed(2)}`,
          type: ['Diamond', 'Rose', 'Coffee', 'Superheart'][Math.floor(Math.random() * 4)]
        };
        setGifts(prev => [newGift, ...prev.slice(0, 4)]);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsLive(true);
        setMode('active');
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera access to start live stream.");
    }
  };

  const stopStream = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsLive(false);
    setMode('summary');
  };

  const renderManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Live Shopping Manager</h1>
          <p className="text-slate-500 text-sm">Schedule broadcasts, track analytics, and manage past streams.</p>
        </div>
        <button 
          onClick={() => setMode('create')}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Create Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Live Sales', value: '$12,450', color: 'text-emerald-600' },
          { label: 'Avg. Viewership', value: '1,240', color: 'text-indigo-600' },
          { label: 'Gift Revenue', value: '$450.20', color: 'text-pink-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-slate-800 tracking-tight">Broadcast History</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PAST_SESSIONS.map((session) => (
            <div key={session.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm flex group cursor-pointer hover:shadow-md transition-all">
              <div className="w-48 h-full bg-slate-100 relative overflow-hidden">
                <img src={session.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">{session.duration}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 line-clamp-1">{session.title}</h4>
                  <p className="text-xs text-slate-400 font-medium">{session.date}</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Viewers</p>
                      <p className="text-xs font-bold text-slate-700">{session.peakViewers}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Sales</p>
                      <p className="text-xs font-bold text-emerald-600">{session.sales}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 font-black text-xs uppercase hover:underline">Analytics</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setMode('management')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        </button>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Schedule New Broadcast</h1>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Broadcast Title</label>
            <input type="text" placeholder="e.g. Midnight Mystery Bag Unboxing" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
              <input type="date" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</label>
              <input type="time" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Products to Feature</label>
            <div className="grid grid-cols-2 gap-3">
              {PINNED_PRODUCTS_MOCK.map(p => (
                <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="text-xs font-bold text-slate-700 truncate">{p.name}</span>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 ml-auto" />
                </div>
              ))}
              <button className="p-3 bg-indigo-50 border border-dashed border-indigo-200 rounded-2xl text-indigo-600 text-xs font-bold flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add Product
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex gap-4">
          <button onClick={startStream} className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Go Live Immediately</button>
          <button onClick={() => setMode('management')} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all">Schedule Session</button>
        </div>
      </div>
    </div>
  );

  const renderActive = () => (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-140px)] animate-in fade-in duration-700">
      {/* Viewport - Director View */}
      <div className="xl:col-span-3 flex flex-col gap-6 h-full">
        <div className="relative flex-1 bg-black rounded-[40px] overflow-hidden shadow-2xl border-4 border-slate-900 group">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          
          {/* Overlays */}
          <div className="absolute top-8 left-8 flex items-center gap-4">
            <div className="bg-red-600 text-white px-4 py-1.5 rounded-xl text-xs font-black animate-pulse flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              LIVE BROADCAST
            </div>
            <div className="bg-black/40 backdrop-blur-xl text-white px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-indigo-400"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /></svg>
              1,420
            </div>
            <div className="bg-black/40 backdrop-blur-xl text-white px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              $842.50
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <button onClick={stopStream} className="px-6 py-2 bg-white text-red-600 font-black text-sm rounded-xl shadow-xl hover:bg-red-50 transition-colors">End Broadcast</button>
          </div>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div className="flex flex-col gap-3">
              {pinnedProducts.map(p => (
                <div key={p.id} className="bg-white/10 backdrop-blur-2xl border border-white/20 p-3 rounded-2xl flex items-center gap-4 w-64 group cursor-pointer hover:bg-white/20 transition-all animate-in slide-in-from-left duration-500">
                  <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-black truncate">{p.name}</p>
                    <p className="text-indigo-400 text-sm font-black">${p.price}</p>
                  </div>
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setActiveCoupon(activeCoupon ? null : 'SAVE20')}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-all shadow-2xl ${
                  activeCoupon ? 'bg-emerald-500 text-white animate-bounce' : 'bg-white/20 backdrop-blur-xl text-white border border-white/20'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.659A2.25 2.25 0 0 0 9.568 3Z" /></svg>
                <span className="text-[10px]">{activeCoupon ? 'ON' : 'OFFER'}</span>
              </button>
              <button className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/20 text-white rounded-2xl flex flex-col items-center justify-center font-black transition-all hover:bg-white/30 shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                <span className="text-[10px]">SHARE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Director Controls Bar */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Mic Level</p>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div className="w-3/4 h-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Output Quality</p>
                <p className="text-xs font-bold text-slate-700">1080p @ 60fps</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Switch Camera</button>
            <button className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Effects</button>
          </div>
        </div>
      </div>

      {/* Side Panel - Interaction */}
      <div className="flex flex-col gap-6 h-full">
        {/* Real-time Interaction Feed */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-800 text-sm">Interaction Flow</h3>
            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Moderated</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Simulated Chat & Gifts */}
            {gifts.map((gift, i) => (
              <div key={`gift-${i}`} className="bg-pink-50 p-3 rounded-2xl border border-pink-100 flex items-center gap-3 animate-in zoom-in duration-300">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-black">🎁</div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-pink-700 uppercase">{gift.user} sent {gift.type}</p>
                  <p className="text-xs font-bold text-pink-600">{gift.amount}</p>
                </div>
              </div>
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={`chat-${i}`} className="flex gap-3">
                <img src={`https://picsum.photos/seed/view${i+50}/30/30`} className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none">
                  <p className="text-[10px] font-black text-indigo-600 mb-0.5">Viewer #{1204+i}</p>
                  <p className="text-xs text-slate-700">Does the satchel fit a 14" laptop? 💻</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <input type="text" placeholder="Post announcement..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        {/* Live Metrics */}
        <div className="bg-slate-900 rounded-[32px] p-6 text-white space-y-4 shadow-xl">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Performance</h4>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Add to Carts</span>
                <span className="font-black text-emerald-400">84</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Purchases</span>
                <span className="font-black text-indigo-400">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Coupon Usage</span>
                <span className="font-black text-amber-400">18%</span>
              </div>
           </div>
           <div className="pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                <span className="text-xs font-black">Trending Question</span>
              </div>
              <p className="text-xs text-slate-300 italic">"Is there a black version of the shirt?" (asked 12 times)</p>
           </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in duration-500">
      <div className="text-center py-10">
        <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner border border-emerald-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Broadcast Successful!</h1>
        <p className="text-slate-500 mt-2">Awesome session! Here's how it performed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Revenue', value: '$2,842.50', color: 'text-emerald-600' },
          { label: 'Viewers', value: '1,420', color: 'text-indigo-600' },
          { label: 'New Followers', value: '+142', color: 'text-sky-600' },
          { label: 'Gift Total', value: '$84.20', color: 'text-pink-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
             <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-800 mb-6">Top Converting Products</h3>
        <div className="space-y-4">
          {PINNED_PRODUCTS_MOCK.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">{Math.floor(Math.random() * 50) + 10} units sold during live</p>
                </div>
              </div>
              <p className="font-black text-indigo-600">${(p.price * (Math.floor(Math.random() * 20) + 5)).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={() => setMode('management')} className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all">Back to Dashboard</button>
        <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">View Detailed Analytics</button>
      </div>
    </div>
  );

  return (
    <div className="pb-10">
      {mode === 'management' && renderManagement()}
      {mode === 'create' && renderCreate()}
      {mode === 'active' && renderActive()}
      {mode === 'summary' && renderSummary()}
    </div>
  );
};

export default LiveView;
