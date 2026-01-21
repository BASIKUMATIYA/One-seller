
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { NAV_ITEMS } from './constants';
import DashboardView from './views/DashboardView';
import CatalogView from './views/CatalogView';
import OrdersView from './views/OrdersView';
import ContentView from './views/ContentView';
import CollaborationView from './views/CollaborationView';
import CommunityView from './views/CommunityView';
import LiveView from './views/LiveView';
import AnalyticsView from './views/AnalyticsView';
import ProfileView from './views/ProfileView';
import AuthView from './views/AuthView';
import OnboardingView from './views/OnboardingView';
import MarketingView from './views/MarketingView';
import LegalView from './views/LegalView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeView, setActiveView] = useState<ViewState>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveView(isOnboarded ? 'dashboard' : 'onboarding');
  };

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('login');
  };

  const renderView = () => {
    if (!isAuthenticated) {
      return (
        <AuthView 
          activeView={activeView} 
          onViewChange={setActiveView} 
          onLoginSuccess={handleLoginSuccess} 
        />
      );
    }

    if (!isOnboarded && activeView === 'onboarding') {
      return <OnboardingView onComplete={handleOnboardingComplete} />;
    }

    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'catalog': return <CatalogView />;
      case 'orders': return <OrdersView />;
      case 'content': return <ContentView />;
      case 'collaboration': return <CollaborationView />;
      case 'community': return <CommunityView />;
      case 'live': return <LiveView />;
      case 'marketing': return <MarketingView />;
      case 'legal': return <LegalView />;
      case 'analytics': return <AnalyticsView />;
      case 'profile': return <ProfileView onLogout={handleLogout} />;
      default: return <DashboardView />;
    }
  };

  if (!isAuthenticated) {
    return <div className="h-screen w-screen overflow-hidden bg-slate-50">{renderView()}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {isOnboarded && (
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            {isSidebarOpen && <span className="font-bold text-slate-800 text-lg tracking-tight">SellerFlow</span>}
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ViewState)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeView === item.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => setActiveView('profile')}
              className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <img src="https://picsum.photos/seed/seller/40/40" className="w-9 h-9 rounded-full border border-slate-200" alt="Profile" />
              {isSidebarOpen && (
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-semibold text-slate-700 truncate">Alex Rivera</p>
                  <p className="text-xs text-slate-400">Pro Seller</p>
                </div>
              )}
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mt-4 w-full flex items-center justify-center p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
        </aside>
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {isOnboarded && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-slate-800 capitalize">{activeView === 'legal' ? 'Legal & Compliance' : activeView}</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-slate-100 border-none rounded-full py-2 px-5 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            </div>
          </header>
        )}

        <div className={`flex-1 overflow-y-auto ${isOnboarded ? 'p-8 bg-slate-50/50' : ''}`}>
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
