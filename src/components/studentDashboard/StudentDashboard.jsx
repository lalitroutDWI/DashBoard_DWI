import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Bell, 
  Search,
  GraduationCap,
  ClipboardList,
  UserCheck,
  MessageSquare,
  DollarSign,
  BarChart3,
  CalendarDays,
  BookOpen,
  FileText,
  Home,
  Menu,
  X
} from 'lucide-react';

// Import individual components
import AcademicOverview from './AcademicOverview';
import Attendance from './Attendance';
import TimetableCalendar from './TimetableCalendar';
import Assignments from './Assignments';
import Resources from './Resources';
import Communication from './Communication';
import ExamAssessment from './ExamAssessment';
import FeePayment from './FeePayment';
import DashboardHome from './DashboardHome';

// ===============================
// SIDEBAR COMPONENT
// ===============================
const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'academics', label: 'Academic Overview', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'timetable', label: 'Timetable & Calendar', icon: CalendarDays },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'resources', label: 'Study Resources', icon: BookOpen },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'exams', label: 'Exams & Assessment', icon: FileText },
    { id: 'finance', label: 'Fee & Payments', icon: DollarSign }
  ];

  // Handle clicking outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen && window.innerWidth < 768) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={onClose}></div>
      )}
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-purple-400 via-purple-500 to-pink-500 text-white overflow-y-auto z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold">EduDash</span>
            </div>
            {/* Close button - visible on mobile */}
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-white/20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  // Close sidebar on mobile after selecting an item
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-500/50 transition-colors text-sm ${
                  isActive ? 'bg-blue-500/70 border-r-4 border-white' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

// ===============================
// TOP HEADER COMPONENT
// ===============================
const TopHeader = ({ user, activeSection, onToggleSidebar }) => {
  const getSectionTitle = (section) => {
    const titles = {
      dashboard: 'Dashboard',
      academics: 'Academic Overview',
      attendance: 'Attendance',
      timetable: 'Timetable & Calendar',
      assignments: 'Assignments',
      resources: 'Study Resources',
      communication: 'Communication',
      exams: 'Exams & Assessment',
      finance: 'Fee & Payments'
    };
    return titles[section] || section;
  };

  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 bg-white shadow-sm border-b px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Hamburger menu button - visible on mobile */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">
            {getSectionTitle(activeSection)}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="border-0 bg-gray-50 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:block text-sm text-gray-600">{user.name}</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===============================
// MAIN DASHBOARD COMPONENT
// ===============================
const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [user] = useState({
    name: "Lalit Rout",
    phone: "+91 9876543210",
    email: "lalit.rout@example.com",
    studentId: "STU12345",
    grade: "10th Grade",
    section: "A"
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Handle window resize to automatically show/hide sidebar
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Reset mobile sidebar state on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardHome user={user} onSectionChange={setActiveSection} />;
      case 'academics':
        return <AcademicOverview />;
      case 'attendance':
        return <Attendance />;
      case 'timetable':
        return <TimetableCalendar />;
      case 'assignments':
        return <Assignments />;
      case 'resources':
        return <Resources />;
      case 'communication':
        return <Communication />;
      case 'exams':
        return <ExamAssessment />;
      case 'finance':
        return <FeePayment />;
      default:
        return <DashboardHome user={user} onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      {/* Top Header */}
      <TopHeader 
        user={user} 
        activeSection={activeSection}
        onToggleSidebar={toggleSidebar}
      />
      
      {/* Main Content with proper spacing */}
      <div className="md:ml-64 pt-20 min-h-screen">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;