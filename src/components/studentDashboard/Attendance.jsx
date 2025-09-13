import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  FileText,
  Send,
  User,
  Phone
} from 'lucide-react';

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [showPermissionForm, setShowPermissionForm] = useState(false);
  const [permissionForm, setPermissionForm] = useState({
    date: '',
    reason: '',
    description: ''
  });

  // Sample attendance data
  const attendanceData = {
    overall: {
      present: 85,
      absent: 7,
      late: 3,
      total: 95,
      percentage: 89.5
    },
    monthly: [
      { month: 'Jan', percentage: 92 },
      { month: 'Feb', percentage: 88 },
      { month: 'Mar', percentage: 94 },
      { month: 'Apr', percentage: 87 },
      { month: 'May', percentage: 91 },
      { month: 'Jun', percentage: 89 }
    ],
    recent: [
      { date: '2024-06-10', status: 'present', subject: 'Math', time: '9:00 AM' },
      { date: '2024-06-09', status: 'present', subject: 'Science', time: '10:30 AM' },
      { date: '2024-06-08', status: 'late', subject: 'English', time: '1:15 PM' },
      { date: '2024-06-07', status: 'absent', subject: 'History', time: '11:00 AM' },
      { date: '2024-06-06', status: 'present', subject: 'Geography', time: '2:00 PM' },
      { date: '2024-06-05', status: 'present', subject: 'Physics', time: '9:30 AM' }
    ]
  };

  const permissions = [
    {
      id: 1,
      date: '2024-06-07',
      reason: 'Medical appointment',
      status: 'approved',
      submittedDate: '2024-06-06'
    },
    {
      id: 2,
      date: '2024-05-28',
      reason: 'Family function',
      status: 'pending',
      submittedDate: '2024-05-27'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late':
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 text-green-800';
      case 'absent':
        return 'bg-red-50 text-red-800';
      case 'late':
        return 'bg-orange-50 text-orange-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Permission request submitted successfully!');
    setPermissionForm({ date: '', reason: '', description: '' });
    setShowPermissionForm(false);
  };

  const AttendanceCard = ({ title, value, subtitle, icon: Icon, color }) => {
    const colorClasses = {
      green: "bg-green-50 text-green-600",
      red: "bg-red-50 text-red-600",
      orange: "bg-orange-50 text-orange-600",
      blue: "bg-blue-50 text-blue-600"
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AttendanceCard 
          title="Attendance Rate" 
          value={`${attendanceData.overall.percentage}%`}
          subtitle="Overall performance"
          icon={CheckCircle} 
          color="green"
        />
        <AttendanceCard 
          title="Days Present" 
          value={attendanceData.overall.present}
          subtitle="This semester"
          icon={User} 
          color="blue"
        />
        <AttendanceCard 
          title="Days Absent" 
          value={attendanceData.overall.absent}
          subtitle="Excused and unexcused"
          icon={XCircle} 
          color="red"
        />
        <AttendanceCard 
          title="Late Arrivals" 
          value={attendanceData.overall.late}
          subtitle="This semester"
          icon={Clock} 
          color="orange"
        />
      </div>

      {/* Attendance Threshold Warning */}
      {attendanceData.overall.percentage < 90 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-medium text-orange-800">Attendance Warning</h3>
              <p className="text-sm text-orange-700 mt-1">
                Your attendance is below the required 90% threshold. Please improve your attendance to avoid academic penalties.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Attendance Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Attendance</h3>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1"
            >
              <option value="current">This Month</option>
              <option value="last">Last Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {attendanceData.recent.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium text-gray-800">{record.subject}</p>
                    <p className="text-sm text-gray-600">{record.date} at {record.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Requests */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Permission Requests</h3>
            <button 
              onClick={() => setShowPermissionForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              New Request
            </button>
          </div>
          
          <div className="space-y-3">
            {permissions.map((permission) => (
              <div key={permission.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{permission.reason}</p>
                    <p className="text-sm text-gray-600">Date: {permission.date}</p>
                    <p className="text-xs text-gray-500">Submitted: {permission.submittedDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    permission.status === 'approved' ? 'bg-green-100 text-green-800' :
                    permission.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {permission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Attendance Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Attendance Trend</h3>
        <div className="grid grid-cols-6 gap-4">
          {attendanceData.monthly.map((month) => (
            <div key={month.month} className="text-center">
              <div className="h-32 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
                  style={{ height: `${month.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-800">{month.month}</p>
              <p className="text-xs text-gray-600">{month.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Request Modal */}
      {showPermissionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Permission</h3>
            
            <form onSubmit={handlePermissionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date"
                  value={permissionForm.date}
                  onChange={(e) => setPermissionForm({...permissionForm, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select 
                  value={permissionForm.reason}
                  onChange={(e) => setPermissionForm({...permissionForm, reason: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select reason</option>
                  <option value="Medical appointment">Medical appointment</option>
                  <option value="Family function">Family function</option>
                  <option value="Personal emergency">Personal emergency</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={permissionForm.description}
                  onChange={(e) => setPermissionForm({...permissionForm, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide additional details..."
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </button>
                <button 
                  type="button"
                  onClick={() => setShowPermissionForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;