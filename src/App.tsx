import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { CertificateVerification } from './components/CertificateVerification';
import { StudentPortal } from './components/StudentPortal';
import { CenterPortal } from './components/CenterPortal';
import { FranchiseSection } from './components/FranchiseSection';
import { TypingTestTool } from './components/TypingTestTool';
import { AboutAndAccreditation } from './components/AboutAndAccreditation';
import { OurMentors } from './components/OurMentors';
import { Footer } from './components/Footer';
import { OnlineAdmissionModal } from './components/OnlineAdmissionModal';
import { WhatsAppNotificationCenter } from './components/WhatsAppNotificationCenter';
import { NotificationLog } from './types';
import { INITIAL_NOTIFICATIONS, ACADEMY_INFO } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState<string>('adca');
  const [activeVerifyCertNo, setActiveVerifyCertNo] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationLog[]>(INITIAL_NOTIFICATIONS);
  const [catalogSearchTerm, setCatalogSearchTerm] = useState<string>('');

  const handleEnrollCourse = (courseId: string) => {
    setSelectedCourseForAdmission(courseId);
    setIsAdmissionOpen(true);
  };

  const handleQuickVerify = (certNo: string) => {
    setActiveVerifyCertNo(certNo);
    setActiveTab('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchCourses = (query: string) => {
    setCatalogSearchTerm(query);
    setActiveTab('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerNotification = (
    message: string,
    recipient: string,
    phone: string,
    type: 'admission_success' | 'fee_receipt' | 'certificate_issued' | 'exam_alert'
  ) => {
    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      recipientName: recipient,
      phone: phone,
      type: type,
      message: message,
      status: 'Delivered (WhatsApp)'
    };
    setNotifications([newNotif, ...notifications]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafd] text-[#202124]">
      
      {/* Google-Styled Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
      />

      {/* Main Dynamic Content Body */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero
              onSearch={handleSearchCourses}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
              onQuickVerify={handleQuickVerify}
            />

            {/* Quick Course Highlights */}
            <CourseCatalog
              initialSearch=""
              onEnroll={handleEnrollCourse}
            />

            {/* Public Certificate Verification Showcase */}
            <CertificateVerification
              initialCertNo=""
            />

            {/* Our Academy Mentors & Expert Faculty Section */}
            <OurMentors
              onEnrollCourse={handleEnrollCourse}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
            />

            {/* Franchise Teaser */}
            <FranchiseSection />

            {/* Typing Lab */}
            <TypingTestTool />

            {/* About & Campus Location */}
            <AboutAndAccreditation />
          </>
        )}

        {activeTab === 'courses' && (
          <div className="pt-4">
            <CourseCatalog
              initialSearch={catalogSearchTerm}
              onEnroll={handleEnrollCourse}
            />
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="pt-4">
            <OurMentors
              onEnrollCourse={handleEnrollCourse}
              onOpenAdmission={() => setIsAdmissionOpen(true)}
            />
          </div>
        )}

        {activeTab === 'verify' && (
          <div className="pt-4">
            <CertificateVerification
              initialCertNo={activeVerifyCertNo}
            />
          </div>
        )}

        {activeTab === 'student-portal' && (
          <div className="pt-4">
            <StudentPortal
              onOpenVerify={(certNo) => {
                setActiveVerifyCertNo(certNo);
                setActiveTab('verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'center-portal' && (
          <div className="pt-4">
            <CenterPortal
              onTriggerNotification={handleTriggerNotification}
            />
          </div>
        )}

        {activeTab === 'franchise' && (
          <div className="pt-4">
            <FranchiseSection />
          </div>
        )}

        {activeTab === 'typing-lab' && (
          <div className="pt-4">
            <TypingTestTool />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-4">
            <AboutAndAccreditation />
          </div>
        )}
      </main>

      {/* Online Admission & Fee Gateway Modal */}
      <OnlineAdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        initialCourseId={selectedCourseForAdmission}
        onTriggerNotification={handleTriggerNotification}
      />

      {/* Automated WhatsApp Notifications & Live Chat Drawer */}
      <WhatsAppNotificationCenter
        notifications={notifications}
      />

      {/* Google-styled Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
      />

    </div>
  );
}
