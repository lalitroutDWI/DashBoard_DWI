import React, { useState } from 'react';
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Upload,
  Download,
  User,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const Assignments = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set #8',
      subject: 'Mathematics',
      description: 'Solve problems 1-15 from Chapter 8: Integration Techniques',
      dueDate: '2024-06-15',
      dueTime: '11:59 PM',
      status: 'pending',
      priority: 'high',
      points: 50,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['calculus_ch8.pdf'],
      estimatedTime: '2-3 hours'
    },
    {
      id: 2,
      title: 'Lab Report: Chemical Reactions',
      subject: 'Chemistry',
      description: 'Write a comprehensive lab report on the chemical reactions experiment conducted in class.',
      dueDate: '2024-06-18',
      dueTime: '2:00 PM',
      status: 'submitted',
      priority: 'medium',
      points: 75,
      submittedDate: '2024-06-16',
      grade: 68,
      feedback: 'Good analysis, but need more detail in methodology section.',
      attachments: ['lab_template.docx', 'results_data.xlsx'],
      estimatedTime: '3-4 hours'
    },
    {
      id: 3,
      title: 'Essay: World War II Impact',
      subject: 'History',
      description: 'Analyze the social and economic impact of World War II on European countries.',
      dueDate: '2024-06-20',
      dueTime: '5:00 PM',
      status: 'draft',
      priority: 'medium',
      points: 100,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['essay_guidelines.pdf', 'sources.pdf'],
      estimatedTime: '4-5 hours'
    },
    {
      id: 4,
      title: 'Physics Lab Data Analysis',
      subject: 'Physics',
      description: 'Analyze the pendulum experiment data and create graphs showing the relationship between length and period.',
      dueDate: '2024-06-12',
      dueTime: '11:59 PM',
      status: 'overdue',
      priority: 'high',
      points: 60,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['data_template.xlsx'],
      estimatedTime: '2 hours'
    },
    {
      id: 5,
      title: 'English Literature Review',
      subject: 'English',
      description: 'Review and analyze three poems from the Romantic period, focusing on themes and literary devices.',
      dueDate: '2024-06-25',
      dueTime: '11:59 PM',
      status: 'graded',
      priority: 'low',
      points: 80,
      submittedDate: '2024-06-23',
      grade: 85,
      feedback: 'Excellent analysis of themes. Well-structured arguments.',
      attachments: ['romantic_poems.pdf'],
      estimatedTime: '3 hours'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'submitted':
        return <CheckCircle className="w-4 h-4" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeFilter === 'all') return true;
    return assignment.status === activeFilter;
  });

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const AssignmentCard = ({ assignment }) => {
    const daysUntilDue = getDaysUntilDue(assignment.dueDate);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">{assignment.title}</h3>
              <span className={`text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                {assignment.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{assignment.subject}</p>
            <p className="text-sm text-gray-700 mb-3">{assignment.description}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            <span className="capitalize">{assignment.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Due Date</p>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{assignment.dueDate}</span>
            </div>
            <p className="text-xs text-gray-500">{assignment.dueTime}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-1">Days Left</p>
            <span className={`font-medium ${
              daysUntilDue < 0 ? 'text-red-600' :
              daysUntilDue <= 1 ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
               daysUntilDue === 0 ? 'Due today' :
               `${daysUntilDue} days`}
            </span>
          </div>
          
          <div>
            <p className="text-gray-500 mb-1">Points</p>
            <span className="font-medium">{assignment.points}</span>
          </div>
          
          <div>
            <p className="text-gray-500 mb-1">Estimated Time</p>
            <span className="font-medium">{assignment.estimatedTime}</span>
          </div>
        </div>

        {assignment.grade && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Grade: {assignment.grade}/{assignment.points}</span>
              <span className="text-sm text-green-600">{((assignment.grade / assignment.points) * 100).toFixed(1)}%</span>
            </div>
            {assignment.feedback && (
              <p className="text-sm text-green-700">{assignment.feedback}</p>
            )}
          </div>
        )}

        {assignment.attachments && assignment.attachments.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {assignment.attachments.map((file, index) => (
                <span key={index} className="inline-flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                  <FileText className="w-3 h-3" />
                  <span>{file}</span>
                  <Download className="w-3 h-3 text-gray-500 hover:text-blue-600 cursor-pointer" />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {assignment.submittedDate && (
              <span>Submitted: {assignment.submittedDate}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setSelectedAssignment(assignment);
                setShowSubmissionModal(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            {assignment.status === 'pending' || assignment.status === 'draft' && (
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Submit">
                <Upload className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filterCounts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'overdue').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(filterCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg p-4 shadow-sm border text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{count}</div>
            <div className="text-sm text-gray-600 capitalize">{status}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Assignments', icon: ClipboardList },
            { id: 'pending', label: 'Pending', icon: Clock },
            { id: 'submitted', label: 'Submitted', icon: CheckCircle },
            { id: 'graded', label: 'Graded', icon: CheckCircle },
            { id: 'overdue', label: 'Overdue', icon: AlertTriangle }
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {filterCounts[filter.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No assignments found</h3>
            <p className="text-gray-600">No assignments match your current filter.</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        )}
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{selectedAssignment.title}</h3>
              <button 
                onClick={() => setShowSubmissionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{selectedAssignment.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <p className="text-sm">{selectedAssignment.dueDate} at {selectedAssignment.dueTime}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <p className="text-sm">{selectedAssignment.points}</p>
                </div>
              </div>
              
              {selectedAssignment.status === 'pending' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Submission</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag and drop files here, or click to select</p>
                    <input type="file" multiple className="hidden" />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                {selectedAssignment.status === 'pending' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Submit Assignment
                  </button>
                )}
                <button 
                  onClick={() => setShowSubmissionModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;