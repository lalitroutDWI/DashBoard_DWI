import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react';

const ExamAssessment = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample exam data
  const exams = {
    upcoming: [
      {
        id: 1,
        title: 'Mathematics Mid-term',
        subject: 'Mathematics',
        date: '2024-06-15',
        time: '9:00 AM - 11:00 AM',
        duration: '2 hours',
        type: 'Written',
        room: 'Room 101',
        syllabus: ['Calculus', 'Trigonometry', 'Algebra'],
        totalMarks: 100,
        passingMarks: 40,
        instructions: 'Bring calculator, graph paper, and drawing instruments.',
        status: 'scheduled'
      },
      {
        id: 2,
        title: 'Physics Practical Exam',
        subject: 'Physics',
        date: '2024-06-18',
        time: '2:00 PM - 4:00 PM',
        duration: '2 hours',
        type: 'Practical',
        room: 'Physics Lab',
        syllabus: ['Mechanics', 'Optics', 'Electricity'],
        totalMarks: 50,
        passingMarks: 20,
        instructions: 'Wear lab coat and bring lab notebook.',
        status: 'scheduled'
      },
      {
        id: 3,
        title: 'English Literature Quiz',
        subject: 'English',
        date: '2024-06-20',
        time: '10:30 AM - 11:30 AM',
        duration: '1 hour',
        type: 'Online Quiz',
        room: 'Computer Lab',
        syllabus: ['Shakespeare', 'Romantic Poetry', 'Modern Drama'],
        totalMarks: 25,
        passingMarks: 10,
        instructions: 'Online exam via school portal.',
        status: 'scheduled'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'Chemistry Unit Test',
        subject: 'Chemistry',
        date: '2024-06-05',
        time: '11:00 AM - 12:00 PM',
        duration: '1 hour',
        type: 'Written',
        room: 'Room 205',
        totalMarks: 50,
        obtainedMarks: 42,
        grade: 'B+',
        percentage: 84,
        rank: 8,
        status: 'completed'
      },
      {
        id: 5,
        title: 'Biology Lab Assessment',
        subject: 'Biology',
        date: '2024-06-02',
        time: '1:00 PM - 3:00 PM',
        duration: '2 hours',
        type: 'Practical',
        room: 'Biology Lab',
        totalMarks: 75,
        obtainedMarks: 68,
        grade: 'A-',
        percentage: 90.7,
        rank: 3,
        status: 'completed'
      }
    ]
  };

  const assessments = [
    {
      id: 1,
      title: 'Math Assignment #10',
      subject: 'Mathematics',
      type: 'Assignment',
      submissionDate: '2024-06-08',
      marks: 18,
      totalMarks: 20,
      grade: 'A',
      feedback: 'Excellent work on integration problems.'
    },
    {
      id: 2,
      title: 'Science Project',
      subject: 'Science',
      type: 'Project',
      submissionDate: '2024-06-10',
      marks: 35,
      totalMarks: 40,
      grade: 'A-',
      feedback: 'Good research, presentation could be improved.'
    },
    {
      id: 3,
      title: 'History Essay',
      subject: 'History',
      type: 'Essay',
      submissionDate: '2024-06-06',
      marks: 28,
      totalMarks: 35,
      grade: 'B+',
      feedback: 'Strong arguments, needs better citations.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600';
    if (grade === 'A-' || grade === 'B+') return 'text-blue-600';
    if (grade === 'B' || grade === 'B-') return 'text-orange-600';
    return 'text-red-600';
  };

  const getDaysUntilExam = (examDate) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const ExamCard = ({ exam, isUpcoming = true }) => {
    const daysUntil = isUpcoming ? getDaysUntilExam(exam.date) : null;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">{exam.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                {exam.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exam.subject}</p>
            {daysUntil !== null && (
              <p className={`text-sm font-medium ${
                daysUntil < 0 ? 'text-red-600' :
                daysUntil <= 3 ? 'text-orange-600' :
                'text-green-600'
              }`}>
                {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` :
                 daysUntil === 0 ? 'Today' :
                 `${daysUntil} days remaining`}
              </p>
            )}
          </div>
          
          {!isUpcoming && exam.obtainedMarks && (
            <div className="text-right">
              <div className={`text-lg font-bold ${getGradeColor(exam.grade)}`}>
                {exam.grade}
              </div>
              <div className="text-sm text-gray-600">
                {exam.obtainedMarks}/{exam.totalMarks}
              </div>
              <div className="text-xs text-gray-500">
                {exam.percentage}%
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Date & Time</p>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{exam.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{exam.time}</span>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 mb-1">Type & Room</p>
            <span className="font-medium">{exam.type}</span>
            <p className="text-xs text-gray-600">{exam.room}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-1">Marks</p>
            <span className="font-medium">{exam.totalMarks} marks</span>
            {exam.passingMarks && (
              <p className="text-xs text-gray-600">Pass: {exam.passingMarks}</p>
            )}
          </div>
        </div>

        {exam.syllabus && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Syllabus:</p>
            <div className="flex flex-wrap gap-1">
              {exam.syllabus.map((topic, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {exam.instructions && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Instructions:</strong> {exam.instructions}
            </p>
          </div>
        )}

        {!isUpcoming && exam.rank && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Class Rank: {exam.rank}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Duration: {exam.duration}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedExam(exam)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            {isUpcoming && (
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Study Guide">
                <BookOpen className="w-4 h-4" />
              </button>
            )}
            
            {!isUpcoming && (
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors" title="Download Result">
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AssessmentCard = ({ assessment }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{assessment.title}</h4>
          <p className="text-sm text-gray-600">{assessment.subject} • {assessment.type}</p>
          <p className="text-xs text-gray-500">Submitted: {assessment.submissionDate}</p>
        </div>
        
        <div className="text-right">
          <div className={`text-lg font-bold ${getGradeColor(assessment.grade)}`}>
            {assessment.grade}
          </div>
          <div className="text-sm text-gray-600">
            {assessment.marks}/{assessment.totalMarks}
          </div>
        </div>
      </div>
      
      {assessment.feedback && (
        <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
          {assessment.feedback}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Exams & Assessment</h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{exams.upcoming.length}</p>
              <p className="text-sm text-gray-600">Upcoming Exams</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{exams.completed.length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">87.4%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5.5</p>
              <p className="text-sm text-gray-600">Average Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'upcoming', label: 'Upcoming Exams' },
            { id: 'completed', label: 'Results' },
            { id: 'assessments', label: 'Assessments' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        {activeTab !== 'assessments' && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              {exams.upcoming
                .filter(exam => 
                  exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((exam) => (
                  <ExamCard key={exam.id} exam={exam} isUpcoming={true} />
                ))}
              
              {exams.upcoming.filter(exam => 
                exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No upcoming exams</h3>
                  <p className="text-gray-600">No exams match your search criteria.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-6">
              {exams.completed
                .filter(exam => 
                  exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((exam) => (
                  <ExamCard key={exam.id} exam={exam} isUpcoming={false} />
                ))}
              
              {exams.completed.filter(exam => 
                exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No completed exams</h3>
                  <p className="text-gray-600">No exam results match your search criteria.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
              
              {assessments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No assessments</h3>
                  <p className="text-gray-600">No recent assessments to display.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject-wise Performance */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Subject Performance</h4>
            <div className="space-y-3">
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'].map((subject) => {
                const scores = [85, 90, 84, 91, 78];
                const score = scores[Math.floor(Math.random() * scores.length)];
                
                return (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${score}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 w-10">{score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Grade Distribution */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Grade Distribution</h4>
            <div className="space-y-2">
              {[
                { grade: 'A+', count: 2, color: 'bg-green-500' },
                { grade: 'A', count: 3, color: 'bg-green-400' },
                { grade: 'A-', count: 2, color: 'bg-blue-500' },
                { grade: 'B+', count: 1, color: 'bg-blue-400' },
                { grade: 'B', count: 0, color: 'bg-orange-500' }
              ].map((item) => (
                <div key={item.grade} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-6">{item.grade}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{width: `${(item.count / 8) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-4">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam Detail Modal */}
      {selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{selectedExam.title}</h3>
              <button 
                onClick={() => setSelectedExam(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-sm">{selectedExam.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <p className="text-sm">{selectedExam.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <p className="text-sm">{selectedExam.date} at {selectedExam.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <p className="text-sm">{selectedExam.duration}</p>
                </div>
              </div>
              
              {selectedExam.syllabus && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus Coverage</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedExam.syllabus.map((topic, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedExam.instructions && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{selectedExam.instructions}</p>
                </div>
              )}
              
              {selectedExam.obtainedMarks && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Exam Results</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-green-600">Score</p>
                      <p className="font-bold text-green-800">{selectedExam.obtainedMarks}/{selectedExam.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-green-600">Percentage</p>
                      <p className="font-bold text-green-800">{selectedExam.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-green-600">Class Rank</p>
                      <p className="font-bold text-green-800">{selectedExam.rank}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setSelectedExam(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                {selectedExam.status === 'scheduled' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Study Guide
                  </button>
                )}
                {selectedExam.status === 'completed' && (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                    Download Result
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamAssessment;