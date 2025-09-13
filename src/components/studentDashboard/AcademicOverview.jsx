import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Trophy, 
  BookOpen, 
  Target,
  Award,
  TrendingDown
} from 'lucide-react';

const AcademicOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Sample data for charts
  const gradeData = [
    { subject: 'Math', grade: 85, target: 90 },
    { subject: 'Science', grade: 92, target: 88 },
    { subject: 'English', grade: 78, target: 85 },
    { subject: 'History', grade: 88, target: 85 },
    { subject: 'Geography', grade: 82, target: 80 },
    { subject: 'Physics', grade: 90, target: 92 }
  ];

  const progressData = [
    { month: 'Jan', overall: 78 },
    { month: 'Feb', overall: 82 },
    { month: 'Mar', overall: 85 },
    { month: 'Apr', overall: 83 },
    { month: 'May', overall: 87 },
    { month: 'Jun', overall: 85 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'low_score',
      subject: 'English',
      message: 'Recent test score (65%) below your average',
      severity: 'warning',
      date: '2 days ago'
    },
    {
      id: 2,
      type: 'missing_assignment',
      subject: 'Math',
      message: 'Assignment #12 submission pending',
      severity: 'urgent',
      date: '1 day ago'
    },
    {
      id: 3,
      type: 'improvement',
      subject: 'Science',
      message: 'Great improvement in recent lab reports!',
      severity: 'success',
      date: '3 days ago'
    }
  ];

  const SummaryCard = ({ title, value, subtitle, icon: Icon, color, trend }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      orange: "bg-orange-50 text-orange-600",
      red: "bg-red-50 text-red-600",
      purple: "bg-purple-50 text-purple-600"
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className={`text-sm font-semibold flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    );
  };

  const AlertCard = ({ alert }) => {
    const severityColors = {
      urgent: 'border-red-200 bg-red-50',
      warning: 'border-orange-200 bg-orange-50',
      success: 'border-green-200 bg-green-50'
    };

    const iconColors = {
      urgent: 'text-red-600',
      warning: 'text-orange-600', 
      success: 'text-green-600'
    };

    return (
      <div className={`p-4 rounded-lg border ${severityColors[alert.severity]}`}>
        <div className="flex items-start space-x-3">
          <AlertTriangle className={`w-5 h-5 mt-0.5 ${iconColors[alert.severity]}`} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">{alert.subject}</p>
              <span className="text-xs text-gray-500">{alert.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Overall GPA" 
          value="3.7" 
          subtitle="Current semester"
          icon={Trophy} 
          color="green"
          trend={2.8}
        />
        <SummaryCard 
          title="Attendance Rate" 
          value="94%" 
          subtitle="This month"
          icon={Target} 
          color="blue"
          trend={1.2}
        />
        <SummaryCard 
          title="Assignments" 
          value="2" 
          subtitle="Pending submissions"
          icon={BookOpen} 
          color="orange"
        />
        <SummaryCard 
          title="Class Rank" 
          value="7th" 
          subtitle="Out of 45 students"
          icon={Award} 
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Subject Performance</h3>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded px-3 py-1"
            >
              <option value="semester">This Semester</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="grade" fill="#3B82F6" name="Current Grade" />
              <Bar dataKey="target" fill="#E5E7EB" name="Target Grade" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Trend */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Progress Trend</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Overall Grade %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Alerts */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Top Subjects */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Subjects</h3>
          <div className="space-y-4">
            {gradeData
              .sort((a, b) => b.grade - a.grade)
              .slice(0, 4)
              .map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800">{subject.subject}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{subject.grade}%</div>
                    <div className={`text-xs ${subject.grade >= subject.target ? 'text-green-600' : 'text-red-600'}`}>
                      Target: {subject.target}%
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Current Grade</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Target</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Tests Taken</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Assignments</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map((subject) => (
                <tr key={subject.subject} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{subject.subject}</td>
                  <td className="text-center py-3 px-4">{subject.grade}%</td>
                  <td className="text-center py-3 px-4">{subject.target}%</td>
                  <td className="text-center py-3 px-4">8/10</td>
                  <td className="text-center py-3 px-4">12/15</td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subject.grade >= subject.target 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {subject.grade >= subject.target ? 'On Track' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicOverview;