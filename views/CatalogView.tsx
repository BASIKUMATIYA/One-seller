
import React, { useState } from 'react';
import { Product } from '../types';

type CatalogMode = 'list' | 'add' | 'edit' | 'bulk';

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Vintage Leather Satchel', 
    category: 'Accessories', 
    price: 120, 
    discountPrice: 99,
    stock: 45, 
    status: 'active', 
    image: 'https://picsum.photos/seed/p1/200/200',
    sku: 'ACC-SAT-001',
    description: 'Genuine leather satchel with vintage finish.',
    variants: ['Brown', 'Black']
  },
  { 
    id: '2', 
    name: 'Cotton Linen Shirt', 
    category: 'Apparel', 
    price: 45, 
    stock: 120, 
    status: 'active', 
    image: 'https://picsum.photos/seed/p2/200/200',
    sku: 'APP-LNN-002',
    description: 'Breathable linen shirt for summer.',
    variants: ['S', 'M', 'L', 'XL']
  },
];

const CatalogView: React.FC = () => {
  const [mode, setMode] = useState<CatalogMode>('list');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('all');

  const handleAddProduct = () => {
    setEditingProduct(null);
    setMode('add');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setMode('edit');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('list');
  };

  const renderListView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Product Catalog</h1>
          <p className="text-slate-500 text-sm">Manage inventory, media, and listings.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setMode('bulk')}
            className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            Bulk Upload
          </button>
          <button 
            onClick={handleAddProduct}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 overflow-x-auto">
          {['all', 'active', 'draft', 'out of stock'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-indigo-50 text-indigo-700' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4 flex items-center gap-4">
                  <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.category}</p>
                  </div>
                </td>
                <td className="px-8 py-4 text-xs font-mono text-slate-500">{p.sku}</td>
                <td className="px-8 py-4">
                  <span className="font-bold text-slate-800">${p.price}</span>
                  {p.discountPrice && <p className="text-[10px] text-emerald-500 font-bold">${p.discountPrice} Sale</p>}
                </td>
                <td className="px-8 py-4 text-xs font-bold text-slate-600">{p.stock} units</td>
                <td className="px-8 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    p.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <button onClick={() => handleEditProduct(p)} className="p-2 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFormView = () => (
    <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-right duration-500 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setMode('list')} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h1>
            <p className="text-slate-500 text-sm">Enter detailed specifications and media.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold">Draft</button>
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">Save Listing</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800">Product Specifications</h3>
            <div className="space-y-4">
              <input type="text" defaultValue={editingProduct?.name} placeholder="Product Title" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" defaultValue={editingProduct?.sku} placeholder="SKU ID" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm" />
                <select className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm">
                  <option>Apparel</option>
                  <option>Accessories</option>
                  <option>Home Decor</option>
                </select>
              </div>
              <textarea rows={4} defaultValue={editingProduct?.description} placeholder="Product Description..." className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm resize-none"></textarea>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800">Financials & Stock</h3>
            <div className="grid grid-cols-2 gap-6">
              <input type="number" defaultValue={editingProduct?.price} placeholder="Price ($)" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold" />
              <input type="number" defaultValue={editingProduct?.discountPrice} placeholder="Sale Price (Opt)" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-emerald-600" />
              <input type="number" defaultValue={editingProduct?.stock} placeholder="Inventory Level" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm" />
              <input type="number" placeholder="Alert Level" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm text-red-500" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-800">Media Hub</h3>
            <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-300"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
               <span className="text-xs font-bold text-slate-400 mt-2">Upload 4K Media</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 00 2.25 2.25z" /></svg>
              </div>
              <span className="text-xs font-bold text-slate-600">Product Showcase Video</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div className="pb-10">
      {mode === 'list' && renderListView()}
      {(mode === 'add' || mode === 'edit') && renderFormView()}
      {mode === 'bulk' && (
        <div className="bg-white p-20 rounded-[40px] text-center max-w-2xl mx-auto border border-slate-100 shadow-xl">
           <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
           </div>
           <h3 className="text-2xl font-black text-slate-800">Bulk Import System</h3>
           <p className="text-slate-500 mt-2 mb-8">Drop your CSV or Excel file here to update inventory instantly.</p>
           <button onClick={() => setMode('list')} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">Select Files</button>
        </div>
      )}
    </div>
  );
};

export default CatalogView;
