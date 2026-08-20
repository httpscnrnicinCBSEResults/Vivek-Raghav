import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  BookOpen, 
  Clock, 
  Printer, 
  Sparkles,
  MessageCircle,
  AlertCircle,
  Lock
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { ACADEMY_INFO } from '../data/mockData';
import { api, openRazorpayCheckout } from '../services/api';
import confetti from 'canvas-confetti';

interface OnlineAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  onTriggerNotification: (message: string, recipient: string, phone: string, type: any) => void;
}

export const OnlineAdmissionModal: React.FC<OnlineAdmissionModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
  onTriggerNotification
}) => {
  const [step, setStep] = useState<number>(1);
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Bhagola Village, Palwal');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || 'adca');
  const [batchTime, setBatchTime] = useState('09:00 AM - 11:00 AM (Morning)');
  const [paymentOption, setPaymentOption] = useState<'full' | 'installment' | 'center'>('full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [admissionSlip, setAdmissionSlip] = useState<{
    rollNo: string;
    admissionNo: string;
    date: string;
    amountPaid: number;
    paymentId?: string;
    orderId?: string;
  } | null>(null);

  if (!isOpen) return null;

  const selectedCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  const courseFee = selectedCourse.discountedFee || selectedCourse.fee;
  const payAmount = paymentOption === 'full' ? courseFee : Math.round(courseFee / 3);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Step 3: Fee Payment & Admission Registration via API & Razorpay
    setIsSubmitting(true);

    if (paymentOption === 'center') {
      // Pay at center (zero online payment)
      try {
        const response = await api.registerAdmission({
          studentName,
          fatherName,
          phone,
          whatsapp: whatsapp || phone,
          address,
          courseId: selectedCourse.id,
          courseTitle: selectedCourse.title,
          batchTime,
          paymentOption: 'center',
          amountPaid: 0,
          paymentMethod: 'Pay at Academy Center (Cash/UPI)',
        });

        setAdmissionSlip({
          rollNo: response.admission.rollNo,
          admissionNo: response.admission.admissionNo,
          date: response.admission.date,
          amountPaid: 0,
          paymentId: 'OFFLINE_CENTER_DUE',
        });
        setIsSubmitting(false);
        setStep(4);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        onTriggerNotification(
          `🎉 Admission Registered! Welcome ${studentName} to Dharam Futurebit Computer Academy, Bhagola Palwal. Roll No: ${response.admission.rollNo}, Course: ${selectedCourse.title}, Batch: ${batchTime}. Payment mode: Pay at Center. Helpline: ${ACADEMY_INFO.phone}`,
          studentName,
          whatsapp || phone,
          'admission_success'
        );
      } catch (err: any) {
        setIsSubmitting(false);
        setErrorMessage(err.message || 'Failed to complete registration.');
      }
    } else {
      // Online Payment via Razorpay
      try {
        await openRazorpayCheckout({
          amount: payAmount,
          studentName,
          email,
          phone,
          courseTitle: selectedCourse.title,
          description: `Admission Fee - ${selectedCourse.title} (${paymentOption === 'full' ? 'Full' : '1st Installment'})`,
          onSuccess: async (paymentId, orderId) => {
            try {
              const response = await api.registerAdmission({
                studentName,
                fatherName,
                phone,
                whatsapp: whatsapp || phone,
                address,
                courseId: selectedCourse.id,
                courseTitle: selectedCourse.title,
                batchTime,
                paymentOption,
                amountPaid: payAmount,
                paymentMethod: 'Razorpay Online (UPI/Cards/NetBanking)',
                razorpayPaymentId: paymentId,
                razorpayOrderId: orderId,
              });

              setAdmissionSlip({
                rollNo: response.admission.rollNo,
                admissionNo: response.admission.admissionNo,
                date: response.admission.date,
                amountPaid: payAmount,
                paymentId,
                orderId,
              });
              setIsSubmitting(false);
              setStep(4);

              confetti({
                particleCount: 100,
                spread: 75,
                origin: { y: 0.6 }
              });

              onTriggerNotification(
                `🎉 Admission & Payment Confirmed! Welcome ${studentName} to Dharam Futurebit Computer Academy, Bhagola Palwal. Roll No: ${response.admission.rollNo}, Course: ${selectedCourse.title}, Fee Paid: ₹${payAmount} (Razorpay ID: ${paymentId}). Helpline: ${ACADEMY_INFO.phone}`,
                studentName,
                whatsapp || phone,
                'admission_success'
              );
            } catch (regErr: any) {
              setIsSubmitting(false);
              setErrorMessage(regErr.message || 'Registration failed after payment verification.');
            }
          },
          onError: (errMsg) => {
            setIsSubmitting(false);
            setErrorMessage(errMsg);
          }
        });
      } catch (err: any) {
        setIsSubmitting(false);
        setErrorMessage(err.message || 'Unable to open Razorpay payment gateway.');
      }
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-[#dadce0] p-6 sm:p-8 relative animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center gap-3 border-b border-[#f1f3f4] pb-4 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#202124]">
              Online Student Admission 2026
            </h3>
            <p className="text-xs text-[#5f6368]">
              {ACADEMY_INFO.name} • Bhagola Village, Palwal (Haryana)
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-6 px-2">
            {[
              { num: 1, label: 'Student Info' },
              { num: 2, label: 'Course & Batch' },
              { num: 3, label: 'Razorpay Fee' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-[#1a73e8] text-white ring-4 ring-[#e8f0fe]'
                    : step > s.num
                    ? 'bg-[#34a853] text-white'
                    : 'bg-[#f1f3f4] text-[#80868b]'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${
                  step === s.num ? 'text-[#1a73e8] font-bold' : 'text-[#5f6368]'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Student Details */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Father's Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sh. Suresh Sharma"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">Mobile Calling Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9625118781"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#3c4043] mb-1">WhatsApp Number (For Alerts)</label>
                <input
                  type="tel"
                  placeholder="+91 9354358781"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#3c4043] mb-1">Email Address (Optional for Receipt)</label>
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#3c4043] mb-1">Village / City & Full Address</label>
              <input
                type="text"
                placeholder="e.g. Bhagola Village, Palwal, Haryana"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm focus:border-[#1a73e8]"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm flex items-center gap-2 shadow-xs"
              >
                <span>Continue to Course Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Course & Batch Selection */}
        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#3c4043] mb-1">Select Desired Course *</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm bg-white focus:border-[#1a73e8]"
              >
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — {c.duration} (₹{c.discountedFee || c.fee})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#e8eaed] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5f6368]">Course Code:</span>
                <span className="font-mono font-bold text-[#1a73e8]">{selectedCourse.code}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5f6368]">Total Duration:</span>
                <span className="font-semibold text-[#202124]">{selectedCourse.duration} ({selectedCourse.hours} Lab Hours)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5f6368]">Certification:</span>
                <span className="font-semibold text-[#137333]">ISO 9001:2015 Approved</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5f6368]">Total Course Fee:</span>
                <span className="font-display font-extrabold text-base text-[#202124]">₹{courseFee.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#3c4043] mb-1">Select Batch Timing Preference *</label>
              <select
                value={batchTime}
                onChange={(e) => setBatchTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] text-sm bg-white focus:border-[#1a73e8]"
              >
                <option>07:00 AM - 09:00 AM (Early Morning Batch)</option>
                <option>09:00 AM - 11:00 AM (Standard Morning Batch)</option>
                <option>11:00 AM - 01:00 PM (Noon Batch)</option>
                <option>01:00 PM - 03:00 PM (Afternoon Batch)</option>
                <option>04:00 PM - 06:00 PM (Evening College/Working Batch)</option>
                <option>06:00 PM - 08:00 PM (Special Night Shift Batch)</option>
              </select>
            </div>

            <div className="pt-3 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm flex items-center gap-2 shadow-xs"
              >
                <span>Continue to Payment Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Razorpay Payment & Plan */}
        {step === 3 && (
          <form onSubmit={handleNext} className="space-y-4 text-xs">
            
            <div className="space-y-2">
              <label className="block font-semibold text-[#3c4043]">Choose Payment Structure:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentOption === 'full'
                    ? 'border-[#1a73e8] bg-[#e8f0fe]/50 ring-2 ring-[#1a73e8]'
                    : 'border-[#dadce0] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentOption === 'full'}
                    onChange={() => setPaymentOption('full')}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs text-[#1a73e8]">Full Course Fee</div>
                  <div className="font-display font-extrabold text-lg text-[#202124] mt-1">₹{courseFee.toLocaleString()}</div>
                  <div className="text-[10px] text-[#137333] font-semibold mt-1">✓ Best Value (Zero Dues)</div>
                </label>

                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentOption === 'installment'
                    ? 'border-[#1a73e8] bg-[#e8f0fe]/50 ring-2 ring-[#1a73e8]'
                    : 'border-[#dadce0] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentOption === 'installment'}
                    onChange={() => setPaymentOption('installment')}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs text-[#202124]">Easy Installment</div>
                  <div className="font-display font-extrabold text-lg text-[#202124] mt-1">₹{Math.round(courseFee / 3).toLocaleString()}</div>
                  <div className="text-[10px] text-[#5f6368] mt-1">1st of 3 Easy Installments</div>
                </label>

                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentOption === 'center'
                    ? 'border-[#1a73e8] bg-[#e8f0fe]/50 ring-2 ring-[#1a73e8]'
                    : 'border-[#dadce0] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentOption === 'center'}
                    onChange={() => setPaymentOption('center')}
                    className="sr-only"
                  />
                  <div className="font-bold text-xs text-[#202124]">Pay at Center</div>
                  <div className="font-display font-extrabold text-lg text-[#202124] mt-1">₹0 Online</div>
                  <div className="text-[10px] text-[#5f6368] mt-1">Cash / UPI at Bhagola Lab</div>
                </label>
              </div>
            </div>

            {paymentOption !== 'center' ? (
              <div className="p-4 rounded-2xl bg-[#f0f7ff] border border-[#c2e7ff] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#001d35] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>Razorpay Secure Gateway</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#001d35] text-white text-[10px] font-bold">
                      UPI • Cards • NetBanking
                    </span>
                  </div>
                  <span className="font-display font-extrabold text-sm text-[#1a73e8]">
                    Pay ₹{payAmount.toLocaleString()}
                  </span>
                </div>

                <div className="text-[11px] text-[#3c4043] leading-relaxed">
                  Pay securely via Razorpay with Google Pay, PhonePe, Paytm, BHIM UPI, Debit/Credit Card, or NetBanking. Instant automated confirmation & WhatsApp admission slip generation.
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#d3e3fd]/60 text-[10px] text-[#5f6368]">
                  <ShieldCheck className="w-4 h-4 text-[#137333]" />
                  <span>256-bit SSL Encrypted • RBI Approved Payment Aggregator</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#e8eaed] space-y-1">
                <div className="font-semibold text-xs text-[#202124]">Pay at Academy Counter</div>
                <p className="text-[11px] text-[#5f6368]">
                  Your seat will be reserved immediately. You can complete fee payment via Cash or UPI when visiting our Bhagola center before batch start date.
                </p>
              </div>
            )}

            <div className="pt-3 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#5f6368] hover:bg-[#f1f3f4]"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm flex items-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing with Razorpay...</span>
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{paymentOption === 'center' ? 'Confirm Reservation' : `Pay ₹${payAmount.toLocaleString()} via Razorpay`}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* STEP 4: Admission Confirmed Slip */}
        {step === 4 && admissionSlip && (
          <div className="space-y-6">
            
            <div className="bg-[#e6f4ea] border border-[#ceead6] rounded-2xl p-4 text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#137333] text-white flex items-center justify-center mx-auto mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-[#137333]">
                Admission Confirmed for 2026 Batch!
              </h4>
              <p className="text-xs text-[#1e8e3e]">
                Welcome to {ACADEMY_INFO.name}. An automated WhatsApp confirmation has been dispatched.
              </p>
            </div>

            {/* Official Admission Acknowledgment Slip */}
            <div className="bg-white rounded-2xl border-2 border-[#1a73e8] p-6 shadow-sm space-y-4 text-xs">
              <div className="flex justify-between border-b border-[#dadce0] pb-3">
                <div>
                  <div className="font-display font-bold text-sm text-[#202124]">{ACADEMY_INFO.name}</div>
                  <div className="text-[10px] text-[#5f6368]">Bhagola Village, Palwal (Haryana) 121102</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-[#1a73e8]">{admissionSlip.admissionNo}</div>
                  <div className="text-[10px] text-[#80868b]">{admissionSlip.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#80868b] block">Student Name:</span>
                  <strong className="text-sm text-[#202124]">{studentName}</strong>
                </div>
                <div>
                  <span className="text-[#80868b] block">Allocated Roll Number:</span>
                  <strong className="font-mono text-sm text-[#c5221f]">{admissionSlip.rollNo}</strong>
                </div>
                <div>
                  <span className="text-[#80868b] block">Course:</span>
                  <strong className="text-[#1a73e8]">{selectedCourse.title}</strong>
                </div>
                <div>
                  <span className="text-[#80868b] block">Batch Schedule:</span>
                  <strong className="text-[#202124]">{batchTime}</strong>
                </div>
                <div>
                  <span className="text-[#80868b] block">Fee Paid:</span>
                  <strong className="text-sm text-[#137333]">₹{admissionSlip.amountPaid.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-[#80868b] block">Payment Gateway:</span>
                  <span className="font-mono text-[11px] text-[#1a73e8]">
                    {admissionSlip.paymentId ? `Razorpay: ${admissionSlip.paymentId}` : 'Center Counter'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eeeeee] flex items-center justify-between text-[10px] text-[#5f6368]">
                <span>Academy Helpline: {ACADEMY_INFO.phone}</span>
                <button
                  onClick={handlePrintSlip}
                  className="inline-flex items-center gap-1 font-bold text-[#1a73e8] hover:underline"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print Admission Slip</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#1a73e8] text-white font-semibold text-xs hover:bg-[#1557b0]"
              >
                Close & Go to Dashboard
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

