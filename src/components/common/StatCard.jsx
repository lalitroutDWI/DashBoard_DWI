// src/components/common/StatCard.jsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  // Extract gradient colors based on the color prop
  const getGradientClass = (colorClass) => {
    if (colorClass.includes('blue')) return 'from-blue-500 to-blue-600';
    if (colorClass.includes('green')) return 'from-green-500 to-green-600';
    if (colorClass.includes('red')) return 'from-red-500 to-red-600';
    if (colorClass.includes('purple')) return 'from-purple-500 to-purple-600';
    if (colorClass.includes('indigo')) return 'from-indigo-500 to-indigo-600';
    if (colorClass.includes('orange')) return 'from-orange-500 to-orange-600';
    return 'from-gray-500 to-gray-600';
  };

  const gradientClass = getGradientClass(color);

  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass}`}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/10 to-yellow-400/10 translate-y-6 -translate-x-6 group-hover:scale-125 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${gradientClass} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} className="text-white" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {trend && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl group-hover:shadow-md transition-all duration-300">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
            {value}
          </p>
        </div>
        
        {/* Interactive Element */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
            <span>View Details</span>
            <TrendingUp size={14} className="ml-1 transform rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;