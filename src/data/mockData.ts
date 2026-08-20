import { CertificateRecord, FranchiseCenter, StudentAccount, NotificationLog, MentorProfile } from '../types';

export const ACADEMY_INFO = {
  name: 'Dharam Futurebit Computer Academy',
  shortName: 'DFB Academy',
  tagline: 'All Computer Courses Coaching & Career Training',
  foundedYear: 2026,
  director: 'Vivek Raghav',
  phone: '+91 9625118781',
  whatsapp: '+91 9354358781',
  email: 'ragahvvivek2020@gmail.com',
  address: 'Bhagola Village, Near Govt. Sr. Sec. School, Palwal, Haryana - 121102, India',
  landmark: 'Near Govt Senior Secondary School Bhagola',
  district: 'Palwal',
  state: 'Haryana',
  pincode: '121102',
  regNumber: 'REG/HR/PLW/2026/08914',
  isoNumber: 'ISO 9001:2015 (QMS-26-8910)',
  msmeNumber: 'UDYAM-HR-15-0049281',
  timings: '07:00 AM - 08:00 PM (Monday to Saturday), Sunday Open for Mock Tests'
};

export const MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    certificateNo: 'DFBCA-2026-1089',
    rollNo: '2026-PLW-1089',
    studentName: 'Rahul Sharma',
    fatherName: 'Sh. Suresh Sharma',
    courseCode: 'DFB-ADCA-01',
    courseName: 'Advance Diploma in Computer Applications (ADCA)',
    duration: '12 Months (1 Year)',
    session: 'Jan 2025 - Dec 2025',
    centerCode: 'CTR-PLW-01',
    centerName: 'Dharam Futurebit Main Center Bhagola',
    centerLocation: 'Bhagola, Palwal (Haryana)',
    issueDate: '15 Jan 2026',
    overallGrade: 'A+',
    percentage: 92.4,
    marksBreakdown: [
      { subject: 'Computer Fundamentals & Windows 11', maxMarks: 100, obtainedMarks: 94 },
      { subject: 'MS Office Suite (Word, Excel, PowerPoint)', maxMarks: 100, obtainedMarks: 96 },
      { subject: 'Tally Prime with GST & Inventory', maxMarks: 100, obtainedMarks: 88 },
      { subject: 'Web Design (HTML5/CSS3/Bootstrap)', maxMarks: 100, obtainedMarks: 91 },
      { subject: 'Practical Lab Exam & Project Viva', maxMarks: 100, obtainedMarks: 93 }
    ],
    status: 'Verified & Active'
  },
  {
    certificateNo: 'DFBCA-2026-3021',
    rollNo: '2026-PLW-3021',
    studentName: 'Pooja Rawat',
    fatherName: 'Sh. Mahender Rawat',
    courseCode: 'DFB-TAL-03',
    courseName: 'Tally Prime with GST & E-Invoicing Mastery',
    duration: '3 Months',
    session: 'Oct 2025 - Dec 2025',
    centerCode: 'CTR-PLW-01',
    centerName: 'Dharam Futurebit Main Center Bhagola',
    centerLocation: 'Bhagola, Palwal (Haryana)',
    issueDate: '02 Feb 2026',
    overallGrade: 'A+',
    percentage: 95.0,
    marksBreakdown: [
      { subject: 'Accounting Principles & Ledgers', maxMarks: 100, obtainedMarks: 96 },
      { subject: 'GST Invoicing, TDS & E-Way Bill', maxMarks: 100, obtainedMarks: 94 },
      { subject: 'Balance Sheet & Final Accounts Practical', maxMarks: 100, obtainedMarks: 95 }
    ],
    status: 'Verified & Active'
  },
  {
    certificateNo: 'DFBCA-2026-5510',
    rollNo: '2026-HDL-5510',
    studentName: 'Aman Verma',
    fatherName: 'Sh. Rajendra Verma',
    courseCode: 'DFB-PY-04',
    courseName: 'Python Programming & AI Tools Development',
    duration: '4 Months',
    session: 'Sep 2025 - Dec 2025',
    centerCode: 'CTR-HDL-02',
    centerName: 'Dharam Futurebit Branch Hodal',
    centerLocation: 'Hodal, Palwal (Haryana)',
    issueDate: '10 Jan 2026',
    overallGrade: 'A',
    percentage: 88.5,
    marksBreakdown: [
      { subject: 'Core Python Syntax & Logic', maxMarks: 100, obtainedMarks: 90 },
      { subject: 'OOPs & Data Structures', maxMarks: 100, obtainedMarks: 86 },
      { subject: 'AI API Integration Project', maxMarks: 100, obtainedMarks: 89 }
    ],
    status: 'Verified & Active'
  },
  {
    certificateNo: 'DFBCA-2026-8824',
    rollNo: '2026-HTN-8824',
    studentName: 'Neha Kumari',
    fatherName: 'Sh. Dharamvir Singh',
    courseCode: 'DFB-DCA-02',
    courseName: 'Diploma in Computer Applications (DCA)',
    duration: '6 Months',
    session: 'Jul 2025 - Dec 2025',
    centerCode: 'CTR-HTN-03',
    centerName: 'Dharam Futurebit Center Hathin',
    centerLocation: 'Hathin, Palwal (Haryana)',
    issueDate: '20 Jan 2026',
    overallGrade: 'A+',
    percentage: 91.2,
    marksBreakdown: [
      { subject: 'Computer Basics & Windows OS', maxMarks: 100, obtainedMarks: 92 },
      { subject: 'Office Documentation & Excel', maxMarks: 100, obtainedMarks: 90 },
      { subject: 'Typing & Practical Lab Assessment', maxMarks: 100, obtainedMarks: 92 }
    ],
    status: 'Verified & Active'
  }
];

export const MOCK_STUDENTS: StudentAccount[] = [
  {
    rollNo: '2026-PLW-1089',
    name: 'Rahul Sharma',
    fatherName: 'Sh. Suresh Sharma',
    mobile: '+91 9625118781',
    email: 'rahul.sharma@example.com',
    courseName: 'Advance Diploma in Computer Applications (ADCA)',
    courseCode: 'DFB-ADCA-01',
    batchTime: '09:00 AM - 11:00 AM (Morning Batch)',
    enrollmentDate: '10 Jan 2025',
    totalFees: 11999,
    paidFees: 11999,
    attendancePercent: 94,
    certificateNo: 'DFBCA-2026-1089',
    currentModule: 'Completed & Certified',
    assignmentsSubmitted: 24,
    totalAssignments: 24,
    centerName: 'Dharam Futurebit Main Center Bhagola',
    progressData: {
      overallCompletionPercent: 100,
      completedHours: 360,
      totalHours: 360,
      nextAssessmentTitle: 'Final Certification Cleared',
      nextAssessmentDate: 'Completed',
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1: Computer Fundamentals & Operating Systems',
          hours: 60,
          status: 'completed',
          completionPercent: 100,
          completedDate: '15 Mar 2025',
          topics: [
            { name: 'Hardware Components & Peripherals', completed: true },
            { name: 'Windows 11 Setup, Control Panel & File System', completed: true },
            { name: 'Hindi & English High-Speed Typing', completed: true },
            { name: 'Internet Basics, Cybersecurity & Email Etiquette', completed: true }
          ]
        },
        {
          id: 'mod-2',
          title: 'Module 2: Microsoft Office 365 Professional Suite',
          hours: 90,
          status: 'completed',
          completionPercent: 100,
          completedDate: '20 Jun 2025',
          topics: [
            { name: 'MS Word: Official Documentation & Mail Merge', completed: true },
            { name: 'MS Excel: Advanced Formulas (VLOOKUP, XLOOKUP, Index-Match)', completed: true },
            { name: 'Excel Dashboards, Pivot Tables & Data Analysis', completed: true },
            { name: 'MS PowerPoint: Executive Presentations & Animation', completed: true }
          ]
        },
        {
          id: 'mod-3',
          title: 'Module 3: Financial Accounting with Tally Prime & GST',
          hours: 90,
          status: 'completed',
          completionPercent: 100,
          completedDate: '15 Sep 2025',
          topics: [
            { name: 'Accounting Rules, Journal Entries & Voucher Entry', completed: true },
            { name: 'Inventory Management & Purchase/Sales Orders', completed: true },
            { name: 'GST Billing (CGST, SGST, IGST), E-Way Bill & TDS', completed: true },
            { name: 'Balance Sheet, Profit & Loss Reconciliation', completed: true }
          ]
        },
        {
          id: 'mod-4',
          title: 'Module 4: Web Designing & Digital Tools',
          hours: 80,
          status: 'completed',
          completionPercent: 100,
          completedDate: '10 Dec 2025',
          topics: [
            { name: 'HTML5 Semantic Markup & CSS3 Styling', completed: true },
            { name: 'Responsive Web Layouts with Bootstrap', completed: true },
            { name: 'Graphic Designing Basics in Canva & Photoshop', completed: true },
            { name: 'Live Web Portfolio Deployment', completed: true }
          ]
        },
        {
          id: 'mod-5',
          title: 'Module 5: Capstone Project & Practical Lab Viva',
          hours: 40,
          status: 'completed',
          completionPercent: 100,
          completedDate: '10 Jan 2026',
          topics: [
            { name: 'Integrated Business Case Study Project', completed: true },
            { name: 'Viva Voce & Final Lab Practical Examination', completed: true }
          ]
        }
      ],
      assessments: [
        {
          id: 'asm-1',
          title: 'Module 1 Assessment: Fundamentals & Windows',
          type: 'Theory (CBT)',
          date: '18 Mar 2025',
          time: '10:00 AM - 11:30 AM',
          venue: 'Lab Room 1, Bhagola Center',
          syllabusCoverage: 'Module 1 (Hardware, OS & Typing)',
          maxMarks: 100,
          status: 'completed',
          obtainedMarks: 94
        },
        {
          id: 'asm-2',
          title: 'Module 2 Assessment: Advanced Excel & Office 365',
          type: 'Practical Lab',
          date: '25 Jun 2025',
          time: '09:30 AM - 12:00 PM',
          venue: 'Lab Room 2, Bhagola Center',
          syllabusCoverage: 'Module 2 (Word, Advanced Excel & PPT)',
          maxMarks: 100,
          status: 'completed',
          obtainedMarks: 96
        },
        {
          id: 'asm-3',
          title: 'Module 3 Assessment: Tally Prime & GST Invoicing',
          type: 'Practical Lab',
          date: '20 Sep 2025',
          time: '10:00 AM - 01:00 PM',
          venue: 'Lab Room 1, Bhagola Center',
          syllabusCoverage: 'Module 3 (Accounts, GST, E-Way Bill & Balance Sheet)',
          maxMarks: 100,
          status: 'completed',
          obtainedMarks: 88
        },
        {
          id: 'asm-4',
          title: 'ADCA Final Board Certification Examination',
          type: 'Final Board Exam',
          date: '10 Jan 2026',
          time: '09:00 AM - 01:00 PM',
          venue: 'Main Examination Hall, Palwal Center',
          syllabusCoverage: 'Full ADCA 1-Year Syllabus (Modules 1 to 5)',
          maxMarks: 100,
          status: 'completed',
          obtainedMarks: 93
        }
      ]
    }
  },
  {
    rollNo: '2026-PLW-4402',
    name: 'Kavita Chaudhary',
    fatherName: 'Sh. Jagdish Chaudhary',
    mobile: '+91 9812345678',
    email: 'kavita.c@example.com',
    courseName: 'Python Programming & AI Tools Development',
    courseCode: 'DFB-PY-04',
    batchTime: '04:00 PM - 06:00 PM (Evening Batch)',
    enrollmentDate: '15 Jan 2026',
    totalFees: 7499,
    paidFees: 4500,
    attendancePercent: 91,
    currentModule: 'Module 2: Automation & Data Structures',
    assignmentsSubmitted: 8,
    totalAssignments: 10,
    centerName: 'Dharam Futurebit Main Center Bhagola',
    progressData: {
      overallCompletionPercent: 62,
      completedHours: 74,
      totalHours: 120,
      nextAssessmentTitle: 'Mid-Term Python Practical & OOPs Assessment',
      nextAssessmentDate: '28 Feb 2026',
      modules: [
        {
          id: 'mod-py-1',
          title: 'Module 1: Core Python Fundamentals & Logic Building',
          hours: 35,
          status: 'completed',
          completionPercent: 100,
          completedDate: '08 Feb 2026',
          topics: [
            { name: 'Variables, Data Types & Operators', completed: true },
            { name: 'Control Flow (If-Else, Match-Case)', completed: true },
            { name: 'Loops (While, For, Comprehensions)', completed: true },
            { name: 'Functions, Scopes & Lambda Expressions', completed: true }
          ]
        },
        {
          id: 'mod-py-2',
          title: 'Module 2: Data Structures & OOPs Architecture',
          hours: 35,
          status: 'in_progress',
          completionPercent: 75,
          topics: [
            { name: 'Lists, Tuples, Dictionaries & Sets Mastery', completed: true },
            { name: 'Classes, Objects, Inheritance & Polymorphism', completed: true },
            { name: 'File Handling & JSON Data Processing', completed: true },
            { name: 'Exception Handling & Custom Error Logging', completed: false }
          ]
        },
        {
          id: 'mod-py-3',
          title: 'Module 3: Data Analysis with NumPy & Pandas',
          hours: 25,
          status: 'upcoming',
          completionPercent: 0,
          topics: [
            { name: 'NumPy Multidimensional Array Computation', completed: false },
            { name: 'Pandas DataFrames, Cleaning & Filtering', completed: false },
            { name: 'Data Visualization with Matplotlib & Seaborn', completed: false }
          ]
        },
        {
          id: 'mod-py-4',
          title: 'Module 4: Generative AI APIs & Capstone Project',
          hours: 25,
          status: 'upcoming',
          completionPercent: 0,
          topics: [
            { name: 'Connecting REST APIs and Gemini SDK in Python', completed: false },
            { name: 'Building an Intelligent Automated Assistant Bot', completed: false },
            { name: 'Final Project Submission & Code Review Viva', completed: false }
          ]
        }
      ],
      assessments: [
        {
          id: 'asm-py-1',
          title: 'Python Core Logic & Syntax Quiz',
          type: 'Theory (CBT)',
          date: '10 Feb 2026',
          time: '04:30 PM - 05:30 PM',
          venue: 'Lab Room 2, Bhagola Center',
          syllabusCoverage: 'Module 1 (Variables, Control Flow & Functions)',
          maxMarks: 50,
          status: 'completed',
          obtainedMarks: 46
        },
        {
          id: 'asm-py-2',
          title: 'Mid-Term Python Practical & OOPs Assessment',
          type: 'Practical Lab',
          date: '28 Feb 2026',
          time: '04:00 PM - 06:00 PM',
          venue: 'AI & Coding Lab, Bhagola Center',
          syllabusCoverage: 'Module 1 & 2 (OOPs, File IO & Data Structures)',
          maxMarks: 100,
          status: 'upcoming',
          daysRemaining: 8
        },
        {
          id: 'asm-py-3',
          title: 'Pandas Data Analysis & Visualization Lab Test',
          type: 'Practical Lab',
          date: '20 Mar 2026',
          time: '04:00 PM - 06:00 PM',
          venue: 'AI & Coding Lab, Bhagola Center',
          syllabusCoverage: 'Module 3 (NumPy, Pandas & Matplotlib)',
          maxMarks: 100,
          status: 'upcoming',
          daysRemaining: 28
        },
        {
          id: 'asm-py-4',
          title: 'Final Python & AI Project Evaluation & Viva',
          type: 'Project Evaluation',
          date: '15 Apr 2026',
          time: '03:00 PM - 06:00 PM',
          venue: 'Main Seminar Hall, Bhagola Center',
          syllabusCoverage: 'Full Python & AI Course Project',
          maxMarks: 100,
          status: 'upcoming',
          daysRemaining: 54
        }
      ]
    }
  },
  {
    rollNo: '2026-PLW-7719',
    name: 'Deepak Kumar',
    fatherName: 'Sh. Om Prakash',
    mobile: '+91 9728912345',
    email: 'deepak.k@example.com',
    courseName: 'Tally Prime with GST & E-Invoicing Mastery',
    courseCode: 'DFB-TAL-03',
    batchTime: '11:00 AM - 01:00 PM (Noon Batch)',
    enrollmentDate: '01 Feb 2026',
    totalFees: 4999,
    paidFees: 4999,
    attendancePercent: 98,
    currentModule: 'Module 3: Banking & Final Balance Sheet',
    assignmentsSubmitted: 6,
    totalAssignments: 6,
    centerName: 'Dharam Futurebit Main Center Bhagola',
    progressData: {
      overallCompletionPercent: 78,
      completedHours: 70,
      totalHours: 90,
      nextAssessmentTitle: 'Tally GST Return Filing & Balance Sheet Practical Exam',
      nextAssessmentDate: '05 Mar 2026',
      modules: [
        {
          id: 'mod-tal-1',
          title: 'Module 1: Accounting Fundamentals & Company Setup',
          hours: 25,
          status: 'completed',
          completionPercent: 100,
          completedDate: '10 Feb 2026',
          topics: [
            { name: 'Principles of Double Entry Accounting', completed: true },
            { name: 'Company Creation, Security Control & Groups', completed: true },
            { name: 'Ledger Creation, Cost Centers & Categories', completed: true }
          ]
        },
        {
          id: 'mod-tal-2',
          title: 'Module 2: Inventory, Orders & Multi-Currency',
          hours: 30,
          status: 'completed',
          completionPercent: 100,
          completedDate: '18 Feb 2026',
          topics: [
            { name: 'Stock Groups, Units of Measure & Godown Tracking', completed: true },
            { name: 'Purchase & Sales Orders Processing', completed: true },
            { name: 'Price Levels & Discount Master Configuration', completed: true }
          ]
        },
        {
          id: 'mod-tal-3',
          title: 'Module 3: GST Invoicing, E-Way Bill & Banking',
          hours: 35,
          status: 'in_progress',
          completionPercent: 60,
          topics: [
            { name: 'GST Calculation (CGST/SGST/IGST) & HSN Setup', completed: true },
            { name: 'E-Invoicing & E-Way Bill JSON Generation', completed: true },
            { name: 'Bank Reconciliation Statement (BRS)', completed: false },
            { name: 'Balance Sheet, P&L & Auditing Verification', completed: false }
          ]
        }
      ],
      assessments: [
        {
          id: 'asm-tal-1',
          title: 'Tally Accounting Basics & Ledger Practical',
          type: 'Practical Lab',
          date: '12 Feb 2026',
          time: '11:30 AM - 01:00 PM',
          venue: 'Accounting Lab 1, Bhagola Center',
          syllabusCoverage: 'Module 1 (Company, Ledgers & Vouchers)',
          maxMarks: 50,
          status: 'completed',
          obtainedMarks: 48
        },
        {
          id: 'asm-tal-2',
          title: 'Tally GST Return Filing & Balance Sheet Practical Exam',
          type: 'Practical Lab',
          date: '05 Mar 2026',
          time: '11:00 AM - 01:00 PM',
          venue: 'Accounting Lab 1, Bhagola Center',
          syllabusCoverage: 'Full Tally Prime & GST Modules (Module 1, 2 & 3)',
          maxMarks: 100,
          status: 'upcoming',
          daysRemaining: 13
        },
        {
          id: 'asm-tal-3',
          title: 'Final Tally Prime Industry Certification Viva',
          type: 'Viva Voce',
          date: '15 Mar 2026',
          time: '11:00 AM - 01:00 PM',
          venue: 'Main Faculty Room, Bhagola Center',
          syllabusCoverage: 'Live GST Case Study & Client Bookkeeping Viva',
          maxMarks: 100,
          status: 'upcoming',
          daysRemaining: 23
        }
      ]
    }
  }
];

export const MOCK_CENTERS: FranchiseCenter[] = [
  {
    centerCode: 'CTR-PLW-01',
    centerName: 'Dharam Futurebit Main Headquarters Bhagola',
    directorName: 'Vivek Raghav',
    district: 'Palwal',
    state: 'Haryana',
    address: 'Near Govt. Sr. Sec. School, Bhagola Village, Palwal - 121102',
    phone: '+91 9625118781',
    email: 'ragahvvivek2020@gmail.com',
    activeStudents: 145,
    totalPassedOut: 850,
    status: 'Authorized Active',
    yearJoined: 2026
  },
  {
    centerCode: 'CTR-HDL-02',
    centerName: 'Dharam Futurebit Franchise Branch Hodal',
    directorName: 'Er. Sandeep Bhati',
    district: 'Palwal',
    state: 'Haryana',
    address: 'Opposite Civil Hospital, Railway Road, Hodal - 121106',
    phone: '+91 9812903841',
    email: 'hodal.branch@dharamfuturebit.com',
    activeStudents: 82,
    totalPassedOut: 420,
    status: 'Authorized Active',
    yearJoined: 2026
  },
  {
    centerCode: 'CTR-HTN-03',
    centerName: 'Dharam Futurebit Franchise Center Hathin',
    directorName: 'Mohd. Imran Khan',
    district: 'Palwal',
    state: 'Haryana',
    address: 'Near Bus Stand, Main Market, Hathin - 121103',
    phone: '+91 9991204852',
    email: 'hathin.center@dharamfuturebit.com',
    activeStudents: 68,
    totalPassedOut: 310,
    status: 'Authorized Active',
    yearJoined: 2026
  },
  {
    centerCode: 'CTR-FBD-04',
    centerName: 'Dharam Futurebit Associate Center Ballabgarh',
    directorName: 'Anita Sharma',
    district: 'Faridabad',
    state: 'Haryana',
    address: 'Sector 3 Main Market, Ballabgarh, Faridabad - 121004',
    phone: '+91 9871029384',
    email: 'ballabgarh@dharamfuturebit.com',
    activeStudents: 95,
    totalPassedOut: 560,
    status: 'Authorized Active',
    yearJoined: 2026
  },
  {
    centerCode: 'CTR-NUH-05',
    centerName: 'Dharam Futurebit Skill Center Nuh',
    directorName: 'Farooq Ahmed',
    district: 'Nuh / Mewat',
    state: 'Haryana',
    address: 'Court Road, Near Govt College, Nuh - 122107',
    phone: '+91 9813098765',
    email: 'nuh.skill@dharamfuturebit.com',
    activeStudents: 54,
    totalPassedOut: 210,
    status: 'Authorized Active',
    yearJoined: 2026
  }
];

export const MOCK_MENTORS: MentorProfile[] = [
  {
    id: 'mentor-vivek',
    name: 'Er. Vivek Raghav',
    role: 'Founder, Director & Lead AI / Software Engineering Mentor',
    designation: 'Director & Chief Technical Trainer',
    category: 'leadership',
    experienceYears: 10,
    studentsTrained: 3800,
    qualification: 'MCA (Gold Medalist), B.Sc (Computer Science)',
    certifications: [
      'Microsoft Certified Professional (MCP)',
      'Google Cloud Certified Associate',
      'Ex-Senior Software Engineer & EdTech Master Trainer',
      'Python Institute Certified Associate'
    ],
    specializations: [
      'Python Programming & Generative AI',
      'Full-Stack Web Architecture',
      'C & C++ Algorithmic Problem Solving',
      'Career Mentorship & Software Interviews'
    ],
    keyAchievements: [
      'Trained 3,800+ students across Palwal, Faridabad, Hodal & Delhi NCR',
      'Mentored 450+ graduates into IT companies and government office roles',
      'Designed the industry-standard ADCA & Full-Stack curriculum adopted by 5+ centers',
      'Pioneered 1:1 computer lab workstation mentorship in rural Haryana'
    ],
    bio: 'Vivek Raghav founded Dharam Futurebit Computer Academy with a mission to bring world-class computer education, AI literacy, and vocational coding skills to students of Bhagola, Palwal, and surrounding rural communities. He brings over a decade of hands-on software development and technical coaching expertise.',
    teachingPhilosophy: 'Code is not learned by watching slides; it is mastered by building real-world projects, breaking code, and debugging in a live lab environment from day one.',
    coursesHandled: ['Python & Generative AI Tools', 'ADCA (1 Year Diploma)', 'Full Stack Web Designing', 'C / C++ Logic Building'],
    featured: true,
    whatsappMessage: 'Hello Sir Vivek! I would like to consult about Python & IT career courses at Dharam Futurebit Academy.'
  },
  {
    id: 'mentor-meenakshi',
    name: 'Meenakshi Sharma',
    role: 'Senior Financial Accounting & GST Master Faculty',
    designation: 'Head of Accounting & Corporate Taxation Dept',
    category: 'accounting',
    experienceYears: 8,
    studentsTrained: 2400,
    qualification: 'M.Com (Accountancy & Finance), Inter CMA',
    certifications: [
      'Certified TallyPrime Gold Professional',
      'Govt. Certified GST Practitioner (GSTP)',
      'Advanced Excel for Financial Modeling Master'
    ],
    specializations: [
      'TallyPrime with GST & E-Way Billing',
      'E-Invoicing, TDS & TCS Compliance',
      'Corporate Payroll & Inventory Management',
      'Balance Sheet Auditing & Reconciliation'
    ],
    keyAchievements: [
      '2,400+ accountants trained, with 80%+ placed in local firms, CA offices & industries',
      'Conducted 40+ corporate GST transition workshops across Palwal & Ballabgarh',
      'Maintains 98% first-attempt pass rate in Tally certification assessments'
    ],
    bio: 'Meenakshi Sharma is a seasoned accounting professional and GST consultant with 8+ years of dedicated teaching and corporate bookkeeping experience. She breaks down complex double-entry mechanics and tax filings into simple, step-by-step practical modules.',
    teachingPhilosophy: 'Every entry in Tally must reflect the real commercial transaction. When students understand the business logic behind a voucher, accounting becomes effortless.',
    coursesHandled: ['Tally Prime with GST', 'ADCA (Accounting Module)', 'Corporate Payroll & TDS'],
    featured: true,
    whatsappMessage: 'Hello Ma’am Meenakshi! I want to enroll in the Tally Prime & GST Accounting course.'
  },
  {
    id: 'mentor-rohit',
    name: 'Er. Rohit Vashisth',
    role: 'Head of Diploma Programs & Office Automation Suite',
    designation: 'Senior Faculty & Diploma Exam Coordinator',
    category: 'office-diploma',
    experienceYears: 7,
    studentsTrained: 2900,
    qualification: 'B.Tech (Computer Science & Engineering)',
    certifications: [
      'Microsoft Office Specialist (MOS) Expert',
      'NIELIT Certified Master Facilitator',
      'Hardware & Network Administration Professional'
    ],
    specializations: [
      'Advanced Excel (Power Query, XLOOKUP, Dashboards)',
      'MS Office 365 Professional Productivity Suite',
      'Graphic Design (Photoshop, CorelDRAW & Canva)',
      'Computer Hardware, OS & Network Maintenance'
    ],
    keyAchievements: [
      'Coordinated diploma certifications for over 2,900 ADCA, DCA, and DTP students',
      'Created the Academy 100-Problem Practical Excel Workbook used in all lab batches',
      'Awarded Best Vocational Instructor by local skill development forums in 2024'
    ],
    bio: 'Er. Rohit Vashisth has been mentoring students for 7+ years in office productivity, computer fundamentals, and digital graphic design. His energetic teaching style and focus on practical speed make his batches highly popular among school and college students.',
    teachingPhilosophy: 'Knowing software is good; operating software with lightning keyboard shortcuts and automated formulas is what makes a student employable.',
    coursesHandled: ['ADCA (1 Year)', 'DCA (6 Months)', 'Desktop Publishing (DTP)', 'Advanced MS Excel Pro'],
    featured: true,
    whatsappMessage: 'Hello Sir Rohit! I would like details about ADCA / DCA Diploma admission.'
  },
  {
    id: 'mentor-suman',
    name: 'Suman Rawat',
    role: 'Senior Bilingual Typing Speed Coach & Govt. Exam Specialist',
    designation: 'Chief Typing Instructor & Speed Evaluator',
    category: 'typing-govt',
    experienceYears: 6,
    studentsTrained: 2100,
    qualification: 'M.A., Certified Commercial Shorthand & Typing Instructor',
    certifications: [
      'State Typing Speed Record Holder (English: 85 WPM, Hindi: 65 WPM)',
      'Kruti Dev & Mangal Inscript Certified Master Trainer',
      'HSSC / Court Clerk Typing Test Specialist'
    ],
    specializations: [
      'Hindi Typing (Kruti Dev 010 & Mangal Remington/Inscript)',
      'English Touch-Typing 10-Finger Speed Training',
      'Court Clerk, Stenographer & SSC CHSL Speed Tests',
      'Zero-Error Accuracy & Backspace Elimination Techniques'
    ],
    keyAchievements: [
      '380+ students selected in Punjab & Haryana High Court, District Courts & HSSC clerk exams',
      'Coached multiple students to exceed 60+ Net WPM within 60 days of lab training',
      'Architected the Academy Live Speed Testing Software simulator'
    ],
    bio: 'Suman Rawat is renowned across the Palwal region for her scientific touch-typing pedagogy. She coaches students from raw beginners with 0 WPM to government exam qualification standards with strict error monitoring and posture drills.',
    teachingPhilosophy: 'Speed is the natural byproduct of correct finger placement and muscle memory. Master the keys without looking, and speed will follow effortlessly.',
    coursesHandled: ['Bilingual Typing Mastery', 'Govt. Exam Typing Test Prep', 'ADCA (Typing Lab)'],
    featured: true,
    whatsappMessage: 'Hello Ma’am Suman! I want to join the Hindi & English Typing Speed Coaching batch.'
  },
  {
    id: 'mentor-devender',
    name: 'Devender Kumar',
    role: 'Web Technologies & Frontend Development Mentor',
    designation: 'Senior Web & UI Developer Instructor',
    category: 'programming',
    experienceYears: 5,
    studentsTrained: 1600,
    qualification: 'BCA, M.Sc (Information Technology)',
    certifications: [
      'Frontend Web Developer Certified (W3C)',
      'UI/UX Design Master (Figma & Bootstrap)',
      'JavaScript Algorithms & Data Structures Certified'
    ],
    specializations: [
      'HTML5, CSS3, Tailwind CSS & Bootstrap 5',
      'Modern JavaScript (ES6+) & DOM Manipulation',
      'Responsive Portfolio & Small Business Website Creation',
      'Git, GitHub & Web Hosting Deployment'
    ],
    keyAchievements: [
      'Guided 200+ students in launching live responsive websites for local Palwal businesses',
      'Organized annual Academy Web Hackathon with 100+ student project showcases',
      'Passionate advocate for student portfolio-based hiring over plain resumes'
    ],
    bio: 'Devender Kumar specializes in turning students with zero prior coding background into confident web creators. His project-driven lessons guide learners through creating real websites, landing pages, and interactive UI applications.',
    teachingPhilosophy: 'Don’t just learn syntax—publish your creations to the internet so the entire world can see your capabilities.',
    coursesHandled: ['Web Designing & Frontend Development', 'ADCA (Web Module)', 'Python Web Tools'],
    featured: false,
    whatsappMessage: 'Hello Sir Devender! I am interested in learning Web Designing and building websites.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationLog[] = [
  {
    id: 'notif-01',
    timestamp: 'Today at 09:15 AM',
    recipientName: 'Rahul Sharma',
    phone: '+91 9625118781',
    type: 'certificate_issued',
    message: '🎉 Congratulations Rahul! Your ADCA Certificate (DFBCA-2026-1089) has been issued with Grade A+. Check & verify online at Dharam Futurebit Academy.',
    status: 'Delivered (WhatsApp)'
  },
  {
    id: 'notif-02',
    timestamp: 'Today at 10:45 AM',
    recipientName: 'Kavita Chaudhary',
    phone: '+91 9812345678',
    type: 'fee_receipt',
    message: '🧾 Fee Receipt #RCP-9012 for ₹4,500 received for Python Programming course. Balance due: ₹2,999. Thank you! - Dharam Futurebit Academy.',
    status: 'Delivered (WhatsApp)'
  },
  {
    id: 'notif-03',
    timestamp: 'Yesterday at 04:30 PM',
    recipientName: 'Deepak Kumar',
    phone: '+91 9728912345',
    type: 'admission_success',
    message: '✅ Welcome to Dharam Futurebit Computer Academy! Admission confirmed in Tally Prime Batch (11 AM - 1 PM). Roll No: 2026-PLW-7719.',
    status: 'Delivered (WhatsApp)'
  }
];
