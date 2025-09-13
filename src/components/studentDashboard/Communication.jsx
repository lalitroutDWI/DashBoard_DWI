import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  User, 
  Clock,
  Search,
  Filter,
  Plus,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Bell,
  Users,
  Calendar,
  Video
} from 'lucide-react';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [composeMode, setComposeMode] = useState(false);

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Physics Teacher',
      avatar: null,
      lastMessage: 'Your lab report was excellent! Great analysis of the pendulum experiment.',
      timestamp: '2 hours ago',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Wilson',
          message: 'Hi Alice, I reviewed your lab report on the pendulum experiment.',
          timestamp: '10:30 AM',
          type: 'received'
        },
        {
          id: 2,
          sender: 'Dr. Sarah Wilson',
          message: 'Your analysis was excellent! You clearly understood the relationship between length and period.',
          timestamp: '10:32 AM',
          type: 'received'
        },
        {
          id: 3,
          sender: 'Alice Johnson',
          message: 'Thank you! I spent extra time on the data analysis section.',
          timestamp: '11:15 AM',
          type: 'sent'
        }
      ]
    },
    {
      id: 2,
      name: 'Mr. John Smith',
      role: 'Mathematics Teacher',
      avatar: null,
      lastMessage: 'The calculus assignment is due tomorrow. Let me know if you need help.',
      timestamp: '1 day ago',
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'Mr. John Smith',
          message: 'Hi Alice, reminder that the calculus assignment is due tomorrow.',
          timestamp: 'Yesterday 3:00 PM',
          type: 'received'
        },
        {
          id: 2,
          sender: 'Mr. John Smith',
          message: 'Let me know if you need help with any of the integration problems.',
          timestamp: 'Yesterday 3:01 PM',
          type: 'received'
        }
      ]
    },
    {
      id: 3,
      name: 'Class 10A Group',
      role: 'Class Group',
      avatar: null,
      lastMessage: 'Emma: Don\'t forget about the group project meeting tomorrow!',
      timestamp: '3 hours ago',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'Emma Davis',
          message: 'Hey everyone, should we meet tomorrow at 3 PM for the group project?',
          timestamp: '2:00 PM',
          type: 'received'
        },
        {
          id: 2,
          sender: 'Michael Brown',
          message: 'Works for me!',
          timestamp: '2:15 PM',
          type: 'received'
        },
        {
          id: 3,
          sender: 'Alice Johnson',
          message: 'I\'ll be there. Should we meet in the library?',
          timestamp: '2:30 PM',
          type: 'sent'
        }
      ]
    }
  ];

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: 'Mid-term Exam Schedule Released',
      content: 'The mid-term examination schedule has been posted. Please check your student portal for specific dates and times.',
      author: 'Academic Office',
      date: '2024-06-10',
      priority: 'high',
      category: 'Academic'
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      content: 'Library will remain open until 10 PM during exam week to provide additional study space for students.',
      author: 'Library Administration',
      date: '2024-06-09',
      priority: 'medium',
      category: 'Facility'
    },
    {
      id: 3,
      title: 'Science Fair Registration Open',
      content: 'Registration is now open for the annual science fair. Submit your project proposals by June 20th.',
      author: 'Science Department',
      date: '2024-06-08',
      priority: 'low',
      category: 'Event'
    }
  ];

  // Sample contacts data
  const contacts = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Physics Teacher',
      email: 'sarah.wilson@school.edu',
      phone: '+1 234-567-8901',
      department: 'Science',
      officeHours: 'Mon-Fri 2:00-4:00 PM',
      room: 'Science Lab 1'
    },
    {
      id: 2,
      name: 'Mr. John Smith',
      role: 'Mathematics Teacher',
      email: 'john.smith@school.edu',
      phone: '+1 234-567-8902',
      department: 'Mathematics',
      officeHours: 'Mon-Wed 3:00-5:00 PM',
      room: 'Room 101'
    },
    {
      id: 3,
      name: 'Ms. Emily Johnson',
      role: 'English Teacher',
      email: 'emily.johnson@school.edu',
      phone: '+1 234-567-8903',
      department: 'English',
      officeHours: 'Tue-Thu 1:00-3:00 PM',
      room: 'Room 203'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedConversation) {
      // Add message to conversation (in real app, this would be an API call)
      const newMessage = {
        id: Date.now(),
        sender: 'Alice Johnson',
        message: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent'
      };
      
      // Update conversation with new message
      setMessageText('');
    }
  };

  const ConversationList = () => (
    <div className="space-y-2">
      {conversations
        .filter(conv => 
          conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedConversation?.id === conversation.id
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {conversation.role === 'Class Group' ? (
                  <Users className="w-5 h-5 text-gray-600" />
                ) : (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 truncate">{conversation.name}</h4>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{conversation.role}</p>
                <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread && (
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
    </div>
  );

  const MessageView = () => {
    if (!selectedConversation) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Select a conversation</h3>
            <p className="text-gray-600">Choose a conversation to start messaging</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Conversation Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {selectedConversation.role === 'Class Group' ? (
                  <Users className="w-5 h-5 text-gray-600" />
                ) : (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{selectedConversation.name}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.role}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'sent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.type === 'received' && (
                    <p className="text-xs font-medium mb-1 opacity-75">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 opacity-75`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={!messageText.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  const AnnouncementsView = () => (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                  announcement.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {announcement.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{announcement.author}</span>
                <span>{announcement.date}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{announcement.category}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Star className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ContactsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts
        .filter(contact => 
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.role}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{contact.officeHours}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Communication</h2>
        <button 
          onClick={() => setComposeMode(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'announcements', label: 'Announcements', icon: Bell },
            { id: 'contacts', label: 'Contacts', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'messages' && (
          <div className="flex h-96">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-4">
              <ConversationList />
            </div>
            
            {/* Message View */}
            <MessageView />
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="p-4 max-h-96 overflow-y-auto">
            <AnnouncementsView />
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="p-4 max-h-96 overflow-y-auto">
            <ContactsView />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Unread Messages</h3>
              <p className="text-sm text-gray-600">2 new messages</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View all messages →
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">New Announcements</h3>
              <p className="text-sm text-gray-600">3 recent updates</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View announcements →
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Office Hours</h3>
              <p className="text-sm text-gray-600">Available now: Dr. Wilson</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Schedule meeting →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communication;