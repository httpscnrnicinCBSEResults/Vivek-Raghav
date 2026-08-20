import React from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowUp,
  Heart,
  ExternalLink
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAdmission: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenAdmission
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#202124] text-white pt-14 pb-8 border-t-4 border-[#1a73e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#3c4043]">
          
          {/* Col 1: Brand Info & Accreditations */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#174ea6] flex items-center justify-center font-display font-extrabold text-xl text-white">
                DF
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white leading-tight">
                  Dharam Futurebit
                </div>
                <div className="text-xs text-[#9aa0a6]">
                  Computer Academy • Estd. 2026
                </div>
              </div>
            </div>

            <p className="text-xs text-[#bdc1c6] leading-relaxed">
              <strong className="text-white">All Computer Courses Coaching.</strong> Premier vocational 
              computer education institute providing 100% practical lab training, ISO 9001:2015 recognized 
              diplomas, and verified online certifications.
            </p>

            <div className="space-y-1.5 text-xs text-[#9aa0a6] font-mono">
              <div>Govt Reg: {ACADEMY_INFO.regNumber}</div>
              <div>{ACADEMY_INFO.isoNumber}</div>
              <div>MSME: {ACADEMY_INFO.msmeNumber}</div>
            </div>
          </div>

          {/* Col 2: Top Courses */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Popular Programs
            </h4>
            <ul className="space-y-2 text-xs text-[#bdc1c6]">
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • ADCA (1-Year Master Diploma)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • DCA (6-Months Computer Diploma)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Tally Prime with GST & E-Invoicing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Python Programming & AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • CCC (NIELIT Pattern Govt Exam)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Hindi & English Touch Typing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals & Verification */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Portals & Services
            </h4>
            <ul className="space-y-2 text-xs text-[#bdc1c6]">
              <li>
                <button 
                  onClick={() => onSelectTab('verify')}
                  className="hover:text-[#8ab4f8] transition-colors text-left flex items-center gap-1 font-semibold text-[#8ab4f8]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Public Certificate Verification</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('mentors')} className="hover:text-[#8ab4f8] transition-colors text-left font-semibold text-[#8ab4f8]">
                  • Meet Our Academy Mentors
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('student-portal')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Student Login & ID Card Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('center-portal')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Franchise & Center Head Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('franchise')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • Apply for New Franchise 2026
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('typing-lab')} className="hover:text-[#8ab4f8] transition-colors text-left">
                  • 1-Min Typing Test Practice Lab
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmission} className="hover:text-[#8ab4f8] transition-colors text-left text-[#fbbc04] font-semibold">
                  • Online Admission & Fee Payment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Campus Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#bdc1c6]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ea4335] shrink-0 mt-0.5" />
                <span>{ACADEMY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8ab4f8] shrink-0" />
                <a href={`tel:${ACADEMY_INFO.phone}`} className="hover:text-white font-bold">
                  {ACADEMY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25d366] shrink-0" />
                <a 
                  href={`https://wa.me/919354358781`}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#25d366] hover:underline font-bold"
                >
                  +91 9354358781 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#fbbc04] shrink-0" />
                <a href={`mailto:${ACADEMY_INFO.email}`} className="hover:text-white font-mono">
                  {ACADEMY_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9aa0a6]">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span>© {ACADEMY_INFO.foundedYear} {ACADEMY_INFO.name}. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Director: {ACADEMY_INFO.director}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#8ab4f8] hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
