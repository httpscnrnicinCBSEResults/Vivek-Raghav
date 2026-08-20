import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Award, 
  Printer, 
  Download, 
  Share2, 
  QrCode, 
  Building2, 
  FileCheck, 
  User, 
  Calendar, 
  AlertCircle,
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CertificateRecord } from '../types';
import { MOCK_CERTIFICATES, ACADEMY_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';

interface CertificateVerificationProps {
  initialCertNo?: string;
}

export const CertificateVerification: React.FC<CertificateVerificationProps> = ({
  initialCertNo = ''
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialCertNo);
  const [activeCert, setActiveCert] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (initialCertNo && initialCertNo.trim()) {
      setSearchInput(initialCertNo);
      handleSearch(initialCertNo);
    }
  }, [initialCertNo]);

  const handleSearch = (queryToSearch?: string) => {
    const query = (queryToSearch || searchInput).trim().toUpperCase();
    if (!query) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      // Look up in database by certNo, rollNo, or studentName
      const found = MOCK_CERTIFICATES.find(
        c => c.certificateNo.toUpperCase() === query ||
             c.rollNo.toUpperCase() === query ||
             c.studentName.toUpperCase() === query
      );

      if (found) {
        setActiveCert(found);
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } else {
        setActiveCert(null);
      }
      setIsSearching(false);
    }, 350);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!activeCert) return;
    const shareText = `🎓 Verified Official Certificate!\nStudent: ${activeCert.studentName}\nCourse: ${activeCert.courseName}\nCert No: ${activeCert.certificateNo}\nGrade: ${activeCert.overallGrade} (${activeCert.percentage}%)\nAcademy: ${ACADEMY_INFO.name}, Bhagola Palwal (Haryana)\nVerified Online via ISO 9001:2015 Portal.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <section id="verify-section" className="py-12 bg-gradient-to-b from-[#f8fafd] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Government & Employer Online Verification Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Student Certificate Verification System
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368]">
            Employers, government recruiters, and students can instantly authenticate diplomas, 
            grades, and marksheets issued by <strong className="text-[#202124]">{ACADEMY_INFO.name}</strong>.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-[#1a73e8] p-2 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <div className="pl-3 text-[#1a73e8]">
                <Search className="w-5 h-5" />
              </div>

              <input
                type="text"
                id="cert-search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Certificate No (e.g. DFBCA-2026-1089) or Roll No..."
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-[#202124] placeholder-[#80868b] uppercase font-mono font-medium"
              />

              <button
                id="btn-verify-search-submit"
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="px-6 py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {isSearching ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Display Area */}
        {activeCert ? (
          <div className="mt-10 max-w-4xl mx-auto space-y-6">
            
            {/* Status Alert Banner */}
            <div className="bg-[#e6f4ea] border border-[#ceead6] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#137333] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#137333] flex items-center gap-2">
                    <span>100% Genuine & Verified Certificate</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#137333] text-white text-[10px]">ACTIVE</span>
                  </div>
                  <div className="text-xs text-[#1e8e3e]">
                    Record authenticated in Dharam Futurebit Central Repository on {activeCert.issueDate}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-print-certificate"
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#dadce0] text-xs font-semibold text-[#3c4043] hover:bg-[#f1f3f4] flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#1a73e8]" />
                  <span>Print Certificate</span>
                </button>

                <button
                  id="btn-share-whatsapp"
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 rounded-xl bg-[#25d366] text-white text-xs font-semibold hover:bg-[#1eb954] flex items-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Verification</span>
                </button>
              </div>
            </div>

            {/* Printable Official Certificate Sheet */}
            <div 
              id="printable-certificate"
              className="bg-white rounded-3xl border-8 border-double border-[#b08535] p-6 sm:p-10 shadow-xl relative overflow-hidden text-[#202124]"
            >
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="font-display font-black text-8xl md:text-9xl uppercase tracking-widest text-[#1a73e8]">
                  FUTUREBIT
                </span>
              </div>

              {/* Certificate Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#b08535]"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#b08535]"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#b08535]"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#b08535]"></div>

              {/* Header */}
              <div className="text-center space-y-2 border-b-2 border-[#b08535]/30 pb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#b08535]">
                    Govt. Reg. No: {ACADEMY_INFO.regNumber} • {ACADEMY_INFO.isoNumber}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-xs">
                    DF
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1a73e8] tracking-tight uppercase">
                      {ACADEMY_INFO.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#5f6368] tracking-wider uppercase">
                      An Autonomous Computer Education & Vocational Skill Training Institute
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#5f6368]">
                  Main Campus: {ACADEMY_INFO.address}
                </div>
              </div>

              {/* Certificate Title */}
              <div className="my-6 text-center space-y-1">
                <div className="inline-block px-6 py-1.5 rounded-full bg-[#fef7e0] border border-[#b08535] text-[#845607] font-display font-bold text-sm sm:text-base uppercase tracking-widest">
                  Statement of Marks & Diploma Certificate
                </div>
                <div className="text-xs text-[#5f6368] pt-1">
                  This is to certify that the candidate whose particulars are given below has successfully completed the prescribed course of study.
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#fbfbfa] border border-[#e8eaed] text-xs sm:text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="text-[#80868b] block text-xs">Candidate Name:</span>
                    <span className="font-bold text-[#202124] text-base">{activeCert.studentName}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Father's Name:</span>
                    <span className="font-semibold text-[#202124]">{activeCert.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Course Name:</span>
                    <span className="font-bold text-[#1a73e8]">{activeCert.courseName}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Duration & Session:</span>
                    <span className="font-semibold text-[#202124]">{activeCert.duration} ({activeCert.session})</span>
                  </div>
                </div>

                <div className="space-y-2 sm:border-l sm:border-[#e8eaed] sm:pl-6">
                  <div>
                    <span className="text-[#80868b] block text-xs">Certificate Number:</span>
                    <span className="font-mono font-bold text-[#c5221f] text-sm">{activeCert.certificateNo}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Student Roll Number:</span>
                    <span className="font-mono font-semibold text-[#202124]">{activeCert.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Study / Exam Center:</span>
                    <span className="font-semibold text-[#202124]">{activeCert.centerName}</span>
                  </div>
                  <div>
                    <span className="text-[#80868b] block text-xs">Date of Issue:</span>
                    <span className="font-semibold text-[#202124]">{activeCert.issueDate}</span>
                  </div>
                </div>
              </div>

              {/* Statement of Marks Table */}
              <div className="mt-6">
                <div className="font-semibold text-xs text-[#3c4043] uppercase tracking-wider mb-2">
                  Academic Performance & Marks Statement:
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#dadce0]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#f1f3f4] text-[#202124] font-bold border-b border-[#dadce0]">
                      <tr>
                        <th className="p-2.5 sm:p-3">Paper / Subject Name</th>
                        <th className="p-2.5 sm:p-3 text-center">Max Marks</th>
                        <th className="p-2.5 sm:p-3 text-center">Pass Marks</th>
                        <th className="p-2.5 sm:p-3 text-center">Obtained Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eeeeee]">
                      {activeCert.marksBreakdown.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[#f8f9fa]">
                          <td className="p-2.5 sm:p-3 font-medium text-[#202124]">
                            {idx + 1}. {item.subject}
                          </td>
                          <td className="p-2.5 sm:p-3 text-center text-[#5f6368]">{item.maxMarks}</td>
                          <td className="p-2.5 sm:p-3 text-center text-[#5f6368]">40</td>
                          <td className="p-2.5 sm:p-3 text-center font-bold text-[#1a73e8]">{item.obtainedMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#f8fafd] font-bold border-t-2 border-[#dadce0] text-[#202124]">
                      <tr>
                        <td className="p-2.5 sm:p-3">Total Aggregate:</td>
                        <td className="p-2.5 sm:p-3 text-center">
                          {activeCert.marksBreakdown.reduce((acc, m) => acc + m.maxMarks, 0)}
                        </td>
                        <td className="p-2.5 sm:p-3 text-center">-</td>
                        <td className="p-2.5 sm:p-3 text-center text-[#137333]">
                          {activeCert.marksBreakdown.reduce((acc, m) => acc + m.obtainedMarks, 0)} ({activeCert.percentage}%)
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Grade & Verification Stamp Row */}
              <div className="mt-6 pt-4 border-t border-[#e8eaed] grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center">
                
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                  <div className="w-16 h-16 bg-white border border-[#202124] p-1 flex items-center justify-center shadow-xs">
                    <QrCode className="w-14 h-14 text-[#202124]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#5f6368] mt-1 font-semibold">
                    Scan to verify: {activeCert.certificateNo}
                  </span>
                </div>

                {/* Grade Badge */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#fef7e0] border-2 border-[#b08535] flex flex-col items-center justify-center text-[#845607] shadow-inner">
                    <span className="font-black text-xl font-display leading-none">{activeCert.overallGrade}</span>
                    <span className="text-[9px] font-bold uppercase">GRADE</span>
                  </div>
                  <span className="text-xs font-bold text-[#137333] mt-1">First Division with Distinction</span>
                </div>

                {/* Authority Signatures */}
                <div className="space-y-4 text-right sm:text-center">
                  <div className="border-t border-[#202124] pt-1 inline-block min-w-[140px]">
                    <div className="font-display font-extrabold text-xs text-[#202124]">Vivek Raghav</div>
                    <div className="text-[10px] text-[#5f6368]">Director / Examination Controller</div>
                    <div className="text-[9px] text-[#80868b]">{ACADEMY_INFO.name}</div>
                  </div>
                </div>

              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-3 border-t border-[#eeeeee] flex flex-wrap items-center justify-between text-[10px] text-[#80868b]">
                <span>Official Online Record Valid Across All Govt. & Private Sectors</span>
                <span>Verification URL: dfbacademy.edu.in/verify/{activeCert.certificateNo}</span>
              </div>

            </div>

          </div>
        ) : (
          hasSearched && (
            <div className="mt-8 max-w-md mx-auto p-6 rounded-2xl bg-white border border-[#ea4335]/30 text-center space-y-3 shadow-xs">
              <AlertCircle className="w-10 h-10 text-[#ea4335] mx-auto" />
              <h3 className="font-bold text-lg text-[#202124]">No Certificate Found</h3>
              <p className="text-xs text-[#5f6368]">
                We could not find an issued record for the entered details. Please check the Certificate Number or Roll Number and try again.
              </p>
            </div>
          )
        )}

      </div>
    </section>
  );
};
