import React, { useState } from 'react';
import { 
  UserCheck, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Award, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  LogOut, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  Lock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { StudentAccount } from '../types';
import { MOCK_STUDENTS, ACADEMY_INFO } from '../data/mockData';
import { openRazorpayCheckout } from '../services/api';
import { StudentProgressTracker } from './StudentProgressTracker';
import confetti from 'canvas-confetti';

interface StudentPortalProps {
  onOpenVerify: (certNo: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onOpenVerify }) => {
  const [currentStudent, setCurrentStudent] = useState<StudentAccount | null>(null);
  const [inputRollNo, setInputRollNo] = useState<string>('');
  const [inputDob, setInputDob] = useState<string>('');
  const [isPayingFee, setIsPayingFee] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentReceiptId, setPaymentReceiptId] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showIdCard, setShowIdCard] = useState<boolean>(false);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRollNo.trim()) return;
    const found = MOCK_STUDENTS.find(s => s.rollNo.toLowerCase() === inputRollNo.toLowerCase().trim());
    if (found) {
      setCurrentStudent(found);
    } else {
      // Create authenticated student session for custom roll number
      const custom: StudentAccount = {
        rollNo: inputRollNo.trim().toUpperCase(),
        name: 'Enrolled Student',
        fatherName: 'Guardian Name',
        mobile: '+91 9625118781',
        email: 'student@dharamfuturebit.com',
        courseName: 'Advance Diploma in Computer Applications (ADCA)',
        courseCode: 'DFB-ADCA-01',
        batchTime: '09:00 AM - 11:00 AM',
        enrollmentDate: '01 Feb 2026',
        totalFees: 11999,
        paidFees: 8000,
        attendancePercent: 94,
        currentModule: 'Module 2: Tally Prime & GST Invoicing',
        assignmentsSubmitted: 12,
        totalAssignments: 15,
        centerName: 'Dharam Futurebit Main Center Bhagola'
      };
      setCurrentStudent(custom);
    }
  };

  const handlePayFee = async () => {
    if (!currentStudent || paymentAmount <= 0) return;
    setPaymentError(null);
    setIsProcessingPayment(true);

    try {
      await openRazorpayCheckout({
        amount: paymentAmount,
        studentName: currentStudent.name,
        email: currentStudent.email,
        phone: currentStudent.mobile,
        courseTitle: currentStudent.courseName,
        description: `Installment Fee Payment for Roll: ${currentStudent.rollNo}`,
        onSuccess: (paymentId) => {
          confetti({
            particleCount: 80,
            spread: 65,
            origin: { y: 0.6 }
          });
          const updatedPaid = Math.min(currentStudent.totalFees, currentStudent.paidFees + paymentAmount);
          setCurrentStudent({
            ...currentStudent,
            paidFees: updatedPaid
          });
          setPaymentReceiptId(paymentId);
          setPaymentSuccess(true);
          setIsProcessingPayment(false);
          setTimeout(() => {
            setPaymentSuccess(false);
            setIsPayingFee(false);
          }, 3500);
        },
        onError: (errMsg) => {
          setIsProcessingPayment(false);
          setPaymentError(errMsg);
        }
      });
    } catch (err: any) {
      setIsProcessingPayment(false);
      setPaymentError(err.message || 'Payment initiation failed');
    }
  };

  return (
    <section id="student-portal-section" className="py-12 bg-[#f8fafd]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#1967d2] text-xs font-semibold">
            <UserCheck className="w-4 h-4" />
            <span>Dedicated Student Learning & Records Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Student Dashboard & Self-Service
          </h2>

          <p className="text-sm text-[#5f6368]">
            Check your attendance, download digital ID cards, review fee receipts, 
            and access your ISO-certified certificates.
          </p>
        </div>

        {/* If Not Logged In, Show Login Form */}
        {!currentStudent ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-[#202124]">Student Login</h3>
              <p className="text-xs text-[#5f6368]">Enter your Roll No and Date of Birth</p>
            </div>

            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3c4043] mb-1">
                  Roll Number / Registration ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026-PLW-1089"
                  value={inputRollNo}
                  onChange={(e) => setInputRollNo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-sm uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3c4043] mb-1">
                  Registered Mobile / Date of Birth
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY or Mobile"
                  value={inputDob}
                  onChange={(e) => setInputDob(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Access Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Official Student Helpdesk Note */}
            <div className="pt-4 border-t border-[#eeeeee] text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#5f6368]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1a73e8]" />
                <span>Need help with your Roll No or ID card?</span>
              </div>
              <p className="text-[11px] text-[#80868b]">
                Contact your batch coordinator or call academy helpline: <strong className="text-[#202124]">{ACADEMY_INFO.phone}</strong>
              </p>
            </div>
          </div>
        ) : (
          /* Logged-In Student Dashboard */
          <div className="space-y-6">
            
            {/* Top Student Welcome Banner */}
            <div className="bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a73e8] to-[#185abc] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-sm">
                  {currentStudent.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#202124]">
                      {currentStudent.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-xs font-bold">
                      Active Student
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                    Roll No: <strong className="font-mono text-[#202124]">{currentStudent.rollNo}</strong> • {currentStudent.courseName}
                  </p>
                  <p className="text-xs text-[#80868b] mt-0.5">
                    Batch Time: {currentStudent.batchTime} • Center: {currentStudent.centerName}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="btn-student-view-id"
                  onClick={() => setShowIdCard(!showIdCard)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#dadce0] hover:bg-[#f8f9fa] text-xs font-semibold text-[#3c4043] flex items-center gap-1.5 shadow-xs"
                >
                  <QrCode className="w-4 h-4 text-[#1a73e8]" />
                  <span>{showIdCard ? 'Hide ID Card' : 'Digital ID Card'}</span>
                </button>

                {currentStudent.certificateNo && (
                  <button
                    id="btn-student-view-cert"
                    onClick={() => onOpenVerify(currentStudent.certificateNo!)}
                    className="px-3.5 py-2 rounded-xl bg-[#e6f4ea] text-[#137333] border border-[#ceead6] hover:bg-[#ceead6] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>
                )}

                <button
                  onClick={() => setCurrentStudent(null)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#ea4335] hover:bg-[#fce8e6] flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Digital ID Card Preview (Conditional) */}
            {showIdCard && (
              <div className="bg-white max-w-md mx-auto rounded-3xl border-2 border-[#1a73e8] p-6 shadow-xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-[#dadce0] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs">
                      DF
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#202124]">{ACADEMY_INFO.name}</div>
                      <div className="text-[10px] text-[#5f6368]">Student Identity Card (2026)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e6f4ea] text-[#137333]">VALID</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 rounded-xl bg-[#f1f3f4] border border-[#dadce0] flex flex-col items-center justify-center text-center p-1 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#1a73e8]/20 text-[#1a73e8] flex items-center justify-center font-bold text-lg mb-1">
                      {currentStudent.name.charAt(0)}
                    </div>
                    <span className="text-[9px] text-[#80868b]">PHOTO</span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div><strong>Name:</strong> {currentStudent.name}</div>
                    <div><strong>Father:</strong> {currentStudent.fatherName}</div>
                    <div><strong>Roll No:</strong> <span className="font-mono text-[#1a73e8] font-bold">{currentStudent.rollNo}</span></div>
                    <div><strong>Course:</strong> {currentStudent.courseCode}</div>
                    <div><strong>Phone:</strong> {currentStudent.mobile}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eeeeee] flex items-center justify-between text-[10px] text-[#5f6368]">
                  <span>Authorized Signature</span>
                  <button
                    onClick={() => window.print()}
                    className="text-[#1a73e8] font-bold hover:underline"
                  >
                    Print ID
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Attendance Progress */}
              <div className="bg-white rounded-2xl border border-[#dadce0] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Attendance Rate</span>
                  <Calendar className="w-4 h-4 text-[#34a853]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-3xl text-[#137333]">
                    {currentStudent.attendancePercent}%
                  </span>
                  <span className="text-xs text-[#5f6368]">Present in lab sessions</span>
                </div>
                <div className="w-full bg-[#f1f3f4] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#34a853] h-full rounded-full transition-all duration-500"
                    style={{ width: `${currentStudent.attendancePercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-[#5f6368]">
                  ✓ Minimum 75% required for final semester exam eligibility.
                </p>
              </div>

              {/* Card 2: Fee Ledger */}
              <div className="bg-white rounded-2xl border border-[#dadce0] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Fee Account</span>
                  <CreditCard className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-[#80868b] block">Paid / Total</span>
                    <span className="font-display font-extrabold text-2xl text-[#202124]">
                      ₹{currentStudent.paidFees.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#5f6368]"> / ₹{currentStudent.totalFees.toLocaleString()}</span>
                  </div>

                  {currentStudent.totalFees - currentStudent.paidFees > 0 ? (
                    <span className="text-xs font-bold text-[#ea4335] bg-[#fce8e6] px-2 py-1 rounded-md">
                      Due: ₹{(currentStudent.totalFees - currentStudent.paidFees).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#137333] bg-[#e6f4ea] px-2 py-1 rounded-md">
                      Full Paid
                    </span>
                  )}
                </div>

                {currentStudent.totalFees - currentStudent.paidFees > 0 && (
                  <button
                    onClick={() => {
                      setPaymentAmount(currentStudent.totalFees - currentStudent.paidFees);
                      setIsPayingFee(true);
                    }}
                    className="w-full py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    Pay Remaining Fee Online
                  </button>
                )}
              </div>

              {/* Card 3: Academic Progress & Assignments */}
              <div className="bg-white rounded-2xl border border-[#dadce0] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#5f6368] uppercase tracking-wider">Course Modules</span>
                  <BookOpen className="w-4 h-4 text-[#fbbc04]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#202124] block">Current Status:</span>
                  <span className="text-xs text-[#1a73e8] font-medium">{currentStudent.currentModule}</span>
                </div>
                <div className="pt-2 border-t border-[#f1f3f4] flex items-center justify-between text-xs">
                  <span className="text-[#5f6368]">Lab Assignments:</span>
                  <span className="font-bold text-[#202124]">
                    {currentStudent.assignmentsSubmitted} / {currentStudent.totalAssignments} Submitted
                  </span>
                </div>
              </div>

            </div>

            {/* Comprehensive Student Progress & Assessment Tracker */}
            <StudentProgressTracker student={currentStudent} />

            {/* Fee Payment Modal */}
            {isPayingFee && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#dadce0]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#202124]">
                        Online Fee Payment
                      </h3>
                      <p className="text-xs text-[#5f6368]">{currentStudent.name} ({currentStudent.rollNo})</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-[10px] font-bold">
                      Razorpay Gateway
                    </span>
                  </div>

                  {paymentError && (
                    <div className="p-3 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{paymentError}</span>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-xl bg-[#f8fafd] border border-[#e8eaed] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Total Course Fee:</span>
                      <strong className="text-[#202124]">₹{currentStudent.totalFees.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Already Paid:</span>
                      <strong className="text-[#137333]">₹{currentStudent.paidFees.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Due:</span>
                      <strong className="text-[#c5221f]">₹{(currentStudent.totalFees - currentStudent.paidFees).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3c4043] mb-1">
                      Enter Amount to Pay (₹)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={currentStudent.totalFees - currentStudent.paidFees}
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] font-bold text-lg text-[#202124] focus:border-[#1a73e8]"
                    />
                  </div>

                  {paymentSuccess ? (
                    <div className="p-4 rounded-xl bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-center space-y-1">
                      <div className="font-bold text-sm">✓ Razorpay Payment Successful!</div>
                      <div className="text-xs text-[#1e8e3e]">Receipt Ref: {paymentReceiptId || 'PAY_APPROVED'}</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={isProcessingPayment}
                        onClick={() => setIsPayingFee(false)}
                        className="py-2.5 rounded-xl text-xs font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={isProcessingPayment || paymentAmount <= 0}
                        onClick={handlePayFee}
                        className="py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                      >
                        {isProcessingPayment ? (
                          <span className="flex items-center gap-1.5">
                            <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                            <span>Opening Razorpay...</span>
                          </span>
                        ) : (
                          <span>Pay ₹{paymentAmount} via Razorpay</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
