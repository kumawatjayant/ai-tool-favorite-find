
import React from 'react';
import { Heart, ExternalLink, Star, DollarSign } from 'lucide-react';
import { AITool } from '../types/types';

interface ToolCardProps {
  tool: AITool;
  onFavoriteClick: (toolId: number) => Promise<void>;
  isLoading?: boolean;
  isFavorited?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onFavoriteClick,
  isLoading = false,
  isFavorited = false
}) => {
  const handleFavoriteClick = () => {
    if (!isLoading) {
      onFavoriteClick(tool.id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'conversational ai': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'image generation': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'code assistant': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'content creation': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'video generation': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'productivity': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'writing assistant': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    
    const key = category.toLowerCase() as keyof typeof colors;
    return colors[key] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
          </div>
          
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isFavorited
                ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30'
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-red-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-5 h-5 transition-transform ${
                isFavorited ? 'fill-current' : ''
              } ${isLoading ? 'animate-pulse' : ''}`} 
            />
          </button>
        </div>

        {/* Description */}
        {tool.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>
        )}

        {/* Pricing */}
        {tool.pricing && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{tool.pricing}</span>
          </div>
        )}

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {feature}
                </span>
              ))}
              {tool.features.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{tool.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Visit Link */}
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <span>Visit Tool</span>
            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ToolCard;
