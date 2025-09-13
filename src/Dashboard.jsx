// src/Dashboard.jsx - Main Dashboard Component
import React, { useState } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import TabContent from './components/content/TabContent';
import ModalManager from './components/modals/ModalManager';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModal, setActiveModal] = useState(null);

  const librarianProfile = {
    name: "Lalit Kumar",
    staffId: "LIB001",
    contact: "+91 98765 43210",
    email: "lalit.kumar@library.edu",
    branch: "Central Library - Main Campus"
  };

  const dashboardStats = {
    totalBooks: 15420,
    issuedBooks: 2340,
    overdueBooks: 156,
    newArrivals: 89,
    activeMembers: 1250,
    pendingReturns: 234
  };

  const handleShowModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <DashboardLayout 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        librarianProfile={librarianProfile}
      >
        <TabContent 
          activeTab={activeTab}
          dashboardStats={dashboardStats}
          librarianProfile={librarianProfile}
          onShowModal={handleShowModal}
        />
      </DashboardLayout>
      
      <ModalManager 
        activeModal={activeModal}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Dashboard;