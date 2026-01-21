
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalyticsInsight } from '../services/geminiService';

const salesData = [
  { name: 'Mon', sales: 4000, revenue: 2400 },
  { name: 'Tue', sales: 3000, revenue: 1398 },
  { name: 'Wed', sales: 2000, revenue: 9800 },
  { name: 'Thu', sales: 2780, revenue: 3908 },
  { name: 'Fri', sales: 1890, revenue: 4800 },
  { name: 'Sat', sales: 2390, revenue: 3800 },
  { name: 'Sun', sales: 3490, revenue: 4300 },
];

const RECENT_ORDERS = [
  { id: '#ORD-7721', customer: 'Emma Watson', items: 'Leather Satchel', amount: '$120.00', status: 'Pending' },
  { id: '#ORD-7722', customer: 'John Doe', items: 'Linen Shirt x2', amount: '$90.00', status: 'Shipped' },
  { id: '#ORD-7723', customer: 'Sarah Connor', items: 'Wall Clock', amount: '$85.00', status: 'Delivered' },
  { id: '#ORD-7724', customer: 'Mike Ross', items: 'Ceramic Vase', amount: '$65.00', status: 'Processing' },
];

const DashboardView: React.FC = () => {
  const [insight, setInsight] = useState<string>('Analyzing your business performance...');
  const [timeframe, setTimeframe] = useState('Weekly');

  useEffect(() => {
    getAnalyticsInsight(salesData).then(setInsight);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Pending Actions & KYC Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
            </div>
            <div>
              <p className="text-sm font-black text-amber-900">Urgent Tasks</p>
              <p className="text-xs text-amber-700">12 Orders to ship • 2 Ad campaigns awaiting approval</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors">Resolve Now</button>
        </div>
        <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
           <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">KYC</div>
           <div className="flex-1">
             <p className="text-sm font-bold text-slate-800">Identity Status</p>
             <div className="flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="w-2/3 h-full bg-indigo-500"></div>
               </div>
               <span className="text-[10px] font-bold text-indigo-600">65%</span>
             </div>
           </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Sales', value: '1,240', change: '+12.5%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Revenue', value: '$24,560', change: '+8.2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Conv. Rate', value: '3.8%', change: '+0.4%', color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Active Orders', value: '42', change: '+5', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Followers', value: '8,421', change: '+142', color: 'text-pink-600', bg: 'bg-pink-50' },
          { label: 'Avg Rating', value: '4.9', change: '+0.1', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Reels Views', value: '245k', change: '+18k', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Ads ROAS', value: '4.2x', change: '+0.2', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight Bar */}
      <div className="bg-indigo-600 rounded-[32px] p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-indigo-100">
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-black text-xl tracking-tight">AI Smart Insight</h4>
          <p className="text-indigo-100 text-sm mt-1 leading-relaxed">{insight}</p>
        </div>
        <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap">Full Analysis</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-xl text-slate-800 tracking-tight">Performance Flow</h3>
              <p className="text-slate-500 text-xs">Comparing Sales vs Revenue</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              {['Daily', 'Weekly', 'Monthly'].map(t => (
                <button 
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeframe === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-black text-xl text-slate-800 tracking-tight mb-6">Inventory Health</h3>
          <div className="space-y-6 flex-1">
            {[
              { item: 'Vintage Satchel', stock: 4, status: 'Critical', color: 'text-red-500', bg: 'bg-red-50' },
              { item: 'Linen Shirt Blue', stock: 12, status: 'Low', color: 'text-amber-500', bg: 'bg-amber-50' },
              { item: 'Wall Clock Black', stock: 2, status: 'Critical', color: 'text-red-500', bg: 'bg-red-50' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800">{alert.item}</p>
                  <p className="text-[10px] font-medium text-slate-400">Stock: {alert.stock}</p>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${alert.bg} ${alert.color}`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">Restock All</button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-xl text-slate-800 tracking-tight">Recent Orders</h3>
          <button className="text-indigo-600 text-xs font-bold hover:underline">Full Order Book</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_ORDERS.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-xs font-bold text-slate-800">{order.id}</td>
                  <td className="px-8 py-4 text-xs font-medium text-slate-600">{order.customer}</td>
                  <td className="px-8 py-4 text-xs text-slate-500">{order.items}</td>
                  <td className="px-8 py-4 text-xs font-bold text-slate-800">{order.amount}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
