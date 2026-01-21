
import React, { useState } from 'react';
import { ViewState } from '../types';

interface AuthViewProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLoginSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ activeView, onViewChange, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      if (activeView === 'login' || activeView === 'otp') {
        onLoginSuccess();
      } else if (activeView === 'signup' || activeView === 'forgot_password') {
        onViewChange('otp');
      }
    }, 1500);
  };

  const renderForm = () => {
    switch (activeView) {
      case 'login':
        return (
          <div className="space-y-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
              <p className="text-slate-500 text-sm mt-2">Log in to manage your seller account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                  <button type="button" onClick={() => onViewChange('forgot_password')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot?</button>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                Log In
              </button>
            </form>
            <div className="text-center text-sm">
              <span className="text-slate-500">Don't have an account?</span>{' '}
              <button onClick={() => onViewChange('signup')} className="text-indigo-600 font-bold hover:underline">Sign Up</button>
            </div>
          </div>
        );

      case 'signup':
        return (
          <div className="space-y-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
              <p className="text-slate-500 text-sm mt-2">Join thousands of sellers today</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">First Name</label>
                  <input type="text" required placeholder="Alex" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Name</label>
                  <input type="text" required placeholder="Rivera" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input type="email" required placeholder="alex@example.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                <input type="password" required placeholder="Create a strong password" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" required className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <label className="text-xs text-slate-500">I agree to the <a href="#" className="text-indigo-600 underline">Terms of Service</a></label>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                Create Account
              </button>
            </form>
            <div className="text-center text-sm">
              <span className="text-slate-500">Already have an account?</span>{' '}
              <button onClick={() => onViewChange('login')} className="text-indigo-600 font-bold hover:underline">Log In</button>
            </div>
          </div>
        );

      case 'forgot_password':
        return (
          <div className="space-y-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => onViewChange('login')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              <span className="text-xs font-bold uppercase">Back to Login</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Forgot Password</h1>
              <p className="text-slate-500 text-sm mt-2">Enter your email and we'll send a reset code</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input type="email" required placeholder="alex@example.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                Send Reset Code
              </button>
            </form>
          </div>
        );

      case 'otp':
        return (
          <div className="space-y-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">Verify Code</h1>
              <p className="text-slate-500 text-sm mt-2">We've sent a 6-digit code to your email</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input 
                    key={i}
                    type="text" 
                    maxLength={1}
                    autoFocus={i === 1}
                    className="w-12 h-12 text-center text-xl font-bold bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                ))}
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                Verify & Continue
              </button>
              <div className="text-center text-sm">
                <span className="text-slate-500">Didn't receive code?</span>{' '}
                <button type="button" className="text-indigo-600 font-bold hover:underline">Resend</button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side: branding/illustration */}
      <div className="hidden lg:flex flex-1 bg-indigo-600 relative overflow-hidden flex-col justify-center px-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-3xl -mr-64 -mt-64 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400 rounded-full blur-3xl -ml-32 -mb-32 opacity-30"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.651V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72L4.318 3.44A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72m-13.5 8.65h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .415.336.75.75.75Z" /></svg>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">Empower Your Business Growth.</h2>
            <p className="text-indigo-100 text-lg max-w-md">The all-in-one platform to scale your sales, manage reels, and build a thriving community.</p>
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-indigo-600" />
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">+10k</div>
          </div>
          <p className="text-indigo-200 text-sm font-medium italic">Join over 10,000 successful sellers worldwide.</p>
        </div>
      </div>

      {/* Right side: Forms */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 lg:px-20 relative">
        {renderForm()}
        
        <div className="absolute bottom-8 text-slate-400 text-xs">
          © 2024 SellerFlow Pro. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthView;
