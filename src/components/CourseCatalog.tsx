import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  X,
  FileText,
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import confetti from 'canvas-confetti';

interface CourseCatalogProps {
  initialSearch?: string;
  onEnroll: (courseId: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  initialSearch = '',
  onEnroll
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [compareList, setCompareList] = useState<Course[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'diploma', label: 'Diploma Programs' },
    { id: 'programming', label: 'Programming & AI' },
    { id: 'accounting', label: 'Tally & Accounting' },
    { id: 'govt-exam', label: 'Govt Exam & Typing' },
    { id: 'design', label: 'Graphic Design' },
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skillsGained.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCompare = (course: Course) => {
    if (compareList.some(c => c.id === course.id)) {
      setCompareList(compareList.filter(c => c.id !== course.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 courses at a time.');
        return;
      }
      setCompareList([...compareList, course]);
    }
  };

  const handleDownloadSyllabus = (course: Course) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setDownloadSuccess(course.id);
    setTimeout(() => setDownloadSuccess(null), 3500);

    // Create and trigger simulated PDF download
    const element = document.createElement('a');
    const file = new Blob([
      `DHARAM FUTUREBIT COMPUTER ACADEMY - BHAGOLA, PALWAL (HARYANA)\n` +
      `OFFICIAL COURSE SYLLABUS & PROSPECTUS 2026\n` +
      `============================================================\n\n` +
      `Course: ${course.title} (${course.code})\n` +
      `Duration: ${course.duration} (${course.hours} Hours)\n` +
      `Total Fee: ₹${course.discountedFee || course.fee} /-\n` +
      `Eligibility: ${course.eligibility}\n` +
      `Certification: ISO 9001:2015 & Dharam Futurebit Certified\n\n` +
      `SKILLS COVERED:\n` +
      course.skillsGained.map((s, i) => ` ${i + 1}. ${s}`).join('\n') + `\n\n` +
      `SYLLABUS MODULES:\n` +
      course.syllabus.map((m) => `\n[ ${m.module} ]\n` + m.topics.map(t => `  • ${t}`).join('\n')).join('\n') + `\n\n` +
      `CAREER / JOB OPPORTUNITIES:\n` +
      course.jobProfiles.map(j => `  - ${j}`).join('\n') + `\n\n` +
      `For Admissions & Center Verification:\n` +
      `Address: Bhagola Village, Near Govt. Sr. Sec. School, Palwal, Haryana 121102\n` +
      `Helpline: +91 9625118781 | WhatsApp: +91 9354358781 | Email: ragahvvivek2020@gmail.com\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${course.code}_Syllabus_Dharam_Futurebit.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="courses-section" className="py-12 bg-[#f8fafd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#1967d2] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Designed for 2026 Industry & Govt Jobs</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Dynamic Course Catalog & Syllabus
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368]">
            Explore our job-oriented computer diploma, programming, accounting, and government recognized programs. 
            All courses feature 100% practical lab practice on modern machines.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`course-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box inside catalog */}
          <div className="w-full md:w-72 shrink-0">
            <input
              type="text"
              id="catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter courses or skills..."
              className="w-full px-4 py-2 rounded-full border border-[#dadce0] bg-white text-xs sm:text-sm text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
            />
          </div>
        </div>

        {/* Active Compare Pill */}
        {compareList.length > 0 && (
          <div className="mt-4 p-3 bg-[#e8f0fe] rounded-2xl border border-[#d2e3fc] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#185abc] font-medium">
              <SlidersHorizontal className="w-4 h-4 text-[#1a73e8]" />
              <span>{compareList.length} course(s) selected for comparison:</span>
              <span className="font-bold">{compareList.map(c => c.code).join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCompareDrawer(true)}
                className="px-3 py-1 rounded-full bg-[#1a73e8] text-white text-xs font-semibold hover:bg-[#1557b0]"
              >
                Compare Now
              </button>
              <button
                onClick={() => setCompareList([])}
                className="p-1 text-[#5f6368] hover:text-[#202124]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Course Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isCompared = compareList.some(c => c.id === course.id);
            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className="bg-white rounded-2xl border border-[#dadce0] hover:border-[#4285f4] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Badge & Code */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#f1f3f4] text-[#3c4043] font-mono text-xs font-semibold">
                      {course.code}
                    </span>
                    {course.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[11px] font-bold">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#202124] group-hover:text-[#1a73e8] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5f6368] mt-1.5 line-clamp-2">
                      {course.tagline}
                    </p>
                  </div>

                  {/* Course Quick Attributes */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f1f3f4] text-xs text-[#5f6368]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#34a853]" />
                      <span>{course.hours} Lab Hours</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#fbbc04] fill-[#fbbc04]" />
                      <span>{course.rating} ({course.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#ea4335]" />
                      <span>ISO Certified</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#5f6368] uppercase tracking-wider">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {course.skillsGained.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#f8fafd] border border-[#e8eaed] text-[11px] text-[#3c4043]"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skillsGained.length > 3 && (
                        <span className="text-[10px] text-[#1a73e8] font-semibold self-center ml-1">
                          +{course.skillsGained.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Bottom / Fee & CTAs */}
                <div className="p-5 sm:p-6 bg-[#fcfdfe] border-t border-[#f1f3f4] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-[#5f6368] block">Special Course Fee</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-[#202124]">
                          ₹{course.discountedFee?.toLocaleString() || course.fee.toLocaleString()}
                        </span>
                        {course.discountedFee && (
                          <span className="text-xs text-[#80868b] line-through">
                            ₹{course.fee.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <label className="flex items-center gap-1.5 text-xs text-[#5f6368] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => toggleCompare(course)}
                        className="rounded text-[#1a73e8] focus:ring-[#1a73e8] w-3.5 h-3.5"
                      />
                      <span>Compare</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id={`btn-view-syllabus-${course.id}`}
                      onClick={() => setActiveCourseModal(course)}
                      className="w-full py-2 px-3 rounded-full border border-[#dadce0] hover:bg-white text-xs font-semibold text-[#3c4043] hover:border-[#1a73e8] hover:text-[#1a73e8] transition-all flex items-center justify-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Syllabus</span>
                    </button>

                    <button
                      id={`btn-enroll-course-${course.id}`}
                      onClick={() => onEnroll(course.id)}
                      className="w-full py-2 px-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs font-semibold text-white transition-all shadow-xs flex items-center justify-center gap-1"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Enroll Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Course Detail Syllabus Modal */}
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#dadce0] p-6 sm:p-8 space-y-6">
              
              {/* Modal Top */}
              <div className="flex items-start justify-between gap-4 border-b border-[#f1f3f4] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#e8f0fe] text-[#1967d2] font-mono text-xs font-bold">
                      {activeCourseModal.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-semibold">
                      {activeCourseModal.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124] font-display mt-1">
                    {activeCourseModal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f6368]">
                    {activeCourseModal.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="p-2 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Key Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#f8fafd] rounded-2xl border border-[#e8eaed] text-xs">
                <div>
                  <span className="text-[#80868b] block">Total Duration</span>
                  <span className="font-semibold text-[#202124]">{activeCourseModal.duration}</span>
                </div>
                <div>
                  <span className="text-[#80868b] block">Total Lab Hours</span>
                  <span className="font-semibold text-[#202124]">{activeCourseModal.hours} Hours</span>
                </div>
                <div>
                  <span className="text-[#80868b] block">Eligibility</span>
                  <span className="font-semibold text-[#202124]">{activeCourseModal.eligibility}</span>
                </div>
                <div>
                  <span className="text-[#80868b] block">Fee Structure</span>
                  <span className="font-bold text-[#137333]">₹{activeCourseModal.discountedFee || activeCourseModal.fee}</span>
                </div>
              </div>

              {/* Detailed Syllabus Modules */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-base text-[#202124] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1a73e8]" />
                  <span>Module-by-Module Curriculum Breakdown:</span>
                </h4>

                <div className="space-y-3">
                  {activeCourseModal.syllabus.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-xl border border-[#e8eaed] bg-white hover:border-[#1a73e8]/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-[#1a73e8] mb-2 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#e8f0fe] text-[#1967d2] text-xs flex items-center justify-center font-bold">
                          {mIdx + 1}
                        </span>
                        <span>{mod.module}</span>
                      </div>
                      <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-sm text-[#3c4043]">
                        {mod.topics.map((topic, tIdx) => (
                          <li key={tIdx}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career & Placement Opportunities */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#202124] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#34a853]" />
                  <span>Career & Job Profiles After Course Completion:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCourseModal.jobProfiles.map((job, jIdx) => (
                    <span
                      key={jIdx}
                      className="px-3 py-1 rounded-full bg-[#f1f3f4] text-xs font-medium text-[#202124]"
                    >
                      ✓ {job}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#f1f3f4] flex flex-wrap items-center justify-between gap-3">
                <button
                  id="btn-modal-download-syllabus"
                  onClick={() => handleDownloadSyllabus(activeCourseModal)}
                  className="px-4 py-2.5 rounded-full border border-[#dadce0] hover:bg-[#f8f9fa] text-xs sm:text-sm font-semibold text-[#3c4043] flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#1a73e8]" />
                  <span>{downloadSuccess === activeCourseModal.id ? '✓ Syllabus Downloaded!' : 'Download Syllabus PDF'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourseModal(null)}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      onEnroll(activeCourseModal.id);
                      setActiveCourseModal(null);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-xs sm:text-sm font-semibold text-white flex items-center gap-2 shadow-xs"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Enroll In This Course</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Compare Drawer Modal */}
        {showCompareDrawer && compareList.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#f1f3f4] pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#202124]">
                    Course Comparison
                  </h3>
                  <p className="text-xs text-[#5f6368]">Comparing {compareList.length} courses</p>
                </div>
                <button
                  onClick={() => setShowCompareDrawer(false)}
                  className="p-2 text-[#5f6368] hover:bg-[#f1f3f4] rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareList.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-[#dadce0] bg-[#f8fafd] space-y-3">
                    <span className="font-mono text-xs text-[#1a73e8] font-bold">{c.code}</span>
                    <h4 className="font-bold text-sm text-[#202124]">{c.title}</h4>
                    <div className="text-xs space-y-1.5 pt-2 border-t border-[#e8eaed]">
                      <div><strong>Duration:</strong> {c.duration}</div>
                      <div><strong>Lab Hours:</strong> {c.hours} Hours</div>
                      <div><strong>Fee:</strong> ₹{c.discountedFee || c.fee}</div>
                      <div><strong>Eligibility:</strong> {c.eligibility}</div>
                      <div><strong>Rating:</strong> {c.rating} / 5.0</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowCompareDrawer(false);
                        onEnroll(c.id);
                      }}
                      className="w-full py-2 rounded-full bg-[#1a73e8] text-white text-xs font-semibold hover:bg-[#1557b0]"
                    >
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
