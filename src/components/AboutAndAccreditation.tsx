import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Send, 
  Navigation, 
  Monitor, 
  Wifi, 
  Zap, 
  BookOpen
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';

export const AboutAndAccreditation: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState('ADCA (1 Year)');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMessage('');
    }, 4000);
  };

  const facilities = [
    { title: 'Modern Computer Lab', desc: '50+ High-speed Core i5/i7 workstations with Windows 11 & high-res monitors.', icon: Monitor },
    { title: '1:1 Student Computer Ratio', desc: 'Every single student gets an individual computer during the entire batch duration.', icon: CheckCircle2 },
    { title: 'High-Speed Fiber Internet', desc: 'Uninterrupted 200 Mbps gigabit Wi-Fi for cloud learning, coding & online practice.', icon: Wifi },
    { title: '100% Power Backup', desc: 'Heavy-duty solar inverter setup ensuring zero class interruptions.', icon: Zap },
    { title: 'ISO 9001:2015 Approved Certs', desc: 'Govt. and private recruiter recognized marksheet and diploma certificates.', icon: Award },
    { title: 'Hindi & English Medium', desc: 'Dedicated bilingual faculty ensuring village & school students learn easily.', icon: BookOpen },
  ];

  return (
    <section id="about-section" className="py-14 bg-white border-t border-[#dadce0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f0fe] text-[#1967d2] text-xs font-semibold">
            <Building2 className="w-4 h-4" />
            <span>About The Institute & Facilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            Dharam Futurebit Computer Academy
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368]">
            Founded in 2026 at Bhagola Village, Palwal (Haryana), we are dedicated to bridging the digital divide 
            by delivering high-quality computer education, vocational diplomas, and government exam coaching at affordable fees.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-[#f8fafd] rounded-2xl border border-[#dadce0] p-6 space-y-2.5 hover:border-[#1a73e8] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-[#202124]">{fac.title}</h3>
                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trust & Legal Accreditation Banner */}
        <div className="bg-gradient-to-r from-[#1a73e8] to-[#1557b0] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Legally Certified & Recognized</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Accreditations & Government Registrations
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {ACADEMY_INFO.name} operates under valid government registrations and certified quality standards. 
                Our diploma certificates are valid for employment in Haryana State Govt. departments (HSSC, Police, Clerical), Central Govt., banks, and multinational IT corporations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                  Govt Reg: {ACADEMY_INFO.regNumber}
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                  {ACADEMY_INFO.isoNumber}
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                  MSME: {ACADEMY_INFO.msmeNumber}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-white text-[#1a73e8] flex items-center justify-center font-display font-black text-2xl mx-auto shadow-md">
                DF
              </div>
              <div className="font-bold text-sm">Vivek Raghav</div>
              <div className="text-xs text-white/80">Founder & Managing Director</div>
              <div className="text-xs font-mono text-[#fbbc04] font-bold">{ACADEMY_INFO.phone}</div>
            </div>

          </div>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Details & Interactive Map Card */}
          <div className="bg-[#f8fafd] rounded-3xl border border-[#dadce0] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider block mb-1">
                Reach Our Campus
              </span>
              <h3 className="font-display font-bold text-2xl text-[#202124]">
                Location & Office Hours
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fce8e6] text-[#c5221f] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#202124] block">Main Academy Address:</span>
                  <p className="text-[#5f6368] mt-0.5 leading-relaxed">{ACADEMY_INFO.address}</p>
                  <span className="text-[11px] text-[#1a73e8] font-medium block mt-1">
                    Landmark: {ACADEMY_INFO.landmark}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#202124] block">Calling Helpline:</span>
                  <a href={`tel:${ACADEMY_INFO.phone}`} className="text-[#1a73e8] font-bold hover:underline">
                    {ACADEMY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-[#137333] text-white" />
                </div>
                <div>
                  <span className="font-bold text-[#202124] block">Official WhatsApp Support:</span>
                  <a 
                    href={`https://wa.me/919354358781`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0f9d58] font-bold hover:underline"
                  >
                    +91 9354358781 (Instant Reply)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#202124] block">Official Email:</span>
                  <a href={`mailto:${ACADEMY_INFO.email}`} className="text-[#202124] font-mono hover:underline">
                    {ACADEMY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f1f3f4] text-[#3c4043] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#202124] block">Lab & Office Timings:</span>
                  <p className="text-[#5f6368] mt-0.5">{ACADEMY_INFO.timings}</p>
                </div>
              </div>
            </div>

            {/* Simulated Google Map Route Pin */}
            <div className="p-4 rounded-2xl bg-white border border-[#dadce0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#1a73e8]" />
                <div>
                  <div className="font-bold text-xs text-[#202124]">Navigate via Google Maps</div>
                  <div className="text-[10px] text-[#5f6368]">Bhagola, Palwal (Haryana 121102)</div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Bhagola village near govt sr sec school palwal haryana 121102')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#1a73e8] text-white text-xs font-semibold hover:bg-[#1557b0]"
              >
                Get Directions
              </a>
            </div>

          </div>

          {/* Quick Callback / Admission Inquiry Form */}
          <div className="bg-[#f8fafd] rounded-3xl border border-[#dadce0] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider block mb-1">
                Have Any Questions?
              </span>
              <h3 className="font-display font-bold text-2xl text-[#202124]">
                Request Free Career Counseling & Callback
              </h3>
              <p className="text-xs text-[#5f6368] mt-1">
                Fill the form below and our career counselor will call you within 15 minutes.
              </p>
            </div>

            {isSent ? (
              <div className="p-6 bg-[#e6f4ea] text-[#137333] rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#137333] mx-auto" />
                <h4 className="font-bold text-base">Inquiry Received!</h4>
                <p className="text-xs">
                  Thank you, {inquiryName}. Our counselor will call you on {inquiryPhone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Kumar"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] bg-white text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9625118781"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] bg-white text-sm focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Interested Course</label>
                  <select
                    value={inquiryCourse}
                    onChange={(e) => setInquiryCourse(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] bg-white text-sm focus:border-[#1a73e8]"
                  >
                    <option>ADCA (1 Year Master Diploma)</option>
                    <option>DCA (6 Months Diploma)</option>
                    <option>Tally Prime with GST</option>
                    <option>Python & AI Tools</option>
                    <option>CCC NIELIT Certification</option>
                    <option>Typing (English & Hindi)</option>
                    <option>Franchise Center Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#3c4043] mb-1">Message or Queries (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us your qualification, convenient timing, or any questions..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dadce0] bg-white text-sm focus:border-[#1a73e8]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Callback Request</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
