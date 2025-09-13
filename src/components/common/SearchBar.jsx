// src/components/common/SearchBar.jsx
import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Search books by title, author, ISBN..." }) => {
  return (
    <div className="relative group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2">
          <Sparkles size={16} className="text-blue-400 opacity-60" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group/input">
            {/* Animated Search Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-focus-within/input:scale-110 group-focus-within/input:text-blue-600">
              <Search className="text-gray-400 group-focus-within/input:text-blue-600 transition-colors duration-300" size={20} />
            </div>
            
            {/* Enhanced Input */}
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
            />
            
            {/* Input Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          {/* Enhanced Filter Button */}
          <button className="group/btn relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <Filter size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="relative z-10 font-semibold">Advanced Filters</span>
            
            {/* Button Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        
        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {['Science', 'Mathematics', 'Literature', 'History'].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors duration-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;