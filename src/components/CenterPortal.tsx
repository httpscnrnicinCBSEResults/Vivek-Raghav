import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Award, 
  PlusCircle, 
  Search, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  FileText, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  MapPin,
  Phone,
  Sparkles
} from 'lucide-react';
import { FranchiseCenter, StudentAccount } from '../types';
import { MOCK_CENTERS, MOCK_STUDENTS, ACADEMY_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';

interface CenterPortalProps {
  onTriggerNotification: (message: string, recipient: string, phone: string, type: any) => void;
}

export const CenterPortal: React.FC<CenterPortalProps> = ({ onTriggerNotification }) => {
  const [selectedCenter, setSelectedCenter] = useState<FranchiseCenter>(MOCK_CENTERS[0]);
  const [studentsList, setStudentsList] = useState<StudentAccount[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'roster' | 'admit' | 'fees' | 'certs'>('roster');

  // Form states for new admission
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentFather, setNewStudentFather] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('DFB-ADCA-01');
  const [newStudentBatch, setNewStudentBatch] = useState('09:00 AM - 11:00 AM');
  const [newStudentFee, setNewStudentFee] = useState('11999');
  const [admissionSuccess, setAdmissionSuccess] = useState(false);

  // Form state for fee collection
  const [feeStudentRoll, setFeeStudentRoll] = useState(MOCK_STUDENTS[1]?.rollNo || '');
  const [feeAmount, setFeeAmount] = useState('2500');
  const [feeSuccessMessage, setFeeSuccessMessage] = useState('');

  // Form state for certificate issuance
  const [certStudentRoll, setCertStudentRoll] = useState(MOCK_STUDENTS[0]?.rollNo || '');
  const [certSuccessMessage, setCertSuccessMessage] = useState('');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentPhone) return;

    const rollNo = `2026-${selectedCenter.centerCode.slice(4, 7)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: StudentAccount = {
      rollNo,
      name: newStudentName,
      fatherName: newStudentFather || 'Guardian',
      mobile: newStudentPhone,
      email: `${newStudentName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      courseName: newStudentCourse === 'DFB-ADCA-01' ? 'Advance Diploma in Computer Applications (ADCA)' : 'Tally Prime with GST',
      courseCode: newStudentCourse,
      batchTime: newStudentBatch,
      enrollmentDate: 'Today (Feb 2026)',
      totalFees: Number(newStudentFee) || 11999,
      paidFees: Math.round((Number(newStudentFee) || 11999) * 0.5),
      attendancePercent: 100,
      currentModule: 'Module 1: Fundamentals & Computer Basics',
      assignmentsSubmitted: 0,
      totalAssignments: 20,
      centerName: selectedCenter.centerName
    };

    setStudentsList([newStudent, ...studentsList]);
    setAdmissionSuccess(true);

    // Trigger simulated WhatsApp alert
    onTriggerNotification(
      `✅ Admission Confirmed! Welcome ${newStudentName} to ${selectedCenter.centerName}. Your Roll No is ${rollNo}. Classes start tomorrow at ${newStudentBatch}.`,
      newStudentName,
      newStudentPhone,
      'admission_success'
    );

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setAdmissionSuccess(false);
      setNewStudentName('');
      setNewStudentFather('');
      setNewStudentPhone('');
      setActiveTab('roster');
    }, 2000);
  };

  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    const st = studentsList.find(s => s.rollNo === feeStudentRoll);
    if (!st || !feeAmount) return;

    const collected = Number(feeAmount);
    const updated = studentsList.map(s => {
      if (s.rollNo === feeStudentRoll) {
        return { ...s, paidFees: Math.min(s.totalFees, s.paidFees + collected) };
      }
      return s;
    });

    setStudentsList(updated);
    setFeeSuccessMessage(`Fee payment of ₹${collected} recorded for ${st.name}!`);

    // Trigger automated WhatsApp notification
    onTriggerNotification(
      `🧾 Fee Payment Receipt: ₹${collected} received successfully for ${st.name} (${st.courseCode}). Remaining balance: ₹${Math.max(0, st.totalFees - (st.paidFees + collected))}. Thank you! - Dharam Futurebit Academy.`,
      st.name,
      st.mobile,
      'fee_receipt'
    );

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => setFeeSuccessMessage(''), 3000);
  };

  const handleIssueCertRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const st = studentsList.find(s => s.rollNo === certStudentRoll);
    if (!st) return;

    const certNo = `DFBCA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated = studentsList.map(s => {
      if (s.rollNo === certStudentRoll) {
        return { ...s, certificateNo: certNo, currentModule: 'Certified & Passed' };
      }
      return s;
    });

    setStudentsList(updated);
    setCertSuccessMessage(`Certificate #${certNo} approved & issued for ${st.name}!`);

    // Trigger WhatsApp notification
    onTriggerNotification(
      `🎉 Congratulations ${st.name}! Your official ISO 9001:2015 Certificate (${certNo}) has been issued with Distinction. Verify online at Dharam Futurebit Academy.`,
      st.name,
      st.mobile,
      'certificate_issued'
    );

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => setCertSuccessMessage(''), 3500);
  };

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="center-portal-section" className="py-12 bg-[#f8fafd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef7e0] text-[#b06000] text-xs font-semibold">
            <Building2 className="w-4 h-4 text-[#f29900]" />
            <span>Authorized Franchise & Branch Management System</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Center Administrator Portal
          </h2>

          <p className="text-sm text-[#5f6368]">
            Manage student registrations, collect fees with instant automated WhatsApp receipts, 
            approve exam batches, and issue ISO certificates.
          </p>
        </div>

        {/* Center Selector Bar */}
        <div className="bg-white rounded-2xl border border-[#dadce0] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#80868b] block font-medium">Currently Managing Branch:</span>
              <div className="font-bold text-sm sm:text-base text-[#202124]">{selectedCenter.centerName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5f6368] font-medium hidden sm:inline">Switch Branch:</span>
            <select
              value={selectedCenter.centerCode}
              onChange={(e) => {
                const c = MOCK_CENTERS.find(center => center.centerCode === e.target.value);
                if (c) setSelectedCenter(c);
              }}
              className="px-3 py-1.5 rounded-xl border border-[#dadce0] bg-[#f8fafd] text-xs font-semibold text-[#202124] focus:outline-none focus:border-[#1a73e8]"
            >
              {MOCK_CENTERS.map(c => (
                <option key={c.centerCode} value={c.centerCode}>
                  {c.centerName} ({c.district})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs">
            <span className="text-xs text-[#5f6368] block">Active Students</span>
            <div className="font-display font-extrabold text-2xl text-[#1a73e8] mt-1">
              {selectedCenter.activeStudents + studentsList.length - MOCK_STUDENTS.length}
            </div>
            <span className="text-[10px] text-[#137333] font-semibold">In current semester</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs">
            <span className="text-xs text-[#5f6368] block">Director Incharge</span>
            <div className="font-bold text-base text-[#202124] mt-1 truncate">
              {selectedCenter.directorName}
            </div>
            <span className="text-[10px] text-[#5f6368]">{selectedCenter.phone}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs">
            <span className="text-xs text-[#5f6368] block">Center Code & ISO</span>
            <div className="font-mono font-bold text-base text-[#c5221f] mt-1">
              {selectedCenter.centerCode}
            </div>
            <span className="text-[10px] text-[#137333] font-semibold">Authorized Active</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs">
            <span className="text-xs text-[#5f6368] block">WhatsApp Alerts</span>
            <div className="font-bold text-base text-[#0f9d58] mt-1 flex items-center gap-1">
              <MessageCircle className="w-4 h-4 fill-[#0f9d58] text-white" />
              <span>Automated</span>
            </div>
            <span className="text-[10px] text-[#5f6368]">+91 9354358781 Gateway</span>
          </div>
        </div>

        {/* Center Portal Sub-Navigation */}
        <div className="flex items-center gap-2 border-b border-[#dadce0] pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'roster'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#f1f3f4]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Roster ({studentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('admit')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'admit'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#f1f3f4]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Direct Admission Form</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'fees'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#f1f3f4]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Record Fee Collection</span>
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'certs'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#f1f3f4]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Issue Certificates</span>
          </button>
        </div>

        {/* Tab 1: Student Roster */}
        {activeTab === 'roster' && (
          <div className="bg-white rounded-3xl border border-[#dadce0] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="font-bold text-base sm:text-lg text-[#202124]">
                Enrolled Students at {selectedCenter.centerName}
              </h3>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search student or roll no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-[#dadce0] focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafd] text-[#5f6368] font-semibold border-b border-[#dadce0]">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Batch Time</th>
                    <th className="p-3">Fee Status</th>
                    <th className="p-3">Certificate</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeeeee]">
                  {filteredStudents.map((st) => (
                    <tr key={st.rollNo} className="hover:bg-[#f8f9fa]">
                      <td className="p-3 font-mono font-bold text-[#1a73e8]">{st.rollNo}</td>
                      <td className="p-3">
                        <div className="font-bold text-[#202124]">{st.name}</div>
                        <div className="text-[10px] text-[#80868b]">{st.mobile}</div>
                      </td>
                      <td className="p-3 font-medium text-[#3c4043]">{st.courseCode}</td>
                      <td className="p-3 text-[#5f6368]">{st.batchTime}</td>
                      <td className="p-3">
                        {st.paidFees >= st.totalFees ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] font-bold text-[10px]">
                            PAID (₹{st.paidFees})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-[#fce8e6] text-[#c5221f] font-bold text-[10px]">
                            DUE: ₹{st.totalFees - st.paidFees}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {st.certificateNo ? (
                          <span className="font-mono text-[#137333] font-bold text-[11px]">
                            {st.certificateNo}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#80868b]">In Progress</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setFeeStudentRoll(st.rollNo);
                            setActiveTab('fees');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#e8f0fe] text-[#1967d2] hover:bg-[#d2e3fc] font-semibold text-[11px]"
                        >
                          + Fee
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Direct Admission Form */}
        {activeTab === 'admit' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-[#eeeeee] pb-3">
              <h3 className="font-display font-bold text-xl text-[#202124]">
                Register New Student (Branch Admission)
              </h3>
              <p className="text-xs text-[#5f6368]">
                Enrolls student into Dharam Futurebit database & sends instant WhatsApp welcome message
              </p>
            </div>

            {admissionSuccess && (
              <div className="p-4 bg-[#e6f4ea] text-[#137333] rounded-2xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Student registered successfully! Roll Number generated & WhatsApp dispatched.</span>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Yadav"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Father's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sh. Ramesh Yadav"
                    value={newStudentFather}
                    onChange={(e) => setNewStudentFather(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">WhatsApp / Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98XXXXXXXX"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Select Course *</label>
                  <select
                    value={newStudentCourse}
                    onChange={(e) => setNewStudentCourse(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8] bg-white"
                  >
                    <option value="DFB-ADCA-01">ADCA (1 Year Master Diploma) - ₹11,999</option>
                    <option value="DFB-DCA-02">DCA (6 Months Diploma) - ₹6,999</option>
                    <option value="DFB-TAL-03">Tally Prime with GST - ₹4,999</option>
                    <option value="DFB-PY-04">Python & AI Programming - ₹7,499</option>
                    <option value="DFB-CCC-06">CCC NIELIT Certification - ₹3,499</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Batch Schedule</label>
                  <select
                    value={newStudentBatch}
                    onChange={(e) => setNewStudentBatch(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8] bg-white"
                  >
                    <option>07:00 AM - 09:00 AM (Early Morning)</option>
                    <option>09:00 AM - 11:00 AM (Morning Batch)</option>
                    <option>11:00 AM - 01:00 PM (Noon Batch)</option>
                    <option>04:00 PM - 06:00 PM (Evening Batch)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Total Fee Amount (₹)</label>
                  <input
                    type="number"
                    value={newStudentFee}
                    onChange={(e) => setNewStudentFee(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Admission & Send WhatsApp Confirmation</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Record Fee Collection */}
        {activeTab === 'fees' && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-md space-y-5">
            <h3 className="font-display font-bold text-xl text-[#202124]">
              Record Fee Collection & Send Receipt
            </h3>

            {feeSuccessMessage && (
              <div className="p-4 bg-[#e6f4ea] text-[#137333] rounded-2xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{feeSuccessMessage} Automated WhatsApp receipt dispatched.</span>
              </div>
            )}

            <form onSubmit={handleCollectFee} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Select Student</label>
                <select
                  value={feeStudentRoll}
                  onChange={(e) => setFeeStudentRoll(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm bg-white"
                >
                  {studentsList.map(s => (
                    <option key={s.rollNo} value={s.rollNo}>
                      {s.name} ({s.rollNo}) - Paid: ₹{s.paidFees} / Total: ₹{s.totalFees}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Amount Collected (₹)</label>
                <input
                  type="number"
                  required
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-base font-bold text-[#202124]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0f9d58] hover:bg-[#0b8043] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Record Payment & Trigger WhatsApp Alert</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Issue Certificates */}
        {activeTab === 'certs' && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-md space-y-5">
            <h3 className="font-display font-bold text-xl text-[#202124]">
              Approve & Issue ISO Certificate
            </h3>

            {certSuccessMessage && (
              <div className="p-4 bg-[#e6f4ea] text-[#137333] rounded-2xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{certSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleIssueCertRequest} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Select Completed Student</label>
                <select
                  value={certStudentRoll}
                  onChange={(e) => setCertStudentRoll(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#dadce0] text-sm bg-white"
                >
                  {studentsList.map(s => (
                    <option key={s.rollNo} value={s.rollNo}>
                      {s.name} ({s.rollNo}) - {s.courseCode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-[#f8fafd] rounded-2xl border border-[#dadce0] space-y-1 text-xs">
                <div><strong>Certification Standard:</strong> ISO 9001:2015 Approved</div>
                <div><strong>Exam Evaluation:</strong> Theory (80%) + Practical (20%) + Viva</div>
                <div><strong>Grading Criteria:</strong> A+ (Above 85%), A (70-84%), B+ (60-69%)</div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Generate Official Certificate & Notify Student</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
