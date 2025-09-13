import React from 'react';
import {
  TrendingUp,
  UserCheck,
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  Award
} from 'lucide-react';

// ===============================
// SUMMARY CARD COMPONENT
// ===============================
const SummaryCard = ({ title, value, subtitle, icon: Icon, color = "blue", trend, onClick }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    indigo: "bg-indigo-50 text-indigo-600"
  };

  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-md`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="text-right">
            <div className={`text-sm font-semibold flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <div className="w-4 h-4 mr-1 transform rotate-180">
                  <TrendingUp className="w-4 h-4" />
                </div>
              )}
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};

// ===============================
// DASHBOARD HOME COMPONENT
// ===============================
const DashboardHome = ({ user, onSectionChange }) => (
  <div>
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
      <p className="text-gray-600">Here's your learning overview for today</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard 
        title="Overall Grade" 
        value="A" 
        subtitle="85.5% Average"
        icon={TrendingUp} 
        color="green"
        trend={5.2}
        onClick={() => onSectionChange('academics')}
      />
      <SummaryCard 
        title="Attendance" 
        value="92%" 
        subtitle="This month"
        icon={UserCheck} 
        color="blue"
        trend={2.1}
        onClick={() => onSectionChange('attendance')}
      />
      <SummaryCard 
        title="Pending Tasks" 
        value="5" 
        subtitle="Assignments due"
        icon={ClipboardList} 
        color="orange"
        onClick={() => onSectionChange('assignments')}
      />
      <SummaryCard 
        title="Next Exam" 
        value="3" 
        subtitle="days left"
        icon={Calendar} 
        color="red"
        onClick={() => onSectionChange('exams')}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Mathematics</p>
              <p className="text-sm text-gray-600">9:00 AM - 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-800">Science</p>
              <p className="text-sm text-gray-600">10:30 AM - 11:30 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">English</p>
              <p className="text-sm text-gray-600">1:00 PM - 2:00 PM</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onSectionChange('timetable')}
          className="mt-4 text-blue-600 text-sm font-medium hover:underline"
        >
          View full schedule →
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800">Math Assignment submitted</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800">Earned "Perfect Attendance" badge</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-800">Science Lab Report graded</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHome;