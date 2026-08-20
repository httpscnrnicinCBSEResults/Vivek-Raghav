import React, { useState } from 'react';
import { 
  MessageCircle, 
  Bell, 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  Clock, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { NotificationLog } from '../types';
import { ACADEMY_INFO } from '../data/mockData';

interface WhatsAppNotificationCenterProps {
  notifications: NotificationLog[];
}

export const WhatsAppNotificationCenter: React.FC<WhatsAppNotificationCenterProps> = ({
  notifications
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'quickchat'>('feed');
  const [customMsg, setCustomMsg] = useState('');

  const quickTemplates = [
    { title: 'Course & Fee Inquiry', text: 'Hello Dharam Futurebit Academy! I want to know details and fee structure for ADCA & Tally Prime courses.' },
    { title: 'Certificate Verification', text: 'Hello! I want to verify a computer certificate issued by Dharam Futurebit Academy.' },
    { title: 'Franchise Partnership', text: 'Hello Vivek Sir! I am interested in opening an authorized Dharam Futurebit center in my area.' },
    { title: 'Lab Visit & Counseling', text: 'Hello! I would like to visit the computer lab and meet the faculty for admission counseling.' }
  ];

  const handleSendCustomWhatsApp = (text: string) => {
    const url = `https://wa.me/919354358781?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Pulsing indicator pill */}
        <div 
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#dadce0] shadow-lg flex items-center gap-2 hover:scale-105 transition-all text-xs font-semibold text-[#202124]"
        >
          <span className="w-2 h-2 rounded-full bg-[#0f9d58] animate-ping"></span>
          <MessageCircle className="w-4 h-4 text-[#0f9d58]" />
          <span>Official WhatsApp Helpdesk</span>
        </div>

        <button
          id="btn-floating-whatsapp-open"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group ring-4 ring-[#25d366]/20"
          aria-label="WhatsApp Assistant"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25d366]" />
        </button>
      </div>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#dadce0] animate-in slide-in-from-right duration-200">
            
            {/* Drawer Header */}
            <div className="p-5 bg-gradient-to-r from-[#075e54] to-[#128c7e] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-white text-[#075e54]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                    <span>DFB WhatsApp Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-[#25d366]"></span>
                  </h3>
                  <p className="text-[11px] text-white/80">
                    +91 9354358781 • Automated Gateway
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:bg-white/20 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub Tabs */}
            <div className="flex border-b border-[#dadce0] bg-[#f8fafd] text-xs font-semibold">
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'feed'
                    ? 'border-b-2 border-[#075e54] text-[#075e54] bg-white font-bold'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Automated Alert Logs ({notifications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('quickchat')}
                className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'quickchat'
                    ? 'border-b-2 border-[#075e54] text-[#075e54] bg-white font-bold'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Instant Chat With Us</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ece5dd]/30">
              
              {activeTab === 'feed' ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] text-[11px] text-[#185abc] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1a73e8] shrink-0" />
                    <span>Real-time log of automated WhatsApp receipts, admission updates, and certificate notifications.</span>
                  </div>

                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#dadce0] shadow-xs space-y-2 animate-in fade-in"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#202124]">{notif.recipientName}</span>
                        <span className="text-[#80868b] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.timestamp}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#dcf8c6]/60 text-xs text-[#075e54] font-medium leading-relaxed">
                        {notif.message}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#5f6368]">
                        <span className="font-mono">{notif.phone}</span>
                        <span className="text-[#137333] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {notif.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Quick Chat & Templates */
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs space-y-2">
                    <span className="text-xs font-bold text-[#202124] block">Select Instant Inquiry Template:</span>
                    <div className="space-y-2">
                      {quickTemplates.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendCustomWhatsApp(item.text)}
                          className="w-full text-left p-2.5 rounded-xl border border-[#dadce0] hover:border-[#25d366] hover:bg-[#e6f4ea] text-xs font-medium text-[#202124] transition-all flex items-center justify-between group"
                        >
                          <span>{item.title}</span>
                          <Send className="w-3.5 h-3.5 text-[#5f6368] group-hover:text-[#25d366]" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Message box */}
                  <div className="bg-white p-4 rounded-2xl border border-[#dadce0] shadow-xs space-y-2">
                    <span className="text-xs font-bold text-[#202124] block">Or Type Your Question:</span>
                    <textarea
                      rows={3}
                      placeholder="Type your message for Vivek Raghav Sir..."
                      value={customMsg}
                      onChange={(e) => setCustomMsg(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#dadce0] text-xs focus:border-[#25d366] outline-none resize-none"
                    ></textarea>
                    <button
                      onClick={() => handleSendCustomWhatsApp(customMsg || 'Hello Dharam Futurebit Academy!')}
                      className="w-full py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open in WhatsApp (+91 9354358781)</span>
                    </button>
                  </div>

                  {/* Direct Phone Helpline Card */}
                  <div className="p-4 rounded-2xl bg-white border border-[#dadce0] text-xs space-y-2">
                    <span className="font-bold text-[#202124] block">Direct Calling Helpline:</span>
                    <a
                      href={`tel:${ACADEMY_INFO.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#1a73e8] hover:underline"
                    >
                      <Phone className="w-4 h-4 text-[#1a73e8]" />
                      <span>{ACADEMY_INFO.phone}</span>
                    </a>
                    <p className="text-[11px] text-[#5f6368]">
                      Address: {ACADEMY_INFO.address}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-white border-t border-[#dadce0] text-center text-[10px] text-[#80868b]">
              Official WhatsApp Notification Gateway • Dharam Futurebit Academy
            </div>

          </div>
        </div>
      )}
    </>
  );
};
