import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  ClipboardList
} from 'lucide-react';

const TimetableCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
  
  // Sample timetable data
  const weeklySchedule = {
    Monday: [
      { time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', duration: '1 hour' },
      { time: '10:30 AM', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 203', duration: '1 hour' },
      { time: '1:00 PM', subject: 'Physics', teacher: 'Dr. Brown', room: 'Lab 1', duration: '1.5 hours' },
      { time: '3:00 PM', subject: 'History', teacher: 'Mr. Davis', room: 'Room 105', duration: '1 hour' }
    ],
    Tuesday: [
      { time: '9:00 AM', subject: 'Science', teacher: 'Dr. Wilson', room: 'Lab 2', duration: '1.5 hours' },
      { time: '11:00 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', duration: '1 hour' },
      { time: '1:00 PM', subject: 'Geography', teacher: 'Ms. Miller', room: 'Room 108', duration: '1 hour' },
      { time: '2:30 PM', subject: 'Art', teacher: 'Mr. Taylor', room: 'Art Studio', duration: '1 hour' }
    ],
    Wednesday: [
      { time: '9:00 AM', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 203', duration: '1 hour' },
      { time: '10:30 AM', subject: 'Chemistry', teacher: 'Dr. Anderson', room: 'Lab 3', duration: '1.5 hours' },
      { time: '1:00 PM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', duration: '1 hour' },
      { time: '2:30 PM', subject: 'PE', teacher: 'Coach Roberts', room: 'Gymnasium', duration: '1 hour' }
    ],
    Thursday: [
      { time: '9:00 AM', subject: 'History', teacher: 'Mr. Davis', room: 'Room 105', duration: '1 hour' },
      { time: '10:30 AM', subject: 'Biology', teacher: 'Ms. Garcia', room: 'Lab 4', duration: '1.5 hours' },
      { time: '1:00 PM', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 203', duration: '1 hour' },
      { time: '2:30 PM', subject: 'Music', teacher: 'Mr. Thompson', room: 'Music Room', duration: '1 hour' }
    ],
    Friday: [
      { time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101', duration: '1 hour' },
      { time: '10:30 AM', subject: 'Geography', teacher: 'Ms. Miller', room: 'Room 108', duration: '1 hour' },
      { time: '1:00 PM', subject: 'Science', teacher: 'Dr. Wilson', room: 'Lab 2', duration: '1.5 hours' },
      { time: '3:00 PM', subject: 'Computer Science', teacher: 'Mr. Lee', room: 'Computer Lab', duration: '1 hour' }
    ]
  };

  const upcomingEvents = [
    {
      id: 1,
      title: 'Math Quiz',
      date: '2024-06-15',
      time: '10:00 AM',
      type: 'exam',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Science Project Due',
      date: '2024-06-18',
      time: '11:59 PM',
      type: 'assignment',
      subject: 'Science'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-06-20',
      time: '2:00 PM',
      type: 'meeting',
      subject: 'General'
    },
    {
      id: 4,
      title: 'Sports Day',
      date: '2024-06-25',
      time: '9:00 AM',
      type: 'event',
      subject: 'PE'
    }
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'English': 'bg-green-100 text-green-800 border-green-200',
      'Science': 'bg-purple-100 text-purple-800 border-purple-200',
      'Physics': 'bg-red-100 text-red-800 border-red-200',
      'Chemistry': 'bg-orange-100 text-orange-800 border-orange-200',
      'Biology': 'bg-teal-100 text-teal-800 border-teal-200',
      'History': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Geography': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Art': 'bg-pink-100 text-pink-800 border-pink-200',
      'PE': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Music': 'bg-violet-100 text-violet-800 border-violet-200',
      'Computer Science': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'exam': 'bg-red-100 text-red-800',
      'assignment': 'bg-orange-100 text-orange-800',
      'meeting': 'bg-blue-100 text-blue-800',
      'event': 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const ClassCard = ({ classItem }) => (
    <div className={`p-3 rounded-lg border-2 ${getSubjectColor(classItem.subject)} mb-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{classItem.time}</span>
          </div>
          <h4 className="font-semibold text-sm mb-1">{classItem.subject}</h4>
          <div className="flex items-center space-x-2 text-xs opacity-75">
            <User className="w-3 h-3" />
            <span>{classItem.teacher}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs opacity-75">
            <MapPin className="w-3 h-3" />
            <span>{classItem.room}</span>
          </div>
        </div>
        <div className="text-xs font-medium">
          {classItem.duration}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Class Schedule</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Month View
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-600 min-w-[120px] text-center">
            Week {Math.abs(currentWeek) + 1}, 2024
          </span>
          <button 
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'week' && (
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Week View */}
          <div className="grid grid-cols-5 gap-0 border-b border-gray-200">
            {Object.keys(weeklySchedule).map((day) => (
              <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                <h3 className="font-semibold text-gray-800 mb-1">{day}</h3>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 gap-0">
            {Object.entries(weeklySchedule).map(([day, classes]) => (
              <div key={day} className="p-4 border-r border-gray-200 last:border-r-0 min-h-[400px]">
                <div className="space-y-2">
                  {classes.map((classItem, index) => (
                    <ClassCard key={index} classItem={classItem} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'month' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Month View</h3>
            <p className="text-gray-600">Monthly calendar view is under development</p>
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Event
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="mt-1">
                  {event.type === 'exam' && <BookOpen className="w-4 h-4 text-red-600" />}
                  {event.type === 'assignment' && <ClipboardList className="w-4 h-4 text-orange-600" />}
                  {event.type === 'meeting' && <User className="w-4 h-4 text-blue-600" />}
                  {event.type === 'event' && <Calendar className="w-4 h-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center space-x-3 p-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">Set Class Reminder</p>
                <p className="text-sm text-gray-600">Get notified before classes</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Plus className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">Add Personal Event</p>
                <p className="text-sm text-gray-600">Schedule personal activities</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-800">View Study Plan</p>
                <p className="text-sm text-gray-600">Access personalized study schedule</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableCalendar;