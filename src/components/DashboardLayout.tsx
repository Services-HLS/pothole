import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusCircle, ClipboardCheck, BarChart3,
  Users, Settings, LogOut, Shield, MapPin, Bell, Menu, Activity,
  Calendar, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Mail, ChevronDown, User, HelpCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = {
  citizen: [
    { label: 'Citizen Dashboard', path: '/citizen', icon: LayoutDashboard },
    { label: 'Reported Grievances', path: '/citizen/complaints', icon: FileText },
    { label: 'Register Grievance', path: '/citizen/new-complaint', icon: PlusCircle },
  ],
  district_officer: [
    { label: 'Dashboard', path: '/district', icon: LayoutDashboard },
    { label: 'Grievances', path: '/district/complaints', icon: FileText },
    { label: 'Work Orders', path: '/district/orders', icon: Calendar },
    { label: 'Work Tracking', path: '/district/tracking', icon: Activity },
    { label: 'System Alerts', path: '/district/notifications', icon: Bell },
  ],
  state_officer: [
    { label: 'State Overview', path: '/state', icon: LayoutDashboard },
    { label: 'Compliance Reports', path: '/state/complaints', icon: ClipboardCheck },
    { label: 'Analytics & KPIs', path: '/state/analytics', icon: BarChart3 },
    { label: 'AI Optimization', path: '/state/ai-insights', icon: Shield },
  ],
};

const roleLabels = {
  citizen: 'Citizen Services',
  district_officer: 'District Administration',
  state_officer: 'State Administration Control',
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (!user) {
    navigate('/login');
    return null;
  }

  const items = navItems[user.role];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F2F5]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 flex-shrink-0 bg-primary text-white flex flex-col overflow-hidden z-20 shadow-2xl relative`}>
        {/* Collapse Toggle inside Sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-6 right-6 z-30 p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/40 hover:text-white"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="p-6 border-b border-white/10 bg-transparent">
          <div className={`flex flex-col items-center text-center gap-3 transition-all duration-300 ${!sidebarOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
            {sidebarOpen && (
              <>
                <img src="/Pothole-logo.svg" className="h-20 w-auto" alt="Logo" />
                <div>
                  <h1 className="text-sm font-black leading-tight tracking-wider uppercase text-white">SmartRoad</h1>
                  <p className="text-[10px] text-white/60 font-medium whitespace-nowrap">Govt of Andhra Pradesh</p>
                </div>
              </>
            )}
          </div>
          {!sidebarOpen && (
            <div className="flex justify-center py-2">
              <img src="/Pothole-logo.svg" className="h-8 w-auto" alt="Logo" />
            </div>
          )}
        </div>

        <div className={`px-6 py-4 bg-primary/20 border-b border-white/5 transition-all duration-300 ${!sidebarOpen ? 'px-0 text-center' : ''}`}>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-black truncate">
            {sidebarOpen ? roleLabels[user.role] : roleLabels[user.role].charAt(0)}
          </p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-none">
          {items.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? item.label : ''}
                className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-all ${active
                  ? 'bg-secondary text-white font-bold shadow-lg'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } ${!sidebarOpen ? 'justify-center border-none' : ''}`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-white/40'}`} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              to="/settings"
              title={!sidebarOpen ? 'System Settings' : ''}
              className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-all ${location.pathname === '/settings'
                ? 'bg-secondary text-white font-bold shadow-lg'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
                } ${!sidebarOpen ? 'justify-center border-none' : ''}`}
            >
              <Settings className={`h-4 w-4 shrink-0 ${location.pathname === '/settings' ? 'text-white' : 'text-white/40'}`} />
              {sidebarOpen && <span className="truncate">System Settings</span>}
            </Link>
          </div>

        </nav>

        <div className={`p-4 border-t border-white/10 bg-black/20 transition-all ${!sidebarOpen ? 'p-2' : ''}`}>
          <div className={`flex items-center gap-3 p-2 ${!sidebarOpen ? 'justify-center' : ''}`}>
            <div className="h-10 w-10 shrink-0 rounded-md bg-white/10 flex items-center justify-center border border-white/10">
              <User className="h-5 w-5 text-white/60" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-white/50 truncate uppercase tracking-tighter">{user.role.replace('_', ' ')}</p>
              </div>
            )}
            {sidebarOpen && (
              <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors shrink-0">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
          {!sidebarOpen && (
            <button onClick={handleLogout} className="w-full flex justify-center py-2 text-white/40 hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500">
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-primary flex items-center gap-2 tracking-tighter italic">
                SmartRoad
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4 text-xs font-bold text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SYSTEM ONLINE
            </div>

            <button className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-gray-100 relative text-gray-500 transition-colors border border-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            <button className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">{user.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">Session Active</p>
              </div>
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center text-white border border-primary shadow-sm hover:brightness-110 transition-all">
                <User className="h-6 w-6" />
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F0F2F5] p-8 scrollbar-none">
          <div className="max-w-[1400px] mx-auto min-h-full flex flex-col gap-8">
            <div className="flex-1">
              <Outlet />
            </div>

            {/* Footer */}
            <footer className="mt-8 pt-8 border-t border-gray-200 text-gray-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
                <div className="flex items-center gap-4">
                  <img src="/Pothole-logo.svg" className="h-12 w-auto grayscale-0 opacity-100" alt="Logo" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">SmartRoad</p>
                    <p className="text-[10px] font-medium text-gray-400">Government of Andhra Pradesh</p>
                  </div>
                </div>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                  <Link to="#" className="hover:text-primary transition-colors">Usage Policy</Link>
                  <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                  <Link to="#" className="hover:text-primary transition-colors">Grievance Guidelines</Link>
                  <Link to="#" className="hover:text-primary transition-colors">Help Desk</Link>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">© 2026 R&B Department, Govt of AP. All Rights Reserved.</p>
                </div>
              </div>
              <div className="bg-gray-200/50 p-4 rounded text-center text-[9px] font-medium leading-relaxed italic text-gray-400">
                Disclaimer: This portal is intended for official use by the Roads & Buildings Department, Government of Andhra Pradesh. Unauthorized access or attempt to mismanage public data is strictly prohibited and punishable under IT Act 2000.
              </div>
            </footer>
          </div>
        </main>
      </div>
      {/* WhatsApp FAB for District Officer */}
      {user.role === 'district_officer' && (
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-xl"
          title="Connect on WhatsApp"
        >
          <img src="/whatsapp-icon.svg" className="h-14 w-14" alt="WhatsApp" />
        </a>
      )}
    </div>
  );
};

export default DashboardLayout;
