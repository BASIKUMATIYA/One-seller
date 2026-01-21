
import React, { useState } from 'react';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled' | 'Processing';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
  weight: number; // Feature 1: Product weight for logistics
  restockStatus?: 'Pending' | 'Resellable' | 'Damaged'; // Feature 2: Return restock logic
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
    ltv: string; // Lifetime Value
    ordersCount: number;
    address: string;
    loyaltyTier: 'VIP' | 'Regular' | 'New'; // Feature 3: Loyalty tiering
    sentiment: 'Positive' | 'Neutral' | 'Negative'; // Feature 4: AI Customer Sentiment
  };
  items: OrderItem[];
  total: number;
  taxAmount: number; // Feature 5: Tax breakdown
  status: OrderStatus;
  date: string;
  riskScore: number; // 0-100
  fraudFlags: string[]; // Feature 6: Fraud risk breakdown
  priority: 'High' | 'Normal' | 'Low';
  trackingId?: string;
  paymentMethod: string;
  warehouseLocation: string; // Feature 7: Multi-warehouse selector
  slaDeadline: string; // Feature 8: SLA fulfillment countdown
  isSubscription: boolean; // Feature 9: Subscription order identification
  internalNotes: { author: string; text: string; date: string }[]; // Feature 10: Team internal mentions
}

const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-8821',
    customer: {
      name: 'Emma Watson',
      email: 'emma.w@example.com',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      ltv: '$1,240',
      ordersCount: 8,
      address: '123 Baker Street, London, UK',
      loyaltyTier: 'VIP',
      sentiment: 'Positive'
    },
    items: [
      { id: 'p1', name: 'Vintage Leather Satchel', qty: 1, price: 120, image: 'https://picsum.photos/seed/p1/100/100', weight: 1.2 }
    ],
    total: 128.50,
    taxAmount: 8.50,
    status: 'Pending',
    date: '2 hours ago',
    riskScore: 4,
    fraudFlags: ['Low velocity', 'Verified Address'],
    priority: 'High',
    paymentMethod: 'Credit Card',
    warehouseLocation: 'London-North',
    slaDeadline: '4h 20m',
    isSubscription: false,
    internalNotes: [{ author: 'System', text: 'Auto-priority assigned for VIP', date: '2h ago' }]
  },
  {
    id: '#ORD-8822',
    customer: {
      name: 'John Doe',
      email: 'john.d@example.com',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      ltv: '$450',
      ordersCount: 2,
      address: '45 Main Road, New York, USA',
      loyaltyTier: 'Regular',
      sentiment: 'Neutral'
    },
    items: [
      { id: 'p2', name: 'Linen Shirt Blue', qty: 2, price: 45, image: 'https://picsum.photos/seed/p2/100/100', weight: 0.6 }
    ],
    total: 98.20,
    taxAmount: 8.20,
    status: 'Shipped',
    date: '5 hours ago',
    riskScore: 12,
    fraudFlags: ['IP Mismatch (Minor)'],
    priority: 'Normal',
    trackingId: 'TRK-99021445',
    paymentMethod: 'PayPal',
    warehouseLocation: 'NY-Main',
    slaDeadline: 'Completed',
    isSubscription: true,
    internalNotes: []
  }
];

const OrdersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'logistics' | 'intelligence'>('info');

  const filteredOrders = activeTab === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === activeTab);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
    setActiveSubTab('info');
  };

  const renderOrderList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Order Command Center</h1>
          <p className="text-slate-500 text-sm">Real-time fulfillment, risk analysis, and global logistics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            Export Manifest
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
            Batch Labels
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto scrollbar-hide">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Returned', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveTab(f as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Priority</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Intelligence</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Warehouse</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => handleOpenDetail(order)}>
                  <td className="px-8 py-4 text-center">
                    <span className={`w-3 h-3 rounded-full inline-block ${order.priority === 'High' ? 'bg-red-500 animate-pulse' : order.priority === 'Normal' ? 'bg-indigo-400' : 'bg-slate-200'}`}></span>
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      {order.id}
                      {order.isSubscription && <span className="bg-purple-100 text-purple-600 text-[8px] px-1.5 py-0.5 rounded-md">SUB</span>}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{order.date}</p>
                  </td>
                  <td className="px-8 py-4 flex items-center gap-3">
                    <img src={order.customer.avatar} className="w-9 h-9 rounded-full border border-slate-100" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">{order.customer.name}</p>
                        <span className={`text-[8px] font-black px-1 rounded ${order.customer.loyaltyTier === 'VIP' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{order.customer.loyaltyTier}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-lg">LTV: {order.customer.ltv}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs font-black text-slate-700">${order.total.toFixed(2)}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${order.riskScore > 20 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${order.riskScore}%` }}></div>
                       </div>
                       <span className="text-[9px] font-black text-slate-400">{order.riskScore}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[10px] font-bold text-slate-500">{order.warehouseLocation}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                      order.status === 'Returned' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-slate-300 group-hover:text-indigo-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
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

  const renderDetailDrawer = () => {
    if (!selectedOrder) return null;
    return (
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isDetailOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)}></div>
        <div className={`relative w-full max-w-3xl bg-white h-full shadow-2xl transition-transform duration-500 transform ${isDetailOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black">
                {selectedOrder.id.slice(1,2)}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fulfillment Suite</p>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedOrder.id}</h2>
              </div>
            </div>
            <div className="flex gap-2">
               <div className="px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-center">
                  <p className="text-[8px] font-black text-red-400 uppercase">SLA Deadline</p>
                  <p className="text-xs font-black text-red-600">{selectedOrder.slaDeadline}</p>
               </div>
               <button onClick={() => setIsDetailOpen(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          </div>

          <div className="flex border-b border-slate-100 bg-white sticky top-0 z-10">
            {(['info', 'logistics', 'intelligence'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {activeSubTab === 'info' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Feature 11: Multi-tab Drawer Navigation */}
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Buyer Identity</h3>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
                      <div className="flex items-center gap-4">
                        <img src={selectedOrder.customer.avatar} className="w-12 h-12 rounded-2xl shadow-sm" />
                        <div>
                          <p className="font-black text-slate-800">{selectedOrder.customer.name}</p>
                          <p className="text-xs text-slate-500">{selectedOrder.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* Feature 12: Sentiment Analyzer Badge */}
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${selectedOrder.customer.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>Sentiment: {selectedOrder.customer.sentiment}</span>
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-100 text-indigo-700">Tier: {selectedOrder.customer.loyaltyTier}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Delivery Coordinates</h3>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] flex flex-col justify-between">
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedOrder.customer.address}</p>
                      {/* Feature 13: Address Geo-Verification Indicator */}
                      <div className="flex items-center gap-2 mt-4 text-[9px] font-black text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        GEO-VERIFIED
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Item Verification</h3>
                  <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-none">
                         <div className="flex items-center gap-4">
                           <img src={item.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                           <div>
                              <p className="font-black text-slate-800 text-sm">{item.name}</p>
                              {/* Feature 14: Weight & SKU Tracking */}
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SKU: {item.id} • {item.weight}kg</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className="font-black text-slate-800 text-sm">${(item.price * item.qty).toFixed(2)}</p>
                           <p className="text-[10px] text-slate-400 font-bold">Qty: {item.qty}</p>
                         </div>
                      </div>
                    ))}
                    {/* Feature 15: Tax Breakdown Preview */}
                    <div className="bg-slate-50 p-6 space-y-2">
                       <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tight">
                          <span>Merchandise Subtotal</span>
                          <span>${(selectedOrder.total - selectedOrder.taxAmount).toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tight">
                          <span>Taxes (VAT/GST)</span>
                          <span>${selectedOrder.taxAmount.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between text-lg font-black text-slate-800 pt-4 border-t border-slate-200">
                          <span>Grand Total</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Feature 16: Internal Collaboration Mentions */}
                <div className="space-y-4">
                  <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Team Audit Log</h3>
                  <div className="space-y-3">
                    {selectedOrder.internalNotes.map((note, i) => (
                      <div key={i} className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/30 flex gap-3">
                         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0">{note.author[0]}</div>
                         <div>
                            <p className="text-xs font-black text-slate-800">{note.author} <span className="text-slate-400 font-bold ml-2">@{note.date}</span></p>
                            <p className="text-xs text-slate-600 mt-0.5">{note.text}</p>
                         </div>
                      </div>
                    ))}
                    <div className="relative">
                      <input type="text" placeholder="Tag team member @alex..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xs focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <button className="absolute right-3 top-2.5 px-4 py-1.5 bg-indigo-600 text-white font-black rounded-xl text-[10px] uppercase">Post</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'logistics' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                 {/* Feature 17: Multi-Warehouse Logic */}
                 <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="font-black text-slate-800 tracking-tight">Dispatch Routing</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Warehouse</label>
                          <select defaultValue={selectedOrder.warehouseLocation} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-800">
                             <option>London-North</option>
                             <option>Berlin-Hub</option>
                             <option>NY-Brooklyn</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Status</label>
                          <div className="p-4 bg-emerald-50 text-emerald-700 text-xs font-black rounded-2xl">RESERVED - IN STOCK</div>
                       </div>
                    </div>
                    {/* Feature 18: Packaging Suggestions (AI) */}
                    <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Packaging Recommend</p>
                          <p className="text-sm font-bold">Standard Box Type-B (Eco-Lite)</p>
                       </div>
                       <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-[10px] font-black uppercase">Change Box</button>
                    </div>
                 </div>

                 {/* Feature 19: Courier Selection & Rates */}
                 <div className="space-y-4">
                    <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Carrier Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {[
                         { name: 'GlobalX Express', price: '$12.40', eta: '2 Days', best: true },
                         { name: 'Standard Post', price: '$4.20', eta: '5-7 Days', best: false },
                         { name: 'Sky-Cargo High', price: '$24.00', eta: 'Next Day', best: false },
                       ].map((c, i) => (
                         <div key={i} className={`p-5 rounded-3xl border transition-all cursor-pointer ${c.best ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                            {c.best && <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full mb-3 inline-block">BEST VALUE</span>}
                            <p className="font-black text-slate-800 text-sm">{c.name}</p>
                            <p className="text-lg font-black text-slate-800 mt-1">{c.price}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">ETA: {c.eta}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Feature 20: Thermal Label Preview */}
                 <div className="space-y-4">
                    <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Documentation Toolset</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <button className="p-8 bg-white border border-slate-100 rounded-[32px] flex flex-col items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                          <span className="text-3xl">🖨️</span>
                          <span className="text-[10px] font-black uppercase">Thermal Packing Slip</span>
                       </button>
                       <button className="p-8 bg-white border border-slate-100 rounded-[32px] flex flex-col items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                          <span className="text-3xl">🎁</span>
                          <span className="text-[10px] font-black uppercase">Print Gift Card</span>
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeSubTab === 'intelligence' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                 {/* Feature 21: Deep Fraud Analysis Breakdown */}
                 <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="font-black text-red-900 tracking-tight text-lg">Risk Intelligence</h3>
                       <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full">{selectedOrder.riskScore}% SCORE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       {selectedOrder.fraudFlags.map((flag, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs font-bold text-red-700">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-50"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>
                             {flag}
                          </div>
                       ))}
                    </div>
                    {/* Feature 22: Fraud Dispute Workflow */}
                    <button className="w-full py-4 bg-white border-2 border-red-200 text-red-600 font-black rounded-2xl text-[10px] uppercase hover:bg-red-100 transition-all">Initiate Fraud Dispute Process</button>
                 </div>

                 {/* Feature 23: Re-order Prediction (AI) */}
                 <div className="bg-indigo-900 p-8 rounded-[40px] text-white relative overflow-hidden">
                    <div className="relative z-10">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Predictive Logic</p>
                       <h4 className="text-xl font-black tracking-tight">Likely to re-order in 24 days</h4>
                       <p className="text-slate-400 text-sm mt-2 leading-relaxed">Based on item usage cycle and historical churn analysis for this segment.</p>
                       {/* Feature 24: Upsell Recommend Logic */}
                       <div className="mt-8 flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                          <img src="https://picsum.photos/seed/p3/60/60" className="w-12 h-12 rounded-xl" />
                          <div className="flex-1">
                             <p className="text-[10px] font-black text-indigo-300 uppercase">Upsell Suggestion</p>
                             <p className="text-xs font-bold">Include "Leather Conditioner" sampler</p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl uppercase">Add Sample</button>
                       </div>
                    </div>
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                 </div>

                 {/* Feature 25: Returns Heatmap Visualization Placeholder */}
                 <div className="space-y-4">
                    <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Segment Quality Trends</h3>
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px]">
                       <div className="flex justify-between items-center mb-6">
                          <p className="text-xs font-bold text-slate-500">Return rate for similar satchels</p>
                          <span className="text-xs font-black text-emerald-600">0.8% (Stable)</span>
                       </div>
                       <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex">
                          <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                          <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>
                          <div className="h-full bg-red-500" style={{ width: '5%' }}></div>
                       </div>
                       <div className="flex justify-between mt-3 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          <span>Quality Satisfied</span>
                          <span>Size Mismatch</span>
                          <span>Damaged</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Action Suite - Footer */}
          <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4">
             {/* Feature 26: Partial Fulfillment Controller */}
             <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl text-[10px] uppercase hover:bg-slate-100 transition-all flex flex-col items-center flex-1">
                <span>📦</span>
                <span className="mt-1">Partial Ship</span>
             </button>
             {/* Feature 27: Full Refund Automation */}
             <button className="px-6 py-4 bg-white border border-slate-200 text-red-600 font-black rounded-2xl text-[10px] uppercase hover:bg-red-50 transition-all flex flex-col items-center flex-1">
                <span>💰</span>
                <span className="mt-1">Full Refund</span>
             </button>
             {/* Feature 28: Split Shipment Workflow */}
             <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl text-[10px] uppercase hover:bg-slate-100 transition-all flex flex-col items-center flex-1">
                <span>✂️</span>
                <span className="mt-1">Split Order</span>
             </button>
             {/* Feature 29: Dispatch Logic Confirmation */}
             <button className="flex-[3] py-4 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                <span>🚀</span>
                CONFIRM DISPATCH
             </button>
          </div>
          {/* Feature 30: Quick CSAT Survey Toggle */}
          <div className="px-8 pb-4 text-center">
             <div className="flex items-center justify-center gap-2">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Trigger Automated CSAT Survey Post-Delivery</label>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Shipments', value: '12', color: 'text-amber-600', icon: '📦' },
          { label: 'Avg Delivery Time', value: '2.4 Days', color: 'text-indigo-600', icon: '⚡' },
          { label: 'Return Rate', value: '1.2%', color: 'text-emerald-600', icon: '🔄' },
          { label: 'Fraud Attempts', value: '0', color: 'text-slate-400', icon: '🛡️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-indigo-100 transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {renderOrderList()}
      {renderDetailDrawer()}

      {/* Analytics Insights */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <h3 className="text-3xl font-black tracking-tight leading-none">Fulfillment Logistics Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our predictive engine estimates that 85% of your orders this week will arrive before the EDD. We've automatically optimized carrier selection for the **West Coast** to save $2.40 per package.</p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <p className="text-[8px] font-black uppercase text-indigo-400">Projected Savings</p>
                <p className="text-sm font-black text-white">$420 / mo</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <p className="text-[8px] font-black uppercase text-emerald-400">Carrier Health</p>
                <p className="text-sm font-black text-white">Excellent</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <p className="text-[8px] font-black uppercase text-amber-400">Warehouse Uptime</p>
                <p className="text-sm font-black text-white">99.9%</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto">
             <button className="w-full lg:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-2xl shadow-indigo-500/50 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">Full Logistics Audit</button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default OrdersView;
