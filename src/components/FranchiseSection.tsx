import React, { useState } from 'react';
import { 
  Award, 
  Building2, 
  TrendingUp, 
  Calculator, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MOCK_CENTERS, ACADEMY_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';

export const FranchiseSection: React.FC = () => {
  // Calculator States
  const [computersCount, setComputersCount] = useState<number>(15);
  const [studentsPerComputer, setStudentsPerComputer] = useState<number>(3); // 3 shifts
  const [avgFeePerMonth, setAvgFeePerMonth] = useState<number>(1000);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [applicantState, setApplicantState] = useState('Haryana');
  const [proposedLocation, setProposedLocation] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  // Calculations
  const totalMonthlyStudents = computersCount * studentsPerComputer;
  const grossMonthlyRevenue = totalMonthlyStudents * avgFeePerMonth;
  const estimatedElectricityAndRent = 15000 + (computersCount * 300);
  const estimatedFacultySalary = 18000;
  const estimatedNetProfit = Math.max(0, grossMonthlyRevenue - estimatedElectricityAndRent - estimatedFacultySalary);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    setHasApplied(true);
  };

  const franchisePerks = [
    { title: 'ISO 9001:2015 Brand Authorization', desc: 'Legally authorized certificate issuance recognized by govt. and private recruiters.' },
    { title: 'Online Student & Verification Portal', desc: 'Your students get instant roll numbers, online marksheet verification and QR codes.' },
    { title: 'Standardized Study Material & Tests', desc: 'Pre-designed modern syllabi, practical lab assignments, and 1000+ online mock MCQs.' },
    { title: 'Automated WhatsApp Gateway Access', desc: 'Send automatic SMS/WhatsApp alerts for fee receipts, exam notices and admissions.' },
    { title: 'Marketing Flex & Branding Support', desc: 'High-resolution flex banners, pamphlets, admission canopy designs, and digital promotion.' },
    { title: 'Zero Hidden Royalty Hassles', desc: 'Transparent low-cost annual affiliation renewal with full student registration autonomy.' }
  ];

  return (
    <section id="franchise-section" className="py-14 bg-gradient-to-b from-[#f8fafd] via-white to-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fef7e0] text-[#b06000] text-xs font-semibold">
            <Award className="w-4 h-4 text-[#f29900]" />
            <span>Business Partnership & Center Affiliation 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Start a Dharam Futurebit Center in Your City / Village
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368]">
            Partner with Haryana's trusted computer education brand. Establish a high-earning, 
            ISO 9001:2015 certified computer training academy with minimal investment and comprehensive backend portal support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {franchisePerks.map((perk, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#dadce0] p-6 shadow-xs hover:border-[#1a73e8] transition-colors space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-display font-bold text-base text-[#202124]">{perk.title}</h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Franchise Profit Calculator */}
        <div className="bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-10 shadow-md mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1a73e8]">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE ROI ESTIMATOR</span>
            </div>
            <h3 className="text-2xl font-extrabold font-display text-[#202124]">
              Franchise Center Monthly Revenue & Profit Calculator
            </h3>
            <p className="text-xs sm:text-sm text-[#5f6368]">
              Slide parameters to see how much your center can earn every month based on lab capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Sliders Area */}
            <div className="space-y-6 bg-[#f8fafd] p-6 rounded-2xl border border-[#e8eaed]">
              
              {/* Slider 1: Computers */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3c4043] mb-2">
                  <span>Number of Lab Computers / Desktops:</span>
                  <span className="font-bold text-sm text-[#1a73e8]">{computersCount} Computers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={computersCount}
                  onChange={(e) => setComputersCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#dadce0] rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
                />
                <div className="flex justify-between text-[10px] text-[#80868b] mt-1">
                  <span>5 PCs (Small Center)</span>
                  <span>25 PCs (Medium)</span>
                  <span>50 PCs (Hub)</span>
                </div>
              </div>

              {/* Slider 2: Shifts / Batches per day */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3c4043] mb-2">
                  <span>Daily Batches / Shifts per Computer:</span>
                  <span className="font-bold text-sm text-[#1a73e8]">{studentsPerComputer} Batches</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={studentsPerComputer}
                  onChange={(e) => setStudentsPerComputer(Number(e.target.value))}
                  className="w-full h-2 bg-[#dadce0] rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
                />
                <div className="flex justify-between text-[10px] text-[#80868b] mt-1">
                  <span>1 Shift</span>
                  <span>3 Shifts (Standard)</span>
                  <span>6 Shifts (Full Day)</span>
                </div>
              </div>

              {/* Slider 3: Average Monthly Fee */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3c4043] mb-2">
                  <span>Average Monthly Course Fee per Student (₹):</span>
                  <span className="font-bold text-sm text-[#137333]">₹{avgFeePerMonth} / Month</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={avgFeePerMonth}
                  onChange={(e) => setAvgFeePerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-[#dadce0] rounded-lg appearance-none cursor-pointer accent-[#137333]"
                />
                <div className="flex justify-between text-[10px] text-[#80868b] mt-1">
                  <span>₹500 (Basic)</span>
                  <span>₹1,500 (Diploma)</span>
                  <span>₹3,000 (Coding/AI)</span>
                </div>
              </div>

            </div>

            {/* Profit Overview Card */}
            <div className="bg-gradient-to-br from-[#1a73e8] to-[#1557b0] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/80">Monthly Enrollment Base</span>
                  <div className="font-display font-extrabold text-3xl text-white">
                    {totalMonthlyStudents} Students
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Gross Monthly Collection:</span>
                  <span className="font-bold text-base">₹{grossMonthlyRevenue.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Est. Rent & Electricity:</span>
                  <span>- ₹{estimatedElectricityAndRent.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Est. Faculty & Staff:</span>
                  <span>- ₹{estimatedFacultySalary.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-white/20 flex justify-between items-baseline">
                  <span className="font-bold text-sm sm:text-base">Estimated Net Monthly Profit:</span>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#fbbc04]">
                    ₹{estimatedNetProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 text-[11px] text-white/90">
                ✨ Includes zero royalty on course syllabi + unlimited student registration portal access.
              </div>
            </div>

          </div>
        </div>

        {/* Existing Franchise Centers Network */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="font-display font-bold text-2xl text-[#202124]">
              Our Authorized Center Network (Haryana & NCR)
            </h3>
            <p className="text-xs sm:text-sm text-[#5f6368]">
              Join our fast-growing network of authorized computer training institutes across Palwal and neighboring districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_CENTERS.map((c) => (
              <div
                key={c.centerCode}
                className="bg-white rounded-2xl border border-[#dadce0] p-5 shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1a73e8]">{c.centerCode}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[10px] font-bold">
                    {c.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[#202124]">{c.centerName}</h4>
                  <div className="flex items-center gap-1 text-xs text-[#5f6368] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#ea4335] shrink-0" />
                    <span>{c.address}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f1f3f4] text-xs flex items-center justify-between text-[#5f6368]">
                  <span>Director: <strong className="text-[#202124]">{c.directorName}</strong></span>
                  <a href={`tel:${c.phone}`} className="text-[#1a73e8] font-bold hover:underline">
                    {c.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply for Franchise Online Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-10 shadow-lg space-y-6">
          <div className="border-b border-[#eeeeee] pb-4 text-center">
            <h3 className="font-display font-bold text-2xl text-[#202124]">
              Apply for Center Authorization (2026 Batch)
            </h3>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
              Fill the basic details below to receive the official Franchise Prospectus and Agreement Kit.
            </p>
          </div>

          {hasApplied ? (
            <div className="p-6 bg-[#e6f4ea] text-[#137333] rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#137333] mx-auto" />
              <h4 className="font-bold text-lg">Application Submitted Successfully!</h4>
              <p className="text-xs">
                Our Franchise Director (Vivek Raghav, +91 9625118781) will contact you within 2 hours. 
                Franchise Kit has been queued for your WhatsApp (+91 9354358781).
              </p>
              <button
                onClick={() => setHasApplied(false)}
                className="px-4 py-2 rounded-xl bg-[#137333] text-white text-xs font-semibold"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Director / Applicant Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vivek Raghav"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">WhatsApp / Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 9625118781"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">City / Village / Tehsil *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Palwal / Hodal / Hathin / Sohna"
                    value={applicantCity}
                    onChange={(e) => setApplicantCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">State</label>
                  <select
                    value={applicantState}
                    onChange={(e) => setApplicantState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm bg-white"
                  >
                    <option value="Haryana">Haryana</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Proposed Center Address & Space Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Near Main Market, 500 sq.ft building, 10 computers available..."
                  value={proposedLocation}
                  onChange={(e) => setProposedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Center Affiliation Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
