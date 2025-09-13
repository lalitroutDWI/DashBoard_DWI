import React, { useState } from 'react';
import StatCard from '../common/StatCard';
import SearchBar from '../common/SearchBar';
import DataTable from '../common/DataTable';
import { 
  User, Book, Search, Plus, Edit, Trash2, Users, Package, 
  Filter, Download, Upload, AlertCircle, CheckCircle, Clock, DollarSign, TrendingUp,
  BookOpen, UserCheck, FileText, Mail, Calendar as CalendarIcon
} from 'lucide-react';

const TabContent = ({ activeTab, dashboardStats, librarianProfile, onShowModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile & Role Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">{librarianProfile.name}</p>
                <p className="text-sm text-gray-600">Head Librarian</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Staff ID</p>
                <p className="font-medium">{librarianProfile.staffId}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{librarianProfile.contact}</p>
                <p className="font-medium">{librarianProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Assigned Branch</p>
                <p className="font-medium">{librarianProfile.branch}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Books" value={dashboardStats.totalBooks.toLocaleString()} icon={Book} color="bg-blue-50 text-blue-600" trend="+5.2%" />
        <StatCard title="Issued Books" value={dashboardStats.issuedBooks.toLocaleString()} icon={UserCheck} color="bg-green-50 text-green-600" trend="+12.3%" />
        <StatCard title="Overdue Books" value={dashboardStats.overdueBooks} icon={AlertCircle} color="bg-red-50 text-red-600" />
        <StatCard title="New Arrivals" value={dashboardStats.newArrivals} icon={Package} color="bg-purple-50 text-purple-600" trend="+89" />
        <StatCard title="Active Members" value={dashboardStats.activeMembers.toLocaleString()} icon={Users} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Pending Returns" value={dashboardStats.pendingReturns} icon={Clock} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            { type: 'issue', user: 'John Doe', book: 'Physics Fundamentals', time: '2 hours ago' },
            { type: 'return', user: 'Jane Smith', book: 'Chemistry Lab Manual', time: '4 hours ago' },
            { type: 'overdue', user: 'Mike Johnson', book: 'Mathematics Advanced', time: '1 day ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${
                activity.type === 'issue' ? 'bg-green-100 text-green-600' :
                activity.type === 'return' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
              }`}>
                {activity.type === 'issue' ? <BookOpen size={16} /> :
                 activity.type === 'return' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {activity.type === 'issue' ? 'Book Issued' : activity.type === 'return' ? 'Book Returned' : 'Overdue Alert'}
                </p>
                <p className="text-sm text-gray-600">{activity.user} - {activity.book}</p>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Catalog & Borrowing System</h2>
          <div className="flex gap-2">
            <button onClick={() => onShowModal('addBook')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Plus size={18} />Add Book
            </button>
            <button onClick={() => onShowModal('issueBook')} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <UserCheck size={18} />Issue Book
            </button>
          </div>
        </div>
      </div>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <DataTable />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Borrowings</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', book: 'Advanced Physics', issueDate: '2024-01-15', dueDate: '2024-02-14', fine: 0 },
            { user: 'Jane Smith', book: 'Modern Chemistry', issueDate: '2024-01-10', dueDate: '2024-02-09', fine: 25 }
          ].map((borrowing, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{borrowing.user}</p>
                <p className="text-sm text-gray-600">{borrowing.book}</p>
                <p className="text-xs text-gray-500">Issued: {borrowing.issueDate} | Due: {borrowing.dueDate}</p>
              </div>
              <div className="text-right">
                {borrowing.fine > 0 && <p className="text-red-600 font-medium">Fine: ₹{borrowing.fine}</p>}
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Process Return</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900">Records & Inventory Management</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Borrowing Records</h3>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />Export
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-600 text-sm font-medium">Students</p>
            <p className="text-2xl font-bold text-blue-900">1,156</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-600 text-sm font-medium">Teachers</p>
            <p className="text-2xl font-bold text-green-900">94</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-600 text-sm font-medium">Total Transactions</p>
            <p className="text-2xl font-bold text-purple-900">15,432</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Alice Johnson', type: 'Student', id: 'STD001', borrowed: 5, limit: 10, overdue: 0 },
            { name: 'Prof. Williams', type: 'Teacher', id: 'TCH001', borrowed: 8, limit: 20, overdue: 1 }
          ].map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${member.type === 'Student' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.type} • ID: {member.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Borrowed: {member.borrowed}/{member.limit}</p>
                {member.overdue > 0 && <p className="text-red-600 text-sm font-medium">Overdue: {member.overdue}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Management</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-gray-900">15,420</p>
            <p className="text-sm text-gray-600">Total Stock</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-900">89</p>
            <p className="text-sm text-blue-600">New Arrivals</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-900">23</p>
            <p className="text-sm text-red-600">Lost/Damaged</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-900">5</p>
            <p className="text-sm text-green-600">Vendor Orders</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload size={16} />Stock Audit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Package size={16} />New Purchase Order
          </button>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900">Reports, Analytics & Communication</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Borrowed Books</h3>
          <div className="space-y-3">
            {[
              { title: 'Advanced Physics', borrows: 245, trend: '+12%' },
              { title: 'Modern Chemistry', borrows: 198, trend: '+8%' },
              { title: 'Calculus Fundamentals', borrows: 167, trend: '+5%' }
            ].map((book, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.borrows} times borrowed</p>
                </div>
                <span className="text-sm font-medium text-green-600">{book.trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Trends</h3>
          <div className="space-y-4">
            {[
              { category: 'Science', percentage: 75, color: 'blue' },
              { category: 'Mathematics', percentage: 65, color: 'green' },
              { category: 'Literature', percentage: 45, color: 'purple' },
              { category: 'History', percentage: 35, color: 'orange' }
            ].map((trend, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{trend.category}</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div className={`bg-${trend.color}-600 h-2 rounded-full`} style={{width: `${trend.percentage}%`}}></div>
                </div>
                <span className="text-sm font-medium">{trend.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Tracking</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <DollarSign className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-xl font-bold text-blue-900">₹2,50,000</p>
            <p className="text-sm text-blue-600">Annual Budget</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <CheckCircle className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-xl font-bold text-green-900">₹1,75,000</p>
            <p className="text-sm text-green-600">Spent</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <Clock className="mx-auto text-orange-600 mb-2" size={24} />
            <p className="text-xl font-bold text-orange-900">₹75,000</p>
            <p className="text-sm text-orange-600">Remaining</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <TrendingUp className="mx-auto text-purple-600 mb-2" size={24} />
            <p className="text-xl font-bold text-purple-900">70%</p>
            <p className="text-sm text-purple-600">Utilized</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Center</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Announcements</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-medium text-blue-900">Library Renovation Notice</p>
                <p className="text-xs text-blue-600">Posted 2 days ago</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-sm font-medium text-green-900">Book Fair Next Week</p>
                <p className="text-xs text-green-600">Posted 5 days ago</p>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={16} />New Announcement
            </button>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Overdue Notifications</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">5 overdue books</p>
                    <p className="text-xs text-red-700">Students with pending returns</p>
                  </div>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Send Reminder</button>
                </div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-900">3 due tomorrow</p>
                    <p className="text-xs text-orange-700">Books due for return</p>
                  </div>
                  <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700">Send Notice</button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-3">Events & Activities</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                  <CalendarIcon className="text-purple-600" size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900">Reading Workshop</p>
                    <p className="text-xs text-purple-700">March 15, 2024 • 2:00 PM</p>
                  </div>
                  <button className="text-purple-600 hover:text-purple-800"><Edit size={14} /></button>
                </div>
              </div>
              <button className="mt-3 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Plus size={16} />Schedule Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render content based on active tab
  switch (activeTab) {
    case 'overview': return renderOverview();
    case 'catalog': return renderCatalog();
    case 'records': return renderRecords();
    case 'reports': return renderReports();
    default: return renderOverview();
  }
};

export default TabContent;