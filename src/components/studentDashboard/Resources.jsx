import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink, 
  FileText, 
  Image, 
  Headphones,
  Search,
  Filter,
  Star,
  Heart,
  Bookmark,
  Play,
  Clock,
  Eye,
  User
} from 'lucide-react';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteResources, setFavoriteResources] = useState([]);

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: 'Calculus: Limits and Derivatives',
      type: 'video',
      subject: 'Mathematics',
      description: 'Comprehensive video series covering limits, derivatives, and applications.',
      duration: '2h 15m',
      size: '1.2 GB',
      rating: 4.8,
      views: 15420,
      instructor: 'Dr. Maria Rodriguez',
      thumbnail: '/api/placeholder/300/200',
      tags: ['calculus', 'derivatives', 'limits'],
      downloadable: true,
      bookmarked: false
    },
    {
      id: 2,
      title: 'Photosynthesis Lab Manual',
      type: 'document',
      subject: 'Biology',
      description: 'Complete lab manual with procedures, diagrams, and analysis questions.',
      pages: 45,
      size: '12 MB',
      rating: 4.6,
      downloads: 892,
      author: 'Biology Department',
      tags: ['photosynthesis', 'lab', 'plants'],
      downloadable: true,
      bookmarked: true
    },
    {
      id: 3,
      title: 'World War II Interactive Timeline',
      type: 'interactive',
      subject: 'History',
      description: 'Interactive timeline with multimedia content covering major WWII events.',
      rating: 4.9,
      views: 8763,
      author: 'History Learning Center',
      tags: ['wwii', 'timeline', 'interactive'],
      downloadable: false,
      bookmarked: false
    },
    {
      id: 4,
      title: 'Shakespeare Audio Collection',
      type: 'audio',
      subject: 'English',
      description: 'Professional audio recordings of Shakespeare\'s major plays.',
      duration: '12h 30m',
      size: '3.2 GB',
      rating: 4.7,
      downloads: 1247,
      narrator: 'Royal Shakespeare Company',
      tags: ['shakespeare', 'plays', 'audio'],
      downloadable: true,
      bookmarked: false
    },
    {
      id: 5,
      title: 'Periodic Table Interactive',
      type: 'interactive',
      subject: 'Chemistry',
      description: 'Interactive periodic table with detailed element information and properties.',
      rating: 4.9,
      views: 23451,
      author: 'ChemEd Labs',
      tags: ['periodic table', 'elements', 'chemistry'],
      downloadable: false,
      bookmarked: true
    },
    {
      id: 6,
      title: 'Physics Problem Solving Guide',
      type: 'document',
      subject: 'Physics',
      description: 'Step-by-step guide to solving complex physics problems with examples.',
      pages: 128,
      size: '28 MB',
      rating: 4.5,
      downloads: 3421,
      author: 'Prof. John Kim',
      tags: ['physics', 'problems', 'solutions'],
      downloadable: true,
      bookmarked: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'document', label: 'Documents', icon: FileText },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'interactive', label: 'Interactive', icon: ExternalLink },
    { id: 'image', label: 'Images', icon: Image }
  ];

  const subjects = [...new Set(resources.map(r => r.subject))];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'audio': return Headphones;
      case 'interactive': return ExternalLink;
      case 'image': return Image;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'document': return 'bg-blue-100 text-blue-600';
      case 'audio': return 'bg-green-100 text-green-600';
      case 'interactive': return 'bg-purple-100 text-purple-600';
      case 'image': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (resourceId) => {
    setFavoriteResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const ResourceCard = ({ resource }) => {
    const TypeIcon = getTypeIcon(resource.type);
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {resource.type === 'video' && (
          <div className="relative">
            <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              {resource.duration}
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-1 rounded ${getTypeColor(resource.type)}`}>
                  <TypeIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-600">{resource.subject}</span>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
            </div>
            
            <button 
              onClick={() => toggleFavorite(resource.id)}
              className={`p-2 rounded-md transition-colors ${
                favoriteResources.includes(resource.id) || resource.bookmarked
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${favoriteResources.includes(resource.id) || resource.bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>{resource.rating}</span>
              </div>
              
              {resource.views && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{resource.views.toLocaleString()}</span>
                </div>
              )}
              
              {resource.downloads && (
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{resource.downloads}</span>
                </div>
              )}
            </div>
            
            {resource.size && (
              <span className="text-xs">{resource.size}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {resource.instructor || resource.author || resource.narrator}
            </div>
            
            <div className="flex space-x-2">
              {resource.downloadable && (
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              )}
              
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Study Resources</h2>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Upload Resource
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{resources.length}</p>
              <p className="text-sm text-gray-600">Total Resources</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Video className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {resources.filter(r => r.type === 'video').length}
              </p>
              <p className="text-sm text-gray-600">Videos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {resources.filter(r => r.type === 'document').length}
              </p>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {resources.filter(r => r.bookmarked || favoriteResources.includes(r.id)).length}
              </p>
              <p className="text-sm text-gray-600">Favorites</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {category.id === 'all' ? resources.length : resources.filter(r => r.type === category.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </div>

      {/* Recently Viewed */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recently Viewed</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.slice(0, 4).map((resource) => (
            <div key={resource.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded ${getTypeColor(resource.type)}`}>
                {React.createElement(getTypeIcon(resource.type), { className: "w-4 h-4" })}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 truncate">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;