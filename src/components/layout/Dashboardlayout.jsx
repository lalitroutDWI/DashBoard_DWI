// src/components/layout/DashboardLayout.jsx
import React from 'react';
import { 
  User, Book, Package, BarChart3, Bell, Settings, BookOpen
} from 'lucide-react';
import { Sparkles } from "lucide-react";

const DashboardLayout = ({ children, activeTab, onTabChange, librarianProfile }) => {
  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'catalog', label: 'Catalog & Borrowing', icon: Book },
    { id: 'records', label: 'Records & Inventory', icon: Package },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
      {/* Header */}
      <div className="relative bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg">
              <BookOpen size={28} />
              <div className="absolute -top-1 -right-1">
                <Sparkles size={16} className="text-yellow-300" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Library Management
              </h1>
              <p className="text-sm text-gray-600">Welcome back, {librarianProfile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
            </button>
            <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110">
              <Settings size={20} />
            </button>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {librarianProfile.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="flex flex-wrap gap-3">
          {tabs.map(tab => (
            <TabButton 
              key={tab.id}
              id={tab.id} 
              label={tab.label} 
              icon={tab.icon} 
              active={activeTab === tab.id} 
              onClick={onTabChange} 
            />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;