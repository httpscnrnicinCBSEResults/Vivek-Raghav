import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  Keyboard, 
  MapPin,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmission: () => void;
  onOpenVerifyModal?: (certNo?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdmission
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'courses', label: 'Courses & Syllabus', icon: BookOpen },
    { id: 'mentors', label: 'Our Mentors', icon: Users },
    { id: 'verify', label: 'Verify Certificate', icon: ShieldCheck, highlight: true },
    { id: 'student-portal', label: 'Student Portal', icon: UserCheck },
    { id: 'center-portal', label: 'Center Portal', icon: Building2 },
    { id: 'franchise', label: 'Franchise Partner', icon: Award },
    { id: 'typing-lab', label: 'Typing Test Lab', icon: Keyboard },
    { id: 'about', label: 'About & Contact', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e0e0e0] shadow-xs">
      {/* Top Google-style info bar */}
      <div className="bg-[#f8f9fa] border-b border-[#eeeeee] px-4 py-1.5 text-xs text-[#5f6368]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1 font-medium text-[#1a73e8]">
              <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse"></span>
              Admissions Open 2026 Batch
            </span>
            <span className="hidden sm:inline text-[#dadce0]">|</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
              Bhagola Village, Near Govt Sr Sec School, Palwal, Haryana 121102
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${ACADEMY_INFO.phone}`}
              className="inline-flex items-center gap-1 hover:text-[#1a73e8] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>{ACADEMY_INFO.phone}</span>
            </a>
            <a 
              href={`https://wa.me/919354358781?text=${encodeURIComponent('Hello Dharam Futurebit Academy! I want to know about computer courses and admission.')}`}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#0f9d58] hover:text-[#0b8043] transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#0f9d58] text-white" />
              <span>WhatsApp: +91 9354358781</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">
          
          {/* Logo Section */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Google-flavored Emblem */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1a73e8] via-[#4285f4] to-[#174ea6] flex items-center justify-center text-white shadow-sm ring-2 ring-[#e8f0fe] group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-extrabold text-xl tracking-tight">DF</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg md:text-xl text-[#202124] tracking-tight leading-tight group-hover:text-[#1a73e8] transition-colors">
                  Dharam Futurebit
                </span>
                {/* Google 4-color dots */}
                <div className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285f4]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea4335]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fbbc04]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]"></span>
                </div>
              </div>
              <span className="text-[11px] md:text-xs text-[#5f6368] font-medium tracking-wide">
                Computer Academy • <span className="text-[#1a73e8] font-semibold">All Courses Coaching</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-full text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#e8f0fe] text-[#1967d2] font-semibold shadow-xs'
                      : item.highlight
                      ? 'bg-[#fef7e0] text-[#b06000] hover:bg-[#feefc3] font-semibold'
                      : 'text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1967d2]' : item.highlight ? 'text-[#f29900]' : 'text-[#5f6368]'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-[#ea4335]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="btn-quick-verify"
              onClick={() => setActiveTab('verify')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#dadce0] text-xs font-semibold text-[#3c4043] hover:bg-[#f8f9fa] hover:border-[#1a73e8] hover:text-[#1a73e8] transition-all shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>Verify Cert</span>
            </button>

            <button
              id="btn-header-admission"
              onClick={onOpenAdmission}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a73e8] text-white text-xs md:text-sm font-semibold hover:bg-[#1557b0] shadow-sm hover:shadow transition-all active:scale-98"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Online</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="btn-mobile-admission"
              onClick={onOpenAdmission}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#1a73e8] text-white text-xs font-semibold"
            >
              Apply
            </button>
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#5f6368] hover:bg-[#f1f3f4]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e0e0e0] bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-[#e8f0fe] text-[#1967d2] font-semibold'
                    : 'text-[#3c4043] hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fef7e0] text-[#b06000] font-bold">
                    Official
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#eeeeee] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdmission();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#1a73e8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Online Admission & Fee Payment</span>
            </button>

            <a
              href={`https://wa.me/919354358781?text=${encodeURIComponent('Hello Dharam Futurebit Academy! I have an inquiry.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#25d366]/10 text-[#075e54] font-semibold text-sm flex items-center justify-center gap-2 border border-[#25d366]/30"
            >
              <MessageCircle className="w-4 h-4 text-[#25d366]" />
              <span>Direct WhatsApp Help (+91 9354358781)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
