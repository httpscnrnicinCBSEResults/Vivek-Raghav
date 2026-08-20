import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'adca',
    code: 'DFB-ADCA-01',
    title: 'ADCA (Advance Diploma in Computer Applications)',
    tagline: 'Comprehensive 1-Year Master Diploma covering Office Automation, Web Design, Accounting & Programming',
    category: 'diploma',
    duration: '12 Months (1 Year)',
    hours: 360,
    fee: 14500,
    discountedFee: 11999,
    eligibility: '10th / 12th Pass (Any Stream)',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 342,
    popular: true,
    badge: 'Most Popular',
    certifyingBody: 'Dharam Futurebit Academy & ISO 9001:2015 Approved',
    iconName: 'Award',
    skillsGained: [
      'MS Office 365 (Word, Excel, PowerPoint, Access)',
      'Tally Prime with GST & E-Way Bill',
      'HTML5, CSS3 & Responsive Web Design',
      'C & C++ Programming Fundamentals',
      'Photoshop & CorelDraw Graphic Design Basics',
      'Computer Hardware & OS Troubleshooting',
      'Fast English & Hindi Typing Mastery'
    ],
    jobProfiles: [
      'Computer Operator',
      'Accounts Executive',
      'Web Designer Associate',
      'Office Assistant in Govt/Private Sectors',
      'Data Management Executive'
    ],
    syllabus: [
      {
        module: 'Semester 1: Fundamentals & Office Automation',
        topics: [
          'Computer Fundamentals, Hardware Architecture & Windows 11',
          'MS Word: Advanced Formatting, Mail Merge, Official Documentation',
          'MS Excel: Financial Formulas, VLOOKUP, XLOOKUP, Pivot Tables, Macros',
          'MS PowerPoint: Professional Animations, Slide Masters & Presentations',
          'Internet, Cyber Security & Digital Banking Tools'
        ]
      },
      {
        module: 'Semester 2: Accounting, Web & Graphics',
        topics: [
          'Tally Prime: Company Creation, Ledger, Voucher Entry, GST Invoicing',
          'GST Filing concepts, Balance Sheet & Profit-Loss Statements',
          'HTML5, CSS3, Bootstrap 5 & Static Web Publishing',
          'Basics of Programming Logic in C / Python',
          'Photoshop / Canva for Social Media and Printing graphics',
          'Project Work, Practical Lab Exam & Final Viva'
        ]
      }
    ]
  },
  {
    id: 'dca',
    code: 'DFB-DCA-02',
    title: 'DCA (Diploma in Computer Applications)',
    tagline: 'Essential 6-Month Diploma for standard office jobs, data operations and computer literacy',
    category: 'diploma',
    duration: '6 Months',
    hours: 180,
    fee: 8500,
    discountedFee: 6999,
    eligibility: '10th Pass',
    level: 'Beginner',
    rating: 4.8,
    reviewsCount: 219,
    popular: true,
    badge: 'Govt Job Ready',
    certifyingBody: 'ISO 9001:2015 & Dharam Futurebit Certified',
    iconName: 'Laptop',
    skillsGained: [
      'Complete Microsoft Office Suite',
      'English Typing (35+ WPM)',
      'Hindi Kruti Dev / Mangal Typing (30+ WPM)',
      'Basic Accounting in Tally',
      'Internet, Email & Cloud Storage (Google Drive, Docs)'
    ],
    jobProfiles: [
      'Data Entry Operator',
      'Front Desk Coordinator',
      'Computer Lab Assistant',
      'Clerk / Billing Executive'
    ],
    syllabus: [
      {
        module: 'Module 1: Computer Basics & Windows Operations',
        topics: ['History of Computers, Components, Input/Output Devices', 'Windows 11 utilities, File Manager, Shortcuts']
      },
      {
        module: 'Module 2: Complete MS Office 2024 Suite',
        topics: ['MS Word formatting, Letterheads, Tables', 'MS Excel spreadsheets, formulas & chart creation', 'MS PowerPoint slides and audio-visual setups']
      },
      {
        module: 'Module 3: Internet, Hindi/English Typing & Practical Project',
        topics: ['Speed typing drills, Accuracy optimization', 'Email drafting, online portals, DigiLocker, PAN/Aadhaar services', 'Tally Prime basics']
      }
    ]
  },
  {
    id: 'tally-gst',
    code: 'DFB-TAL-03',
    title: 'Tally Prime with GST & E-Invoicing Mastery',
    tagline: 'Become a Professional Certified Accountant with practical industrial ledger entries & tax filing',
    category: 'accounting',
    duration: '3 Months',
    hours: 90,
    fee: 6500,
    discountedFee: 4999,
    eligibility: '10th / 12th / B.Com / Commerce or Any Stream',
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 184,
    badge: '100% Practical Tax Practice',
    certifyingBody: 'Dharam Futurebit Computer Academy',
    iconName: 'Calculator',
    skillsGained: [
      'Tally Prime 4.0 Interface & Navigation',
      'GST Returns (GSTR-1, GSTR-3B, GSTR-9) Overview',
      'Payroll Management & Salary Slip Generation',
      'TDS & TCS calculation in billing',
      'Bank Reconciliation (BRS) & Inventory Control'
    ],
    jobProfiles: [
      'Accountant',
      'GST Billing Executive',
      'Inventory Manager',
      'Audit Assistant in CA Firms'
    ],
    syllabus: [
      {
        module: 'Module 1: Principles of Accounting & Tally Setup',
        topics: ['Debit/Credit rules, Ledger Accounts creation, Grouping', 'Cost Centers & Category tracking']
      },
      {
        module: 'Module 2: Inventory, Invoicing & GST',
        topics: ['Stock Items, Godown Management, Purchase/Sales Orders', 'IGST, CGST, SGST tax configurations & E-Way Bill setup']
      },
      {
        module: 'Module 3: Banking, Payroll & Final Accounts',
        topics: ['Bank Reconciliation Statement (BRS)', 'Employee Attendance, PF, ESI & Salary generation', 'Trial Balance, Balance Sheet and P&L finalization']
      }
    ]
  },
  {
    id: 'python-ai',
    code: 'DFB-PY-04',
    title: 'Python Programming & AI Tools Development',
    tagline: 'Learn Python coding from absolute basics to automated scripting, data handling and Generative AI APIs',
    category: 'programming',
    duration: '4 Months',
    hours: 120,
    fee: 9500,
    discountedFee: 7499,
    eligibility: '12th Pass / Graduate (Basic logic curiosity)',
    level: 'All Levels',
    rating: 5.0,
    reviewsCount: 156,
    popular: true,
    badge: 'Trending Tech',
    certifyingBody: 'Dharam Futurebit Tech Certification',
    iconName: 'Code',
    skillsGained: [
      'Python 3 Syntax, OOPs, Data Structures',
      'Automation Scripting & Web Scraping',
      'Pandas & NumPy for Data Analytics',
      'Integration with Google Gemini / AI APIs',
      'Building Interactive GUI Apps with Tkinter / Web UI'
    ],
    jobProfiles: [
      'Junior Python Developer',
      'Data Operations Analyst',
      'Automation Specialist',
      'AI Automation Intern'
    ],
    syllabus: [
      {
        module: 'Module 1: Core Python Programming',
        topics: ['Variables, Loops, Conditions, Functions', 'Lists, Tuples, Dictionaries, Sets', 'Object-Oriented Programming (Classes & Inheritance)']
      },
      {
        module: 'Module 2: File Handling, Libraries & Automation',
        topics: ['Working with CSV, JSON, Excel automation via Python', 'Exception Handling & Module packaging', 'Requests & Web Scraping with BeautifulSoup']
      },
      {
        module: 'Module 3: Data Analysis & AI Integration',
        topics: ['NumPy arrays and Pandas dataframes', 'Prompt Engineering & Calling Gemini API endpoints', 'Live Capstone Project development']
      }
    ]
  },
  {
    id: 'web-dev',
    code: 'DFB-WEB-05',
    title: 'Full-Stack Web Design & Development',
    tagline: 'Build modern responsive websites and web applications with HTML, CSS, JavaScript, React & Node.js',
    category: 'programming',
    duration: '6 Months',
    hours: 180,
    fee: 12500,
    discountedFee: 9999,
    eligibility: '10th / 12th Pass',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 140,
    badge: 'High Salary Career',
    certifyingBody: 'Dharam Futurebit Computer Academy',
    iconName: 'Globe',
    skillsGained: [
      'HTML5, Modern CSS3, Flexbox & CSS Grid',
      'Tailwind CSS & Responsive Layouts',
      'JavaScript ES6+ & DOM Manipulation',
      'React.js Component Architecture',
      'Git, GitHub, Hosting & Custom Domains'
    ],
    jobProfiles: [
      'Frontend Web Developer',
      'UI/UX Web Designer',
      'Freelance Website Developer',
      'WordPress & Web Master'
    ],
    syllabus: [
      {
        module: 'Module 1: Frontend UI Building Blocks',
        topics: ['HTML5 Semantic tags, Modern CSS styling', 'Mobile-first responsive design, Media Queries, Tailwind CSS']
      },
      {
        module: 'Module 2: Dynamic JavaScript & Interactivity',
        topics: ['Data Types, Functions, Event Listeners, Fetch API', 'Async/Await, LocalStorage, Mini Games & Apps']
      },
      {
        module: 'Module 3: React.js & Deployment',
        topics: ['React Hooks (useState, useEffect), Component state', 'Routing, API Integration, Deploying live on Cloud/Vercel']
      }
    ]
  },
  {
    id: 'ccc-nielit',
    code: 'DFB-CCC-06',
    title: 'CCC (Course on Computer Concepts) - NIELIT Pattern',
    tagline: 'Govt. Recognized Certification mandatory for Central & State Government examinations and Clerk posts',
    category: 'govt-exam',
    duration: '3 Months (80 Hours)',
    hours: 80,
    fee: 4500,
    discountedFee: 3499,
    eligibility: 'No Minimum Qualification Required',
    level: 'Beginner',
    rating: 4.8,
    reviewsCount: 290,
    popular: true,
    badge: 'Govt Exam Mandatory',
    certifyingBody: 'Aligned with NIELIT & Govt Standard Guidelines',
    iconName: 'FileCheck',
    skillsGained: [
      'Operating Systems (GUI & CLI basics)',
      'LibreOffice Writer, Calc & Impress',
      'Digital Financial Services & UPI Security',
      'Cyber Law & IT Act Basics',
      'E-Governance portals (Parivahan, Saral Haryana, Umang)'
    ],
    jobProfiles: [
      'Govt. Job Eligibility (HSSC, SSC, Banking, Railways)',
      'Panchayat Computer Assistant',
      'CSC / Common Service Center Operator'
    ],
    syllabus: [
      {
        module: 'Module 1: Computer Concepts & GUI Systems',
        topics: ['Introduction to Computers, Hardware vs Software, Linux/Windows']
      },
      {
        module: 'Module 2: Word Processing & Spreadsheets',
        topics: ['LibreOffice/MS Word & Calc formatting, Formulas, Tables, Printing']
      },
      {
        module: 'Module 3: Digital Governance & Mock Online Tests',
        topics: ['Cyber hygiene, UPI/AEPS, E-Services, 1000+ Online MCQ Mock Drills']
      }
    ]
  },
  {
    id: 'graphic-design',
    code: 'DFB-GD-07',
    title: 'Graphic Design (Photoshop, CorelDraw & Illustrator)',
    tagline: 'Master digital poster design, flex printing, social media creatives, visiting cards & brand logos',
    category: 'design',
    duration: '4 Months',
    hours: 120,
    fee: 8000,
    discountedFee: 6499,
    eligibility: '10th Pass',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 112,
    badge: 'Creative Studio Skill',
    certifyingBody: 'Dharam Futurebit Computer Academy',
    iconName: 'Palette',
    skillsGained: [
      'Adobe Photoshop Photo Retouching & Color Grading',
      'CorelDraw Vector Art, Banner & Flex Printing layouts',
      'Canva Pro & Social Media Post Design',
      'Typographic Poster & Logo Design',
      'Print Media Preparation (CMYK vs RGB)'
    ],
    jobProfiles: [
      'Graphic Designer',
      'Flex Printing & Banner Operator',
      'Social Media Creative Designer',
      'Photo Studio Editor'
    ],
    syllabus: [
      {
        module: 'Module 1: Adobe Photoshop',
        topics: ['Layers, Masks, Selection Tools, Photo Restoration, Background Removal, Banner Creation']
      },
      {
        module: 'Module 2: CorelDraw Vector Mastering',
        topics: ['Pen Tool, Curve editing, Visiting Cards, Wedding Cards, Flex Board design for print presses']
      },
      {
        module: 'Module 3: Portfolio & Client Work',
        topics: ['Commercial portfolio preparation, Exporting PDF/EPS, Freelancing guidance']
      }
    ]
  },
  {
    id: 'typing-master',
    code: 'DFB-TYPE-08',
    title: 'Professional Computer Typing (Hindi & English)',
    tagline: 'Achieve 45+ WPM in English & 35+ WPM in Hindi (Kruti Dev / Mangal Unicode) with high accuracy',
    category: 'govt-exam',
    duration: '2 Months',
    hours: 60,
    fee: 3000,
    discountedFee: 2499,
    eligibility: 'All Welcome',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'HSSC / Court Exam Speed',
    certifyingBody: 'Dharam Futurebit Academy Typing Speed Certificate',
    iconName: 'Keyboard',
    skillsGained: [
      'Touch Typing on 10 Fingers without looking at Keyboard',
      'English Speed (35 - 50+ WPM)',
      'Hindi Kruti Dev 010 Speed (30 - 40+ WPM)',
      'Hindi Mangal Unicode / Inscript Layout Speed',
      'Special Character & Alt Codes Mastery'
    ],
    jobProfiles: [
      'Court Steno / Clerk Typist',
      'HSSC / DSSSB / SSC Typist',
      'Data Entry Operator in Hospitals & Banks'
    ],
    syllabus: [
      {
        module: 'Module 1: Touch Typing Home Row & Finger Placement',
        topics: ['Home, Upper, Lower & Number Rows drills, posture optimization']
      },
      {
        module: 'Module 2: Hindi Font Layouts (Kruti Dev & Mangal)',
        topics: ['Remington Gail & Inscript keyboard mapping, Matra rules, Half letters']
      },
      {
        module: 'Module 3: Speed Drills & Govt Exam Typing Tests',
        topics: ['10-minute real exam simulated tests, error calculation, certificate evaluation']
      }
    ]
  }
];
