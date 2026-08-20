import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BookOpen, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  FileText, 
  Bell, 
  Check, 
  Sparkles,
  ArrowRight,
  MapPin,
  HelpCircle,
  TrendingUp,
  Download
} from 'lucide-react';
import { StudentAccount, StudentProgressData, SyllabusModuleItem, StudentAssessment } from '../types';

interface StudentProgressTrackerProps {
  student: StudentAccount;
}

export const StudentProgressTracker: React.FC<StudentProgressTrackerProps> = ({ student }) => {
  // Default fallback generator if student doesn't have custom progressData
  const defaultProgress: StudentProgressData = student.progressData || {
    overallCompletionPercent: Math.min(100, Math.round((student.assignmentsSubmitted / (student.totalAssignments || 1)) * 100)),
    completedHours: 120,
    totalHours: 180,
    nextAssessmentTitle: 'Mid-Term Lab Practical & Theory Exam',
    nextAssessmentDate: '28 Feb 2026',
    modules: [
      {
        id: 'mod-gen-1',
        title: 'Module 1: Fundamentals & Essential Concepts',
        hours: 45,
        status: 'completed',
        completionPercent: 100,
        completedDate: '15 Jan 2026',
        topics: [
          { name: 'Core Foundations & Setup', completed: true },
          { name: 'Practical Hands-on Exercises', completed: true },
          { name: 'Lab Test & Assignment 1', completed: true }
        ]
      },
      {
        id: 'mod-gen-2',
        title: 'Module 2: Advanced Practical Skills & Industry Workflows',
        hours: 65,
        status: 'in_progress',
        completionPercent: 65,
        topics: [
          { name: 'Intermediate Problem Solving', completed: true },
          { name: 'Live Case Study Application', completed: true },
          { name: 'Project Milestone Submission', completed: false },
          { name: 'Comprehensive Review Viva', completed: false }
        ]
      },
      {
        id: 'mod-gen-3',
        title: 'Module 3: Capstone Project & Certification Exam',
        hours: 70,
        status: 'upcoming',
        completionPercent: 0,
        topics: [
          { name: 'Independent Industry Project', completed: false },
          { name: 'Final Practical Exam Preparation', completed: false },
          { name: 'Board Certification Viva', completed: false }
        ]
      }
    ],
    assessments: [
      {
        id: 'asm-gen-1',
        title: 'Module 1 Theory & Practical Test',
        type: 'Theory (CBT)',
        date: '18 Jan 2026',
        time: '10:00 AM - 11:30 AM',
        venue: 'Computer Lab 1, Main Center',
        syllabusCoverage: 'Module 1 Core Topics',
        maxMarks: 100,
        status: 'completed',
        obtainedMarks: 92
      },
      {
        id: 'asm-gen-2',
        title: 'Mid-Term Lab Practical & Theory Exam',
        type: 'Practical Lab',
        date: '28 Feb 2026',
        time: '10:00 AM - 01:00 PM',
        venue: 'Lab Room 2, Main Center',
        syllabusCoverage: 'Module 1 & Module 2 (Practical + Viva)',
        maxMarks: 100,
        status: 'upcoming',
        daysRemaining: 8
      },
      {
        id: 'asm-gen-3',
        title: 'Final Board Certification Exam',
        type: 'Final Board Exam',
        date: '30 Mar 2026',
        time: '09:00 AM - 01:00 PM',
        venue: 'Main Examination Hall',
        syllabusCoverage: 'Entire Course Curriculum',
        maxMarks: 100,
        status: 'upcoming',
        daysRemaining: 38
      }
    ]
  };

  const progress = student.progressData || defaultProgress;
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    progress.modules.find(m => m.status === 'in_progress')?.id || progress.modules[0]?.id || null
  );
  const [assessmentFilter, setAssessmentFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [reminderSetIds, setReminderSetIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'assessments'>('syllabus');

  const filteredAssessments = progress.assessments.filter(a => {
    if (assessmentFilter === 'upcoming') return a.status === 'upcoming';
    if (assessmentFilter === 'completed') return a.status === 'completed';
    return true;
  });

  const toggleModule = (id: string) => {
    setExpandedModuleId(prev => prev === id ? null : id);
  };

  const handleToggleReminder = (asmId: string) => {
    if (reminderSetIds.includes(asmId)) {
      setReminderSetIds(reminderSetIds.filter(id => id !== asmId));
    } else {
      setReminderSetIds([...reminderSetIds, asmId]);
    }
  };

  const upcomingCount = progress.assessments.filter(a => a.status === 'upcoming').length;
  const completedModulesCount = progress.modules.filter(m => m.status === 'completed').length;
  const inProgressModule = progress.modules.find(m => m.status === 'in_progress');

  return (
    <div className="bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header with Title and Section Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeeeee] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#e8f0fe] text-[#1a73e8]">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="font-display font-bold text-xl text-[#202124]">
              Student Progress & Exam Tracker
            </h3>
          </div>
          <p className="text-xs text-[#5f6368] mt-1">
            Track your live syllabus coverage, module milestones, and scheduled test dates for {student.courseName}.
          </p>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="flex bg-[#f1f3f4] p-1 rounded-2xl shrink-0 self-start sm:self-auto text-xs font-semibold">
          <button
            id="tab-btn-syllabus-progress"
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'syllabus'
                ? 'bg-white text-[#1a73e8] shadow-xs font-bold'
                : 'text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus ({progress.overallCompletionPercent}%)</span>
          </button>

          <button
            id="tab-btn-assessment-dates"
            onClick={() => setActiveTab('assessments')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 relative ${
              activeTab === 'assessments'
                ? 'bg-white text-[#1a73e8] shadow-xs font-bold'
                : 'text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Assessments</span>
            {upcomingCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Summary Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Overall Syllabus Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f8fafd] to-[#e8f0fe]/40 border border-[#dadce0] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5f6368]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Syllabus Covered</span>
            <BookOpen className="w-4 h-4 text-[#1a73e8]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-[#1a73e8]">
              {progress.overallCompletionPercent}%
            </span>
            <span className="text-xs text-[#5f6368]">
              {completedModulesCount} of {progress.modules.length} Modules
            </span>
          </div>
          <div className="w-full bg-[#e8eaed] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#1a73e8] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress.overallCompletionPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed Lab Hours */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f8fafd] to-[#e6f4ea]/40 border border-[#dadce0] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5f6368]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Practical Hours</span>
            <Clock className="w-4 h-4 text-[#137333]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-[#137333]">
              {progress.completedHours}h
            </span>
            <span className="text-xs text-[#5f6368]">/ {progress.totalHours}h Total Course</span>
          </div>
          <div className="w-full bg-[#e8eaed] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#137333] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.round((progress.completedHours / progress.totalHours) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Active Focus Module */}
        <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#dadce0] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5f6368]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Current Topic</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#feefc3] text-[#b06000] font-bold text-[9px]">
              IN LAB
            </span>
          </div>
          <div className="font-semibold text-xs text-[#202124] line-clamp-1">
            {inProgressModule ? inProgressModule.title.split(':')[1] || inProgressModule.title : 'Course Completed'}
          </div>
          <div className="text-[11px] text-[#5f6368]">
            {inProgressModule ? `${inProgressModule.completionPercent}% completed in batch` : 'All modules certified'}
          </div>
        </div>

        {/* Metric 4: Next Upcoming Assessment */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fef7e0] to-[#fff8e1] border border-[#feefc3] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#b06000]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Next Exam / Test</span>
            <Calendar className="w-4 h-4 text-[#b06000]" />
          </div>
          <div className="font-bold text-xs text-[#202124] line-clamp-1">
            {progress.nextAssessmentTitle || 'Next Test Scheduled Soon'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#b06000]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>Date: {progress.nextAssessmentDate || 'Announced in class'}</span>
          </div>
        </div>

      </div>

      {/* TAB 1: Detailed Syllabus Breakdown */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-base text-[#202124] flex items-center gap-2">
              <span>Modular Syllabus & Topic Checklist</span>
              <span className="text-xs font-normal text-[#5f6368]">
                ({progress.modules.length} Modules)
              </span>
            </h4>
            <span className="text-xs text-[#5f6368] hidden sm:inline-block">
              Click module to view completed and remaining topics
            </span>
          </div>

          <div className="space-y-3">
            {progress.modules.map((module, idx) => {
              const isExpanded = expandedModuleId === module.id;
              const completedTopics = module.topics.filter(t => t.completed).length;

              return (
                <div 
                  key={module.id}
                  className={`rounded-2xl border transition-all ${
                    module.status === 'completed'
                      ? 'border-[#ceead6] bg-white'
                      : module.status === 'in_progress'
                      ? 'border-[#1a73e8] bg-[#f8fafd] shadow-xs'
                      : 'border-[#dadce0] bg-white opacity-85'
                  }`}
                >
                  {/* Module Accordion Header */}
                  <div 
                    onClick={() => toggleModule(module.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {/* Status Icon */}
                      <div className="shrink-0">
                        {module.status === 'completed' ? (
                          <div className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : module.status === 'in_progress' ? (
                          <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold text-xs">
                            {module.completionPercent}%
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#f1f3f4] text-[#80868b] flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      {/* Title & Metadata */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h5 className="font-bold text-sm text-[#202124] truncate">
                            {module.title}
                          </h5>
                          {module.status === 'completed' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[10px] font-bold">
                              Completed • {module.completedDate}
                            </span>
                          )}
                          {module.status === 'in_progress' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-[10px] font-bold">
                              Currently In Progress
                            </span>
                          )}
                          {module.status === 'upcoming' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#f1f3f4] text-[#5f6368] text-[10px] font-medium">
                              Upcoming Module
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-[#5f6368]">
                          <span>{module.hours} Lecture & Lab Hours</span>
                          <span>•</span>
                          <span>{completedTopics}/{module.topics.length} Topics Covered</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden md:block w-28">
                        <div className="w-full bg-[#e8eaed] h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              module.status === 'completed'
                                ? 'bg-[#137333]'
                                : module.status === 'in_progress'
                                ? 'bg-[#1a73e8]'
                                : 'bg-[#dadce0]'
                            }`}
                            style={{ width: `${module.completionPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Topic Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#f1f3f4] space-y-3">
                      <div className="text-xs font-semibold text-[#3c4043]">Module Curriculum Checkpoints:</div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {module.topics.map((topic, tIdx) => (
                          <div 
                            key={tIdx} 
                            className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                              topic.completed
                                ? 'bg-[#f8fafd] border-[#e8eaed] text-[#202124]'
                                : 'bg-white border-[#f1f3f4] text-[#80868b]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                              topic.completed
                                ? 'bg-[#137333] text-white'
                                : 'border border-[#dadce0]'
                            }`}>
                              {topic.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={topic.completed ? 'font-medium' : ''}>{topic.name}</span>
                          </div>
                        ))}
                      </div>

                      {module.status === 'in_progress' && (
                        <div className="p-3 rounded-xl bg-[#e8f0fe]/60 border border-[#d3e3fd] text-[11px] text-[#174ea6] flex items-center justify-between flex-wrap gap-2">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#1a73e8]" />
                            <span>Practical lab sessions ongoing for this module at {student.centerName}.</span>
                          </span>
                          <span className="font-semibold text-xs">Batch: {student.batchTime}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Upcoming Assessments & Exam Dates */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          
          {/* Header & Filter Options */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-display font-bold text-base text-[#202124]">
                Assessment Schedule & Test Results
              </h4>
              <p className="text-xs text-[#5f6368]">
                Unit tests, practical evaluations, viva sessions, and final certificate exams.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setAssessmentFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  assessmentFilter === 'all'
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                    : 'bg-white border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'
                }`}
              >
                All Exams ({progress.assessments.length})
              </button>

              <button
                onClick={() => setAssessmentFilter('upcoming')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  assessmentFilter === 'upcoming'
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                    : 'bg-white border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'
                }`}
              >
                Upcoming ({progress.assessments.filter(a => a.status === 'upcoming').length})
              </button>

              <button
                onClick={() => setAssessmentFilter('completed')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  assessmentFilter === 'completed'
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                    : 'bg-white border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'
                }`}
              >
                Results & Past ({progress.assessments.filter(a => a.status === 'completed').length})
              </button>
            </div>
          </div>

          {/* Assessment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssessments.map((assessment) => {
              const isReminderSet = reminderSetIds.includes(assessment.id);
              const isUrgent = assessment.status === 'upcoming' && assessment.daysRemaining && assessment.daysRemaining <= 10;

              return (
                <div 
                  key={assessment.id}
                  className={`rounded-2xl border p-5 transition-all space-y-4 ${
                    assessment.status === 'completed'
                      ? 'bg-[#f8fafd] border-[#dadce0]'
                      : isUrgent
                      ? 'bg-gradient-to-b from-[#fff8e1]/60 to-white border-[#feefc3] shadow-xs'
                      : 'bg-white border-[#dadce0]'
                  }`}
                >
                  {/* Top Badge & Type */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#e8f0fe] text-[#1a73e8] font-bold text-[11px]">
                      {assessment.type}
                    </span>

                    {assessment.status === 'completed' ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed • Score: {assessment.obtainedMarks}/{assessment.maxMarks}</span>
                      </span>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                        isUrgent
                          ? 'bg-[#feefc3] text-[#b06000] animate-pulse'
                          : 'bg-[#f1f3f4] text-[#5f6368]'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{assessment.daysRemaining ? `In ${assessment.daysRemaining} Days` : 'Upcoming'}</span>
                      </span>
                    )}
                  </div>

                  {/* Assessment Title */}
                  <div>
                    <h5 className="font-display font-bold text-sm sm:text-base text-[#202124]">
                      {assessment.title}
                    </h5>
                    <p className="text-xs text-[#5f6368] mt-1">
                      Coverage: <strong className="text-[#3c4043]">{assessment.syllabusCoverage}</strong>
                    </p>
                  </div>

                  {/* Date, Time & Venue Details */}
                  <div className="p-3 rounded-xl bg-white border border-[#dadce0]/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#5f6368]">
                        <Calendar className="w-3.5 h-3.5 text-[#1a73e8]" />
                        <span>Exam Date:</span>
                      </span>
                      <strong className="text-[#202124]">{assessment.date}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#5f6368]">
                        <Clock className="w-3.5 h-3.5 text-[#34a853]" />
                        <span>Time Slot:</span>
                      </span>
                      <strong className="text-[#202124]">{assessment.time}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#5f6368]">
                        <MapPin className="w-3.5 h-3.5 text-[#ea4335]" />
                        <span>Venue / Lab:</span>
                      </span>
                      <strong className="text-[#202124]">{assessment.venue}</strong>
                    </div>
                  </div>

                  {/* Action / Result Footer */}
                  <div className="pt-2 border-t border-[#eeeeee] flex items-center justify-between text-xs">
                    {assessment.status === 'completed' ? (
                      <div className="flex items-center gap-2 text-[#137333]">
                        <Award className="w-4 h-4" />
                        <span className="font-bold">
                          Passed ({Math.round(((assessment.obtainedMarks || 0) / assessment.maxMarks) * 100)}% Grade)
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleToggleReminder(assessment.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          isReminderSet
                            ? 'bg-[#e6f4ea] border-[#ceead6] text-[#137333]'
                            : 'bg-white border-[#dadce0] text-[#3c4043] hover:border-[#1a73e8] hover:text-[#1a73e8]'
                        }`}
                      >
                        <Bell className={`w-3.5 h-3.5 ${isReminderSet ? 'fill-current' : ''}`} />
                        <span>{isReminderSet ? '✓ Reminder Active' : 'Set WhatsApp Alert'}</span>
                      </button>
                    )}

                    <span className="text-[11px] text-[#80868b]">
                      Max Marks: {assessment.maxMarks}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Exam Guidelines Note */}
          <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#dadce0] text-xs text-[#5f6368] space-y-1">
            <div className="font-bold text-[#202124] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#1a73e8]" />
              <span>Assessment & Exam Rules at Dharam Futurebit Academy</span>
            </div>
            <p>
              Students must carry their Student Digital ID Card and arrive 15 minutes prior to the scheduled exam slot at the Bhagola Center computer lab. Minimum 50% passing marks are required in both practical and theory assessments to qualify for final certification.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
