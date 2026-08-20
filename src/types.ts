export interface Course {
  id: string;
  code: string;
  title: string;
  tagline: string;
  category: 'diploma' | 'programming' | 'accounting' | 'design' | 'govt-exam';
  duration: string; // e.g. "12 Months", "6 Months", "3 Months"
  hours: number;
  fee: number;
  discountedFee?: number;
  eligibility: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  popular?: boolean;
  syllabus: {
    module: string;
    topics: string[];
  }[];
  skillsGained: string[];
  jobProfiles: string[];
  certifyingBody: string;
  iconName: string;
  badge?: string;
}

export interface CertificateRecord {
  certificateNo: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  courseCode: string;
  courseName: string;
  duration: string;
  session: string;
  centerCode: string;
  centerName: string;
  centerLocation: string;
  issueDate: string;
  overallGrade: 'A+' | 'A' | 'B+' | 'B';
  percentage: number;
  marksBreakdown: {
    subject: string;
    maxMarks: number;
    obtainedMarks: number;
  }[];
  status: 'Verified & Active' | 'Under Processing';
  studentPhotoUrl?: string;
}

export interface SyllabusModuleItem {
  id: string;
  title: string;
  hours: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  completionPercent: number;
  topics: { name: string; completed: boolean }[];
  completedDate?: string;
}

export interface StudentAssessment {
  id: string;
  title: string;
  type: 'Theory (CBT)' | 'Practical Lab' | 'Viva Voce' | 'Project Evaluation' | 'Final Board Exam';
  date: string;
  time: string;
  venue: string;
  syllabusCoverage: string;
  maxMarks: number;
  status: 'upcoming' | 'completed';
  obtainedMarks?: number;
  daysRemaining?: number;
}

export interface StudentProgressData {
  overallCompletionPercent: number;
  completedHours: number;
  totalHours: number;
  modules: SyllabusModuleItem[];
  assessments: StudentAssessment[];
  nextAssessmentDate?: string;
  nextAssessmentTitle?: string;
}

export interface StudentAccount {
  rollNo: string;
  name: string;
  fatherName: string;
  mobile: string;
  email: string;
  courseName: string;
  courseCode: string;
  batchTime: string;
  enrollmentDate: string;
  totalFees: number;
  paidFees: number;
  attendancePercent: number;
  certificateNo?: string;
  currentModule: string;
  assignmentsSubmitted: number;
  totalAssignments: number;
  centerName: string;
  progressData?: StudentProgressData;
}

export interface FranchiseCenter {
  centerCode: string;
  centerName: string;
  directorName: string;
  district: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  activeStudents: number;
  totalPassedOut: number;
  status: 'Authorized Active' | 'New Branch';
  yearJoined: number;
}

export interface AdmissionFormState {
  fullName: string;
  fatherName: string;
  dob: string;
  gender: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  qualification: string;
  selectedCourseId: string;
  batchPreference: string;
  paymentMode: 'online_full' | 'online_installment' | 'pay_at_center';
}

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  designation: string;
  category: 'leadership' | 'programming' | 'accounting' | 'office-diploma' | 'typing-govt';
  experienceYears: number;
  studentsTrained: number;
  qualification: string;
  certifications: string[];
  specializations: string[];
  keyAchievements: string[];
  bio: string;
  teachingPhilosophy: string;
  avatarUrl?: string;
  featured?: boolean;
  coursesHandled: string[];
  whatsappMessage?: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  recipientName: string;
  phone: string;
  type: 'admission_success' | 'fee_receipt' | 'certificate_issued' | 'exam_alert';
  message: string;
  status: 'Delivered (WhatsApp)' | 'Sent (SMS)';
}
