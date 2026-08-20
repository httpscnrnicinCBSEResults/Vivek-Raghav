import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  MessageCircle, 
  Sparkles, 
  Users, 
  Briefcase, 
  ChevronRight, 
  Star, 
  Clock, 
  ShieldCheck, 
  Quote, 
  X, 
  Phone,
  ExternalLink,
  Laptop,
  Flame
} from 'lucide-react';
import { MentorProfile } from '../types';
import { MOCK_MENTORS, ACADEMY_INFO } from '../data/mockData';

interface OurMentorsProps {
  onEnrollCourse?: (courseId: string) => void;
  onOpenAdmission?: () => void;
}

export const OurMentors: React.FC<OurMentorsProps> = ({ onEnrollCourse, onOpenAdmission }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMentorModal, setActiveMentorModal] = useState<MentorProfile | null>(null);

  const categories = [
    { id: 'all', label: 'All Faculty & Mentors' },
    { id: 'leadership', label: 'Leadership & AI' },
    { id: 'accounting', label: 'Tally & GST Accounts' },
    { id: 'office-diploma', label: 'ADCA & Office Suite' },
    { id: 'typing-govt', label: 'Typing & Govt. Exam' },
    { id: 'programming', label: 'Web & Programming' }
  ];

  const filteredMentors = selectedCategory === 'all'
    ? MOCK_MENTORS
    : MOCK_MENTORS.filter(m => m.category === selectedCategory);

  const totalExperience = MOCK_MENTORS.reduce((acc, m) => acc + m.experienceYears, 0);
  const totalStudents = MOCK_MENTORS.reduce((acc, m) => acc + m.studentsTrained, 0);

  return (
    <section id="mentors-section" className="py-14 sm:py-16 bg-[#f8fafd] border-t border-[#dadce0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e8f0fe] text-[#1967d2] text-xs font-semibold shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#1a73e8]" />
            <span>Expert Faculty & Certified Master Trainers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Meet Our Academy Mentors
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            At Dharam Futurebit Academy, you learn directly from industry-certified software engineers, 
            corporate accountants, and government typing medalists with a passion for 1:1 student mentorship.
          </p>
        </div>

        {/* Authority Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 text-center space-y-1 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mx-auto mb-1">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#202124]">
              {totalExperience}+ Years
            </div>
            <div className="text-xs text-[#5f6368] font-medium">Combined Teaching Experience</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 text-center space-y-1 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto mb-1">
              <Users className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#137333]">
              {(totalStudents).toLocaleString()}+
            </div>
            <div className="text-xs text-[#5f6368] font-medium">Rural & Urban Students Trained</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 text-center space-y-1 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center mx-auto mb-1">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#b06000]">
              1 : 1
            </div>
            <div className="text-xs text-[#5f6368] font-medium">Dedicated PC & Mentor Ratio</div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 text-center space-y-1 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#fce8e6] text-[#c5221f] flex items-center justify-center mx-auto mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#c5221f]">
              100%
            </div>
            <div className="text-xs text-[#5f6368] font-medium">Practical Lab-Based Methodology</div>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-mentor-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-[#1a73e8] text-white shadow-sm'
                  : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4] hover:text-[#202124]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mentors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              id={`mentor-card-${mentor.id}`}
              className="bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-[#1a73e8] hover:shadow-md transition-all group relative overflow-hidden"
            >
              {/* Featured Badge */}
              {mentor.featured && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[#fef7e0] text-[#b06000] border border-[#feefc3] text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#f29900] text-[#f29900]" />
                  <span>Key Faculty</span>
                </div>
              )}

              <div className="space-y-4">
                
                {/* Avatar & Basic Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a73e8] to-[#174ea6] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md shrink-0 ring-4 ring-[#e8f0fe]">
                    {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-display font-bold text-lg text-[#202124] group-hover:text-[#1a73e8] transition-colors leading-snug">
                      {mentor.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#1a73e8] line-clamp-1">
                      {mentor.designation}
                    </p>
                    <p className="text-[11px] text-[#5f6368] font-medium truncate">
                      {mentor.qualification}
                    </p>
                  </div>
                </div>

                {/* Experience & Students Metrics Bar */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#f8fafd] border border-[#e8eaed] text-center text-xs">
                  <div>
                    <span className="text-[10px] text-[#80868b] block font-semibold uppercase">Experience</span>
                    <strong className="text-[#202124] font-bold">{mentor.experienceYears}+ Years</strong>
                  </div>
                  <div className="border-l border-[#e8eaed]">
                    <span className="text-[10px] text-[#80868b] block font-semibold uppercase">Trained</span>
                    <strong className="text-[#137333] font-bold">{mentor.studentsTrained.toLocaleString()}+ Students</strong>
                  </div>
                </div>

                {/* Certifications Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#80868b] uppercase tracking-wider block">
                    Credentials & Accreditations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.certifications.slice(0, 2).map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#1967d2] text-[10px] font-semibold truncate max-w-full"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specializations List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#80868b] uppercase tracking-wider block">
                    Core Specializations
                  </span>
                  <div className="grid grid-cols-1 gap-1 text-xs text-[#3c4043]">
                    {mentor.specializations.slice(0, 3).map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34a853] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teaching Philosophy Snippet */}
                <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#eeeeee] text-[11px] text-[#5f6368] italic flex items-start gap-2">
                  <Quote className="w-3.5 h-3.5 text-[#1a73e8] shrink-0 mt-0.5 not-italic" />
                  <span className="line-clamp-2">"{mentor.teachingPhilosophy}"</span>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-[#eeeeee] flex items-center justify-between gap-2">
                <button
                  id={`btn-view-bio-${mentor.id}`}
                  onClick={() => setActiveMentorModal(mentor)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Full Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/919354358781?text=${encodeURIComponent(
                    mentor.whatsappMessage || `Hello! I want to inquire about training under ${mentor.name} at Dharam Futurebit Academy.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#075e54] border border-[#25d366]/30 transition-colors"
                  title={`Chat with ${mentor.name} on WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4 text-[#25d366]" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Mentorship Guarantee Callout Card */}
        <div className="bg-gradient-to-r from-[#1a73e8] via-[#1b66ca] to-[#1557b0] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs">
                <GraduationCap className="w-4 h-4" />
                <span>Zero-Barrier Learning Guarantee</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                Want to book an Academic Counseling & Lab Orientation Session?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Visit our campus at Bhagola Village, Palwal or book an online counseling session. 
                Experience our 1:1 computer workstation lab environment and meet the faculty before joining.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/919354358781?text=${encodeURIComponent('Hello Vivek Sir! I would like to schedule an Academic Counseling and Lab Orientation Session with Dharam Futurebit Academy mentors.')}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-white text-[#1a73e8] font-bold text-xs sm:text-sm hover:bg-[#f8f9fa] shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366]" />
                <span>Book Lab Session on WhatsApp</span>
              </a>

              {onOpenAdmission && (
                <button
                  onClick={onOpenAdmission}
                  className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply for 2026 Batch</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED MENTOR PROFILE MODAL */}
      {activeMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#dadce0] max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#eeeeee] pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a73e8] to-[#174ea6] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md ring-4 ring-[#e8f0fe]">
                  {activeMentorModal.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#202124]">
                    {activeMentorModal.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#1a73e8]">
                    {activeMentorModal.role}
                  </p>
                  <p className="text-xs text-[#5f6368]">{activeMentorModal.qualification}</p>
                </div>
              </div>

              <button
                id="btn-close-mentor-modal"
                onClick={() => setActiveMentorModal(null)}
                className="p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#f8fafd] border border-[#e8eaed] text-center">
              <div>
                <span className="text-[10px] font-bold text-[#80868b] uppercase">Experience</span>
                <strong className="block text-base sm:text-lg font-bold text-[#202124]">
                  {activeMentorModal.experienceYears}+ Years
                </strong>
              </div>
              <div className="border-x border-[#e8eaed]">
                <span className="text-[10px] font-bold text-[#80868b] uppercase">Students Mentored</span>
                <strong className="block text-base sm:text-lg font-bold text-[#137333]">
                  {activeMentorModal.studentsTrained.toLocaleString()}+
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#80868b] uppercase">Center Location</span>
                <strong className="block text-xs sm:text-sm font-bold text-[#1a73e8] truncate">
                  Bhagola, Palwal
                </strong>
              </div>
            </div>

            {/* Mentor Bio */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-[#202124] flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#1a73e8]" />
                <span>Professional Background & Mission</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                {activeMentorModal.bio}
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-[#202124] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#f29900]" />
                <span>Career Milestones & Student Impact</span>
              </h4>
              <div className="space-y-1.5">
                {activeMentorModal.keyAchievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#3c4043]">
                    <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Certifications */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-[#202124] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#137333]" />
                <span>Industry Accreditations & Certifications</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeMentorModal.certifications.map((cert, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-3 py-1 rounded-xl bg-[#e6f4ea] text-[#137333] text-xs font-semibold border border-[#ceead6]"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses Taught by this Mentor */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-sm text-[#202124] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#1a73e8]" />
                <span>Batches & Courses Mentored</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeMentorModal.coursesHandled.map((crs, crsIdx) => (
                  <span
                    key={crsIdx}
                    className="px-2.5 py-1 rounded-lg bg-[#f1f3f4] text-[#202124] text-xs font-medium"
                  >
                    {crs}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#eeeeee] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="text-xs text-[#5f6368] hover:text-[#1a73e8] flex items-center gap-1 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Academy Helpline: {ACADEMY_INFO.phone}</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveMentorModal(null)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/919354358781?text=${encodeURIComponent(
                    activeMentorModal.whatsappMessage || `Hello! I would like to book a batch slot with ${activeMentorModal.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Mentor</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
