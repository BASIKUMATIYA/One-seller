
import React, { useState } from 'react';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled' | 'Processing';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
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
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  riskScore: number; // 0-100
  priority: 'High' | 'Normal' | 'Low';
  trackingId?: string;
  paymentMethod: string;
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
      address: '123 Baker Street, London, UK'
    },
    items: [
      { id: 'p1', name: 'Vintage Leather Satchel', qty: 1, price: 120, image: 'https://picsum.photos/seed/p1/100/100' }
    ],
    total: 128.50,
    status: 'Pending',
    date: '2 hours ago',
    riskScore: 4,
    priority: 'High',
    paymentMethod: 'Credit Card'
  },
  {
    id: '#ORD-8822',
    customer: {
      name: 'John Doe',
      email: 'john.d@example.com',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      ltv: '$450',
      ordersCount: 2,
      address: '45 Main Road, New York, USA'
    },
    items: [
      { id: 'p2', name: 'Linen Shirt Blue', qty: 2, price: 45, image: 'https://picsum.photos/seed/p2/100/100' }
    ],
    total: 98.20,
    status: 'Shipped',
    date: '5 hours ago',
    riskScore: 12,
    priority: 'Normal',
    trackingId: 'TRK-99021445',
    paymentMethod: 'PayPal'
  },
  {
    id: '#ORD-8823',
    customer: {
      name: 'Sarah Connor',
      email: 'sarah.c@sky.net',
      avatar: 'https://picsum.photos/seed/user3/100/100',
      ltv: '$2,100',
      ordersCount: 15,
      address: '742 Cyberdyne Blvd, Los Angeles, USA'
    },
    items: [
      { id: 'p3', name: 'Wall Clock Black', qty: 1, price: 85, image: 'https://picsum.photos/seed/p3/100/100' }
    ],
    total: 92.40,
    status: 'Returned',
    date: '1 day ago',
    riskScore: 2,
    priority: 'Normal',
    paymentMethod: 'Credit Card'
  }
];

const OrdersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredOrders = activeTab === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === activeTab);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const renderOrderList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Order Fulfillment</h1>
          <p className="text-slate-500 text-sm">Manage inventory dispatch, shipping labels, and customer returns.</p>
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
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order & Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Score</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => handleOpenDetail(order)}>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm">{order.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{order.date}</p>
                  </td>
                  <td className="px-8 py-4 flex items-center gap-3">
                    <img src={order.customer.avatar} className="w-9 h-9 rounded-full border border-slate-100" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{order.customer.name}</p>
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
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      order.priority === 'High' ? 'text-red-600' : 'text-slate-400'
                    }`}>{order.priority}</span>
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
        <div className={`relative w-full max-w-2xl bg-white h-full shadow-2xl transition-transform duration-500 transform ${isDetailOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedOrder.id}</h2>
            </div>
            <button onClick={() => setIsDetailOpen(false)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 shadow-sm transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {/* Status Timeline */}
            <div className="space-y-6">
              <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Fulfillment Timeline</h3>
              <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-10"></div>
                {[
                  { label: 'Placed', date: 'Oct 12', completed: true },
                  { label: 'Packed', date: 'Oct 12', completed: true },
                  { label: 'Shipped', date: 'Oct 13', completed: selectedOrder.status !== 'Pending' },
                  { label: 'Delivered', date: 'Expected Oct 15', completed: selectedOrder.status === 'Delivered' }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center ${s.completed ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {s.completed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> : <span className="text-[10px] font-black">{i+1}</span>}
                    </div>
                    <p className={`text-[10px] font-black uppercase mt-3 ${s.completed ? 'text-slate-800' : 'text-slate-400'}`}>{s.label}</p>
                    <p className="text-[9px] text-slate-400 font-bold">{s.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Customer Insight</h3>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={selectedOrder.customer.avatar} className="w-12 h-12 rounded-2xl" />
                    <div>
                      <p className="font-black text-slate-800">{selectedOrder.customer.name}</p>
                      <p className="text-xs text-slate-500">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Lifetime Spend</p>
                      <p className="text-sm font-black text-indigo-600">{selectedOrder.customer.ltv}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Total Orders</p>
                      <p className="text-sm font-black text-slate-800">{selectedOrder.customer.ordersCount}</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-indigo-600 hover:bg-indigo-50 transition-all">Send Direct Message</button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Shipping Address</h3>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] h-full flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedOrder.customer.address}
                  </p>
                  <div className="pt-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-[9px] font-black text-emerald-600 uppercase">Address Verified</span>
                  </div>
                  <button className="mt-4 text-xs font-black text-indigo-600 uppercase hover:underline">Edit Address</button>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Order Content</h3>
              <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={item.id} className={`p-6 flex items-center justify-between ${idx !== 0 ? 'border-t border-slate-50' : ''}`}>
                    <div className="flex items-center gap-4">
                       <img src={item.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                       <div>
                          <p className="font-black text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.qty} • SKU: {item.id.toUpperCase()}</p>
                       </div>
                    </div>
                    <p className="font-black text-slate-800 text-sm">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
                <div className="bg-slate-50 p-6 flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                      <span>Subtotal</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                      <span>Shipping</span>
                      <span className="text-emerald-600">Free</span>
                   </div>
                   <div className="flex justify-between text-lg font-black text-slate-800 border-t border-slate-200 pt-3 mt-1">
                      <span>Total Amount</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Actions Grid - 30+ potential features mapped into clusters */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Management Suite</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {[
                   { label: 'Print Invoice', icon: '📄', color: 'hover:bg-slate-50' },
                   { label: 'Shipping Label', icon: '🏷️', color: 'hover:bg-slate-50' },
                   { label: 'Split Order', icon: '✂️', color: 'hover:bg-slate-50' },
                   { label: 'Full Refund', icon: '💰', color: 'hover:bg-red-50 text-red-600' },
                   { label: 'Partial Refund', icon: '💵', color: 'hover:bg-amber-50 text-amber-600' },
                   { label: 'Restock Items', icon: '🔄', color: 'hover:bg-emerald-50 text-emerald-600' },
                   { label: 'Fraud Dispute', icon: '🚩', color: 'hover:bg-slate-50' },
                   { label: 'Priority Flag', icon: '🔥', color: 'hover:bg-indigo-50 text-indigo-600' },
                   { label: 'Gift Wrap', icon: '🎁', color: 'hover:bg-slate-50' },
                   { label: 'Internal Note', icon: '📝', color: 'hover:bg-slate-50' },
                   { label: 'Notify Dispatch', icon: '📧', color: 'hover:bg-slate-50' },
                   { label: 'Logistics Book', icon: '🚚', color: 'hover:bg-slate-50' },
                 ].map((act, i) => (
                   <button key={i} className={`p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 transition-all shadow-sm text-center ${act.color}`}>
                      <span className="text-xl">{act.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{act.label}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 text-white flex gap-4">
            <button className="flex-1 py-4 bg-indigo-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all">Mark as Shipped</button>
            <button className="flex-1 py-4 bg-white/10 border border-white/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/20 transition-all">Cancel Transaction</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Pending Shipments', value: '12', color: 'text-amber-600', icon: '📦' },
          { label: 'Avg Delivery Time', value: '2.4 Days', color: 'text-indigo-600', icon: '⚡' },
          { label: 'Return Rate', value: '1.2%', color: 'text-emerald-600', icon: '🔄' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-2xl shadow-inner">{stat.icon}</div>
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
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <h3 className="text-3xl font-black tracking-tight leading-none">Fulfillment Logistics AI</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our predictive engine estimates that 85% of your orders this week will arrive before the EDD. We've automatically optimized carrier selection for the **West Coast** to save $2.40 per package.</p>
            <div className="flex gap-4 pt-4">
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <p className="text-[8px] font-black uppercase text-indigo-400">Projected Savings</p>
                <p className="text-sm font-black text-white">$420 / mo</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <p className="text-[8px] font-black uppercase text-emerald-400">Carrier Health</p>
                <p className="text-sm font-black text-white">Excellent</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
             <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-2xl shadow-indigo-500/50 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">Optimization Report</button>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default OrdersView;
