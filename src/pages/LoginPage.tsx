import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { demoCredentials } from '@/data/mockData';
import { Shield, User, Building2, Eye, EyeOff, Info, MapPin, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/types';

const roleRedirects: Record<UserRole, string> = {
  citizen: '/citizen',
  district_officer: '/district',
  state_officer: '/state',
};

const roleIcons = {
  citizen: User,
  district_officer: Building2,
  state_officer: Shield,
};

const roleLabels = {
  citizen: 'Citizen',
  district_officer: 'District Officer',
  state_officer: 'State Officer',
};

const LoginPage = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCreds, setShowDemoCreds] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate(roleRedirects[user.role]);
    }
  }, [isAuthenticated, user, navigate]);

  const fillDemoCreds = (credEmail: string) => {
    const cred = demoCredentials.find(c => c.email === credEmail);
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error || 'Identity verification failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0F2F5]">
      {/* Left panel - Official Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        <div className="relative z-10 flex flex-col justify-between p-16 text-white w-full">
          <div>
            <div className="flex items-center gap-4 mb-12">
              <img src="/Pothole-logo.svg" className="h-24 w-auto" alt="Logo" />
              <div>
                <h1 className="text-2xl font-black uppercase tracking-widest leading-none text-white">SmartRoad</h1>
                <p className="text-[10px] text-white/50 font-bold tracking-[0.3em] mt-2 uppercase">Government of Andhra Pradesh</p>
              </div>
            </div>

            <h2 className="text-7xl font-black leading-[0.9] mb-8 tracking-tighter italic text-white drop-shadow-2xl">
              SmartRoad
            </h2>
            <p className="text-lg text-white/60 max-w-md font-medium leading-relaxed">
              Official centralized portal for automated road infrastructure monitoring, maintenance management, and citizen grievance redressal.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-12">
              {[
                { label: 'Active Districts', value: '26' },
                { label: 'Infrastructure Nodes', value: '450+' },
                { label: 'Daily Reports', value: '1.2k' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-white/10 text-[9px] text-white/40 font-bold uppercase tracking-[0.2em]">
              Secure Administrative Environment • RTGS Integrated
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Secure Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded uppercase border border-primary/10 mb-6 tracking-widest">
              Authenticated Access Only
            </div>
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase italic leading-none">SmartRoad</h2>
            <p className="text-gray-500 mt-3 font-medium text-sm">Centralized Administrative Authentication Protocol</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Official Username / Email</Label>
              <Input
                id="email"
                type="email"
                className="h-12 border-gray-300 rounded-md focus:ring-primary shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@gov.ap.in"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Credential</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="h-12 border-gray-300 rounded-md focus:ring-primary shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-md">
                <Info className="h-5 w-5 text-red-600" />
                <p className="text-xs font-bold text-red-700">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-md shadow-lg shadow-primary/20 transition-all active:scale-[0.98] gap-3">
              <Lock className="h-4 w-4" />
              Establish Secure Session
            </Button>
          </form>

          {/* Demo Credentials Triage */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowDemoCreds(!showDemoCreds)}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 hover:text-primary transition-colors flex items-center gap-2 mx-auto lg:mx-0 group"
            >
              <Shield className="h-3 w-3 group-hover:animate-pulse" />
              {showDemoCreds ? 'Hide Administrative Keyrings' : 'Expose Administrative Keyrings'}
            </button>

            {showDemoCreds && (
              <div className="mt-4 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.email}
                    type="button"
                    onClick={() => fillDemoCreds(cred.email)}
                    className="flex items-center justify-between p-3 rounded bg-white border border-gray-100 hover:border-primary/30 text-left transition-all group shadow-sm"
                  >
                    <div>
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest">{roleLabels[cred.role]}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{cred.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100 italic">Pre-Auth Available</span>
                      <ChevronRight className="h-3 w-3 text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <footer className="pt-8 border-t border-gray-200 text-center">
            <div className="flex justify-center gap-6 mb-4">
              <img src="/Pothole-logo.svg" className="h-10 w-auto" alt="Logo" />
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-left">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Digital Governance</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">SmartRoad, Govt of AP</p>
              </div>
            </div>
            <p className="text-[9px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto italic">
              Unauthorized access to this portal is a punishable offense. IP addresses are logged for security auditing.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
