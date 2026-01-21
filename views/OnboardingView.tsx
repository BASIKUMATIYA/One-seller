
import React, { useState } from 'react';

interface OnboardingViewProps {
  onComplete: () => void;
}

const steps = [
  { id: 1, title: 'Business Details', description: 'Basic company info' },
  { id: 2, title: 'Store Identity', description: 'Logo & Category' },
  { id: 3, title: 'Bank & Payouts', description: 'Where to get paid' },
  { id: 4, title: 'Identity (KYC)', description: 'Verification check' },
];

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 2000);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Legal Business Name</label>
                <input type="text" placeholder="Rivera Collective LLC" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">GST / Tax ID Number</label>
                <input type="text" placeholder="22AAAAA0000A1Z5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">PAN / Business ID</label>
                <input type="text" placeholder="ABCDE1234F" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Registered Address</label>
                <input type="text" placeholder="123 Business St, NY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
              </div>
              <p className="text-sm text-indigo-700 font-medium">Your tax information is used for regulatory compliance and will not be shared publicly.</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a48.324 48.324 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer">Upload Store Logo</span>
                  <p className="text-xs text-slate-400 mt-1">Recommended size 512x512px</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Display Store Name</label>
                <input type="text" placeholder="Rivera Style Collective" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Primary Product Category</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Fashion & Apparel</option>
                  <option>Home & Decor</option>
                  <option>Electronics</option>
                  <option>Health & Beauty</option>
                  <option>Art & Crafts</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative mb-4">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Settlement Account</p>
                  <p className="text-lg font-bold">Connect your bank</p>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Account Holder Name</label>
                <input type="text" placeholder="Alex Rivera" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">IFSC / Swift Code</label>
                <input type="text" placeholder="HDFC0001234" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Account Number</label>
                <input type="password" placeholder="•••• •••• •••• 1234" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center py-8">
               <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800">Identity Verification</h3>
               <p className="text-slate-500 text-sm mt-2">Final step to unlock payouts and full dashboard features.</p>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-500 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-500 group-hover:text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">National ID Card</p>
                      <p className="text-xs text-slate-500">Government issued photo ID</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 px-2 py-1 bg-indigo-50 rounded-lg">Select</span>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-indigo-500 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-500 group-hover:text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.25c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Passport</p>
                      <p className="text-xs text-slate-500">International travel document</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 px-2 py-1 bg-indigo-50 rounded-lg">Select</span>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col items-center py-12 px-6 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">S</div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Onboarding</h2>
              <p className="text-slate-500 text-sm">Complete your profile to start selling</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
            {steps.map((step) => (
              <React.Fragment key={step.id}>
                <div className={`flex flex-col items-center shrink-0 ${currentStep === step.id ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= step.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-500'}`}>
                    {currentStep > step.id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    ) : step.id}
                  </div>
                </div>
                {step.id < 4 && <div className={`w-8 h-[2px] mt-4 mx-1 rounded-full ${currentStep > step.id ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12">
          <div className="mb-10">
             <span className="text-indigo-600 text-xs font-black uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">Step {currentStep}</span>
             <h3 className="text-3xl font-black text-slate-800 mt-3">{steps[currentStep-1].title}</h3>
             <p className="text-slate-500 mt-2">{steps[currentStep-1].description}</p>
          </div>

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm text-slate-400 hover:text-indigo-600 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              Go Back
            </button>
            <button 
              onClick={nextStep}
              disabled={loading}
              className="flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
              {currentStep === 4 ? (loading ? 'Setting up...' : 'Finish Onboarding') : 'Continue to Next Step'}
              {!loading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-12 text-slate-400 py-8 opacity-60">
           <div className="flex flex-col items-center">
             <p className="text-2xl font-black text-slate-700">100%</p>
             <p className="text-[10px] uppercase font-black tracking-widest">Secure Data</p>
           </div>
           <div className="flex flex-col items-center">
             <p className="text-2xl font-black text-slate-700">24/7</p>
             <p className="text-[10px] uppercase font-black tracking-widest">Human Support</p>
           </div>
           <div className="flex flex-col items-center">
             <p className="text-2xl font-black text-slate-700">KYC</p>
             <p className="text-[10px] uppercase font-black tracking-widest">Instant Check</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
