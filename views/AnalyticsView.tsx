
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Advanced Analytics</h1>
          <p className="text-slate-500 text-sm">Deep dive into your sales and engagement metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Export CSV</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Revenue vs Profit</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Sales by Channel</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Direct', value: 400 },
                    { name: 'Reels', value: 700 },
                    { name: 'Influencer', value: 300 },
                    { name: 'Search', value: 200 },
                  ]}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1, 2, 3].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['Direct', 'Reels', 'Influencer', 'Search'].map((channel, i) => (
              <div key={channel} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                <span className="text-xs font-medium text-slate-600">{channel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 p-8 rounded-3xl text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Unlock AI Predictions</h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl">Get 90-day stock forecasts and customer trend analysis using our advanced predictive model.</p>
            <button className="px-8 py-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-colors">Upgrade to Enterprise</button>
          </div>
          <div className="w-full md:w-auto flex -space-x-4">
            {[1,2,3,4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/user${i + 50}/60/60`} className="w-16 h-16 rounded-full border-4 border-indigo-900 shadow-xl" />
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-indigo-900 bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-xl">+12k</div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AnalyticsView;
