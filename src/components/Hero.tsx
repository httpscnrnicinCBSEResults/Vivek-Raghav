import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Users, 
  Monitor, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  PhoneCall,
  BadgeCheck
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';

interface HeroProps {
  onSearch: (query: string) => void;
  onSelectTab: (tab: string) => void;
  onOpenAdmission: () => void;
  onQuickVerify: (certNo: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onSelectTab,
  onOpenAdmission,
  onQuickVerify
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // If it looks like a certificate number (DFBCA or contains numbers/dashes)
    if (searchTerm.toUpperCase().includes('DFB') || searchTerm.includes('2026')) {
      onQuickVerify(searchTerm.trim());
      onSelectTab('verify');
    } else {
      onSearch(searchTerm.trim());
      onSelectTab('courses');
    }
  };

  const trendingTags = [
    { label: 'ADCA (1 Year)', query: 'ADCA', isCourse: true },
    { label: 'Tally Prime + GST', query: 'Tally', isCourse: true },
    { label: 'Python & AI Tools', query: 'Python', isCourse: true },
    { label: 'CCC NIELIT', query: 'CCC', isCourse: true },
    { label: 'Hindi/English Typing', query: 'Typing', isCourse: true },
    { label: 'Web Development', query: 'Web', isCourse: true }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafd] via-white to-[#f1f5f9] pt-8 pb-14 border-b border-[#e8eaed]">
      {/* Decorative Google colorful subtle glow orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#4285f4]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#34a853]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#fbbc04]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pill & Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#dadce0] shadow-xs text-xs font-semibold text-[#3c4043]">
            <BadgeCheck className="w-4 h-4 text-[#1a73e8]" />
            <span>ISO 9001:2015 Certified Institute</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4ea] border border-[#ceead6] text-xs font-semibold text-[#137333]">
            <CheckCircle2 className="w-4 h-4 text-[#137333]" />
            <span>MSME & Govt. of India Recognized (Reg. 2026)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fef7e0] border border-[#feefc3] text-xs font-semibold text-[#b06000]">
            <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
            <span>Bhagola Village, Palwal (Haryana)</span>
          </div>
        </div>

        {/* Main Google-Style Headline & Tagline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight font-display leading-[1.15]">
            Empowering Your Future with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#1a73e8] via-[#4285f4] to-[#185abc] bg-clip-text text-transparent">
              All Computer Courses Coaching
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] max-w-3xl mx-auto font-normal leading-relaxed">
            Welcome to <strong className="text-[#202124] font-semibold">{ACADEMY_INFO.name}</strong>. 
            From foundational computer skills & NIELIT CCC to advanced programming, Tally Prime with GST, 
            and AI automation — learn on real lab systems with recognized government certifications.
          </p>
        </div>

        {/* Google-Inspired Universal Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white rounded-full border-2 border-[#dadce0] hover:border-[#1a73e8] focus-within:border-[#1a73e8] shadow-md hover:shadow-lg focus-within:shadow-xl transition-all duration-200 p-1.5"
          >
            <div className="pl-3.5 pr-2 text-[#5f6368]">
              <Search className="w-5 h-5 text-[#1a73e8]" />
            </div>

            <input
              type="text"
              id="hero-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses (ADCA, Python, Tally) or Certificate No..."
              className="w-full bg-transparent border-none outline-none text-sm md:text-base text-[#202124] placeholder-[#80868b] pr-2 font-normal"
            />

            <button
              type="submit"
              id="hero-search-submit"
              className="px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs md:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trending Suggestions / Quick Filters */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-1.5 text-xs text-[#5f6368]">
            <span className="font-medium inline-flex items-center gap-1 text-[#3c4043]">
              <TrendingUp className="w-3.5 h-3.5 text-[#1a73e8]" /> Quick Links:
            </span>
            {trendingTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSearch(tag.query);
                  onSelectTab('courses');
                }}
                className="px-2.5 py-1 rounded-full border transition-all bg-white border-[#dadce0] text-[#3c4043] hover:border-[#1a73e8] hover:text-[#1a73e8] hover:bg-[#f8f9fa]"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            id="hero-btn-admission"
            onClick={onOpenAdmission}
            className="px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm md:text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-98"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Apply For Admission 2026</span>
          </button>

          <button
            id="hero-btn-verify"
            onClick={() => onSelectTab('verify')}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] text-[#1a73e8] font-semibold text-sm md:text-base shadow-xs hover:shadow transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-[#1a73e8]" />
            <span>Live Certificate Verification</span>
          </button>

          <button
            id="hero-btn-student-portal"
            onClick={() => onSelectTab('student-portal')}
            className="px-5 py-3 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#3c4043] font-semibold text-sm md:text-base transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-[#5f6368]" />
            <span>Student Login</span>
          </button>
        </div>

        {/* Stats Grid - Google Clean Bento */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8eaed] shadow-xs text-center hover:border-[#4285f4]/50 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#202124]">50+</div>
            <div className="text-xs sm:text-sm font-medium text-[#5f6368] mt-0.5">High-Speed Modern PCs</div>
            <div className="text-[11px] text-[#137333] mt-1 font-semibold">1:1 Student Computer Ratio</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8eaed] shadow-xs text-center hover:border-[#34a853]/50 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#e6f4ea] flex items-center justify-center text-[#137333]">
              <Award className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#202124]">100%</div>
            <div className="text-xs sm:text-sm font-medium text-[#5f6368] mt-0.5">Practical Lab Training</div>
            <div className="text-[11px] text-[#137333] mt-1 font-semibold">ISO 9001:2015 Approved</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8eaed] shadow-xs text-center hover:border-[#fbbc04]/50 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#fef7e0] flex items-center justify-center text-[#b06000]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#202124]">Instant</div>
            <div className="text-xs sm:text-sm font-medium text-[#5f6368] mt-0.5">QR Certificate Verification</div>
            <div className="text-[11px] text-[#b06000] mt-1 font-semibold">Public Online Records</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8eaed] shadow-xs text-center hover:border-[#ea4335]/50 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#fce8e6] flex items-center justify-center text-[#c5221f]">
              <Users className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#202124]">15+</div>
            <div className="text-xs sm:text-sm font-medium text-[#5f6368] mt-0.5">Franchise & Partner Centers</div>
            <div className="text-[11px] text-[#c5221f] mt-1 font-semibold">Haryana & NCR Network</div>
          </div>

        </div>

      </div>
    </section>
  );
};
